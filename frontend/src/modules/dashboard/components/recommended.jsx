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
    <div className="w-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[24px] p-[24px] box-border flex flex-col gap-[20px] min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="w-[36px] h-[36px] rounded-full border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
            <img src={Icons.timer} alt="Timer" className="w-[18px] h-[18px]" />
          </div>
          <h3 className="font-sans font-semibold text-[16px] text-black flex items-center gap-[6px]">
            Recommended for you
            <img
              src={Icons.alertCircle}
              alt="Info"
              className="w-[15px] h-[15px] cursor-help opacity-70"
            />
          </h3>
        </div>

        {/* View All link */}
        <button className="font-sans text-[14px] text-[#2563EB] hover:underline bg-transparent border-none cursor-pointer">
          View all
        </button>
      </div>

      {/* Recommended Cards Horizontal Scroll Container (Dynamic N Items) */}
      <div className="flex items-center gap-[16px] w-full overflow-x-auto no-scrollbar scroll-smooth py-[4px] px-[1px]">
        {recommendedData.map((item) => (
          <div
            key={item.id}
            className="w-[200px] h-[221px] bg-[#F0F1F3] border-[0.5px] border-[#E5E7EB] rounded-[20px] p-[16px] box-border flex flex-col justify-between shrink-0 hover:border-[#B9BEC7] transition-all duration-200"
          >
            {/* Top icon & content */}
            <div className="flex flex-col gap-[10px]">
              <div className="w-[36px] h-[36px] bg-white border-[0.5px] border-[#B9BEC7] rounded-[10px] flex items-center justify-center shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                {renderCardIcon(item.type)}
              </div>
              <div className="flex flex-col gap-[4px]">
                <h4 className="font-sans font-medium text-[14px] leading-[20px] tracking-normal text-[#000000]">
                  {item.title}
                </h4>
                <p className="font-sans font-normal text-[12px] leading-[15px] tracking-normal text-[#737373] whitespace-pre-line">
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
