export default function Avatar(props) {
  return (
    <div
      className={`grid place-items-center rounded-full bg-gray-700 text-5xl text-white ${props.className}`}
    >
      {props.children}
    </div>
  );
}
