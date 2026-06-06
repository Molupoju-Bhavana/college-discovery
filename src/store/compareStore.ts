import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompareStore {
  compareIds: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      compareIds: [],

      addToCompare: (id) => {
        const { compareIds } = get();
        if (compareIds.length >= 3) return;
        if (compareIds.includes(id)) return;
        set({ compareIds: [...compareIds, id] });
      },

      removeFromCompare: (id) => {
        set({ compareIds: get().compareIds.filter((c) => c !== id) });
      },

      clearCompare: () => set({ compareIds: [] }),

      isInCompare: (id) => get().compareIds.includes(id),
    }),
    { name: "college-compare" }
  )
);
