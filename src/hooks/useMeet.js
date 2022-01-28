import { onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import io from "socket.io-client";
export default function useMedia(params) {
  const [store, setStore] = createStore({
    error: null,
    socket: null,
    peer: null,
    currentStream: null,
    currentUser: null,

    remoteStream: null,
    remoteUser: null,

    incommingCall: false,
    incommingPayload: null,

    muted: false,
    webCam: true,
  });

  onMount(async () => {
    await requestMediaAccess();
  });

  onMount(() => {
    const socket = io("http://localhost:4000");

    setStore("socket", socket);

    socket.emit("joinRoom", params.meetCode);

    socket.on("currentUser", (user) => {
      setStore("currentUser", user);
    });
    socket.on("userJoined", (user) => {
      setStore("remoteUser", user);
      callUser(user);
    });
    socket.on("remoteUsers", (users) => {
      setStore("remoteUser", users.length ? users[0] : null);
    });

    socket.on("userDisconnected", (user) => {
      setStore("remoteUser", null);
    });

    store.socket.on("offer", (data) => {
      setStore("incommingCall", true);
      setStore("incommingPayload", data);
    });

    store.socket.on("answer", handleAnswer);

    store.socket.on("ice-candidate", handleNewICECandidateMsg);
  });

  onCleanup(() => {
    store.socket?.disconnect();
  });

  async function requestPermissionAgain() {
    await requestMediaAccess();
  }

  async function requestMediaAccess() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 1000,
          height: 600,
        },
      });
      setStore("currentStream", stream);

      if (store.incommingCall) {
        handleRecieveCall(store.incommingPayload);
      }
    } catch (error) {
      setStore("error", { name: error.name, message: error.message });
    }
  }

  function createPeer(socketId) {
    const peer = new RTCPeerConnection({
      iceServers,
    });
    setStore("peer", peer);

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(socketId);

    return peer;
  }

  function callUser(soketId) {
    store.peer = createPeer(soketId);
    store.currentStream
      .getTracks()
      .forEach((track) => store.peer.addTrack(track, store.currentStream));
  }

  function handleNegotiationNeededEvent(socketId) {
    store.peer
      .createOffer()
      .then((offer) => {
        return store.peer.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: socketId,
          caller: store.currentUser,
          sdp: store.peer.localDescription,
        };
        store.socket.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  function handleRecieveCall(data) {
    const peer = createPeer();
    const desc = new RTCSessionDescription(data.sdp);
    peer
      .setRemoteDescription(desc)
      .then(() => {
        store.currentStream
          ?.getTracks()
          .forEach((track) => peer.addTrack(track, store.currentStream));
      })
      .then(() => {
        return peer.createAnswer();
      })
      .then((answer) => {
        return peer.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: data.caller,
          caller: store.currentUser,
          sdp: peer.localDescription,
        };
        store.socket.emit("answer", payload);
      });
  }

  function handleAnswer(data) {
    const desc = new RTCSessionDescription(data.sdp);
    store.peer.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: store.remoteUser,
        candidate: e.candidate,
      };
      store.socket.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(data) {
    const candidate = new RTCIceCandidate(data.candidate);
    store.peer?.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    setStore("remoteStream", e.streams[0]);
  }

  function toggleMic() {
    setStore("muted", !store.muted);
    store.currentStream.getAudioTracks()[0].enabled =
      !store.currentStream.getAudioTracks()[0].enabled;
  }

  function toggleWebCam() {
    setStore("webCam", !store.webCam);
    store.currentStream.getVideoTracks()[0].enabled =
      !store.currentStream.getVideoTracks()[0].enabled;
    console.log(store.currentStream.getVideoTracks()[0].enabled);
  }

  return {
    store,
    requestPermissionAgain,
    toggleMic,
    toggleWebCam,
  };
}

const iceServers = [
  {
    urls: "stun:numb.viagenie.ca",
    username: "sultan1640@gmail.com",
    credential: "98376683",
  },
  {
    urls: "turn:numb.viagenie.ca",
    username: "sultan1640@gmail.com",
    credential: "98376683",
  },
];
