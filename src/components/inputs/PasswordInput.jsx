import { useState } from "react";

export function PasswordInput({ className, name, placeholder, ...props }) {
  const [show, setShow] = useState(false);

  const handleClickEye = () => {
    setShow(!show);
  };

  return (
    <div className="relative flex w-full items-center">
      <input
        className={`w-full rounded-full border-2 border-gold bg-base p-3 text-center text-xs text-white transition focus:border-gold/50 focus:outline-none lg:pl-6 lg:text-left xl:py-4 xl:pl-10 xl:text-sm ${className}`}
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        {...props}
      />
      <i
        className={`${
          show ? "ri-eye-fill" : "ri-eye-close-fill"
        } absolute right-0 mr-3 text-lg text-gold transition hover:cursor-pointer`}
        onClick={() => handleClickEye()}
      />
    </div>
  );
}
