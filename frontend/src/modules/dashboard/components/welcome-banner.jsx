import React from "react";

export const WelcomeBanner = ({ userName }) => {
  return (
    <div className="flex flex-col h-auto">
      <h2 className="font-sans font-semibold text-[20px] sm:text-[23px] leading-tight text-black">
        Welcome back, {userName} 👋
      </h2>
      <p className="font-sans font-normal text-[14px] sm:text-[16px] md:text-[18px] leading-normal text-[#737373] mt-[6px] sm:mt-[12px]">
        Keep building your skills with hands-on learning, real labs, and consistent progress every day.
      </p>
    </div>
  );
};

export default WelcomeBanner;
