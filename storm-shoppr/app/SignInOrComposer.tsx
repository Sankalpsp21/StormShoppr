"use client";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

export function SignInOrComposer() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  return isAuthenticated ? (

    <div className="flex gap-4 bg-slate-400">
      <UserButton />
      <p>
        You are signed in!
      </p>
    </div>

  ) : (
    <div className="composer">
      <div>{isLoading ? <button disabled>...</button> : <SignInButton />}</div>
      <div className="h-1"></div>
    </div>
  );
}
