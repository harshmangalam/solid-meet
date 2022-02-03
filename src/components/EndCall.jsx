import { ImPhoneHangUp } from "solid-icons/im";

export default function EndCall(props) {
  return (
    <button
      onClick={[props.endCall]}
      className="text-white p-3 bg-red-600 hover:bg-red-500 rounded-full"
    >
      <ImPhoneHangUp size={20} />
    </button>
  );
}
