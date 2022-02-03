import { FaSolidMicrophone, FaSolidMicrophoneSlash } from "solid-icons/fa";
import { Show } from "solid-js";

export default function Mic(props) {
  return (
    <button
      classList={{
        "bg-red-600 hover:bg-red-500": props.muted,
      }}
      className="text-white p-3 bg-gray-700/60 hover:bg-gray-600/70 rounded-full"
      onClick={[props.toggleMic]}
    >
      <Show when={props.muted} fallback={<FaSolidMicrophone size={20} />}>
        <FaSolidMicrophoneSlash size={20} />
      </Show>
    </button>
  );
}
