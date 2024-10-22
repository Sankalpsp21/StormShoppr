"use client";

import '../app/globals.css'; 
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from 'convex/react';
import Link from 'next/link';
import React from "react";

const HeroSection: React.FC = () => {
  const stormText = "STORM"; // Initialize the word "STORM" as a variable
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/background.jpg')"
      }}
    >
      {/* Glassmorphism Container */}
      <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl pt-12 pb-12 w-full md:w-10/12 shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <img src="/icon.svg" alt="Icon" className="h-36 w-36" /> {/* Adjust size as needed */}
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-4 text-gray-700">
          <div>
            WELCOME TO <br />
            <span
              style={{
                backgroundImage: "url('/clouds.avif')",
                backgroundSize: 'cover',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 'bold',
                fontStyle: 'italic', // Italicize the text
              }}
            >
              {stormText} {/* Render the word "STORM" dynamically */}
            </span>
            <span className="italic"> SHOPPR</span>
          </div>
        </h1>

        <div className="h-1 w-1/4 mx-auto my-8 bg-white rounded"></div>

        <p className="text-lg md:text-2xl mb-6 text-gray-700">
          Predict natural disasters <span className="font-bold">EARLY</span> and stay ahead by purchasing supplies!
        </p>

        <div className="flex justify-center">
        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal" afterSignInUrl="/form">
            <button className="bg-[#ff8a6f] text-white text-lg font-bold py-5 px-20 rounded-full hover:bg-[#ee6b4c] hover:text-white">
              Sign In
            </button>
          </SignInButton>
          )}
        {isAuthenticated && !isLoading && (
          <Link href="/dashboard">
            <button className="bg-[#ff8a6f] text-white text-lg font-bold py-5 px-20 rounded-full hover:bg-[#ee6b4c] hover:text-white">
              Continue
            </button>
          </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;