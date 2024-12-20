"use client";

import * as React from "react";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { customButtonSize, customButtonStyle, customButtonVariant } from "./customStyle";

interface CustomButtonProps extends ButtonProps {
  buttonVariants?: string; // เพิ่มพร็อปสำหรับการกำหนดคลาส buttonVariants
  customStyle?: keyof typeof customButtonStyle;
  customVariant?: keyof typeof customButtonVariant;
  customSize?: keyof typeof customButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  success?: boolean;
  successText?: string;
  animation?: "pulse" | "bounce" | "none";
}

const ButtonTheme: React.FC<CustomButtonProps> = ({
  buttonVariants: buttonVariantClass = "", // ใช้ค่าเริ่มต้นเป็นค่าว่าง
  customStyle = "submit" as keyof typeof customButtonStyle,
  customVariant = "primary" as keyof typeof customButtonVariant,
  customSize = "md",
  className,
  children,
  disabled,
  isLoading,
  loadingText,
  icon,
  iconPosition = "left",
  success,
  successText,
  animation = "none",
  ...props
}) => {
  const [showSuccess, setShowSuccess] = React.useState(false);

  React.useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const getAnimationClass = React.useCallback(() => {
    switch (animation) {
      case "pulse":
        return "hover:animate-pulse";
      case "bounce":
        return "hover:animate-bounce";
      default:
        return "";
    }
  }, [animation]);

  const renderContent = () => (
    <>
      {iconPosition === "left" && (isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : showSuccess ? <Check className="h-4 w-4" /> : icon)}
      <span>{isLoading ? loadingText || children : showSuccess ? successText || children : children}</span>
      {iconPosition === "right" && (isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : showSuccess ? <Check className="h-4 w-4" /> : icon)}
    </>
  );

  return (
    <Button
      className={cn(
        buttonVariants({ className: buttonVariantClass }), // ใช้ buttonVariants
        customButtonStyle[customStyle],
        customButtonVariant[customVariant],
        customButtonSize[customSize],
        getAnimationClass(),
        "relative inline-flex items-center justify-center gap-2 transition-all duration-200",
        (isLoading || disabled) && "opacity-70 cursor-not-allowed",
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {renderContent()}
    </Button>
  );
};

export default ButtonTheme;