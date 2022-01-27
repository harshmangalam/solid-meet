export function showTime() {
  return new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export function showDate() {
  return new Date().toDateString();
}
