import { Envelope } from "@/components/envelope";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifySendPage() {
  return (
    <div className="text-foreground text-center">
      <div className="flex flex-col items-center max-w-[560px] p-4">
        <div className="size-52 md:size-60">
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
          <Button className="h-12 rounded-full p-6">Resend Verification</Button>
          <span className="text-xs text-foreground/40 font-semibold">OR</span>
          <Button variant="link" className="h-fit p-0">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
