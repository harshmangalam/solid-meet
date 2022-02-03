import {  FaSolidVideo  } from "solid-icons/fa";
import { BsDot } from "solid-icons/bs";
import { showDate, showTime } from "../utils/dateTime";
export default function Navbar() {
  

  return (
    <header className="bg-gray-800 px-2 md:px-0 py-2">
      <nav className="container mx-auto flex items-center justify-between py-2">
        <h1 className="flex items-center gap-2">
          <FaSolidVideo size={32} className="text-blue-500" />
          <span className="text-2xl">Solid Meet</span>
        </h1>

        <div className="hidden sm:block">
          <time className="flex items-center gap-0 text-gray-300 md:text-lg">
            <span>{showTime()}</span>
            <BsDot size={24} color="#000000" />
            <span>{showDate()}</span>
          </time>
        </div>
      </nav>
    </header>
  );
}
