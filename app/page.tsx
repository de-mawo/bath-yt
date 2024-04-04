import { UserAuthForm } from "@/components/Common/UserAuthForm";
import { TbSchool } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="md:hidden">
        <Image src="/logoc.png" width={1280} height={843} alt="logo" />
      </div>
      <div className="container relative  h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10  lg:flex dark:border-r">
          <div className="absolute inset-0 " />
          <div className="relative z-20 flex items-center space-x-3 text-lg font-medium">
            <TbSchool size={24} />
            <h1 className="text-2xl font-semibold tracking-tight">
              Bath Learning Portal{" "}
            </h1>
          </div>
          <div className="relative z-50 flex items-center ">
            <Image
              src="/logoc.png"
              width={1280}
              height={843}
              alt="logo"
              className=""
            />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">&ldquo;Learn to learn.&rdquo;</p>
              <footer className="text-sm">De Mawo</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to the Bath Portal
              </h1>
              <p className="text-sm text-muted-foreground">
                To access the portal
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
