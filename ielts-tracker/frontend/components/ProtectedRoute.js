import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../utils/auth";
import LoadingState from "./LoadingState";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="mx-auto mt-10 max-w-lg px-4">
        <LoadingState label="Checking your session..." />
      </div>
    );
  }

  return children;
}
