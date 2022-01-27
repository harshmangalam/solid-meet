import { AiOutlineGithub, AiFillHeart } from "solid-icons/ai";
import { BsFacebook, BsTwitter } from "solid-icons/bs";
import { FaBrandsDev } from "solid-icons/fa";
import { For } from "solid-js";
export default function Footer() {
  return (
    <footer className="md:absolute bottom-0 w-full py-4 bg-gray-100">
      <div className="container mx-auto px-2 md:px-0 flex flex-col gap-3 items-center md:flex-row justify-between">
        <h6 className="text-xl font-bold">Solid Meet</h6>
        <p className="inline-flex items-center flex-wrap text-md justify-center gap-2">
          <span>Made open source </span>
          <a
            href="https://github.com/harshmangalam/solid-meet"
            target={"_blank"}
          >
            <AiOutlineGithub size={20} />
          </a>
          <span> with </span>
          <AiFillHeart color="tomato" size={20} />
          <span>By</span>
          <a
            href="https://github.com/harshmangalam/solid-meet"
            target={"_blank"}
            className="font-semibold"
          >
            Harsh Mangalam
          </a>
        </p>

        <div className="flex gap-3">
          <For each={socialLinks}>
            {(link) => (
              <a href={link.link} target={"_blank"} title={link.name}>
                {link.icon}
              </a>
            )}
          </For>
        </div>
      </div>
    </footer>
  );
}

const socialLinks = [
  {
    name: "DEV Community",
    icon: <FaBrandsDev size={24} />,
    link: "https://dev.to/harshmangalam",
  },
  {
    name: "Github Repos",
    icon: <AiOutlineGithub size={24} />,
    link: "https://github.com/harshmangalam",
  },
  {
    name: "Facebook",
    icon: <BsFacebook size={24} color="#1b74e4" />,
    link: "https://www.facebook.com/harsh.mangalam.srvm/",
  },
  {
    name: "Twitter",
    icon: <BsTwitter size={24} color="#1D9BF0" />,
    link: "https://twitter.com/HarshMangalam6",
  },
];
