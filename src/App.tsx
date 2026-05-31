/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BookOpen, Star, Sparkles, Trophy, Calendar, CheckCircle2, Shield } from 'lucide-react';
import { Language, UserProfile } from './types';
import { COURSES } from './data/courses';
import { supabaseClientWrapper } from './lib/supabase';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { CourseViewer } from './components/CourseViewer';

export default function App() {
  const [language, setLanguage] = useState<Language>('om');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Read language and current user session on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('amoo_academy_lang') as Language;
    if (savedLang) setLanguage(savedLang);

    const savedUser = localStorage.getItem('amoo_academy_current_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        // Refresh values from the central mock database
        const progress = supabaseClientWrapper.getCurrentUserProgress(parsed.email);
        setUser({
          email: parsed.email,
          isMock: supabaseClientWrapper.isMock,
          xp: progress.xp,
          completedLessons: progress.completedLessons,
          joinedAt: parsed.joinedAt || new Date().toISOString()
        });
      } catch (err) {
        console.error('Failed to parse saved user', err);
      }
    }
  }, []);

  const handleLanguageToggle = () => {
    const newLang = language === 'om' ? 'en' : 'om';
    setLanguage(newLang);
    localStorage.setItem('amoo_academy_lang', newLang);
  };

  const handleLoginSubmit = async (email: string, password?: string, isSignUp?: boolean) => {
    let result;
    if (isSignUp) {
      result = await supabaseClientWrapper.signUp({ email, password });
    } else {
      result = await supabaseClientWrapper.signInWithPassword({ email, password });
    }

    if (result.error) {
      return { success: false, errMsg: result.error.message };
    }

    if (result.data?.user) {
      const u = result.data.user as any;
      const progress = supabaseClientWrapper.getCurrentUserProgress(u.email);
      const profile: UserProfile = {
        email: u.email,
        isMock: supabaseClientWrapper.isMock,
        xp: progress.xp,
        completedLessons: progress.completedLessons,
        joinedAt: u.joinedAt || new Date().toISOString()
      };
      
      setUser(profile);
      // Persist the user session in client storage
      localStorage.setItem('amoo_academy_current_user', JSON.stringify(profile));
      return { success: true };
    }

    return { success: false, errMsg: 'System Authenticator Error' };
  };

  const handleLogout = async () => {
    await supabaseClientWrapper.signOut();
    setUser(null);
    setSelectedCourseId(null);
  };

  const handleLessonCompleted = async (lessonId: string) => {
    if (!user) return;

    await supabaseClientWrapper.markLessonCompleted(user.email, lessonId);
    
    // Refresh user state
    const progress = supabaseClientWrapper.getCurrentUserProgress(user.email);
    const updated: UserProfile = {
      ...user,
      xp: progress.xp,
      completedLessons: progress.completedLessons
    };
    setUser(updated);
    localStorage.setItem('amoo_academy_current_user', JSON.stringify(updated));
  };

  // Find active course details
  const activeCourse = COURSES.find(c => c.id === selectedCourseId);

  // Translations for layout
  const text = {
    om: {
      welcome: 'Kooziiwwan Keeti',
      desc: 'Dandeettii kee asirraatti gabbifadhu bro!',
      activeStats: 'Sadarkaakee fi progress',
      profileJoined: 'Miseensa taate:',
      courseCompleted: 'Kutaa barumsaa {done} keessaa {total} xumurteetta',
      learningTrackBtn: 'Jalqabi (Start)',
      allLessonsComp: 'Koorsichi Goolabameera! 🎉',
      footer: '© 2026 Amoo Academy. Mirgi hundaa seeraan eeggamaadha.',
      sandboxBadge: 'Offline Sandbox Mode active',
      lessonsCount: 'Barumsa {count} can qabu',
      noCourses: 'Koorsiin argame hin jiru...'
    },
    en: {
      welcome: 'Your Interactive Learning Dashboard',
      desc: 'Unlock your professional and creative skills here bro!',
      activeStats: 'Academic Achievements & Growth',
      profileJoined: 'Member Since:',
      courseCompleted: 'Finished {done} out of {total} available tasks',
      learningTrackBtn: 'Start Course',
      allLessonsComp: 'Course Fully Completed! 🎉',
      footer: '© 2026 Amoo Academy. All rights reserved.',
      sandboxBadge: 'Offline Sandbox Mode active',
      lessonsCount: '{count} Comprehensive Lessons',
      noCourses: 'No courses match current categories...'
    }
  }[language];

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-950 min-h-screen text-slate-100 antialiased font-sans flex flex-col justify-between">
      
      {/* Top sticky Navigation frame */}
      <Navbar
        language={language}
        onLanguageToggle={handleLanguageToggle}
        user={user}
        onLogout={handleLogout}
        isMock={supabaseClientWrapper.isMock}
      />

      <main className="flex-1 flex flex-col justify-center pb-12">
        {!user ? (
          /* SECTION 1: AUTH SCREEN */
          <Login
            language={language}
            onLoginSubmit={handleLoginSubmit}
            isMock={supabaseClientWrapper.isMock}
          />
        ) : selectedCourseId && activeCourse ? (
          /* COMPONENT: ACTIVE STUDY MATERIAL WORKSPACE */
          <CourseViewer
            course={activeCourse}
            language={language}
            onBack={() => setSelectedCourseId(null)}
            user={user}
            onLessonCompleted={handleLessonCompleted}
          />
        ) : (
          /* SECTION 2: INTUITIVE STUDENT HERO & DASHBOARD */
          <div className="max-w-7xl w-full mx-auto px-4 py-8 md:px-8 space-y-8 animate-fade-in">
            
            {/* Custom Interactive Academic Score Banner */}
            <div className="p-6 md:p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
              
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/15 uppercase tracking-widest">
                  <Star className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  Student Passport
                </span>
                <h2 className="text-3xl font-black text-white tracking-tight">
                  {text.welcome}
                </h2>
                <p className="text-slate-400 text-sm">{text.desc}</p>
                
                <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold pt-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-600" />
                  <span>{text.profileJoined} <strong className="text-slate-400">{new Date(user.joinedAt).toLocaleDateString(language === 'om' ? 'om-ET' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></span>
                </div>
              </div>

              {/* Dynamic stats values and circles */}
              <div className="flex items-center gap-6 bg-slate-950/40 p-5 rounded-2xl border border-slate-800/60 max-w-sm">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 shrink-0">
                  <Trophy className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <span className="text-slate-500 uppercase font-black text-[10px] tracking-wider block">{text.activeStats}</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl font-black text-white font-mono">{user.xp}</span>
                    <span className="text-xs font-semibold text-amber-400 font-mono">XP</span>
                  </div>
                  <span className="text-slate-400 text-[11px] font-medium block mt-1">
                    {language === 'om' 
                      ? `${user.completedLessons.length} Kutaa xumureetta` 
                      : `Successfully completed ${user.completedLessons.length} units`}
                  </span>
                </div>
              </div>
            </div>

            {/* Course cards collection matching exactly the requested outline but upgraded to state-of-the-art interactive items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
              {COURSES.map((course) => {
                const totalLessons = course.lessons.length;
                const completedCount = course.lessons.filter(l => user.completedLessons.includes(l.id)).length;
                const isCompletedAll = completedCount === totalLessons;
                const progressPercentage = Math.round((completedCount / totalLessons) * 100);

                return (
                  <div 
                    key={course.id}
                    className="bg-slate-900/40 border border-slate-800 hover:border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px]"
                  >
                    {/* Visual Banner */}
                    <div className="relative h-44 overflow-hidden select-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10" />
                      <img 
                        src={course.image} 
                        alt={language === 'om' ? course.titleOm : course.titleEn}
                        className="w-full h-full object-cover transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-4 left-4 z-20 bg-blue-500 text-white text-[10px] uppercase font-black px-3 py-1 rounded-full shadow-lg shadow-blue-500/20">
                        {course.category}
                      </span>
                      {isCompletedAll && (
                        <span className="absolute top-4 right-4 z-20 bg-emerald-500 text-white text-[10px] uppercase font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      )}
                    </div>

                    {/* Description & Interactive Progress meter */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest block">
                          {text.lessonsCount.replace('{count}', String(totalLessons))}
                        </span>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {language === 'om' ? course.titleOm : course.titleEn}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {language === 'om' ? course.descOm : course.descEn}
                        </p>
                      </div>

                      <div className="space-y-4 pt-2">
                        {/* Custom progress tracker display */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 font-mono">
                            <span>{text.courseCompleted.replace('{done}', String(completedCount)).replace('{total}', String(totalLessons))}</span>
                            <span className="text-slate-300 font-mono">{progressPercentage}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>

                        <button 
                          onClick={() => setSelectedCourseId(course.id)}
                          className={`w-full h-12 rounded-2xl font-bold tracking-wide transition shadow-lg active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 border ${
                            isCompletedAll 
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-blue-400/10'
                          }`}
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>{isCompletedAll ? text.allLessonsComp : text.learningTrackBtn}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Structured Minimal footer matching user spec */}
      <footer className="bg-slate-950/40 text-center py-5 text-[10px] md:text-xs text-slate-600 border-t border-slate-900/60 font-semibold tracking-wide">
        {text.footer}
      </footer>
    </div>
  );
}
