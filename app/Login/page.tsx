import { LoginForm } from "@/components/Login-Form";
import Image from "next/image";
export default function LoginPage() {
  return (
    <div className="grid h-dvh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          width={1000}
          height={1000}
          quality={1000}
          priority={true}
          src="/Assets/Images/undraw_login_weas.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
