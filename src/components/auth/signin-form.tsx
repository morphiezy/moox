import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { InputPassword } from "../input-password";
import Link from "next/link";
import { Button } from "../ui/button";

export function SignInForm() {
  return (
    <form>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@moox.com"
            required
          />
        </div>
        <div className="grid gap-2.5">
          <Label htmlFor="password">Password</Label>
          <InputPassword
            id="password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <Link href="#" className="ml-auto inline-block text-sm underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full mt-4">
          Login
        </Button>
        <div className="relative flex items-center w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border"></span>
          </div>
          <div className="relative w-full flex justify-center">
            <span className="uppercase inline-block py-2 px-4 bg-background text-xs text-muted-foreground">
              or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline">
          Sign up
        </Link>
      </div>
    </form>
  );
}
