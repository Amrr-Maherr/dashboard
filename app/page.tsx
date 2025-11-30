import Image from "next/image";
import dashboardImg from "@/public/Assets/Images/undraw_analytics-setup_ptrz.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full h-screen lg:w-1/2 flex flex-col justify-center items-center p-10 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to{" "}
          <span className="bg-[#6768fa] text-white px-2 py-1 rounded-lg font-semibold">
            StoreHub
          </span>
        </h1>
        <p className="mb-4 text-gray-700 text-lg">
          Here you can manage products, orders, and customers easily.
        </p>

        <div className="flex md:flex-nowrap flex-wrap items-center justify-center gap-4 mt-6">
          <Link href="/Login" className="cursor-pointer">
            <Button className="cursor-pointer"> Start Managing Products</Button>
          </Link>
          <Link href="/Login" className="cursor-pointer">
            <Button variant="outline" className="cursor-pointer">
              Check Your Orders
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
