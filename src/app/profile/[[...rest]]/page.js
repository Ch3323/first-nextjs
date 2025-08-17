"use client";

import {
  UserProfile,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";

function ProfilePage() {
  return (
    <div className="w-full min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <SignedIn>
        <div className="container flex justify-center items-center mx-auto rounded-lg shadow-md">
          <UserProfile
            routing="path"
            appearance={{
              elements: {
                card: "bg-card shadow-md rounded-lg p-4",
                headerTitle: "text-xl font-semibold text-foreground",
              },
            }}
          />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
export default ProfilePage;
