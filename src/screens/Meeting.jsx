import { useParams } from "solid-app-router";
import { RiSystemInformationLine } from "solid-icons/ri";
import {
  FaSolidMicrophoneSlash,
  FaSolidMicrophone,
  FaSolidUserAlt,
} from "solid-icons/fa";
import { FaSolidVideo, FaSolidVideoSlash } from "solid-icons/fa";
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

  const { store, toggleMic, toggleWebCam } = useMeet({
    meetCode: params.meetCode,
  });

  return (
    <div className="bg-gray-800">
      <div className="h-screen">
        <section className="h-5/6 container mx-auto flex justify-center items-center">
          <div
            classList={{ "bg-transparent": !store.webCam }}
            className="bg-gray-900 relative"
          >
            <Show
              when={store.remoteStream}
              fallback={
                <Show
                  when={store.webCam}
                  fallback={
                    <div className="p-16 rounded-full  bg-gray-700 text-white relative">
                      <FaSolidUserAlt size={100} className="animate-bounce" />
                    </div>
                  }
                >
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
                </Show>
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
              <button
                classList={{
                  "bg-red-600/60 hover:bg-red-500/70 ": store.muted,
                }}
                className="text-white p-3 bg-gray-700/60 hover:bg-gray-600/70 rounded-full"
                onClick={[toggleMic]}
              >
                {store.muted ? (
                  <FaSolidMicrophoneSlash size={20} />
                ) : (
                  <FaSolidMicrophone size={20} />
                )}
              </button>
              <button
                classList={{
                  "bg-red-600/60 hover:bg-red-500/70 ": !store.webCam,
                }}
                className="text-white p-3 bg-gray-700/60 hover:bg-gray-600/70 rounded-full"
                onClick={[toggleWebCam]}
              >
                {store.webCam ? (
                  <FaSolidVideo size={20} />
                ) : (
                  <FaSolidVideoSlash size={20} />
                )}
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
