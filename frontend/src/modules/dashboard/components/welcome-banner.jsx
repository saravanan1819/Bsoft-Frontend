import React from "react";

export const WelcomeBanner = ({ userName }) => {
  return (
    <div className="flex flex-col h-auto">
      <h2 className="font-sans font-semibold text-[19px] sm:text-[21px] leading-tight text-black">
        Welcome back, {userName} 👋
      </h2>
      <p className="font-sans font-normal text-[13.5px] sm:text-[15px] leading-normal text-[#737373] mt-[5px] sm:mt-[9px]">
        Keep building your skills with hands-on learning, real labs, and consistent progress every day.
      </p>
    </div>
  );
};

export default WelcomeBanner;
