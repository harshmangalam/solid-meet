import { SiGooglemeet } from "solid-icons/si";
import { BsDot } from "solid-icons/bs";
export default function Navbar() {
  function showTime() {
    return new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  function showDate() {
    return new Date().toDateString();
  }

  return (
    <header className="bg-white">
      <nav className="container mx-auto flex items-center justify-between py-2">
        <h1 className="flex items-center gap-2">
          <SiGooglemeet size={32} className="text-blue-500" />
          <span className="text-2xl">Solid Meet</span>
        </h1>

        <div>
          <time className="flex items-center gap-1 text-gray-500 text-lg">
            <span>{showTime()}</span>
            <BsDot size={24} color="#000000" />
            <span>{showDate()}</span>
          </time>
        </div>
      </nav>
    </header>
  );
}
