'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Lock, ChevronRight, Sparkles, Fingerprint, Shield, AlertCircle } from 'lucide-react';
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center bg-[#f8fafc] overflow-hidden">
      {/* Clean Abstract Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login-bg-clean.png"
          alt="Clean AI Background"
          fill
          className="object-cover opacity-40 mix-blend-multiply"
          priority
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/40 to-white/80"></div>
      </div>

      {/* Modern AI Floating Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-100/20 rounded-full blur-3xl animate-pulse delay-700"></div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-[440px] px-6">
        <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 relative">
          
          {/* AI Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100 animate-fadeIn">
            <Sparkles size={14} className="text-blue-500 fill-blue-500/20" />
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">AI Powered Portal</span>
          </div>

          <div className="flex flex-col items-center mb-10 mt-2">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <Image 
                src="/y-space-logo.png" 
                alt="Y Space Logo" 
                width={32} 
                height={32}
                className="grayscale opacity-80"
              />
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight text-center">
              Sign in to <span className="text-blue-600">Y Space</span>
            </h1>
            <p className="text-slate-500 mt-2 text-sm text-center font-light">
              Enter your credentials to access the automation engine.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-fadeIn">
              <AlertCircle size={18} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500 ml-1">Email address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all duration-300"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-medium text-slate-500">Password</label>
                <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">Forgot?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 group shadow-lg shadow-slate-200"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* AI Security Footer */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-1 group cursor-help">
              <Fingerprint size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              <span className="text-[10px] text-slate-400 font-medium">Biometric</span>
            </div>
            <div className="flex flex-col items-center gap-1 group cursor-help">
              <Shield size={20} className="text-slate-300 group-hover:text-green-500 transition-colors" />
              <span className="text-[10px] text-slate-400 font-medium">Encrypted</span>
            </div>
            <div className="flex flex-col items-center gap-1 group cursor-help">
              <Sparkles size={20} className="text-slate-300 group-hover:text-cyan-500 transition-colors" />
              <span className="text-[10px] text-slate-400 font-medium">Automated</span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-400 text-xs font-light">
          &copy; 2026 Y Space AI. All systems operational.
        </p>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ 
        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
        backgroundSize: '30px 30px' 
      }}></div>
    </main>
  );
}
