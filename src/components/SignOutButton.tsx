"use client";

import { FC, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Button } from "./ui/Button";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signOutWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (e) {
      toast.error("Try again later");
    }
  };

  return (
    <Button onClick={signOutWithGoogle} isLoading={isLoading}>
      Sign in
    </Button>
  );
};

export { SignOutButton };
