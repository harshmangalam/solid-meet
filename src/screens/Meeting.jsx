import { useParams } from "solid-app-router";
import { RiSystemInformationLine } from "solid-icons/ri";
import { FaSolidMicrophoneSlash, FaSolidMicrophone } from "solid-icons/fa";
import { SiGooglemeet } from "solid-icons/si";
import { FiShare } from "solid-icons/fi";
import { ImPhoneHangUp } from "solid-icons/im";
import { BsChatSquareTextFill } from "solid-icons/bs";
import { IoPeople, IoSettingsOutline } from "solid-icons/io";
import { CgMenuGridO } from "solid-icons/cg";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import JoinMeetDialog from "../components/JoinMeetDialog";

import { getVideoSrc } from "../directives/video";

import { showTime } from "../utils/dateTime";
import useMedia from "../hooks/useMedia";
export default function Meeting() {
  const [showJoinDialog, setShowJoinDialog] = createSignal(false);
  const params = useParams();

  function handleCloseJoinMeetDialog() {
    setShowJoinDialog(false);
  }

  const { store } = useMedia();

  return (
    <div className="h-screen overflow-hidden bg-gray-800">
      <section className="container mx-auto py-2 px-2 md:px-0 md:py-4 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-3">
        <Show when={store.userStream}>
          <div className="relative">
            <video
              autoPlay
              controls={false}
              playsInline
              use:getVideoSrc={store.userStream}
              className="border rounded-lg"
            ></video>

            <h6 className="font-bold text-sm relative bottom-6 text-white text-center">
              You
            </h6>
          </div>
        </Show>

        <Show when={true}>
          <div className="relative">
            <video
              autoPlay
              controls={false}
              playsInline
              use:getVideoSrc={store.userStream}
              className="border rounded-lg"
            ></video>
            <h6 className="font-bold text-sm relative bottom-6 text-white text-center">
              Remote
            </h6>
          </div>
        </Show>
      </section>
      <div className="absolute bottom-0">
        <div className="grid grid-cols-1 md:grid-cols-3 w-screen px-2 py-4">
          <section className="items-center gap-3 text-md text-white hidden md:flex">
            <p>{showTime()}</p>
            <span>|</span>
            <p>{params.meetCode}</p>
          </section>
          <section className="flex items-center justify-center gap-3">
            <button className="text-white p-3 bg-gray-700/60 hover:bg-gray-600/70 rounded-full">
              <FaSolidMicrophone size={20} />
            </button>
            <button className="text-white p-3 bg-gray-700/60 hover:bg-gray-600/70 rounded-full">
              <SiGooglemeet size={20} />
            </button>
            <button className="text-white p-3 bg-gray-700/60 hover:bg-gray-600/70 rounded-full">
              <FiShare size={20} />
            </button>
            <button className="text-white p-3 bg-red-600/60 hover:bg-red-500/70 rounded-full">
              <ImPhoneHangUp size={20} />
            </button>

            <button className="text-white p-3 bg-gray-700/60 hover:bg-gray-600/70 rounded-full block md:hidden">
              <CgMenuGridO size={20} />
            </button>
          </section>

          <section className="items-center gap-3 justify-end hidden md:flex">
            <button className="text-white p-3 hover:bg-gray-700/60 rounded-full">
              <RiSystemInformationLine size={20} />
            </button>
            <button className="text-white p-3 hover:bg-gray-700/60 rounded-full">
              <IoPeople size={20} />
            </button>
            <button className="text-white p-3 hover:bg-gray-700/60 rounded-full">
              <BsChatSquareTextFill size={20} />
            </button>
            <button className="text-white p-3 hover:bg-gray-700/60 rounded-full">
              <IoSettingsOutline size={20} />
            </button>
          </section>
        </div>
      </div>
      <Show when={showJoinDialog()}>
        <JoinMeetDialog handleClose={handleCloseJoinMeetDialog} />
      </Show>
    </div>
  );
}
