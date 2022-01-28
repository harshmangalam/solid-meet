import { useParams } from "solid-app-router";
import { RiSystemInformationLine } from "solid-icons/ri";
import { FaSolidMicrophoneSlash, FaSolidMicrophone } from "solid-icons/fa";
import { SiGooglemeet } from "solid-icons/si";
import { FiShare } from "solid-icons/fi";
import { ImPhoneHangUp } from "solid-icons/im";
import { BsChatSquareTextFill } from "solid-icons/bs";
import { CgMenuGridO } from "solid-icons/cg";
import { Show } from "solid-js";
import JoinMeetDialog from "../components/JoinMeetDialog";
import { IoSettingsOutline } from "solid-icons/io";

import { getVideoSrc } from "../directives/video";

import { showTime } from "../utils/dateTime";
import useMeet from "../hooks/useMeet";
import MeetingUsers from "../components/MeetingUsers";
export default function Meeting() {
  const params = useParams();

  function handleCloseJoinMeetDialog() {
    setShowJoinDialog(false);
  }

  const { store } = useMeet({ meetCode: params.meetCode });

  return (
    <div className="bg-gray-800">
      <div className="h-screen">
        <section className="h-5/6 container mx-auto flex justify-center items-center">
          <div className="bg-gray-900 relative">
            <Show
              when={store.remoteStream}
              fallback={
                <div className="bg-gray-900 relative">
                  <video
                    autoPlay
                    controls={false}
                    playsInline
                    use:getVideoSrc={store.currentStream}
                    className="w-full h-full"
                  ></video>
                  <h6 className="font-bold text-sm  p-4 text-white">You</h6>
                </div>
              }
            >
              <video
                autoPlay
                controls={false}
                playsInline
                use:getVideoSrc={store.remoteStream}
                className="w-full h-full"
              ></video>
              <h6 className="font-bold text-sm  p-4 text-white">Remote</h6>
            </Show>

            <Show when={store.remoteStream}>
              <div className="absolute right-0 md:bottom-0">
                <div className="bg-gray-700  w-32 h-32">
                  <video
                    autoPlay
                    controls={false}
                    playsInline
                    use:getVideoSrc={store.currentStream}
                    className="w-full h-full"
                  ></video>
                  <h6 className="font-bold text-xs absolute bottom-0 px-2 py-1 text-white">
                    You
                  </h6>
                </div>
              </div>
            </Show>
          </div>
        </section>
        <section className="h-1/6 container mx-auto flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3">
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
              <MeetingUsers store={store} />
              <button className="text-white p-3 hover:bg-gray-700/60 rounded-full">
                <BsChatSquareTextFill size={20} />
              </button>
              <button className="text-white p-3 hover:bg-gray-700/60 rounded-full">
                <IoSettingsOutline size={20} />
              </button>
            </section>
          </div>
        </section>
      </div>

      <JoinMeetDialog handleClose={handleCloseJoinMeetDialog} />
    </div>
  );
}
