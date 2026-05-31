/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Lock, ArrowRight, UserPlus, Sparkles, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface LoginProps {
  language: Language;
  onLoginSubmit: (email: string, password?: string, isSignUp?: boolean) => Promise<{ success: boolean; errMsg?: string }>;
  isMock: boolean;
}

export const Login: React.FC<LoginProps> = ({ language, onLoginSubmit, isMock }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Translation values
  const text = {
    om: {
      title: isSignUp ? 'Dafii Galmaa\'i' : 'Baga Nagaan Dhuftan',
      subtitle: isSignUp ? 'Barnoota fidan qopheessuuf asirratti galmaa\'i' : 'Gara kooziitti deebi\'uuf seeni',
      emailLabel: 'Email Keessan',
      passwordLabel: 'Jecha Dabarsoo (Password)',
      submitBtn: isSignUp ? 'Galmeessi' : 'Login Tahuu',
      toggleToSignUp: 'Akkaawuntii hin qabduu? Asirratti galmaa\'i',
      toggleToSignIn: 'Kanaan dura galmoofteettaa? Seeni',
      loadingText: 'Dalagamaa jira...',
      demoTitle: 'Salphaatti Seenuuf (Quick Access Profiles):',
      demoDesc: 'Galmeessuu osoo hin feesisne, herregota shaakalaa gadii fayyadamii seeni:',
      successAlert: 'Baga nagaan dhufte Amoo Academy keessatti!',
      sandboxBadge: 'Yeroo Ammaa Offline Sandbox irratti hojjatamaa jira',
      sandboxExplanation: 'Haala salphaan qulqulleeffachuuf ragaan kee kuusaa browser kee (localStorage) keessatti ol-kaayata.'
    },
    en: {
      title: isSignUp ? 'Create Your Account' : 'Welcome Back',
      subtitle: isSignUp ? 'Join Amoo Academy to master technical & creative skills' : 'Sign in to return to your courses',
      emailLabel: 'Email Address',
      passwordLabel: 'Secret Password',
      submitBtn: isSignUp ? 'Register & Study' : 'Sign In Now',
      toggleToSignUp: 'New here? Create your academy profile',
      toggleToSignIn: 'Already a student? Sign in instead',
      loadingText: 'Authenticating...',
      demoTitle: 'Quick Trial Profiles:',
      demoDesc: 'Bypass credentials by selecting a pre-configured profile:',
      successAlert: 'Welcome back to Amoo Academy!',
      sandboxBadge: 'Operating in client-side Sandbox Mode',
      sandboxExplanation: 'For zero-config convenience, your user state and XP are securely retained in local storage.'
    }
  }[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const result = await onLoginSubmit(email, password, isSignUp);
    if (result.success) {
      setSuccessMsg(text.successAlert);
    } else {
      setErrorMsg(result.errMsg || 'An error occurred during authentication.');
    }
    setLoading(false);
  };

  const loadDemoProfile = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg(null);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row items-center justify-center p-4 md:p-8 max-w-7xl w-full mx-auto gap-8 lg:gap-12 xl:gap-20">
      {/* Visual Welcome Board */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <span className="inline-flex items-center gap-1.5 self-start text-xs font-bold px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/15 mb-4 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          Amoo Academy 2026
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight mb-6">
          {language === 'om' ? (
            <>
              Dandeettii Kee <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-indigo-500">
                Gara Sadarkaa
              </span> <br/>
              Oluutti Guddisi!
            </>
          ) : (
            <>
              Elevate Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-indigo-505">
                Technical Mastery
              </span> <br/>
              with Amoo.
            </>
          )}
        </h1>
        <p className="text-slate-400 leading-relaxed max-w-lg mb-8 text-sm md:text-base">
          {language === 'om' 
            ? 'Barnoota weebsaayiti ittiin hojjatanii fi gulaallii viidiyoo premium ta\'e bifa salphaafi qindaa\'een asitti baradhu. Shaakala qabaa fi X-P badhaasami!'
            : 'Access hand-picked interactive curriculums in full-stack coding and professional clip editing. Complete real puzzles and upgrade your skillset.'}
        </p>

        {/* Informative info bubble card */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-4 flex gap-3 max-w-lg">
          <div className="mt-0.5"><Lightbulb className="w-5 h-5 text-amber-400 shrink-0" /></div>
          <div>
            <span className="block text-xs font-bold text-amber-300 tracking-wide uppercase mb-0.5">{text.sandboxBadge}</span>
            <p className="text-slate-400 text-xs leading-relaxed">{text.sandboxExplanation}</p>
          </div>
        </div>
      </div>

      {/* Login glass-morphic form card */}
      <div className="w-full lg:w-[450px] relative">
        <div className="absolute inset-0 bg-indigo-500/10 rounded-3xl blur-3xl -z-10" />
        
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800/80">
          <div className="mb-6">
            <h2 className="text-2.5xl font-black text-white tracking-tight leading-tight">{text.title}</h2>
            <p className="text-slate-400 text-xs mt-1.5 font-medium">{text.subtitle}</p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/25 rounded-2xl text-red-300 text-xs flex gap-2">
              <span className="font-extrabold text-red-500">⚠️</span>
              <p className="leading-normal">{errorMsg}</p>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl text-emerald-300 text-xs flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="font-medium">{successMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{text.emailLabel}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@shakki.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-indigo-500 hover:border-slate-700 rounded-2xl text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{text.passwordLabel}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-indigo-500 hover:border-slate-700 rounded-2xl text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-slate-800 disabled:to-slate-800 text-white font-bold h-12 rounded-2xl transition shadow-lg shadow-indigo-600/10 active:scale-[0.98] cursor-pointer text-xs md:text-sm flex items-center justify-center gap-2 border border-blue-400/10 focus:outline-none"
            >
              {loading ? (
                <span>{text.loadingText}</span>
              ) : (
                <>
                  <span>{text.submitBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Registraion Toggle */}
          <div className="mt-5 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline font-semibold cursor-pointer focus:outline-none"
            >
              {isSignUp ? text.toggleToSignIn : text.toggleToSignUp}
            </button>
          </div>

          <div className="border-t border-slate-800/80 my-5 pt-4">
            <h3 className="text-slate-300 font-bold text-xs flex items-center gap-1.5 mb-1.5">
              <span>🚀</span> {text.demoTitle}
            </h3>
            <p className="text-slate-500 text-[10px] leading-relaxed mb-3">{text.demoDesc}</p>
            
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => loadDemoProfile('dhiirakoo@gmail.com', 'password123')}
                className="w-full py-2 px-3 bg-slate-950/30 hover:bg-slate-950/60 border border-slate-800/60 rounded-xl text-left transition text-xs flex justify-between items-center group cursor-pointer focus:outline-none"
              >
                <div>
                  <span className="font-bold text-slate-300 block">dhiirakoo@gmail.com</span>
                  <span className="text-slate-500 text-[10px]">Status: Completed Lesson 1 • Key: password123</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => loadDemoProfile('student@amoo.com', 'password')}
                className="w-full py-2 px-3 bg-slate-950/30 hover:bg-slate-950/60 border border-slate-800/60 rounded-xl text-left transition text-xs flex justify-between items-center group cursor-pointer focus:outline-none"
              >
                <div>
                  <span className="font-bold text-slate-300 block">student@amoo.com</span>
                  <span className="text-slate-500 text-[10px]">Status: Fresh Profile • Key: password</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
