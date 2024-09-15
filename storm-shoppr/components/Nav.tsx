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
             <button className="bg-white text-gray-500 font-bold py-2 px-6 rounded-full hover:bg-gray-100">
               Sign In
             </button>
           </SignInButton>
           <SignUpButton mode="modal" afterSignUpUrl="/form">
             <button className="bg-white text-gray-500 font-bold py-2 px-6 rounded-full hover:bg-gray-100">
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
               userButtonAvatarBox: "w-8 h-8",
               userButton: "bg-white text-gray-500 font-bold py-2 px-6 rounded-full hover:bg-gray-100",
             },
           }}
         />
       )}
     </div>
   );
 }


 return (
   <div className={`fixed w-full flex justify-between items-center p-4 z-50 bg-white border border-white/20 rounded-lg shadow-lg ${!isAuthenticated || isLoading
   ? 'backdrop-blur-md bg-white/30'
   : 'bg-white'}`}>
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
