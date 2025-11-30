import Image from "next/image";
import dashboardImg from "@/public/Assets/Images/undraw_analytics-setup_ptrz.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full h-screen lg:w-1/2 flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Dashboard</h1>
        <p className="mb-4 text-gray-700 text-lg">
          Here you can manage products, orders, and customers easily.
        </p>

        <div className="flex gap-4 mt-6">
          <Link href="/Login" className="cursor-pointer">
            <Button className="cursor-pointer"> Manage Products</Button>
          </Link>
          <Link href="/Login" className="cursor-pointer">
            <Button variant="outline" className="cursor-pointer">
              Orders
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-1/2 relative hidden lg:block">
        <Image
          src={dashboardImg}
          alt="Dashboard Illustration"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
