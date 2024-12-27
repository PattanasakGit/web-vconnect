export const customButtonStyle = {
  // Primary actions
  primary: `
      bg-blue-600 text-white
      hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 
      active:bg-blue-800 active:shadow-inner active:translate-y-0.5
      focus:ring focus:ring-blue-300 
      transform transition-all duration-150 ease-in-out
      dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700 dark:focus:ring-blue-400
    `,

  secondary: `
      bg-gray-100 text-gray-800
      hover:bg-gray-200 hover:shadow-md hover:-translate-y-0.5
      active:bg-gray-300 active:shadow-inner active:translate-y-0.5
      focus:ring focus:ring-gray-300
      transform transition-all duration-150 ease-in-out
      dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:active:bg-gray-800 dark:focus:ring-gray-500
    `,

  success: `
      bg-green-500 text-white
      hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5
      active:bg-green-700 active:shadow-inner active:translate-y-0.5
      focus:ring focus:ring-green-300
      transform transition-all duration-150 ease-in-out
      dark:bg-green-400 dark:hover:bg-green-500 dark:active:bg-green-600 dark:focus:ring-green-400
    `,

  danger: `
      bg-red-500 text-white
      hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5
      active:bg-red-700 active:shadow-inner active:translate-y-0.5
      focus:ring focus:ring-red-300
      transform transition-all duration-150 ease-in-out
      dark:bg-red-400 dark:hover:bg-red-500 dark:active:bg-red-600 dark:focus:ring-red-400
    `,

  warning: `
      bg-yellow-500 text-black
      hover:bg-yellow-600 hover:shadow-lg hover:-translate-y-0.5
      active:bg-yellow-700 active:shadow-inner active:translate-y-0.5
      focus:ring focus:ring-yellow-300
      transform transition-all duration-150 ease-in-out
      dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:active:bg-yellow-600 dark:focus:ring-yellow-400
    `,

  info: `
      bg-cyan-500 text-white
      hover:bg-cyan-600 hover:shadow-lg hover:-translate-y-0.5
      active:bg-cyan-700 active:shadow-inner active:translate-y-0.5
      focus:ring focus:ring-cyan-300
      transform transition-all duration-150 ease-in-out
      dark:bg-cyan-400 dark:hover:bg-cyan-500 dark:active:bg-cyan-600 dark:focus:ring-cyan-400
    `,

  light: `
      bg-white text-gray-700 border border-gray-300
      hover:bg-gray-100 hover:shadow-md hover:-translate-y-0.5
      active:bg-gray-200 active:shadow-inner active:translate-y-0.5
      transform transition-all duration-150 ease-in-out
      dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:active:bg-gray-900 dark:border-gray-600
    `,

    dark: `
      backdrop-filter backdrop-blur-sm bg-[#000000] text-white hover:bg-opacity-80
      shadow-sm hover:bg-[#000000] hover:shadow-xl hover:-translate-y-0.5
      active:bg-opacity-50 active:shadow-inner active:translate-y-0.5
      transform transition-all duration-150 ease-in-out
      dark:text-white dark:hover:bg-[#000000] dark:active:bg-gray-900
    `,

  transparent: `
      bg-transparent text-gray-800
      hover:bg-gray-100 hover:shadow-md hover:-translate-y-0.5
      active:bg-gray-200 active:shadow-inner active:translate-y-0.5
      transform transition-all duration-150 ease-in-out
      dark:text-white dark:hover:bg-gray-800 dark:active:bg-gray-900
    `,
  blur: `
      backdrop-filter backdrop-blur-sm bg-white bg-opacity-30 text-gray-800 hover:bg-opacity-40
      shadow-sm hover:bg-gray-100 hover:shadow-md hover:-translate-y-0.5
      active:bg-gray-200 active:shadow-inner active:translate-y-0.5
      transform transition-all duration-150 ease-in-out
      dark:text-white dark:hover:bg-gray-800 dark:active:bg-gray-900
    `,

  gradientBlue: `
      bg-gradient-to-r from-blue-500 to-blue-700 text-white
      hover:from-blue-600 hover:to-blue-800 hover:shadow-lg hover:-translate-y-0.5
      active:from-blue-700 active:to-blue-900 active:shadow-inner active:translate-y-0.5
      focus:ring focus:ring-blue-300
      transform transition-all duration-150 ease-in-out
      dark:from-blue-400 dark:to-blue-600 dark:hover:from-blue-500 dark:hover:to-blue-700
    `,

  gradientPurple: `
      bg-gradient-to-r from-purple-500 to-purple-700 text-white
      hover:from-purple-600 hover:to-purple-800 hover:shadow-lg hover:-translate-y-0.5
      active:from-purple-700 active:to-purple-900 active:shadow-inner active:translate-y-0.5
      focus:ring focus:ring-purple-300
      transform transition-all duration-150 ease-in-out
      dark:from-purple-400 dark:to-purple-600 dark:hover:from-purple-500 dark:hover:to-purple-700
    `,

  disabled: `
      bg-gray-200 text-gray-400 cursor-not-allowed
      transform transition-all duration-150 ease-in-out
      dark:bg-gray-700 dark:text-gray-500
    `,
};

export const customButtonVariant = {
  // Basic variants combining style and functionality
  solid: "font-semibold shadow-sm transition-all duration-200",
  outline: "border-2 bg-transparent transition-all duration-200",
  ghost: "bg-transparent transition-all duration-200 border-2",
  link: "bg-transparent underline-offset-4 hover:underline transition-all duration-200",
  soft: "bg-opacity-15 transition-all duration-200",

  // Special states
  loading: "cursor-wait opacity-70",
  disabled: "opacity-50 cursor-not-allowed pointer-events-none",
  active: "transform scale-95",

  // Icon button variants
  iconOnly: "p-0 flex items-center justify-center",
  iconLeft: "flex items-center gap-2",
  iconRight: "flex items-center gap-2",

  // Shape variants
  rounded: "rounded-full",
  square: "rounded-none",
  pill: "rounded-full px-6",
};

export const customButtonSize = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-5 text-base",
  lg: "px-6 py-8 text-lg",
  xl: "px-8 py-10 text-xl",
  full: "w-full",
  pill: "px-6 py-2 text-base rounded-full", // Circular edges
  iconSmall: "p-1 h-8 w-8", // Small icon button
  iconLarge: "p-2 h-12 w-12", // Large icon button
};
