export function Input({ className, type, name, placeholder, ...props }) {
  return (
    <>
      <input
        className={`w-full rounded-full border-2 border-gold bg-base p-3 text-center text-xs  text-white transition  focus:border-gold/50 focus:outline-none lg:pl-6 lg:text-left xl:py-4 xl:pl-10 xl:text-sm ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
        {...props}
      />
    </>
  );
}
