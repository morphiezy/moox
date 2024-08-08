"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input, InputProps } from "./ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [visible, setVisible] = React.useState<boolean>(false);

    return (
      <div className="relative">
        <Input
          className={cn("pr-10", className)}
          {...props}
          ref={ref}
          type={visible ? "text" : "password"}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setVisible(!visible)}
          className="absolute right-1.5 -translate-y-1/2 top-1/2 w-7 h-7 hover:bg-muted/50"
        >
          {visible ? (
            <EyeIcon className="h-4 w-4" />
          ) : (
            <EyeOffIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  },
);

InputPassword.displayName = "InputPassword";
