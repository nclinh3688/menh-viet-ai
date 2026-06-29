import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const MVButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        className={cn("h-12 rounded-xl shadow-lg shadow-primary/15", className)}
        ref={ref}
        {...props}
      />
    );
  },
);

MVButton.displayName = "MVButton";
