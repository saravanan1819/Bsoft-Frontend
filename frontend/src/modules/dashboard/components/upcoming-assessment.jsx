import React from "react";
import { Icons } from "../../../assets/icons/icons.js";

const assessmentsData = [
  {
    id: 1,
    title: "DBMS Internal Test - 2",
    dateTime: "24 may 2026, 10.00 AM",
    badge: "In 2 days",
  },
  {
    id: 2,
    title: "Linux Assessment",
    dateTime: "22 may 2026, 11.00 AM",
    badge: "In 10 min",
  },
  {
    id: 3,
    title: "React Test - 2",
    dateTime: "22 may 2026, 10.00 AM",
    badge: "In 1 days",
  },
];

export const UpcomingAssessmentCard = () => {
  return (
    <div className="w-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[20px] box-border flex flex-col gap-[28px]">
      {/* Header */}
      <div className="flex items-center gap-[8px]">
        <div className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
          <img src={Icons.timer} alt="Timer" className="w-[16px] h-[16px]" />
        </div>
        <h3 className="font-sans font-semibold text-[15px] text-black flex items-center gap-[5px]">
          Upcoming Assessment
          <img
            src={Icons.alertCircle}
            alt="Info"
            className="w-[14px] h-[14px] cursor-help opacity-70"
          />
        </h3>
      </div>

      {/* List Items */}
      <div className="flex flex-col">
        {assessmentsData.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <div className="w-full h-[1px] bg-[#E5E7EB] my-[12px]" />}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[12px]">
                {/* Square Checklist Icon Box */}
                <div className="w-[36px] h-[36px] bg-[#FAFAFA] border-[0.5px] border-[#E4E4E7] rounded-[9px] flex items-center justify-center shrink-0">
                  <img src={Icons.checklist} alt="Checklist" className="w-[16px] h-[16px]" />
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

              {/* Time Badge */}
              <div className="bg-[#FFD4D4] w-[55px] h-[19px] rounded-[5px] flex items-center justify-center shrink-0">
                <span className="font-sans font-light text-[10px] text-[#EF0303] leading-none text-center">
                  {item.badge}
                </span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAssessmentCard;
