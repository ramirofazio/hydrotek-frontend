import { Text } from "../text/Text";

export const Button = ({ text, className, pClassname, onClick, children, ...props }) => {
  return (
    <button
      className={`rounded-md border-2 border-gold bg-transparent px-6 py-2 uppercase tracking-widest text-white transition hover:bg-gold hover:text-[#1B142C] disabled:cursor-not-allowed disabled:opacity-30 ${className}`}
      onClick={onClick}
      {...props}
    >
      <Text className={`font-primary ${pClassname}`} content={text || children}></Text>
    </button>
  );
};
