export type TaskType = 'find' | 'interact' | 'observe' | 'animate' | 'reflect';

export interface HighlightArea {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
}

export interface LessonTask {
  id: string;
  order: number;
  type: TaskType;
  title: string;
  instruction: string;
  promptText?: string;
  highlightAreas?: HighlightArea[];
  resultText?: string;
  observationPrompt?: string;
  detailInfo?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnailUri: string;
  estimatedMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetPlantId: string;
  tasks: LessonTask[];
  badgesAwarded: string[];
}
