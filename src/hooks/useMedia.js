import { onMount } from "solid-js";
import { createStore } from "solid-js/store";

export default function useMedia() {
  const [store, setStore] = createStore({
    userStream: null,
    error: null,
  });
  onMount(async () => {
    await requestMediaAccess();
  });
  async function requestPermissionAgain() {
    await requestMediaAccess();
  }

  async function requestMediaAccess() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      setStore("userStream", stream);
    } catch (error) {
      setStore("error", { name: error.name, message: error.message });
    }
  }

  return {
    store,
    requestPermissionAgain,
  };
}
