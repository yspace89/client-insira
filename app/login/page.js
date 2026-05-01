'use client';

import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
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
        setError('Invalid email or password.');
        setIsLoading(false);
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError('An error occurred during authentication.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#020617] p-6 selection:bg-blue-500/30">
      {/* Background - Very Subtle Mesh Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-[32px] font-bold text-white tracking-tight text-center">
            Sign In to Exploration Space
          </h1>
          <p className="text-slate-500 mt-2.5 text-sm text-center font-medium">
            Enter your credentials to manage the ecosystem.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400">
            <AlertCircle size={16} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-600">
                <Mail size={18} strokeWidth={1.5} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl py-4 pl-12 pr-5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-sm"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Password
              </label>
              <a href="#" className="text-[11px] font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-600">
                <Lock size={18} strokeWidth={1.5} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl py-4 pl-12 pr-5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4.5 rounded-2xl flex items-center justify-center transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-blue-900/10"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span className="text-sm font-bold uppercase tracking-widest">Sign In</span>
            )}
          </button>
        </form>

        <footer className="mt-20 flex flex-col items-center gap-4">
          <div className="h-px w-12 bg-slate-800"></div>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
            © 2026 Y Space AI
          </p>
        </footer>
      </div>
    </main>
  );
}
