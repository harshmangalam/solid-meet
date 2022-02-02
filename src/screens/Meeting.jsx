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
import { Match, Show, Switch } from "solid-js";
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
      <section
        className="flex justify-center items-center py-4"
        style={{ height: "90vh" }}
      >
        <div className="relative">
          <Switch>
            <Match when={store.remoteStream}>
            <div className="relative">
              <video
                autoPlay
                controls={false}
                playsInline
                use:getVideoSrc={store.remoteStream}
                className="shadow-xl"
              ></video>
              <h6 className="font-bold text-sm absolute top-0  p-4 text-white">Remote</h6>
              </div>
            </Match>
            <Match when={store.webCam}>
              <div className="relative">
                <video
                  autoPlay
                  controls={false}
                  playsInline
                  use:getVideoSrc={store.currentStream}
                  className="shadow-xl"
                ></video>
                <h6 className="font-bold text-sm absolute top-0  p-4 text-white">
                  You
                </h6>
              </div>
            </Match>
            <Match when={!store.remoteStream && !store.webCam}>
              <div className="p-16 rounded-full  bg-gray-700 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <FaSolidUserAlt size={100} />
              </div>
            </Match>
          </Switch>

          <Switch>
            <Match when={store.remoteStream && store.webCam}>
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
            </Match>
            <Match when={store.remoteStream && !store.webCam}>
              <div className="absolute right-0 md:bottom-0">
                <div className="bg-gray-700  w-32 h-32 grid place-items-center text-white">
                  <FaSolidVideoSlash size={48} />
                  <h6 className="font-bold text-xs absolute bottom-0 left-0 px-2 py-1 text-white">
                    You
                  </h6>
                </div>
              </div>
            </Match>
          </Switch>
        </div>
      </section>
      <section
        className="container mx-auto flex flex-col justify-center"
        style={{ height: "10vh" }}
      >
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

          <MeetingUsers store={store} />
        </section>
      </section>

      <JoinMeetDialog handleClose={handleCloseJoinMeetDialog} />
    </div>
  );
}
