import React, { useState, useEffect } from 'react';
import { User, Bell, Lock, Palette, Save, CheckCircle, AlertCircle, Moon, Sun, Volume2, VolumeX, Mail, AtSign } from 'lucide-react';
import { useAuth } from '../../store/authStore';
import { useUI } from '../../store/uiStore';
import settingsApi from '../../api/settingsApi';
import Button from '../common/Button';
import Input from '../common/Input';
import Loader from '../common/Loader';
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

  // Profile form
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Personalization form
  const [personalization, setPersonalization] = useState({
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'YYYY-MM-DD',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <User className="text-primary" />
          Settings
        </h1>
        <p className="text-gray">Manage your account settings and preferences.</p>
      </div>

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
          <CheckCircle size={20} />
          {success}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="card">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary -mb-px'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Profile Information</h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <AtSign size={14} />
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                
                <div>
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
              <h2 className="text-lg font-semibold">Change Password</h2>
              
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
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
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Theme Settings</h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    theme === 'light' ? 'border-primary bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setTheme('light')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center">
                      <Sun size={20} className="text-yellow-500" />
                    </div>
                    <div>
                      <p className="font-medium">Light Mode</p>
                      <p className="text-sm text-gray-500">Clean and bright interface</p>
                    </div>
                    {theme === 'light' && <CheckCircle size={20} className="ml-auto text-primary" />}
                  </div>
                </div>
                
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    theme === 'dark' ? 'border-primary bg-blue-50 dark:bg-gray-800' : 'border-gray-200'
                  }`}
                  onClick={() => setTheme('dark')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg shadow flex items-center justify-center">
                      <Moon size={20} className="text-yellow-300" />
                    </div>
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-500">Easy on the eyes</p>
                    </div>
                    {theme === 'dark' && <CheckCircle size={20} className="ml-auto text-primary" />}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bell size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleNotifications}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      notificationsEnabled ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notificationsEnabled ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      {soundEnabled ? <Volume2 size={20} className="text-purple-600" /> : <VolumeX size={20} className="text-purple-600" />}
                    </div>
                    <div>
                      <p className="font-medium">Sound Effects</p>
                      <p className="text-sm text-gray-500">Play sounds for notifications</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleSound}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      soundEnabled ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      soundEnabled ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
