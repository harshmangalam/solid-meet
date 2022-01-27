import { BsKeyboardFill } from "solid-icons/bs";
export default function JoinMeeting() {
  return (
    <div className="flex items-center gap-3">
      <form class="group relative">
        <BsKeyboardFill className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500 text-xl" />

        <input
          class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 placeholder:text-md rounded-md py-3 pl-10 ring-1 ring-slate-200 shadow-sm"
          type="text"
          aria-label="Enter meeting code"
          placeholder="Enter meeting code"
        />
      </form>
      <button className="text-blue-500 hover:bg-blue-100 px-3 py-3 rounded font-bold">
        Join
      </button>
    </div>
  );
}
