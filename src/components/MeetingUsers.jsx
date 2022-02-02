import { createSignal, For, Show } from "solid-js";
import { IoPeople } from "solid-icons/io";
import clickOutside from "../directives/clickOutside";
import { IoClose } from "solid-icons/io";

export default function MeetingUsers(props) {
  const [show, setShow] = createSignal(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="text-white p-3 bg-gray-700/60 hover:bg-gray-600/70 rounded-full"
      >
        <IoPeople size={20} />
      </button>

      <Show when={show()}>
        <div
          className="absolute top-0 right-0 w-2/6 p-4"
          use:clickOutside={() => setShow(false)}
        >
          <div className="bg-white shadow rounded-lg px-3 py-4">
            <div className="flex items-center justify-between">
              <h6 className="text-lg">People</h6>
              <button
                onClick={[setShow, false]}
                className="rounded-full hover:bg-gray-100 p-2"
              >
                <IoClose size={20} />
              </button>
            </div>

            <div className="my-2">
              <p className="text-gray-600 text-sm">In Call</p>
            </div>

            <ul className="flex flex-col gap-3">
              <li>{props.store.currentUser} (You)</li>
              <Show when={props.store.remoteUser}>
                <li>{props.store.remoteUser} (Remote)</li>
              </Show>
            </ul>
          </div>
        </div>
      </Show>
    </>
  );
}
