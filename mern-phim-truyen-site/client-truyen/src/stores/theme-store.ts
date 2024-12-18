import { ThemeType } from "@/assets/types";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export const useThemeStore = create<ThemeType>()(
  devtools(
    persist(
      (set, get) => ({
        theme: false,
        toggle: () =>
          set({
            theme: !get().theme,
          }),
      }),
      {
        name: "themeStore",
        version: 1,
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
