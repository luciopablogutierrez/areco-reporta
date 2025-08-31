
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Loader2 } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  button?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
  }
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, endIcon, button, ...props }, ref) => {
    const hasIcon = !!icon;
    const hasEndContent = !!endIcon || !!button;

    return (
      <div className="relative w-full">
        {hasIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-muted-foreground h-5 w-5">{icon}</span>
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            hasIcon && "pl-10",
            hasEndContent && "pr-12",
            button && "pr-32",
            className
          )}
          ref={ref}
          {...props}
        />
        {hasEndContent && (
           <div className="absolute inset-y-0 right-0 flex items-center pr-3">
             {button ? (
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm"
                  onClick={button.onClick}
                  disabled={button.disabled || button.loading}
                  className="h-7"
                >
                  {button.loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {button.label}
                </Button>
             ) : endIcon ? (
                <span className="text-muted-foreground h-5 w-5">{endIcon}</span>
             ) : null}
           </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
