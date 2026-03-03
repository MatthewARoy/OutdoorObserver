import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lesson } from '@/src/types';
import { mockLessons } from '@/src/data/mockLessons';

export interface LessonProgress {
  lessonId: string;
  currentTaskIndex: number;
  completedTaskIds: string[];
  isCompleted: boolean;
}

interface LessonState {
  lessons: Lesson[];
  progress: Record<string, LessonProgress>;
  activeLessonId: string | null;

  selectLesson: (lessonId: string) => void;
  advanceTask: (lessonId: string) => void;
  completeTask: (lessonId: string, taskId: string) => void;
  completeLesson: (lessonId: string) => void;
  resetLesson: (lessonId: string) => void;
}

const DEFAULT_PROGRESS: LessonProgress = {
  lessonId: '',
  currentTaskIndex: 0,
  completedTaskIds: [],
  isCompleted: false,
};

export const useLessonStore = create<LessonState>()(
  persist(
    (set) => ({
      lessons: mockLessons,
      progress: {},
      activeLessonId: null,

      selectLesson: (lessonId) => set({ activeLessonId: lessonId }),

      advanceTask: (lessonId) =>
        set((state) => {
          const lesson = state.lessons.find((l) => l.id === lessonId);
          if (!lesson) return state;
          const current = state.progress[lessonId] || { ...DEFAULT_PROGRESS, lessonId };
          const nextIndex = Math.min(current.currentTaskIndex + 1, lesson.tasks.length - 1);
          return {
            progress: {
              ...state.progress,
              [lessonId]: { ...current, currentTaskIndex: nextIndex },
            },
          };
        }),

      completeTask: (lessonId, taskId) =>
        set((state) => {
          const current = state.progress[lessonId] || { ...DEFAULT_PROGRESS, lessonId };
          if (current.completedTaskIds.includes(taskId)) return state;
          return {
            progress: {
              ...state.progress,
              [lessonId]: {
                ...current,
                completedTaskIds: [...current.completedTaskIds, taskId],
              },
            },
          };
        }),

      completeLesson: (lessonId) =>
        set((state) => {
          const current = state.progress[lessonId] || { ...DEFAULT_PROGRESS, lessonId };
          return {
            progress: {
              ...state.progress,
              [lessonId]: { ...current, isCompleted: true },
            },
          };
        }),

      resetLesson: (lessonId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [lessonId]: { ...DEFAULT_PROGRESS, lessonId },
          },
        })),
    }),
    {
      name: 'lesson-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ progress: state.progress }),
    }
  )
);
