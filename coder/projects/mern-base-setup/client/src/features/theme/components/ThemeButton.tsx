import React, { memo } from "react";
import { useThemeStore } from "../stores/theme-store";
import clsx from "clsx";

const ThemeButton = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        `h-6 w-12 inline-block p-1 rounded-full relative`,
        theme ? `bg-blue-500 ` : `bg-gray-100 `
      )}
    >
      <span
        className={clsx(
          `bg-white inline-block w-4 h-4 rounded-full absolute duration-300 shadow`,
          theme ? `top-1 right-1` : `top-1 left-1`
        )}
      ></span>
    </button>
  );
};

export default memo(ThemeButton);
