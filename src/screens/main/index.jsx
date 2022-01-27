import { Outlet } from "solid-app-router";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-2 md:px-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
