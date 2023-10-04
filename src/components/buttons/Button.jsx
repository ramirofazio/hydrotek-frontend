export const Button = ({ text, className, pClassname, ...props }) => {
  return (
    <button
      className={`rounded-full border-2 border-gold bg-transparent px-6 py-2 uppercase tracking-widest text-white transition hover:bg-gold hover:text-[#1B142C] disabled:opacity-30 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      <p className={`font-primary ${pClassname}`}>{text}</p>
    </button>
  );
};
