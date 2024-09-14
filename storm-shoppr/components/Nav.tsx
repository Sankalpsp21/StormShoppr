"use client";
import { useConvexAuth } from "convex/react";

import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

const Nav = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  function SignInAndSignUpButtons() {
    return (
      <div className="flex gap-4">
        {/* If the user is not authenticated, and is loading (i.e. we don't know if they are authenticated or not), show a loading spinner */}
        {isLoading && (
          <p>Loading</p>
        )}
        {/* If the user is not authenticated, and is not loading, show the sign in and sign up buttons */}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal" afterSignInUrl="/form">
              Sign In
            </SignInButton>
            <SignUpButton mode="modal" afterSignUpUrl="/form">
              Sign Up
            </SignUpButton>
          </>
        )}
        {/* If the user is authenticated, show the user buttons */}
        {isAuthenticated && !isLoading && <UserButton afterSignOutUrl="/" />}
      </div>
    );
  }

  return (
      <div className="flex justify-end items-center p-4 bg-slate-400">
        <div className="flex gap-4 items-center">
          <SignInAndSignUpButtons />
        </div>
      </div>
  );
};

export default Nav;