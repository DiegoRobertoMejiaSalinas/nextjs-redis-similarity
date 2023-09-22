"use client";

import { FC, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/Button";
import { toast } from "./ui/toast";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signOutWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (e) {
      toast({
        title: "Error signing out",
        message: "Please try again later",
        type: "error",
      });
    }
  };

  return (
    <Button onClick={signOutWithGoogle} isLoading={isLoading}>
      Sign in
    </Button>
  );
};

export { SignOutButton };
