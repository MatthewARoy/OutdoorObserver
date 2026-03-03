import { create } from 'zustand';

export type ARPhase =
  | 'camera_active'
  | 'identifying'
  | 'result_shown'
  | 'observing'
  | 'highlighting'
  | 'detail_view'
  | 'reflecting';

interface ARSessionState {
  phase: ARPhase;
  identifiedPlantId: string | null;
  revealedHighlights: string[];
  userGuess: string;
  userNotes: string;

  setPhase: (phase: ARPhase) => void;
  simulateIdentification: (plantId: string) => void;
  revealHighlight: (markerId: string) => void;
  setUserGuess: (guess: string) => void;
  setUserNotes: (notes: string) => void;
  resetSession: () => void;
}

export const useARSessionStore = create<ARSessionState>()((set) => ({
  phase: 'camera_active',
  identifiedPlantId: null,
  revealedHighlights: [],
  userGuess: '',
  userNotes: '',

  setPhase: (phase) => set({ phase }),

  simulateIdentification: (plantId) => {
    set({ phase: 'identifying' });
    setTimeout(() => {
      set({ phase: 'result_shown', identifiedPlantId: plantId });
    }, 2000);
  },

  revealHighlight: (markerId) =>
    set((state) => ({
      revealedHighlights: state.revealedHighlights.includes(markerId)
        ? state.revealedHighlights
        : [...state.revealedHighlights, markerId],
    })),

  setUserGuess: (guess) => set({ userGuess: guess }),
  setUserNotes: (notes) => set({ userNotes: notes }),

  resetSession: () =>
    set({
      phase: 'camera_active',
      identifiedPlantId: null,
      revealedHighlights: [],
      userGuess: '',
      userNotes: '',
    }),
}));
