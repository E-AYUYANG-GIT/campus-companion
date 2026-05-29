import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, GraduationCap } from 'lucide-react';

function AuthPage() {
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle auth logic here
    console.log('Form submitted:', formData);
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="page-content flex flex-col min-h-[60vh] px-4 py-8 gap-4 items-center justify-center">
      
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text)] mb-2">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-sm text-gray-400">
          {isSignup ? 'Sign up to get started with your journey' : 'Sign in to continue to your dashboard'}
        </p>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md bg-black/30 rounded-lg p-6 space-y-5">
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name - Signup Only */}
          {isSignup && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Elizar Y. Ayuyang"
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Mail className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="elizar.ayuyang@up.edu.ph"
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Lock className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-black/40 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password - Signup Only */}
          {isSignup && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
            </div>
          )}

          {/* Forgot Password - SignIn Only */}
          {!isSignup && (
            <div className="text-right">
              <button type="button" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
          >
            {isSignup ? 'Create Account' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0a0a0a] px-2 text-gray-500">or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <button
          type="button"
          className="w-full py-3 px-4 bg-black/40 border border-gray-700 hover:border-gray-600 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-black/60 active:scale-[0.98]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>

        {/* Toggle Mode */}
        <p className="text-center text-sm text-gray-400">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={toggleMode}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            {isSignup ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>

      {/* Footer Info Card - Matches your reference style */}
      <div className="w-full max-w-md grid grid-cols-[auto_1fr] gap-4 items-center px-4 py-3 bg-black/30 rounded-lg">
        <div className="w-12 h-12 flex bg-blue-500/20 rounded-sm justify-center items-center">
          <GraduationCap className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-200">Student Portal Access</h2>
          <p className="text-xs text-gray-400">Secure login for enrolled students and faculty members</p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;