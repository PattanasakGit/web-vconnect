"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark";
  value?: {
    light: string;
    dark: string;
  };
}

export const ThemeProviderWrapper = ({
  children,
  defaultTheme = "light",
  value = { light: "light", dark: "dark" },
}: ThemeProviderWrapperProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme={defaultTheme} value={value}>
      {children}
    </ThemeProvider>
  );
};
