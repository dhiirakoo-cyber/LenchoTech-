/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, CheckCircle2, PlayCircle, Terminal, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Language, Course, Lesson, UserProfile } from '../types';

interface CourseViewerProps {
  course: Course;
  language: Language;
  onBack: () => void;
  user: UserProfile;
  onLessonCompleted: (lessonId: string) => Promise<void>;
}

export const CourseViewer: React.FC<CourseViewerProps> = ({
  course,
  language,
  onBack,
  user,
  onLessonCompleted
}) => {
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const activeLesson = course.lessons[activeLessonIndex] || course.lessons[0];

  // Code editor states
  const [sandboxCode, setSandboxCode] = useState(activeLesson.codeSnippet || '');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [runningCode, setRunningCode] = useState(false);

  // Quiz states
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState<boolean | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string>('');

  // Sync sandbox code when switching lessons
  useEffect(() => {
    setSandboxCode(activeLesson.codeSnippet || '');
    setConsoleOutput([]);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setQuizIsCorrect(null);
    setQuizFeedback('');
  }, [activeLessonIndex, activeLesson]);

  const isCompleted = (lessonId: string) => {
    return user.completedLessons.includes(lessonId);
  };

  // Translations
  const text = {
    om: {
      backBtn: 'Gara Kooziiwwanii Deebi\'uuf',
      duration: 'Yeroo Barumsaa:',
      lessons: 'Kutaa Barnootaa',
      codeTitle: 'Shaakala Hojii / Interactive Workspace Preview',
      codeBtn: 'Koodii Mijeessi / Run Code',
      codePlaceholder: 'Asirratti koodii kee barreessi shaakali...',
      quizTitle: 'Miseensa Shaakalaa (Lesson Quiz Check)',
      quizSubmit: 'Deebii Ergii',
      quizCorrect: 'Siriidhha bro! Deebii kee nimirkaneessine. (+25 XP)',
      quizIncorrect: 'Dogoggorameetta! Ammoo yaali.',
      markComplete: 'Barnoota Kana Xumureera',
      alreadyComplete: 'Kutaan kuni duraan goolabameera',
      nextLesson: 'Barnoota Itti Aanutti Darbi',
      compilesuccess: 'Koodiin kee milkiidhaan raawwatameera! Console iftoomsuu...',
      terminalTitle: 'Galmee Ba\'insaa (Terminal output)',
      emptyConsole: 'Koodii mijeessi ba\'insa terminal asitti ilaali.'
    },
    en: {
      backBtn: 'Return to Courses',
      duration: 'Course Length:',
      lessons: 'Lessons Curriculum',
      codeTitle: 'Interactive Workspace Preview',
      codeBtn: 'Execute & Compile',
      codePlaceholder: 'Write your sandbox code here directly...',
      quizTitle: 'Knowledge Assessment Quiz',
      quizSubmit: 'Verify Answer',
      quizCorrect: 'Absolutely Correct! Keep pushing! (+25 XP)',
      quizIncorrect: 'Incorrect option. Try reviewing the lesson text and retry.',
      markComplete: 'Complete Lesson & Claims XP',
      alreadyComplete: 'You have already completed this lesson',
      nextLesson: 'Advance to Next Lesson',
      compilesuccess: 'Code compiled and executed sequentially inside browser runtime!',
      terminalTitle: 'Terminal Log Panel',
      emptyConsole: 'Click compile to observe JavaScript variables or simulated HTML trees.'
    }
  }[language];

  const handleRunCode = () => {
    setRunningCode(true);
    setConsoleOutput([]);
    
    setTimeout(() => {
      const logs: string[] = [];
      logs.push(`[${new Date().toLocaleTimeString()}] ${text.compilesuccess}`);
      
      // Simple code execution simulation
      if (sandboxCode.includes('console.log')) {
        const matches = sandboxCode.matchAll(/console\.log\(([^)]+)\)/g);
        for (const match of matches) {
          try {
            // Attempt simple parsing of arguments
            const inner = match[1].trim();
            if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
              logs.push(`> ${inner.slice(1, -1)}`);
            } else {
              logs.push(`> ${inner}`);
            }
          } catch {
            logs.push(`> Raw Log Output`);
          }
        }
      } else if (sandboxCode.includes('<!DOCTYPE html>')) {
        logs.push(`> Initialized responsive HTML Sandbox Frame.`);
        logs.push(`> Rendered visual tags successfully.`);
        if (sandboxCode.includes('<h1>')) {
          const h1Text = sandboxCode.match(/<h1>(.*?)<\/h1>/);
          if (h1Text) logs.push(`> Heading 1: "${h1Text[1]}"`);
        }
      } else {
        logs.push(`> Executed code block cleanly in 12ms.`);
      }

      setConsoleOutput(logs);
      setRunningCode(false);
    }, 600);
  };

  const handleQuizSubmit = () => {
    if (!selectedQuizOption) return;

    const actualAnswer = language === 'om' ? activeLesson.quizAnswerOm : activeLesson.quizAnswerEn;
    const correct = selectedQuizOption === actualAnswer;
    
    setQuizIsCorrect(correct);
    setQuizSubmitted(true);
    setQuizFeedback(correct ? text.quizCorrect : text.quizIncorrect);
  };

  const handleMarkComplete = async () => {
    await onLessonCompleted(activeLesson.id);
  };

  const handleNextLesson = () => {
    if (activeLessonIndex < course.lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    }
  };

  const activeQuizQuestion = language === 'om' ? activeLesson.quizQuestionOm : activeLesson.quizQuestionEn;
  const activeQuizOptions = language === 'om' ? activeLesson.quizOptionsOm : activeLesson.quizOptionsEn;

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8 flex flex-col gap-6">
      {/* Back to courses navigation header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl text-slate-300 transition-all active:scale-95 cursor-pointer flex items-center justify-center border border-slate-700/50"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/15">
              {course.category}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              {language === 'om' ? course.titleOm : course.titleEn}
            </h2>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-400 text-xs font-semibold bg-slate-800/30 px-3.5 py-2 rounded-xl border border-slate-800/60">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>{text.duration} <strong className="text-white">{course.duration}</strong></span>
        </div>
      </div>

      {/* Workspace columns */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Sidebar: Lesson List */}
        <div className="w-full lg:w-80 shrink-0 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 lg:sticky lg:top-24">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 px-1">
            {text.lessons}
          </h3>
          <div className="space-y-1.5 max-h-[300px] lg:max-h-[500px] overflow-y-auto pr-1">
            {course.lessons.map((lesson, idx) => {
              const active = idx === activeLessonIndex;
              const completed = isCompleted(lesson.id);
              const isSelectedBg = active 
                ? 'bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-indigo-600/5 border-l-2 border-l-indigo-500 bg-slate-800/50 border-slate-600/70 text-white font-semibold' 
                : 'bg-slate-950/20 hover:bg-slate-800/30 border-transparent text-slate-400 hover:text-slate-200 border-l-2 border-l-transparent';

              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonIndex(idx)}
                  className={`w-full p-3.5 rounded-xl border text-left transition flex items-center justify-between gap-3 group cursor-pointer focus:outline-none ${isSelectedBg}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-6 h-6 rounded-lg text-[10px] font-mono flex items-center justify-center font-bold ${active ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'}`}>
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <span className="block text-xs font-bold leading-tight truncate">
                        {language === 'om' ? lesson.titleOm : lesson.titleEn}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                        <Clock className="w-3 h-3 text-slate-600" />
                        {lesson.duration}
                      </span>
                    </div>
                  </div>

                  {completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0 group-hover:border-slate-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Pane: Explanations, Sandbox Editor and Quiz checks */}
        <div className="flex-1 w-full space-y-6">
          {/* Main info card */}
          <div className="bg-slate-900/30 border border-slate-800/70 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-4">
              <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Lesson {activeLessonIndex + 1} of {course.lessons.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {language === 'om' ? activeLesson.summaryOm : activeLesson.summaryEn}
              </span>
            </div>

            {/* Markdown simulated HTML explanation view */}
            <h1 className="text-2xl mt-2 font-black text-white leading-tight">
              {language === 'om' ? activeLesson.titleOm : activeLesson.titleEn}
            </h1>

            {/* Structured text parser / layout render */}
            <div className="prose prose-invert mt-6 max-w-none text-slate-300 text-sm md:text-base leading-relaxed space-y-4">
              {(language === 'om' ? activeLesson.contentOm : activeLesson.contentEn)
                .split('\n\n')
                .map((paragraph, pIdx) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;

                  // Handle headers
                  if (trimmed.startsWith('###')) {
                    return <h3 key={pIdx} className="text-lg font-bold text-white mt-6 mb-2">{trimmed.replace('###', '').trim()}</h3>;
                  }
                  if (trimmed.startsWith('####')) {
                    return <h4 key={pIdx} className="text-sm font-bold text-indigo-300 mt-4 mb-2 tracking-wide uppercase">{trimmed.replace('####', '').trim()}</h4>;
                  }

                  // Handle Lists
                  if (trimmed.startsWith('1.') || trimmed.startsWith('*')) {
                    return (
                      <ul key={pIdx} className="list-disc list-inside space-y-1.5 text-slate-300 bg-slate-950/20 p-4 rounded-xl border border-slate-800/40 my-3">
                        {trimmed.split('\n').map((li, lIdx) => (
                          <li key={lIdx} className="text-xs md:text-sm pl-1">
                            {li.replace(/^\d+\.\s*/, '').replace(/^\*\s*/, '').trim()}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  // Handle Pre-formatted Code blocks
                  if (trimmed.startsWith('```')) {
                    const cleanCode = trimmed.replace(/```[a-z]*/g, '').trim();
                    return (
                      <pre key={pIdx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-xs overflow-x-auto text-emerald-400/90 leading-normal my-4">
                        <code>{cleanCode}</code>
                      </pre>
                    );
                  }

                  return <p key={pIdx} className="text-slate-300 leading-relaxed font-normal">{trimmed}</p>;
                })}
            </div>
          </div>

          {/* Interactive Code playground preview */}
          {activeLesson.codeSnippet && (
            <div className="bg-slate-900/30 border border-slate-800/70 rounded-2xl overflow-hidden">
              <div className="bg-slate-950/80 border-b border-slate-800/80 px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{text.codeTitle}</span>
                </div>
                <button
                  onClick={handleRunCode}
                  disabled={runningCode}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition active:scale-95 cursor-pointer border border-indigo-400/10 focus:outline-none"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>{text.codeBtn}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Editor textarea */}
                <div className="p-4 bg-slate-950 font-mono text-sm leading-relaxed text-indigo-100 flex flex-col relative h-[250px] md:h-[300px]">
                  <textarea
                    value={sandboxCode}
                    onChange={(e) => setSandboxCode(e.target.value)}
                    placeholder={text.codePlaceholder}
                    className="w-full h-full bg-transparent resize-none border-none outline-none text-xs text-indigo-200/90 focus:ring-0 leading-normal font-mono"
                  />
                  <div className="absolute right-3 bottom-3 text-[10px] text-slate-600 select-none">
                    JavaScript / HTML Sandbox
                  </div>
                </div>

                {/* Console output logger */}
                <div className="p-4 bg-slate-950/50 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-between h-[250px] md:h-[300px]">
                  <div className="space-y-1 overflow-y-auto max-h-full font-mono text-[11px] leading-relaxed">
                    <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800/80 pb-1 mb-2">
                      {text.terminalTitle}
                    </span>
                    {consoleOutput.length === 0 ? (
                      <span className="text-slate-600 block italic pt-2">{text.emptyConsole}</span>
                    ) : (
                      consoleOutput.map((log, lIdx) => {
                        const isMain = log.startsWith('[');
                        return (
                          <span key={lIdx} className={`block ${isMain ? 'text-indigo-400' : 'text-emerald-300 font-bold'}`}>
                            {log}
                          </span>
                        );
                      })
                    )}
                  </div>
                  {consoleOutput.length > 0 && (
                    <button
                      onClick={() => setConsoleOutput([])}
                      className="text-slate-600 hover:text-slate-400 transition self-end text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 mt-2 focus:outline-none"
                    >
                      <RefreshCw className="w-3 h-3" /> Clear Console
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Interactive Multiple Choice Quiz */}
          {activeQuizQuestion && activeQuizOptions && (
            <div className="bg-slate-900/30 border border-slate-800/70 rounded-2xl p-5 md:p-6">
              <h4 className="text-xs font-black text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 leading-none">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                {text.quizTitle}
              </h4>
              <p className="text-white text-sm md:text-base font-bold mb-4">{activeQuizQuestion}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {activeQuizOptions.map((option) => {
                  const isSelected = selectedQuizOption === option;
                  const isAnswerInput = isSelected 
                    ? 'border-indigo-500 bg-indigo-500/10 text-white' 
                    : 'border-slate-800 bg-slate-950/20 hover:bg-slate-800/30 text-slate-300 hover:border-slate-700';

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={quizSubmitted && quizIsCorrect === true}
                      onClick={() => {
                        setSelectedQuizOption(option);
                        setQuizSubmitted(false);
                        setQuizIsCorrect(null);
                        setQuizFeedback('');
                      }}
                      className={`w-full p-3.5 border rounded-xl text-left transition text-xs font-medium focus:outline-none flex items-center justify-between gap-2 cursor-pointer ${isAnswerInput}`}
                    >
                      <span>{option}</span>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-indigo-400 bg-indigo-500' : 'border-slate-700'}`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="button"
                  disabled={!selectedQuizOption || (quizSubmitted && quizIsCorrect === true)}
                  onClick={handleQuizSubmit}
                  className="bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/30 disabled:text-slate-600 border border-slate-700 hover:border-slate-500 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition cursor-pointer"
                >
                  {text.quizSubmit}
                </button>

                {quizSubmitted && (
                  <div className={`p-2 px-3 rounded-xl border text-xs font-bold inline-flex items-center gap-1.5 ${quizIsCorrect ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    {quizIsCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
                    <span>{quizFeedback}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action bottom drawer: Mark as Complete / Next lesson controls */}
          <div className="bg-slate-900/30 border border-slate-800/70 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={handleMarkComplete}
              disabled={isCompleted(activeLesson.id)}
              className={`w-full sm:w-auto px-6 h-12 text-xs md:text-sm font-black rounded-2xl transition-all shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2 border ${
                isCompleted(activeLesson.id)
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-emerald-400/10 text-white shadow-emerald-500/5'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted(activeLesson.id) ? text.alreadyComplete : text.markComplete}</span>
            </button>

            {activeLessonIndex < course.lessons.length - 1 && (
              <button
                onClick={handleNextLesson}
                className="w-full sm:w-auto px-6 h-12 bg-slate-850 hover:bg-slate-800 text-slate-100 text-xs md:text-sm font-bold rounded-2xl transition border border-slate-700/60 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{text.nextLesson}</span>
                <span className="font-extrabold font-mono">→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
