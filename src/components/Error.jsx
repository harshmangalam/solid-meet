import { useNavigate } from "solid-app-router";

export default function Error(props) {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-gray-900 text-white grid place-items-center">
      <div className="flex flex-col space-y-4">
        <h5 className="text-2xl">{props.error.name}</h5>
        <p className="text-xl">{props.error.message}</p>
        <button
          onClick={() => navigate("/", { replace: true })}
          className="text-white bg-red-500 py-2 px-4 "
        >
          Leave Meeting
        </button>
      </div>
    </div>
  );
}
