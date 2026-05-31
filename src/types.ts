/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'om' | 'en';

export interface UserProfile {
  email: string;
  isMock: boolean;
  xp: number;
  completedLessons: string[]; // lessonIds
  joinedAt: string;
}

export interface Lesson {
  id: string;
  titleOm: string;
  titleEn: string;
  duration: string;
  summaryOm: string;
  summaryEn: string;
  contentOm: string; // Markdown / explanatory text
  contentEn: string; // Markdown / explanatory text
  codeSnippet?: string; // interactive workspace or code snippet
  quizQuestionOm?: string;
  quizOptionsOm?: string[];
  quizAnswerOm?: string;
  quizQuestionEn?: string;
  quizOptionsEn?: string[];
  quizAnswerEn?: string;
}

export interface Course {
  id: string;
  titleOm: string;
  titleEn: string;
  descOm: string;
  descEn: string;
  category: string;
  image: string;
  duration: string;
  lessons: Lesson[];
}
