import React from "react";
import { Icons } from "../../assets/icons/icons.js";

/**
 * Reusable EmptyState UI Component matching empty-state.jpg design.
 * 
 * Props:
 * - title: Heading text (e.g. "No Courses Found")
 * - description: Subtitle text explanation
 * - icon: Center SVG illustration (defaults to Icons.noItem)
 * - onRefresh: Callback function for the refresh/action button
 * - actionLabel: Text label for button (default: "Refresh")
 * - actionIcon: Icon for button (defaults to Icons.refresh)
 * - showBorder: Boolean whether to wrap in card border (default: false)
 * - centerInViewport: Boolean whether to expand vertically to fill screen height (default: true)
 * - className: Additional CSS classes for custom overrides
 */
export const EmptyState = ({
  title = "No Courses Assigned Yet",
  description = "You don't have any courses assigned to you yet. Once your faculty assigns a course, it will appear here.",
  icon = Icons.noItem,
  onRefresh,
  actionLabel = "Refresh",
  actionIcon = Icons.refresh,
  showBorder = false,
  centerInViewport = true,
  className = "",
}) => {
  return (
    <div
      className={`w-full py-[32px] px-[20px] flex flex-col items-center justify-center text-center tracking-normal ${
        centerInViewport ? "flex-1 min-h-[60vh] md:min-h-[65vh] my-auto" : "my-[8px]"
      } ${
        showBorder
          ? "bg-white border-[0.7px] border-[#B9BEC7] rounded-[24px] shadow-xs"
          : ""
      } ${className}`}
    >
      {/* Center SVG Graphic */}
      <div className="w-[181px] h-[130px] flex items-center justify-center mb-[20px]">
        <img
          src={icon}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="font-sans font-medium text-[23px] text-[#000000] tracking-normal">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="font-sans font-normal text-[16px] text-[#737373] max-w-[540px] leading-snug mt-[8px] tracking-normal">
          {description}
        </p>
      )}

      {/* Action / Refresh Button */}
      {onRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          className="mt-[24px] bg-[#9AD84A] hover:bg-[#8EC63F] text-white font-normal text-[16px] tracking-normal py-[10px] px-[24px] rounded-[50px] flex items-center justify-center gap-[8px] transition-all cursor-pointer shadow-xs active:scale-[0.98]"
        >
          {actionIcon && (
            <img
              src={actionIcon}
              alt={actionLabel}
              className="w-[18px] h-[18px] brightness-0 invert"
            />
          )}
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
