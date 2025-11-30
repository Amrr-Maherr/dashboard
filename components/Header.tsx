import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="w-full! flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-[#6768fa]">StoreHub</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">Admin</span>
        <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Logout
        </Button>
      </div>
    </header>
  );
}
