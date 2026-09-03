import React from "react";
import { CtaButton } from "../../../components/common/button.jsx";
import { Icons } from "../../../assets/icons/icons.js";

const recommendedData = [
  {
    id: 1,
    type: "code",
    title: "Continue React Course",
    subtitle: "You left off at session 4.\nPick up where are left",
    buttonText: "Continue",
  },
  {
    id: 2,
    type: "code",
    title: "Practice SQL Joins",
    subtitle: "Improve your backend skill\n( Current 58% )",
    buttonText: "Start Quiz",
  },
  {
    id: 3,
    type: "code",
    title: "Linux Privilege Escalation Lab",
    subtitle: "Next lab in your\nCybersecurity course",
    buttonText: "Start Lab",
  },
  {
    id: 4,
    type: "code",
    title: "JavaScript Async & Promises",
    subtitle: "Master asynchronous code\n( Session 2 )",
    buttonText: "Continue",
  },
];

const renderCardIcon = (type) => {
  if (type === "code") {
    return <img src={Icons.code} alt="Code" className="w-[18px] h-[18px]" />;
  }
  if (type === "database") {
    return <img src={Icons.database} alt="Database" className="w-[18px] h-[18px]" />;
  }
  return <img src={Icons.terminal} alt="Terminal" className="w-[18px] h-[18px]" />;
};

export const RecommendedSectionCard = () => {
  return (
    <div className="w-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[20px] box-border flex flex-col gap-[18px] min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
            <img src={Icons.timer} alt="Timer" className="w-[16px] h-[16px]" />
          </div>
          <h3 className="font-sans font-semibold text-[15px] text-black flex items-center gap-[5px]">
            Recommended for you
            <img
              src={Icons.alertCircle}
              alt="Info"
              className="w-[14px] h-[14px] cursor-help opacity-70"
            />
          </h3>
        </div>

        {/* View All link */}
        <button className="font-sans text-[13px] text-[#2563EB] hover:underline bg-transparent border-none cursor-pointer">
          View all
        </button>
      </div>

      {/* Recommended Cards Horizontal Scroll Container */}
      <div className="flex items-center gap-[14px] w-full overflow-x-auto no-scrollbar scroll-smooth py-[2px] px-[1px]">
        {recommendedData.map((item) => (
          <div
            key={item.id}
            className="w-[185px] h-[205px] bg-[#F0F1F3] border-[0.5px] border-[#E5E7EB] rounded-[18px] p-[14px] box-border flex flex-col justify-between shrink-0 hover:border-[#B9BEC7] transition-all duration-200"
          >
            {/* Top icon & content */}
            <div className="flex flex-col gap-[9px]">
              <div className="w-[32px] h-[32px] bg-white border-[0.5px] border-[#B9BEC7] rounded-[9px] flex items-center justify-center shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                {renderCardIcon(item.type)}
              </div>
              <div className="flex flex-col gap-[3px]">
                <h4 className="font-sans font-medium text-[13px] leading-[18px] tracking-normal text-[#000000]">
                  {item.title}
                </h4>
                <p className="font-sans font-normal text-[11.5px] leading-[14px] tracking-normal text-[#737373] whitespace-pre-line">
                  {item.subtitle}
                </p>
              </div>
            </div>

            {/* Reusable Green Action CTA Capsule Button Component */}
            <CtaButton>{item.buttonText}</CtaButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSectionCard;
