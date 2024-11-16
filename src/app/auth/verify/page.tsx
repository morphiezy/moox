import { verifyEmail } from "@/lib/actions/auth";
import { emailSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

interface VerifyPageProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function Verify({ searchParams }: VerifyPageProps) {
  const email = searchParams?.email;
  const token = searchParams?.token;

  if ((email && !emailSchema.safeParse(email).success) || !email || !token) {
    redirect("/");
  }

  const result = await verifyEmail(email, token);

  return (
    <div className="max-w-3xl p-4 text-center space-y-2">
      <h1 className="text-2xl font-semibold text-foreground">
        {result?.status ? "Verification Successful" : "Verification Failed"}
      </h1>
      <p className="text-foreground/60">{result?.message}</p>
    </div>
  );
}
