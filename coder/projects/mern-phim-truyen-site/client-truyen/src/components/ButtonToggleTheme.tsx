import { useThemeStore } from "@/stores/theme-store";
import clsx from "clsx";
import React, { memo } from "react";

const ButtonToggleTheme = () => {
  const { theme, toggle } = useThemeStore();

  return (
    <div
      onClick={toggle}
      className="relative bg-gray-300 h-6 w-12 rounded-full cursor-pointer"
    >
      <span
        className={clsx(
          "absolute top-1 w-4 h-4 rounded-full bg-white transition",
          theme ? `left-1` : `right-1`
        )}
      ></span>
    </div>
  );
};

export default memo(ButtonToggleTheme);
