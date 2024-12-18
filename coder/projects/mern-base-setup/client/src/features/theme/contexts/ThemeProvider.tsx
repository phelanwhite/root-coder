import React, { memo, useEffect } from "react";
import { useThemeStore } from "../stores/theme-store";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "");
    }
  }, [theme]);
  return <div>{children}</div>;
};

export default memo(ThemeProvider);
