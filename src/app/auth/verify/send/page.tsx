"use client";

import Link from "next/link";
import { User } from "@prisma/client";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Envelope } from "@/components/envelope";
import { Button } from "@/components/ui/button";
import { emailSchema } from "@/lib/validation";
import { handleResendVerification } from "@/lib/actions/auth";
import { toast } from "@/components/ui/use-toast";
import { findUserByEmail } from "@/lib/actions/user";

export default function VerifySendPage() {
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const validation = emailSchema.safeParse(email);

  const resendVerification = async () => {
    setLoading(true);

    try {
      const user = await findUserByEmail(email as string);
      await handleResendVerification(user as User);

      toast({
        title: "Verification email sent.",
        description: "Check your email for the verification link.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Failed to send verification email. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-foreground text-center">
      <div className="flex flex-col items-center max-w-[560px] p-4">
        <div className="size-48 md:size-52 lg:size-60">
          <Envelope />
        </div>
        <div className="space-y-2.5">
          <h1 className="text-2xl md:text-3xl font-bold">Verify Your Email</h1>
          <p className="text-base font-normal opacity-60 leading-7">
            Please click on the link that has just been sent to your email
            address to verify your account
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4 mt-10">
          {validation.success && (
            <>
              <Button
                disabled={loading}
                className="h-12 rounded-full p-6"
                onClick={resendVerification}
              >
                {loading && (
                  <LoaderCircle className="mr-2 size-4 text-foreground animate-spin stroke-[3.5px]" />
                )}
                Resend Verification
              </Button>
              <span className="text-xs text-foreground/40 font-semibold">
                OR
              </span>
            </>
          )}
          <Button variant="link" className="h-fit p-0">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
