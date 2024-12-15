"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import SwitchComponent from "../Switch";
import { Sun01Icon, Moon02Icon } from "hugeicons-react";

const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSwitchChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex space-x-2">
      <SwitchComponent
        contentFront={<Sun01Icon className="text-lg" />}
        contentBack={<Moon02Icon className="text-lg" size={20} />}
        defaultChecked={resolvedTheme === "dark"}
        onChange={handleSwitchChange}
      />
    </div>
  );
};

export default ThemeSwitcher;