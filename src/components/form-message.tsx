import { cn } from "@/lib/utils";
import React from "react";

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: string;
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, error, ...props }, ref) => {
    if (!error) {
      return null;
    }

    return (
      <p
        ref={ref}
        className={cn("text-[0.8rem] font-medium text-destructive", className)}
        {...props}
      >
        {error}
      </p>
    );
  },
);

FormMessage.displayName = "FormMessage";

export { FormMessage };
