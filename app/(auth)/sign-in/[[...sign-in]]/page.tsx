"use client";

import { SignIn, useSignIn } from "@clerk/nextjs";
import Loader from "@/components/shared/Loader/Loader";
 
export default function Page() {
  const { isLoaded } = useSignIn();
 
  if (!isLoaded) return <Loader />;

  return <SignIn />;
}