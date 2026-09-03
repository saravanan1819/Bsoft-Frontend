import React from "react";


const SIZE = 145;
const CENTER = SIZE / 2;
const RADIUS = 54;
const STROKE_WIDTH = 11;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;


export const CircularProgress = ({ percent = 0, label = "Completed" }) => {
  const safePercent = Math.min(100, Math.max(0, percent));

  const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * safePercent) / 100;

  const angle = -Math.PI / 2 + (safePercent / 100) * 2 * Math.PI;
  const dotX = CENTER + RADIUS * Math.cos(angle);
  const dotY = CENTER + RADIUS * Math.sin(angle);

  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: SIZE, height: SIZE }}
    >
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          className="stroke-[#E6E6E6] fill-transparent"
          strokeWidth={STROKE_WIDTH}
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          className="stroke-black fill-transparent transition-all duration-300"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* Dynamic circle dot marker, follows the ring based on percent */}
      <div
        className="absolute w-[17px] h-[17px] bg-black rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        style={{ left: `${dotX}px`, top: `${dotY}px` }}
      />

      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-sans font-medium text-[24px] leading-none text-black">
          {safePercent} %
        </span>
        <span className="font-sans font-light text-[11px] text-[#9B9B9B] mt-[2px]">
          {label}
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;