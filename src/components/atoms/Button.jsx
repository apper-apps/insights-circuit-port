import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className = "", 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white",
    success: "bg-gradient-to-r from-accent to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary",
    ghost: "text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;