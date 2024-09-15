"use client";


import { SignInButton } from "@clerk/clerk-react";
import React from "react";


const HeroSection: React.FC = () => {
 return (
   <div
     className="h-screen flex items-center justify-center bg-cover bg-center"
     style={{
       backgroundImage: "url('/background.svg')"
     }}
   >
     {/* Glassmorphism Container */}
     <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl pt-24 pb-16 md:pt-52 md:pb-48 w-full md:w-10/12 shadow-lg text-center">
       <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-4 text-gray-700">
         WELCOME TO <br></br><span className="italic">STORM SHOPPR</span>
       </h1>


       <div className="h-1 w-1/4 mx-auto my-8 bg-gray-300 rounded"></div>


       <p className="text-lg md:text-3xl mb-6 text-gray-700">
         Predict natural disasters <span className="font-bold">EARLY</span> and stay ahead by purchasing supplies!
       </p>
       <div className="flex justify-center">
         <SignInButton mode="modal" afterSignInUrl="/form">
           <button className="bg-white text-gray-500 text-2xl font-bold py-5 px-20 rounded-full hover:bg-[#ee6b4c] hover:text-white">
             Sign In
           </button>
         </SignInButton>
       </div>
     </div>
   </div>
 );
};


export default HeroSection;
