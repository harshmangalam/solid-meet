export function getVideoSrc(el, accessor) {
  const mediaStream = accessor();
  if ("srcObject" in el) {
    el.srcObject = mediaStream;
  } else {
    el.src = URL.createObjectURL(mediaStream);
  }
}
