"use client";

import ButtonTheme from "@/components/Button";
import { customButtonSize, customButtonStyle, customButtonVariant } from "@/components/Button/customStyle";
import { Home } from "lucide-react"; // ใช้ไอคอนจาก lucide-react

export default function Example() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Button Demo</h1>
      {/* Button Style Group */}
      <div className="space-y-10 mt-10">
        {Object.keys(customButtonStyle).map((style) => (
          <div key={style}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">{style} Style</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.keys(customButtonVariant).map((variant) => (
                <ButtonTheme
                  key={variant}
                  customStyle={style as keyof typeof customButtonStyle}
                  customVariant={variant as keyof typeof customButtonVariant}
                >
                  {variant}
                </ButtonTheme>
              ))}
            </div>
          </div>
        ))}
        
        {/* Button Sizes Group */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Button Sizes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.keys(customButtonSize).map((size) => (
              <ButtonTheme
                key={size}
                customStyle="submit"
                customSize={size as keyof typeof customButtonSize}
              >
                {size}
              </ButtonTheme>
            ))}
          </div>
        </div>

        {/* Button with Loading and Success State */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Button with Loading and Success State</h2>
          <div className="flex space-x-4">
            <ButtonTheme isLoading={true} loadingText="Loading...">
              Loading
            </ButtonTheme>
            <ButtonTheme success={true} successText="Success!">
              Success
            </ButtonTheme>
          </div>
        </div>

        {/* Button with Icon */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Button with Icon</h2>
          <div className="flex space-x-4">
            <ButtonTheme icon={<Home className="h-4 w-4" />} iconPosition="left">
              Left Icon
            </ButtonTheme>
            <ButtonTheme icon={<Home className="h-4 w-4" />} iconPosition="right">
              Right Icon
            </ButtonTheme>
          </div>
        </div>

        {/* Button with Animation */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Button with Animation</h2>
          <div className="flex space-x-4">
            <ButtonTheme animation="pulse">Pulse Animation</ButtonTheme>
            <ButtonTheme animation="bounce">Bounce Animation</ButtonTheme>
            <ButtonTheme animation="none">No Animation</ButtonTheme>
          </div>
        </div>
      </div>
    </div>
  );
}
