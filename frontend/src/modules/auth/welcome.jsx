import React from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons/icons.js";

export const WelcomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/create-profile");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full h-full w-full px-4 text-center bg-white md:bg-transparent">
      <div className="max-w-[700px] flex flex-col items-center justify-center my-auto py-12">
        {/* Main Heading */}
        <h1 className="font-sans text-[40px] font-medium text-[#000000] mb-[28px] leading-tight">
          Welcome to BSOFT !
        </h1>

        {/* Subtitle Line 1 */}
        <p className="font-sans text-[18px] font-normal text-[#000000] mb-[16px] leading-snug">
          Congratulations! You're all set to start your learning journey.
        </p>

        {/* Subtitle Line 2 */}
        <p className="font-sans text-[18px] font-normal text-[#737373] mb-[140px] leading-normal">
          Learn, practice, track your progress, and build your skills with bsoft
        </p>

        {/* Get Started Button */}
        <button
          type="button"
          onClick={handleGetStarted}
          className="inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-[#9BD94A] hover:bg-[#8EC63F] text-white font-medium text-[16px] rounded-full transition-all duration-200 shadow-sm cursor-pointer hover:shadow-md active:scale-[0.98]"
        >
          <span>Get Started</span>
          <img src={Icons.getStarted} alt="Get Started" className="w-[15px] h-[10px]" />
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
