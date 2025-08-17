import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

function SignOutLink() {
  return (
    <SignOutButton>
      <button className="w-full flex items-center gap-2">
        <LogOut className="w-4 h-4" /> Logout
      </button>
    </SignOutButton>
  );
}
export default SignOutLink;
