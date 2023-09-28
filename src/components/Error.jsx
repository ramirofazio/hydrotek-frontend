

export function Error({ text, className }) {
  return (
    <p className={`absolute pl-5 w-fit mx-auto text-center  text-xs text-red-500  md:text-sm ${className}`}>
      {text}
    </p>
  );
}
