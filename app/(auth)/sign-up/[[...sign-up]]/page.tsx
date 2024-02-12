"use client"
import Loader from "@/components/shared/Loader/Loader";
import { SignUp, useSignIn } from "@clerk/nextjs";
 
export default function Page(){

  const { isLoaded } = useSignIn();
 
  if (!isLoaded) return <Loader />;
  return <SignUp />;
}