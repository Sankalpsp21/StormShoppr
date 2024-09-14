"use client";

import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

export function SignInOrComposer() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  return isAuthenticated ? (
    <p>
      You are signed in!
    </p>
  ) : (
    <div className="composer">
      <div>{isLoading ? <button disabled>...</button> : <SignInButton />}</div>
      <div className="h-1"></div>
    </div>
  );
}
