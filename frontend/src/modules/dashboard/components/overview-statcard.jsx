import React from "react";
import { Icons } from "../../../assets/icons/icons.js";


const TREND_STYLES = {
  increase: {
    icon: Icons.arrowUp,
    textColor: "text-[#34C759]",
    bgColor: "bg-[rgba(52,199,89,0.1)]",
    altText: "Increase",
  },
  decrease: {
    icon: Icons.arrowDown,
    textColor: "text-[#FF383C]",
    bgColor: "bg-[rgba(255,56,60,0.1)]",
    altText: "Decrease",
  },
};


export const OverviewStatCard = ({ label, value, unit = "", trend }) => {
  const { value: trendValue, isIncrease, label: trendLabel = "" } = trend ?? {};
  const trendStyle = isIncrease ? TREND_STYLES.increase : TREND_STYLES.decrease;

  return (
    <div className="h-full min-h-[100px] w-full md:flex-1 xl:flex-none bg-white border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[16px] box-border flex flex-col justify-between">
      <div className="flex items-center gap-[6px]">
        <span className="font-sans font-normal text-[14px] text-[#737373]">
          {label}
        </span>
        <img src={Icons.alertCircle} alt="Alert" className="w-[14px] h-[14px] opacity-70" />
      </div>
      <div className="flex items-center gap-[8px] mt-[10px]">
        <span className="font-sans font-semibold text-[26px] sm:text-[30px] leading-none text-black">
          {value}
          {unit}
        </span>
        <div
          className={`flex items-center justify-center w-fit px-[8px] h-[22px] ${trendStyle.bgColor} rounded-full gap-[3px]`}
        >
          <img src={trendStyle.icon} alt={trendStyle.altText} className="w-[12px] h-[12px]" />
          <span className={`font-sans font-medium text-[11px] ${trendStyle.textColor} leading-none whitespace-nowrap`}>
            {trendValue}
            {unit}
            {trendLabel ? ` ${trendLabel}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OverviewStatCard;