import React from "react";

export const CtaButton = ({
  children,
  onClick,
  width = "w-[164px]",
  height = "h-[30px]",
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${width} ${height} bg-[#9BD94A] text-white font-sans font-normal text-[14px] rounded-[50px] flex items-center justify-center mx-auto hover:opacity-90 transition-opacity border-none cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CtaButton;
