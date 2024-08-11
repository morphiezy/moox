import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/components/auth/signup-form";

export default function Register() {
  return (
    <Card className="mx-auto max-w-md w-full">
      <CardHeader>
        <div className="space-y-1 border-b pb-4">
          <CardTitle className="text-xl">Register</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-1">
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
