export const Button = ({ text, classname, ...props }) => {
  return (
    <button
      className={`rounded-[4.325rem] border-2 border-gold bg-transparent px-6 py-2 uppercase text-white transition hover:bg-gold hover:text-[#1B142C] ${classname}`}
      {...props}
    >
      {text}
    </button>
  );
};
