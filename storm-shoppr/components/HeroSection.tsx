"use client";

import { SignInButton } from "@clerk/clerk-react";

export default function HeroSection() {
  return (
    <section className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}>
      <div className="container mx-auto">
        {/* Glassmorphism Container */}
        <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-lg p-10 shadow-lg text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">Welcome to Storm Shoppr</h1>
          <p className="text-xl mb-6 text-white">
            Find your favorite products at the best prices, all in one place.
          </p>
          <div className="flex justify-center">
            <SignInButton mode="modal">
              <button className="bg-white text-blue-500 font-bold py-3 px-8 rounded-full hover:bg-gray-100">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    </section>
  );
}