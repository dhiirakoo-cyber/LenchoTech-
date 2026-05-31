/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';

// Get credentials from env
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

// Detect if credentials are valid and non-placeholder
const hasRealSupabase = 
  supabaseUrl && 
  supabaseUrl !== 'https://kstpdibudowpxekwkekm.supabase.co' && // User placeholder
  supabaseAnonKey && 
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY' &&
  supabaseAnonKey !== '';

export const isMockSupabase = !hasRealSupabase;

// Real Client (initialized conditionally)
let realClient: any = null;
if (hasRealSupabase) {
  try {
    realClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('Failed to initialize real Supabase client:', err);
  }
}

// Full mock database implementation that resides in localStorage
const MOCK_USERS_KEY = 'amoo_academy_mock_users';
const CURRENT_MOCK_USER_KEY = 'amoo_academy_current_user';

// Prepopulate a test account out of the box
const initializeMockDb = () => {
  const existing = localStorage.getItem(MOCK_USERS_KEY);
  if (!existing) {
    const defaultUsers = [
      {
        email: 'dhiirakoo@gmail.com',
        password: 'password123',
        xp: 150,
        completedLessons: ['web-dev-1'],
        joinedAt: new Date().toISOString()
      },
      {
        email: 'student@amoo.com',
        password: 'password',
        xp: 0,
        completedLessons: [],
        joinedAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(defaultUsers));
  }
};

initializeMockDb();

// Beautiful wrapper to support unified API
export const supabaseClientWrapper = {
  isMock: !hasRealSupabase,
  
  async signInWithPassword({ email, password }: { email: string; password?: string }) {
    if (hasRealSupabase && realClient) {
      try {
        const { data, error } = await realClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return { data, error: null };
      } catch (err: any) {
        return { data: null, error: err };
      }
    }

    // Mock Login
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
        const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
        
        if (!user) {
          resolve({
            data: null,
            error: { message: 'N-101: Email kuni kuusaa ragaa keessa hin jiru. (Email not found. Use student@amoo.com / password or register a new account)' }
          });
          return;
        }

        if (password && user.password !== password) {
          resolve({
            data: null,
            error: { message: 'S-202: Jecha dabarsoo (password) dogoggora! (Incorrect password. Try "password")' }
          });
          return;
        }

        // Set active mock user session
        localStorage.setItem(CURRENT_MOCK_USER_KEY, JSON.stringify(user));
        resolve({
          data: { user: { email: user.email, ...user } },
          error: null
        });
      }, 750); // realistic network delay
    });
  },

  async signUp({ email, password }: { email: string; password?: string }) {
    if (hasRealSupabase && realClient) {
      try {
        const { data, error } = await realClient.auth.signUp({ email, password });
        if (error) throw error;
        return { data, error: null };
      } catch (err: any) {
        return { data: null, error: err };
      }
    }

    // Mock Signup
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
        const exists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());

        if (exists) {
          resolve({
            data: null,
            error: { message: 'Kuni kanaan dura galmaa\'ee jira! (An account with this email already exists)' }
          });
          return;
        }

        const newUser = {
          email,
          password: password || 'password',
          xp: 0,
          completedLessons: [],
          joinedAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
        localStorage.setItem(CURRENT_MOCK_USER_KEY, JSON.stringify(newUser));

        resolve({
          data: { user: { email, ...newUser } },
          error: null
        });
      }, 800);
    });
  },

  async signOut() {
    if (hasRealSupabase && realClient) {
      await realClient.auth.signOut();
      return;
    }
    localStorage.removeItem(CURRENT_MOCK_USER_KEY);
  },

  // Save lesson progress
  async markLessonCompleted(email: string, lessonId: string) {
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    const userIndex = users.findIndex((u: any) => u.email.toLowerCase() === email.toLowerCase());
    
    if (userIndex > -1) {
      const user = users[userIndex];
      if (!user.completedLessons.includes(lessonId)) {
        user.completedLessons.push(lessonId);
        user.xp += 50; // Earn 50 XP per completed lesson
        users[userIndex] = user;
        localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
        
        const currentUser = JSON.parse(localStorage.getItem(CURRENT_MOCK_USER_KEY) || '{}');
        if (currentUser.email && currentUser.email.toLowerCase() === email.toLowerCase()) {
          localStorage.setItem(CURRENT_MOCK_USER_KEY, JSON.stringify(user));
        }
      }
    }
  },

  getCurrentUserProgress(email: string) {
    const users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
    const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      return {
        completedLessons: user.completedLessons || [],
        xp: user.xp || 0
      };
    }
    return { completedLessons: [], xp: 0 };
  }
};
