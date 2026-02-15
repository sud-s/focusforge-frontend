import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import Input from '../common/Input';
import Button from '../common/Button';
import UnionLogo from '../../Union.svg';
import { Mail, Lock, ArrowRight, BarChart3, TrendingUp } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form (50%) */}
      <div className="w-1/2 flex flex-col justify-center px-12 lg:px-20 py-12" style={{ backgroundColor: '#ffffff' }}>
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center mb-3">
              <img src={UnionLogo} alt="FocusForge" className="h-10 w-auto" />
            </div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: '#111827' }}>
              Welcome back
            </h1>
            <p style={{ color: '#6b7280' }}>Sign in to continue to FocusForge</p>
          </div>

          {/* Google Sign In Button */}
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-xl hover:bg-gray-50 transition-all mb-6 shadow-sm" style={{ borderColor: '#d1d5db' }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span style={{ color: '#374151' }} className="font-medium">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderColor: '#e5e7eb' }}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4" style={{ backgroundColor: '#ffffff', color: '#9ca3af' }}>or</span>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl mb-6 text-sm flex items-center gap-2" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ef4444' }}></div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} style={{ color: '#9ca3af' }} />
              </div>
              <Input 
                label=""
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="pl-12 w-full px-4 py-3 border rounded-xl transition-colors"
                style={{ borderColor: '#d1d5db', backgroundColor: '#f9fafb', color: '#111827' }}
                placeholder="Email address"
              />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} style={{ color: '#9ca3af' }} />
              </div>
              <Input 
                label=""
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="pl-12 w-full px-4 py-3 border rounded-xl transition-colors"
                style={{ borderColor: '#d1d5db', backgroundColor: '#f9fafb', color: '#111827' }}
                placeholder="Password"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" style={{ borderColor: '#d1d5db' }} />
                <span style={{ color: '#4b5563' }} className="text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium transition-colors" style={{ color: '#2563eb' }}>Forgot password?</a>
            </div>
            
            <Button type="submit" className="w-full py-3.5 transition-all rounded-xl shadow-lg" style={{ background: 'linear-gradient(to right, #3b82f6, #4f46e5)' }} loading={loading}>
              <span className="flex items-center justify-center gap-2 font-medium text-white">
                Sign In
                <ArrowRight size={18} />
              </span>
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p style={{ color: '#6b7280' }}>
              Don't have an account?{' '}
              <Link to="/register" className="font-medium transition-colors inline-flex items-center gap-1" style={{ color: '#2563eb' }}>
                Sign up
                <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Analytics Dashboard Preview (50%) */}
      <div className="w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden flex items-center justify-center">
        {/* Abstract blurred gradient background */}
        <div className="absolute inset-0 opacity-80">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>

        {/* Floating Dashboard Cards - FocusForge Stats */}
        <div className="relative z-10 flex flex-col gap-6 px-12">
          {/* Productivity Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Productivity</p>
                  <p className="text-white font-semibold text-lg">+78%</p>
                </div>
              </div>
            </div>
            {/* Progress Bar Chart */}
            <div className="flex items-end gap-2 h-16">
              <div className="w-8 bg-white/30 rounded-t-lg h-8 transition-all hover:bg-white/50"></div>
              <div className="w-8 bg-white/40 rounded-t-lg h-12 transition-all hover:bg-white/60"></div>
              <div className="w-8 bg-white/50 rounded-t-lg h-10 transition-all hover:bg-white/70"></div>
              <div className="w-8 bg-white/60 rounded-t-lg h-14 transition-all hover:bg-white/80"></div>
              <div className="w-8 bg-white/70 rounded-t-lg h-11 transition-all hover:bg-white/90"></div>
              <div className="w-8 bg-white/80 rounded-t-lg h-16 transition-all hover:bg-white"></div>
              <div className="w-8 bg-white rounded-t-lg h-13 transition-all"></div>
            </div>
          </div>

          {/* Tasks Completed Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <BarChart3 size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Tasks Completed</p>
                  <p className="text-white font-semibold text-lg">1,247</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-green-400/30 px-2 py-1 rounded-full">
                <TrendingUp size={14} className="text-green-300" />
                <span className="text-green-300 text-xs font-medium">+12%</span>
              </div>
            </div>
            {/* Line Chart */}
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[75%] bg-white rounded-full transition-all"></div>
            </div>
            <div className="flex justify-between mt-2 text-white/50 text-xs">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default Login;
