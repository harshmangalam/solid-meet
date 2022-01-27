import { SiGooglemeet } from "solid-icons/si";
import { BsDot } from "solid-icons/bs";
import { showDate, showTime } from "../utils/dateTime";
export default function Navbar() {
  

  return (
    <header className="bg-white px-2 md:px-0">
      <nav className="container mx-auto flex items-center justify-between py-2">
        <h1 className="flex items-center gap-2">
          <SiGooglemeet size={32} className="text-blue-500" />
          <span className="text-2xl">Solid Meet</span>
        </h1>

        <div>
          <time className="flex items-center gap-0 text-gray-500 text-xs md:text-xl">
            <span>{showTime()}</span>
            <BsDot size={24} color="#000000" />
            <span>{showDate()}</span>
          </time>
        </div>
      </nav>
    </header>
  );
}
