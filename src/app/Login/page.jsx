"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Page() {
  return (
    <section className="flex items-center relative justify-center bg-[#ECEEDF] h-screen py-[151px] px-[298px] overflow-hidden">
      <div className="absolute inset-0 bg-[#285275] [clip-path:circle(50%_at_0%_50%)]"></div>

      <div className="w-full h-full flex items-center justify-center z-30">
        <div className="w-1/2 h-full bg-[url('/pexels-emrecan-2079684.jpg')] bg-no-repeat bg-center bg-cover"></div>
        <div className="bg-white w-1/2 h-full flex flex-col">
          <div className="w-full flex items-center justify-end p-5">
            <Button className="bg-black text-white cursor-pointer rounded-none px-10">
              Login
            </Button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-10">
            <div className="w-full flex flex-col items-center gap-1.5 text-center">
              <h1 className="text-3xl font-semibold">Welcome Back</h1>
              <p className="text-md text-gray-500">Sign in to your account</p>
            </div>

            <form className="mt-8 flex flex-col gap-6 w-full max-w-sm">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="example@mail.com" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="********" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white cursor-pointer rounded-none"
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
