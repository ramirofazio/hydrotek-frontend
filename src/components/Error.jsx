

export function Error({ text, className }) {
  return (
    <p className={`px-0.5 w-fit mx-auto text-center  text-xs text-red-500  md:text-sm ${className}`}>
      {text}
    </p>
  );
}
