"use client";

import { User, Settings, Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutLink from "./SignOutLink";
import SignInLink from "./SignInLink";
import Link from "next/link";

export default function Profile() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded)
    return (
      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition">
        <User className="w-5 h-5" />
        <span className="hidden sm:inline font-medium">Loading...</span>
      </button>
    );

  return isSignedIn ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none select-none" asChild>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition">
          <User className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">{user?.username}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 bg-background shadow-lg border border-border rounded-md p-2"
      >
        <Link href={"/profile"}>
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-muted rounded-md transition">
            <User className="w-4 h-4" /> My Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="flex items-center gap-2 hover:bg-muted rounded-md transition">
          <Heart className="w-4 h-4" /> Favorites
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 hover:bg-muted rounded-md transition">
          <Settings className="w-4 h-4" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 border-border" />

        <DropdownMenuItem className="hover:bg-muted rounded-md transition">
          <SignOutLink />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <SignInLink/>
  );
}
