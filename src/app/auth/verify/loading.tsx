import { Spinner } from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex items-center">
      <Spinner className="mr-2.5" />
      <p className="text-sm font-medium">Verifying email...</p>
    </div>
  );
}
