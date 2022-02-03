import { FaSolidVideo, FaSolidVideoSlash } from "solid-icons/fa";
import { Show } from "solid-js";

export default function WebCam(props) {
  return (
    <button
      classList={{
        "bg-red-600 hover:bg-red-500 ": !props.webCam,
      }}
      className="text-white p-3 bg-gray-700/60 hover:bg-gray-600/70 rounded-full"
      onClick={[props.toggleWebCam]}
    >
      <Show
        when={props.webCam}
        fallback={<FaSolidVideoSlash size={20} />}
      >
        <FaSolidVideo size={20} />
      </Show>
    </button>
  );
}
