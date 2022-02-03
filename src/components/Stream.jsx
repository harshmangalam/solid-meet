import { createEffect } from "solid-js";
import { getVideoSrc } from "../directives/video";

export default function Stream(props) {
  return (
    <div className="relative">
      <video
        autoPlay
        controls={false}
        playsInline
        use:getVideoSrc={props.stream}
        className=""
      ></video>
      <h6 className="font-bold text-sm absolute top-0  p-4 text-white">
        {props.name}
      </h6>
    </div>
  );
}
