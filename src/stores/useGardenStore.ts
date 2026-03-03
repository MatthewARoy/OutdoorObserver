import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GardenEntry, Plant } from '@/src/types';
import { mockGardenEntries } from '@/src/data/mockGarden';
import { mockPlants } from '@/src/data/mockPlants';

interface GardenState {
  entries: GardenEntry[];
  plants: Plant[];

  addEntry: (entry: Omit<GardenEntry, 'id' | 'collectedAt'>) => void;
  removeEntry: (entryId: string) => void;
  updateNotes: (entryId: string, notes: string) => void;
}

export const useGardenStore = create<GardenState>()(
  persist(
    (set) => ({
      entries: mockGardenEntries,
      plants: mockPlants,

      addEntry: (entry) =>
        set((state) => ({
          entries: [
            ...state.entries,
            {
              ...entry,
              id: `entry-${Date.now()}`,
              collectedAt: new Date().toISOString(),
            },
          ],
        })),

      removeEntry: (entryId) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== entryId),
        })),

      updateNotes: (entryId, notes) =>
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === entryId ? { ...e, personalNotes: notes } : e
          ),
        })),
    }),
    {
      name: 'garden-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ entries: state.entries }),
    }
  )
);
