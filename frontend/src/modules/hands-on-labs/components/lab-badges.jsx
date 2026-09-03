import React from "react";

export const StatusBadge = ({ status }) => {
  const getStyle = (s) => {
    switch (s) {
      case "In Progress":
        return "bg-[#DDF2FF] text-[#3B82F6]";
      case "Completed":
        return "bg-[#DCFCE7] text-[#22C55E]";
      case "Not Started":
      default:
        return "bg-[#DCFCE7] text-[#22C55E]";
    }
  };

  return (
    <span
      className={`px-[10px] py-[3px] rounded-[8px] text-[12px] font-normal inline-block ${getStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export const DifficultyBadge = ({ difficulty }) => {
  const getStyle = (d) => {
    switch (d?.toLowerCase()) {
      case "easy":
        return "border-[0.5px] border-[#B9BEC7] text-[#4B5563] bg-white";
      case "medium":
        return "border-[0.5px] border-[#B9BEC7] text-[#4B5563] bg-white";
      case "difficult":
      case "hard":
        return "border-[0.5px] border-[#B9BEC7] text-[#4B5563] bg-white";
      default:
        return "border-[0.5px] border-[#B9BEC7] text-[#4B5563] bg-white";
    }
  };

  return (
    <span
      className={`px-[10px] py-[3px] rounded-[8px] text-[12px] font-normal inline-block ${getStyle(
        difficulty
      )}`}
    >
      {difficulty}
    </span>
  );
};

export default StatusBadge;
