import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type Type = {
  theme: boolean;

  toggleTheme: () => void;
};

export const useThemeStore = create<Type>()(
  devtools(
    persist(
      (set, get) => ({
        theme: false,
        toggleTheme: () => set((state) => ({ theme: !state.theme })),
      }),
      {
        name: "theme",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
