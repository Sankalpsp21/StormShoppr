"use client";
import { useConvexAuth } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

const Nav = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  function SignInAndSignUpButtons() {
    return (
      <div className="flex gap-4">
        {/* Loading Spinner */}
        {isLoading && <p>Loading...</p>}

        {/* If not authenticated and not loading, show Sign In and Sign Up buttons */}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal" afterSignInUrl="/form">
              <button className="bg-[#ff8a6f] text-white font-bold py-2 px-8 rounded-full hover:bg-[#ee6b4c] hover:text-white">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal" afterSignUpUrl="/form">
              <button className="bg-[#ff8a6f] text-white font-bold py-2 px-8 rounded-full hover:bg-[#ee6b4c] hover:text-white">
                Sign Up
              </button>
            </SignUpButton>
          </>
        )}

        {/* If authenticated, show User Button */}
        {isAuthenticated && !isLoading && (
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-6 h-6",
                userButton: "bg-[#ff8a6f] text-white font-bold py-5 px-16 rounded-full hover:bg-[#ee6b4c] hover:text-white",
              },
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={`fixed w-full flex justify-between items-center p-4 z-50 bg-white border border-white/20 rounded-lg shadow-lg ${
        !isAuthenticated || isLoading
          ? "backdrop-blur-md bg-white/30"
          : "bg-white"
      }`}
    >
      {/* Logo on the left */}
      <div>
        <img src="/logo.svg" alt="Logo" className="h-12" /> {/* Adjust height if necessary */}
      </div>

      {/* Sign In and Sign Up buttons on the right */}
      <div className="flex gap-4 items-center">
        <SignInAndSignUpButtons />
      </div>
    </div>
  );
};

export default Nav;
