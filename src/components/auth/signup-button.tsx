"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";

export function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" className="w-full mt-4">
      {!!pending && (
        <LoaderCircle className="mr-2 size-4 text-foreground animate-spin stroke-[3.5px]" />
      )}
      Create an account
    </Button>
  );
}
