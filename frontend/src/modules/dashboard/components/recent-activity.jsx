import React, { useState } from "react";
import { Icons } from "../../../assets/icons/icons.js";

const activityItems = {
  Today: [
    {
      id: 1,
      type: "course",
      title: "Completed Linux File Permis...",
      subtitle: "Week 2 · Session 3",
      time: "2 min ago",
      icon: Icons.courseBlue,
      bgColor: "bg-[#DBEAFE]",
    },
    {
      id: 2,
      type: "duration",
      title: "Completed Linux File Permis...",
      subtitle: "Duration : 52 mins · +250 XP",
      time: "2 min ago",
      icon: Icons.bashOrange,
      bgColor: "bg-[#FFEDD5]",
    },
    {
      id: 3,
      type: "quiz",
      title: "Passed Recall Quiz",
      subtitle: "Score · 18/20 (90%)",
      time: "2 min ago",
      icon: Icons.quizCyan,
      bgColor: "bg-[#CFFAFE]",
    },
    {
      id: 4,
      type: "challenge",
      title: "Completed Daily Challenge",
      subtitle: "Reward · +150 XP",
      time: "2 min ago",
      icon: Icons.championPurple,
      bgColor: "bg-[#F3E8FF]",
    },
  ],
  Yesterday: [
    {
      id: 5,
      type: "course",
      title: "Completed React Basics",
      subtitle: "Week 1 · Session 4",
      time: "1 day ago",
      icon: Icons.courseBlue,
      bgColor: "bg-[#DBEAFE]",
    },
  ],
  "This Week": [
    {
      id: 6,
      type: "challenge",
      title: "Completed Weekly Sprint",
      subtitle: "Reward · +500 XP",
      time: "3 days ago",
      icon: Icons.championPurple,
      bgColor: "bg-[#F3E8FF]",
    },
  ],
};

export const RecentActivityCard = () => {
  const [activeTab, setActiveTab] = useState("Today");
  const currentList = activityItems[activeTab] || [];

  return (
    <div className="w-full h-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[24px] p-[24px] box-border flex flex-col gap-[16px]">
      {/* Header */}
      <div className="flex items-center gap-[8px]">
        <div className="w-[36px] h-[36px] rounded-full border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
          <img src={Icons.recentActivity} alt="Recent Activity" className="w-[18px] h-[18px]" />
        </div>
        <h3 className="font-sans font-semibold text-[16px] text-black flex items-center gap-[6px]">
          Recent Activity
          <img src={Icons.alertCircle} alt="Info" className="w-[15px] h-[15px] cursor-help opacity-70" />
        </h3>
      </div>

      {/* Filter Tabs Capsule */}
      <div className="w-full bg-[#F0F1F3] border-[0.5px] border-[#B9BEC7] rounded-full p-[4px] flex items-center justify-between box-border">
        {["Today", "Yesterday", "This Week"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-[8px] text-center font-sans text-[14px] rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? "bg-white text-black font-semibold border-[0.5px] border-[#B9BEC7] shadow-[0px_2px_4px_rgba(0,0,0,0.06)]"
                : "text-[#6B7280] font-medium border border-transparent hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col mt-[28px]">
        {currentList.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <div className="w-full h-[1px] bg-[#E5E7EB] my-[14px]" />}
            <div className="flex items-center justify-between py-[4px]">
              <div className="flex items-center gap-[14px]">
                {/* Colored Circle Background Container with scaled inner Icon */}
                <div className={`w-[44px] h-[44px] rounded-full ${item.bgColor} flex items-center justify-center shrink-0`}>
                  <img src={item.icon} alt={item.type} className="w-[22px] h-[22px]" />
                </div>
                <div className="flex flex-col gap-[3px]">
                  <span className="font-sans font-semibold text-[15px] text-black leading-tight">
                    {item.title}
                  </span>
                  <span className="font-sans font-normal text-[13px] text-[#6B7280] leading-tight">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              <span className="font-sans text-[13px] text-[#6B7280] shrink-0">
                {item.time}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;