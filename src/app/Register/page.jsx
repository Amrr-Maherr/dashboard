"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function page() {
  return (
    <section className="flex items-center relative justify-center bg-[#ECEEDF] h-screen px-0 py-0 md:py-[151px] md:px-[298px] overflow-hidden">
      <div
        className="absolute inset-0 bg-[#285275] 
        sm:[clip-path:circle(50%_at_0%_50%)] 
        [clip-path:circle(50%_at_50%_100%)]"
      ></div>

      <div className="w-full h-full flex items-center justify-center z-30 shadow-2xl">
        <div className="hidden md:block md:w-1/2 h-full bg-[url('/pexels-emrecan-2079684.jpg')] bg-no-repeat bg-center bg-cover"></div>
        <div className="bg-white w-full md:w-1/2 h-full flex flex-col">
          <div className="w-full flex items-center justify-end p-3">
            <Link
              href="/Login"
              className="bg-black py-1  md:py-2 text-white cursor-pointer rounded-none px-10"
            >
              Sign In
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center px-10 flex-1 md:flex-0">
            <div className="w-full flex flex-col items-center gap-1.5 text-center">
              <h1 className="text-3xl font-semibold">Create Account</h1>
              <p className="text-md text-gray-500">Sign up to get started</p>
            </div>

            <form className="flex flex-col gap-3 w-full max-w-sm">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Your Name" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="example@mail.com" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="********" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="********"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white cursor-pointer rounded-none mt-5"
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
