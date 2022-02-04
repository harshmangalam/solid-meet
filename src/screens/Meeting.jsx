import { FaSolidUser, FaSolidUserAlt } from "solid-icons/fa";

import { createEffect, Match, Show, Switch } from "solid-js";
import JoinMeetDialog from "../components/JoinMeetDialog";

import useMeet from "../hooks/useMeet";
import MeetingUsers from "../components/MeetingUsers";
import Error from "../components/Error";
import EndCall from "../components/EndCall";
import WebCam from "../components/WebCam";
import Mic from "../components/Mic";
import Stream from "../components/Stream";
import Avatar from "../components/Avatar";
import Alert from "../components/Alert";

export default function Meeting() {
  const { store, toggleMic, toggleWebCam, endCall } = useMeet();

  createEffect(()=>console.log(store.remoteStream))
  return (
    <>
      <Show when={!store.error} fallback={<Error error={store.error} />}>
        <div className="bg-gray-900" style={{ height: "90vh" }}>
          <Switch>
            <Match when={store.currentStream && !store.remoteStream}>
              <section className="h-full grid place-items-center">
                <Show
                  when={store.webCam}
                  fallback={
                    <Avatar className="w-40 h-40">
                      <FaSolidUser />
                    </Avatar>
                  }
                >
                  <Stream stream={store.currentStream} name="You" />
                </Show>
              </section>
            </Match>
            <Match when={store.currentStream && store.remoteStream}>
              <div className="h-full relative grid md:grid-cols-2 md:gap-4 place-items-center md:static">
                <section className="grid place-items-center">
                  <Show
                    when={store.remoteStream && store.remoteWebCam}
                    fallback={
                      <Avatar className="w-40 h-40">
                        <FaSolidUser />
                      </Avatar>
                    }
                  >
                    <Stream stream={store.remoteStream} name="Remote" />
                  </Show>
                </section>
                <section className=" grid place-items-center absolute w-40 h-40 bottom-0 right-0 my-4 md:static md:w-auto md:h-auto md:my-0">
                  <Show
                    when={store.currentStream && store.webCam}
                    fallback={
                      <Avatar className="w-20 h-20 md:w-40 md:h-40 text-3xl md:text-6xl">
                        <FaSolidUser />
                      </Avatar>
                    }
                  >
                    <Stream stream={store.currentStream} name="You" />
                  </Show>
                </section>
              </div>
            </Match>
          </Switch>
        </div>
        <div
          className="bg-gray-800 grid place-items-center"
          style={{ height: "10vh" }}
        >
          <section className="flex items-center space-x-4">
            <Mic muted={store.muted} toggleMic={toggleMic} />
            <WebCam webCam={store.webCam} toggleWebCam={toggleWebCam} />
            <EndCall endCall={endCall} />
            <MeetingUsers
              currentUser={store.currentUser}
              remoteUser={store.remoteUser}
            />
          </section>
        </div>
      </Show>
      <JoinMeetDialog />

      <Show when={store.remoteMuted}>
        <Alert text="Remote Muted" />
      </Show>
      <Show when={store.muted}>
        <Alert text="You Muted" />
      </Show>
    </>
  );
}
