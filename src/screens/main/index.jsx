import { Outlet } from "solid-app-router";
import Navbar from "../../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
