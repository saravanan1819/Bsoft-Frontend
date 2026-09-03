import React from "react";
import { Icons } from "../../../assets/icons/icons.js";

const scheduleData = [
  {
    id: 1,
    title: "React Live Session",
    dateTime: "Today, 7.00 PM",
    actionType: "join",
    buttonText: "Join",
  },
  {
    id: 2,
    title: "Mock Interview - Round 1",
    dateTime: "22 may 2026, 10.00 AM",
    actionType: "view",
    buttonText: "View",
  },
  {
    id: 3,
    title: "Mock Interview - Round 2",
    dateTime: "22 may 2026, 1.00 AM",
    actionType: "view",
    buttonText: "View",
  },
];

export const UpcomingScheduleCard = () => {
  return (
    <div className="w-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[20px] box-border flex flex-col gap-[28px]">
      {/* Header */}
      <div className="flex items-center gap-[8px]">
        <div className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
          <img src={Icons.timer} alt="Timer" className="w-[16px] h-[16px]" />
        </div>
        <h3 className="font-sans font-semibold text-[15px] text-black flex items-center gap-[5px]">
          Upcoming Schedule
          <img
            src={Icons.alertCircle}
            alt="Info"
            className="w-[14px] h-[14px] cursor-help opacity-70"
          />
        </h3>
      </div>

      {/* List Items */}
      <div className="flex flex-col">
        {scheduleData.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <div className="w-full h-[1px] bg-[#E5E7EB] my-[12px]" />}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[12px]">
                {/* Square Icon Box */}
                <div className="w-[36px] h-[36px] bg-[#FAFAFA] border-[0.5px] border-[#E4E4E7] rounded-[9px] flex items-center justify-center shrink-0">
                  <img
                    src={item.title.includes("Live") ? Icons.liveStreaming : Icons.students}
                    alt={item.title}
                    className="w-[16px] h-[16px]"
                  />
                </div>
                {/* Titles */}
                <div className="flex flex-col gap-[2px]">
                  <span className="font-sans font-semibold text-[14px] text-black leading-tight">
                    {item.title}
                  </span>
                  <span className="font-sans font-light text-[11.5px] text-[#8E8E93] leading-tight">
                    {item.dateTime}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              {item.actionType === "join" ? (
                <button className="bg-[#9AD84A] text-white w-[55px] h-[19px] rounded-[5px] font-sans font-normal text-[10px] leading-none flex items-center justify-center hover:opacity-90 transition-opacity shrink-0 cursor-pointer">
                  {item.buttonText}
                </button>
              ) : (
                <button className="bg-white border border-[#D1D5DB] text-black w-[55px] h-[19px] rounded-[5px] font-sans font-normal text-[10px] leading-none flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0 cursor-pointer">
                  {item.buttonText}
                </button>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default UpcomingScheduleCard;
