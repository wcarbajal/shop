import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  categoryName:string

  // Methods
  setCategory: (categorySelected: string) => void;
}

export const useCategoryStore = create<State>()(
  persist(
    (set, get) => ({
      categoryName: "",

      setCategory: (categorySelected) => {
        set({ categoryName: categorySelected });
      },
    }),
    {
      name: "category-storage",
    }
  )
);
