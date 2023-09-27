

export function Error({ text, className }) {
  return (
    <p className={`w-[90%] text-center  text-xs text-red-500  md:text-sm ${className}`}>
      {text}
    </p>
  );
}
