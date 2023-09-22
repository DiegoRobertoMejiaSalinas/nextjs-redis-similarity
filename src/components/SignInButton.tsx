"use client";

import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Button } from "./ui/Button";

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("");
    } catch (e) {
      toast.error("Try again later");
    }
  };

  return (
    <Button onClick={signInWithGoogle} isLoading={isLoading}>
      Sign in
    </Button>
  );
};

export { SignInButton };
