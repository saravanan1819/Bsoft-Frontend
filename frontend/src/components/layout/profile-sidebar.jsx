import React from "react";
import { Icons } from "../../assets/icons/icons";

export const ProfileSidebar = ({ isOpen, onClose }) => {
  // Weekly learning activity data for chart
  const weeklyData = [
    { day: "Sun", height: "18%", color: "bg-[#D1D5DB]" },
    { day: "Mon", height: "22%", color: "bg-[#D1D5DB]" },
    { day: "Tue", height: "48%", color: "bg-[#D1D5DB]" },
    { day: "Wed", height: "78%", color: "bg-[#D1D5DB]" },
    { day: "Thu", height: "65%", color: "bg-[#9AD84A]" }, // Active / highlighted day
    { day: "Fri", height: "0%", color: "bg-[#D1D5DB]" },
    { day: "Sat", height: "0%", color: "bg-[#D1D5DB]" },
  ];

  return (
    <div
      className={`transition-all duration-300 ease-in-out bg-[#FAFAFA] border-t-[0.5px] border-l-[0.5px] border-r-[0.5px] border-[#B9BEC7] rounded-t-[24px] overflow-hidden flex flex-col shrink-0 ${
        isOpen
          ? "w-[320px] sm:w-[360px] opacity-100 ml-[8px]"
          : "w-0 opacity-0 pointer-events-none border-none ml-0"
      }`}
    >
      {/* Header */}
      <div className="h-[68px] flex items-center justify-between px-[20px] sm:px-[24px] border-b-[0.5px] border-[#B9BEC7] bg-[#FAFAFA] shrink-0">
        <h2 className="font-sans font-bold text-[18px] text-gray-900">Profile</h2>
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-[6px] px-[12px] py-[5px] rounded-full border border-[#B9BEC7] bg-white text-[13px] font-sans font-medium text-[#000000] hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <span className="text-[13px] leading-none">✕</span>
          <span>Close</span>
        </button>
      </div>

      {/* Sidebar Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-[16px] sm:p-[20px] flex flex-col gap-[16px] no-scrollbar">
        
        {/* User Card */}
        <div className="bg-white rounded-[20px] border border-[#B9BEC7] p-[20px] flex flex-col items-center shadow-xs relative">
          {/* Top Pill Badges */}
          <div className="w-full flex items-center justify-between mb-[16px]">
            {/* Level Badge */}
            <span className="bg-[#9AD84A] text-white px-[12px] py-[4px] rounded-[10px] text-[13px] font-semibold font-sans">
              Level 8
            </span>

            {/* XP Pill */}
            <div className="flex items-center gap-[6px] px-[12px] py-[4px] rounded-[10px] bg-[#F3F4F6] border border-[#B9BEC7] text-[#000000] text-[13px] font-semibold font-sans">
              <img src={Icons.goldenStar} alt="XP" className="w-[14px] h-[14px]" />
              <span>2250 XP</span>
            </div>
          </div>

          {/* Avatar Container matching design screenshot */}
          <div className="relative w-[86px] h-[86px] rounded-full border border-[#B9BEC7] bg-white p-[3px] flex items-center justify-center shadow-xs">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#9AD84A] flex items-center justify-center">
              <img
                src={Icons.profile || "/hero.png"}
                alt="Saravanan S"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User Name & ID */}
          <h3 className="font-sans font-medium text-[18px] text-[#000000] mt-[12px] text-center">
            Saravanan S
          </h3>
          <p className="font-sans font-normal text-[16px] text-[#737373] mt-[2px] text-center">
            Bsoft-stu-11
          </p>

          {/* Social / Contact Icons Row */}
          <div className="flex items-center justify-center gap-[10px] mt-[14px]">
            {/* Mail */}
            <button
              type="button"
              className="w-[36px] h-[36px] rounded-full border border-[#B9BEC7] bg-[#F9FAFB] hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-600 cursor-pointer"
              title="Email"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>

            {/* Phone */}
            <button
              type="button"
              className="w-[36px] h-[36px] rounded-full border border-[#B9BEC7] bg-[#F9FAFB] hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-600 cursor-pointer"
              title="Phone"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>

            {/* LinkedIn */}
            <button
              type="button"
              className="w-[36px] h-[36px] rounded-full border border-[#B9BEC7] bg-[#F9FAFB] hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-600 cursor-pointer"
              title="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </button>

            {/* GitHub */}
            <button
              type="button"
              className="w-[36px] h-[36px] rounded-full border border-[#B9BEC7] bg-[#F9FAFB] hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-600 cursor-pointer"
              title="GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </button>
          </div>

          {/* XP Progress Bar */}
          <div className="w-full mt-[20px]">
            <div className="flex items-center justify-between text-[12px] font-normal text-[#000000] mb-[8px] font-sans">
              <span>250 XP to Level 9</span>
              <span>2,250 / 2500 XP</span>
            </div>
            <div className="w-full h-[10px] bg-[#E5E7EB] rounded-full overflow-hidden">
              <div className="h-full bg-[#9AD84A] rounded-full w-[90%]" />
            </div>
          </div>
        </div>

        {/* Batch Rank Card */}
        <div className="bg-white rounded-[20px] border border-[#B9BEC7] p-[18px] shadow-xs flex flex-col">
          <div className="flex items-center gap-[6px] text-[#000000] font-normal text-[14px] font-sans">
            <span>Batch Rank</span>
            <span className="w-4 h-4 rounded-full border border-[#B9BEC7] text-[#737373] text-[10px] flex items-center justify-center font-bold">
              i
            </span>
          </div>

          <div className="flex items-baseline gap-[10px] mt-[10px]">
            <span className="font-sans font-bold text-[34px] text-gray-900 leading-none">
              #4
            </span>
            <span className="bg-[#EF4444] text-white text-[8px] font-normal px-[6px] py-[2px] rounded-[4px] font-sans">
              -3.1%
            </span>
            <span className="text-[12px] text-[#737373] font-normal font-sans">
              vs Last week
            </span>
          </div>

          <p className="text-[14px] text-[#737373] font-normal font-sans mt-[6px]">
            Out of 62 Students
          </p>
        </div>

        {/* University Rank Card */}
        <div className="bg-white rounded-[20px] border border-[#B9BEC7] p-[18px] shadow-xs flex flex-col">
          <div className="flex items-center gap-[6px] text-[#000000] font-normal text-[14px] font-sans">
            <span>University Rank</span>
            <span className="w-4 h-4 rounded-full border border-[#B9BEC7] text-[#737373] text-[10px] flex items-center justify-center font-bold">
              i
            </span>
          </div>

          <div className="flex items-baseline gap-[10px] mt-[10px]">
            <span className="font-sans font-bold text-[34px] text-gray-900 leading-none">
              #45
            </span>
            <span className="bg-[#22C55E] text-white text-[8px] font-normal px-[6px] py-[2px] rounded-[4px] font-sans">
              +3.1%
            </span>
            <span className="text-[12px] text-[#737373] font-normal font-sans">
              vs Last week
            </span>
          </div>

          <p className="text-[14px] text-[#737373] font-normal font-sans mt-[6px]">
            Out of 5423 Students
          </p>
        </div>

        {/* Learning Time Card */}
        <div className="bg-white rounded-[20px] border border-[#B9BEC7] p-[18px] shadow-xs flex flex-col">
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[6px] text-[#000000] font-normal text-[14px] font-sans">
              <span>Learning Time</span>
              <span className="w-4 h-4 rounded-full border border-[#B9BEC7] text-[#737373] text-[10px] flex items-center justify-center font-bold">
                i
              </span>
            </div>

            <button
              type="button"
              className="w-[28px] h-[28px] rounded-full border border-[#B9BEC7] bg-white hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-600 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8a2 2 0 100-4 2 2 0 000 4zm0 6a2 2 0 100-4 2 2 0 000 4zm0 6a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>

          {/* Time Display */}
          <div className="text-center my-[12px]">
            <h4 className="font-sans font-bold text-[34px] text-gray-900 leading-tight">
              4h 37m
            </h4>
            <p className="text-[14px] text-[#737373] font-normal font-sans">
              Today
            </p>
            <p className="text-[11px] text-[#737373] font-normal font-sans mt-[4px]">
              You studied 45 minutes longer than yesterday.
            </p>
          </div>

          {/* Bar Chart Container */}
          <div className="bg-[#F3F4F6] rounded-[16px] p-[16px] mt-[10px] flex flex-col justify-end">
            <div className="h-[100px] flex items-end justify-between px-[6px]">
              {weeklyData.map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-[8px] w-[24px]">
                  {/* Bar */}
                  <div className="w-[20px] h-[76px] flex items-end justify-center">
                    <div
                      style={{ height: item.height }}
                      className={`w-full rounded-t-[8px] transition-all duration-500 ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Days Labels Row */}
            <div className="flex items-center justify-between px-[6px] mt-[8px]">
              {weeklyData.map((item) => (
                <span
                  key={item.day}
                  className="w-[24px] text-center text-[12px] font-sans font-medium text-gray-500"
                >
                  {item.day}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileSidebar;
