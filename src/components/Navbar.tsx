/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Globe, LogOut, Award, Shield } from 'lucide-react';
import { Language, UserProfile } from '../types';

interface NavbarProps {
  language: Language;
  onLanguageToggle: () => void;
  user: UserProfile | null;
  onLogout: () => void;
  isMock: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageToggle,
  user,
  onLogout,
  isMock
}) => {
  return (
    <nav className="bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 px-4 py-4 md:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/20">
            A
          </div>
          <div>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-indigo-400">
              Amoo Academy
            </h1>
            {isMock ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 px-1.5 py-0.5 bg-amber-500/10 rounded-md border border-amber-500/20 uppercase tracking-wider">
                <Shield className="w-3 h-3" /> Offline Sandbox
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 px-1.5 py-0.5 bg-emerald-500/10 rounded-md border border-emerald-500/20 uppercase tracking-wider">
                <Shield className="w-3 h-3" /> Live Supabase
              </span>
            )}
          </div>
        </div>

        {/* Global actions and user profile info */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden md:flex items-center gap-2 px-3  h-9 rounded-xl bg-slate-800/65 border border-slate-700/50 mr-2 text-xs">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300">XP:</span>
              <span className="font-bold text-white font-mono">{user.xp}</span>
            </div>
          )}

          <button
            onClick={onLanguageToggle}
            className="h-9 px-4 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2 border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{language === 'om' ? 'English' : 'Afaan Oromoo'}</span>
          </button>

          {user && (
            <button
              onClick={onLogout}
              className="h-9 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/25 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'om' ? 'Ba\'i (Logout)' : 'Log Out'}</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
