import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

function SignInLink() {
  return (
    <SignInButton>
      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition">
        <LogIn className="w-5 h-5" />
        <span className="hidden sm:inline font-medium">SignIn</span>
      </button>
    </SignInButton>
  );
}
export default SignInLink;
