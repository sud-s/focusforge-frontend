import React, { useState, useEffect, useRef } from 'react';
import { User, Bell, Lock, Palette, Save, CheckCircle, AlertCircle, Moon, Sun, Volume2, VolumeX, Mail, AtSign, Camera, Upload, X } from 'lucide-react';
import { useAuth } from '../../store/authStore';
import { useUI } from '../../store/uiStore';
import settingsApi from '../../api/settingsApi';
import Button from '../common/Button';
import '../../styles/forms.css';
import '../../styles/cards.css';

const SettingsPage = () => {
  const { user } = useAuth();
  const { 
    theme, setTheme, 
    notificationsEnabled, toggleNotifications,
    soundEnabled, toggleSound 
  } = useUI();

  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Profile form
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
      });
      if (user.avatar_url || user.profile_photo) {
        setAvatarPreview(user.avatar_url || user.profile_photo);
      }
    }
  }, [user]);

  const handleAvatarSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // TODO: Upload to server
      setSuccess('Photo selected - save to apply');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProfileSave = async () => {
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      await settingsApi.updateProfile(profileData);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    setSuccess('');
    setError('');
    try {
      await settingsApi.changePassword({
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
      });
      setSuccess('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-normal text-zinc-700 dark:text-zinc-200">Settings</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Manage your account</p>
      </div>

      {success && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-green-700 dark:text-green-400 text-sm">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="card">
        <div className="flex border-b border-zinc-200 dark:border-zinc-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-normal transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-zinc-700 dark:text-zinc-200 border-b-2 border-primary -mb-px'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              }`}
            >
              <tab.icon size={12} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-auto">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Profile Information</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Update your personal details</p>
              </div>
              
              {/* Avatar Section - Modern Style */}
              <div className="flex items-center gap-6 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                <div className="relative">
                  {avatarPreview ? (
                    <div className="relative">
                      <img 
                        src={avatarPreview} 
                        alt="Profile" 
                        className="w-20 h-20 rounded-full object-cover border-2 border-zinc-200 dark:border-zinc-700 shadow-md"
                      />
                      <button
                        onClick={handleRemoveAvatar}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {profileData.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarSelect}
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-zinc-800 dark:text-zinc-100">{profileData.name || 'Your Name'}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">@{profileData.username || 'username'}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Camera size={14} />
                      Change
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <AtSign size={14} />
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="Your first name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <AtSign size={14} />
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    placeholder="@username"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Mail size={14} />
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleProfileSave} disabled={loading} icon={Save}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Security</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage your account security</p>
              </div>
              
              <div className="p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-2">New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="flex justify-start">
                <Button onClick={handlePasswordChange} disabled={loading} icon={Lock}>
                  {loading ? 'Changing...' : 'Change Password'}
                </Button>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <h2 className="text-sm font-normal text-zinc-500 dark:text-zinc-300">Theme</h2>
              
              <div className="flex gap-3">
                <div 
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    theme === 'light' 
                      ? 'border-zinc-400 bg-zinc-100 dark:bg-zinc-800' 
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                  onClick={() => setTheme('light')}
                >
                  <div className="flex items-center gap-2">
                    <Sun size={14} className="text-zinc-500 dark:text-zinc-400" />
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">Light</span>
                  </div>
                </div>
                
                <div 
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    theme === 'dark' 
                      ? 'border-zinc-400 bg-zinc-100 dark:bg-zinc-800' 
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                  onClick={() => setTheme('dark')}
                >
                  <div className="flex items-center gap-2">
                    <Moon size={14} className="text-zinc-500 dark:text-zinc-400" />
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">Dark</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Notifications</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage your notification preferences</p>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Bell size={16} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Push Notifications</span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Receive notifications on your device</p>
                  </div>
                </div>
                <button
                  onClick={toggleNotifications}
                  className="w-11 h-6 rounded-full relative transition-colors"
                  style={{ backgroundColor: notificationsEnabled ? '#8b5cf6' : '#d4d4d8' }}
                >
                  <div 
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                    style={{ left: notificationsEnabled ? '22px' : '2px' }}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    {soundEnabled ? <Volume2 size={16} className="text-blue-600 dark:text-blue-400" /> : <VolumeX size={16} className="text-blue-600 dark:text-blue-400" />}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Sound</span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Play sound for notifications</p>
                  </div>
                </div>
                <button
                  onClick={toggleSound}
                  className="w-11 h-6 rounded-full relative transition-colors"
                  style={{ backgroundColor: soundEnabled ? '#8b5cf6' : '#d4d4d8' }}
                >
                  <div 
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                    style={{ left: soundEnabled ? '22px' : '2px' }}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
