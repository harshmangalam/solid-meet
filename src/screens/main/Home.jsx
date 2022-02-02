import JoinMeeting from "../../components/JoinMeeting";
import NewMeeting from "../../components/NewMeeting";

import videoMeetImg from "../../assets/video-call.svg"
export default function Home() {
  return (
    <div className="my-16">
      <section className="flex flex-col gap-6 md:flex-row justify-center  items-center">
        <div className="max-w-lg">
          <h1 className="text-center md:text-left text-4xl md:text-5xl ">
            Open source video meetings. Powered by Solidjs.
          </h1>
          <p className="text-center md:text-left mt-6 text-gray-500 text-lg">
            Click <strong>New meeting</strong> to get a link you can send to
            people you want to meet with
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-3 items-center">
            <NewMeeting />
            <JoinMeeting />
          </div>
        </div>
        <div className="flex justify-center flex-none">
          <img
            className="w-96 h-96"
            src={videoMeetImg}
            alt="Solid Meet"
            role="img"
          ></img>
        </div>
      </section>
    </div>
  );
}
