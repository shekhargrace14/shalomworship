import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

interface LoginRequiredModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginRequiredModal({
  open,
  onOpenChange,
}: LoginRequiredModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create an Account</DialogTitle>
          <DialogDescription>
            To create, edit, and manage your setlists, you'll need a Shalom
            Worship account.
            <br />
            <br />
            Sign in if you already have an account, or create a free account to
            get started.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col gap-2 sm:flex-row" onClick={() => onOpenChange(false)}>
          <Button asChild className="flex-1">
            <Link href="/auth/login">
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </Link>
          </Button>

          <Button asChild variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            <Link href="/auth/signup">
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}