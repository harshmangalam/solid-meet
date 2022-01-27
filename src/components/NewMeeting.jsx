import { RiMediaVideoAddFill } from "solid-icons/ri";

export default function NewMeeting() {
  return (
    <button className="flex items-center gap-3 justify-center bg-blue-500 text-white rounded px-3 py-3 font-bold">
      <RiMediaVideoAddFill />
      New meeting
    </button>
  );
}
