import { useParams } from "solid-app-router";
import { IoClose } from "solid-icons/io";
import { RiDocumentFileCopyLine } from "solid-icons/ri";
import { onMount } from "solid-js";

export default function Meeting() {
  const params = useParams();
  return (
    <div className="h-screen bg-gray-800">
      <div>Meeting</div>

      <div className="absolute bottom-2 m-2">
        <div className="bg-white shadow-md max-w-96 p-3 rounded-lg">
          <section className="flex justify-between items-center">
            <h6 className="text-xl">Your meeting`s ready</h6>

            <button className="rounded-full hover:bg-gray-100 p-2">
              <IoClose size={20} />
            </button>
          </section>

          <section className="my-4">
            <p className="text-gray-500">
              Share this meeting link with others you want in the meeting
            </p>

            <div className="my-2 bg-gray-100 rounded py-2 px-2 flex items-center gap-2">
              <code className="text-sm">
                http://localhost:3000/{params.meetCode}
              </code>
              <button className="rounded-full hover:bg-gray-200 p-2">
                <RiDocumentFileCopyLine size={20} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
