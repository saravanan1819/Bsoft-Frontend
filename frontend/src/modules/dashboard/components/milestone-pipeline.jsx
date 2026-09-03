import React from "react";
import { Icons } from "../../../assets/icons/icons.js";


const getMilestoneNodeConfig = (status) => {
  switch (status) {
    case "completed":
      return {
        icon: Icons.milestoneCompleted,
        statusLabel: "Completed",
        outerClass: "bg-[rgba(154,216,74,0.1)] border border-primary",
        innerClass: "bg-primary shadow-[0px_2px_0.2px_rgba(0,0,0,0.1)]",
        iconClass: "w-[20px] h-[20px] translate-x-[0.5px] translate-y-[1px]",
        hasInnerCircle: true,
      };
    case "in-progress":
      return {
        icon: Icons.milestoneInProgress,
        statusLabel: "In Progress",
        outerClass: "bg-[rgba(154,216,74,0.1)] border border-primary",
        innerClass: "bg-primary shadow-[0px_2px_0.2px_rgba(0,0,0,0.1)]",
        iconClass: "w-[20px] h-[20px] translate-x-[0.5px] translate-y-[0.5px]",
        hasInnerCircle: true,
      };
    case "locked":
    default:
      return {
        icon: Icons.milestoneLocked,
        statusLabel: "Locked",
        outerClass: "bg-[#FAFAFA] border border-gray-300",
        innerClass: "",
        iconClass: "w-[18px] h-[18px]",
        hasInnerCircle: false,
      };
  }
};


const getConnectorLineConfig = (currentStatus, nextStatus) => {
  switch (true) {
    // Completed -> Completed or Completed -> In Progress
    case currentStatus === "completed":
      return { type: "solid", color: "primary" };

    // In Progress -> anything
    case currentStatus === "in-progress":
      return { type: "dashed-fade" };

    // Locked -> anything
    case currentStatus === "locked":
    default:
      return { type: "solid", color: "grey" };
  }
};

const MilestoneNode = ({ label, status }) => {
  const config = getMilestoneNodeConfig(status);

  return (
    <div className="relative flex flex-col items-center shrink-0">
      <div className={`w-[52px] h-[52px] rounded-full flex items-center justify-center ${config.outerClass}`}>
        {config.hasInnerCircle ? (
          <div className={`w-[38px] h-[38px] rounded-full flex items-center justify-center ${config.innerClass}`}>
            <img src={config.icon} alt={config.statusLabel} className={config.iconClass} />
          </div>
        ) : (
          <img src={config.icon} alt={config.statusLabel} className={config.iconClass} />
        )}
      </div>
      <div className="absolute top-[56px] flex flex-col items-center w-[90px]">
        <span className="font-sans font-normal text-[11.5px] text-black leading-none">{label}</span>
        <span className="font-sans font-light text-[10px] text-black mt-[3px]">
          {config.statusLabel}
        </span>
      </div>
    </div>
  );
};

const ConnectorLine = ({ currentStatus, nextStatus }) => {
  const lineConfig = getConnectorLineConfig(currentStatus, nextStatus);

  if (lineConfig.type === "dashed-fade") {
    return (
      <div className="flex-1 h-[3.5px] flex items-center shrink-0 min-w-[24px] mx-[4px]">
        <div className="w-[60%] h-[3.5px] rounded-full bg-primary" />
        <div
          className="w-[40%] h-[3.5px] rounded-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #9AD84A, #9AD84A 2px, rgba(154, 216, 74, 0.2) 2px, rgba(154, 216, 74, 0.2) 6px)",
          }}
        />
      </div>
    );
  }

  const solidColorClass = lineConfig.color === "primary" ? "bg-primary" : "bg-[#DEDEDE]";
  return <div className={`flex-1 h-[3.5px] rounded-full ${solidColorClass} shrink-0 min-w-[24px] mx-[4px]`} />;
};


export const MilestonePipeline = ({ milestones = [] }) => {
  return (
    <div className="w-full h-[125px] bg-white border-[0.5px] border-[#B9BEC7] rounded-[18px] px-[20px] box-border flex items-start pt-[20px] justify-between mt-[12px] overflow-x-auto no-scrollbar">
      <div className="flex items-center justify-between w-full min-w-[600px] h-[52px]">
        {milestones.map((milestone, index) => {
          const nextMilestone = milestones[index + 1];
          return (
            <React.Fragment key={milestone.id}>
              <MilestoneNode label={milestone.label} status={milestone.status} />
              {nextMilestone && (
                <ConnectorLine
                  currentStatus={milestone.status}
                  nextStatus={nextMilestone.status}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default MilestonePipeline;