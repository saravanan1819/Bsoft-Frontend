import React from "react";
import { Icons } from "../../assets/icons/icons.js";

export const ViewToggle = ({ viewMode, onViewModeChange }) => (
  <div className="flex items-center border-[0.5px] border-[#B9BEC7] rounded-[10px] p-[3px] bg-[#F0F1F3]">
    <button
      type="button"
      onClick={() => onViewModeChange && onViewModeChange("list")}
      className={`p-[6px] rounded-[7px] transition-colors cursor-pointer ${
        viewMode === "list"
          ? "bg-white text-[#111827] shadow-sm"
          : "text-[#374151] hover:bg-black/5"
      }`}
      title="List view"
    >
      <img src={Icons.menuLine} alt="List view" className="w-[16px] h-[16px]" />
    </button>
    <button
      type="button"
      onClick={() => onViewModeChange && onViewModeChange("grid")}
      className={`p-[6px] rounded-[7px] transition-colors cursor-pointer ${
        viewMode === "grid"
          ? "bg-white text-[#111827] shadow-sm"
          : "text-[#374151] hover:bg-black/5"
      }`}
      title="Grid view"
    >
      <img src={Icons.menuSquare} alt="Grid view" className="w-[16px] h-[16px]" />
    </button>
  </div>
);

export const SearchFilterBar = ({
  searchQuery = "",
  onSearchChange,
  activeTab = "All",
  onTabChange,
  tabs = ["All", "Not Started", "In Progress", "Completed"],
  viewMode,
  onViewModeChange,
  placeholder = "Search",
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-[16px]">
      <div className="flex flex-wrap items-center gap-[12px]">
        {/* Search Box */}
        <div className="relative flex-1 md:w-[220px]">
          <span className="absolute inset-y-0 left-0 pl-[12px] flex items-center pointer-events-none">
            <img src={Icons.searchBold} alt="Search" className="w-[18px] h-[18px]" />
          </span>
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="w-full pl-[38px] pr-[12px] py-[8px] border-[0.5px] border-[#B9BEC7] rounded-[10px] text-[14px] font-normal text-[#000000] placeholder-[#000000] focus:outline-none focus:border-[#9AD84A] bg-white"
          />
        </div>

        {/* Filter Tabs Pills */}
        <div className="flex items-center bg-[#F0F1F3] border-[0.5px] border-[#B9BEC7] p-[3px] rounded-[10px] overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange && onTabChange(tab)}
                className={`px-[14px] py-[6px] rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-white text-[#111827] shadow-sm"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional View Mode Switcher Icons (List / Grid) */}
      {viewMode !== undefined && onViewModeChange && (
        <div className="self-end md:self-auto">
          <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;
