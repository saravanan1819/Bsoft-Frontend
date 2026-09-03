import React, { useState } from "react";
import { Icons } from "../../../assets/icons/icons.js";

export const ResourceTabSection = ({ onGoToOutline }) => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "list" | "grid"

  const resources = [
    {
      id: 1,
      title: "Cyber Security Fundamentals - Study Guide",
      type: "PDF",
      subtitle: "PDF • 24 pages",
      category: "Documents",
      iconType: "pdf",
      actionType: "view"
    },
    {
      id: 2,
      title: "Linux Security Commands Cheat Sheet",
      type: "PDF",
      subtitle: "PDF • 2 pages",
      category: "Documents",
      iconType: "pdf",
      actionType: "view"
    },
    {
      id: 3,
      title: "Cyber Security Fundamentals - Study Guide",
      type: "Word Document",
      subtitle: "Word Document • 24 pages",
      category: "Documents",
      iconType: "doc",
      actionType: "view"
    },
    {
      id: 4,
      title: "OWASP Top 10 - Official Website",
      type: "External Link",
      subtitle: "External Link",
      category: "Links",
      iconType: "link",
      actionType: "external"
    },
    {
      id: 5,
      title: "OWASP Top 10 - Official Website",
      type: "External Link",
      subtitle: "External Link",
      category: "Links",
      iconType: "link",
      actionType: "external"
    },
    {
      id: 6,
      title: "Introduction to Cybersecurity Concepts",
      type: "Video",
      subtitle: "Video • 35 min",
      category: "Videos",
      iconType: "video",
      actionType: "play"
    },
    {
      id: 7,
      title: "Introduction to Cybersecurity Concepts",
      type: "Video",
      subtitle: "Video • 35 min",
      category: "Videos",
      iconType: "video",
      actionType: "play"
    }
  ];

  const filteredResources = resources.filter((res) => {
    const matchesFilter = filter === "All" || res.category === filter;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-[28px] md:p-[32px] bg-white flex flex-col gap-[28px]">
      {/* Top Header Row with Title, Subtitle, and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
        <div>
          <h2 className="font-sans font-semibold text-[22px] leading-tight text-[#000000]">
            Course Resources
          </h2>
          <p className="font-sans font-normal text-[15px] leading-normal text-[#737373] mt-[4px]">
            Access study materials, reference and additional learning resources.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative flex items-center w-full sm:w-[260px]">
          <svg
            className="absolute left-[14px] w-[18px] h-[18px] text-[#737373]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#D1D5DB] rounded-full pl-[40px] pr-[16px] py-[8px] font-sans text-[14px] text-[#000000] outline-none placeholder:text-[#737373] focus:border-[#9AD84A] transition-colors"
          />
        </div>
      </div>

      {/* Filter Tabs & View Mode Switches Row */}
      <div className="flex items-center justify-between flex-wrap gap-[16px]">
        {/* Category Filters Pills Container */}
        <div className="bg-[#F3F4F6] p-[4px] rounded-[12px] flex items-center gap-[4px] border border-[#E5E7EB]">
          {["All", "Documents", "Links", "Videos"].map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-[20px] py-[6px] rounded-[8px] font-sans text-[14px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-[#000000] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                    : "text-[#4B5563] hover:text-[#000000]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle Controls */}
        <div className="bg-[#F3F4F6] p-[4px] rounded-[10px] flex items-center gap-[4px] border border-[#E5E7EB]">
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`p-[6px] rounded-[6px] transition-all cursor-pointer ${
              viewMode === "list"
                ? "bg-white opacity-100 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                : "opacity-40 hover:opacity-100"
            }`}
            title="List view"
          >
            <img src={Icons.menuLine} alt="List view" className="w-[18px] h-[18px]" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`p-[6px] rounded-[6px] transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-white opacity-100 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                : "opacity-40 hover:opacity-100"
            }`}
            title="Grid view"
          >
            <img src={Icons.menuSquare} alt="Grid view" className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Grid of Resource Cards or Empty State */}
      {filteredResources.length === 0 ? (
        <div className="py-[60px] flex flex-col items-center justify-center text-center">
          <img src={Icons.noResources} alt="No Resources" className="w-[140px] h-[140px] mb-[24px]" />
          <h3 className="font-sans font-semibold text-[22px] leading-tight text-[#000000] mb-[8px]">
            No Resources yet
          </h3>
          <p className="font-sans font-normal text-[16px] leading-[24px] text-[#737373] max-w-[480px] mb-[28px]">
            There are no resources available for this course. Check back later or contact your Instructor.
          </p>
          <button
            type="button"
            onClick={onGoToOutline}
            className="bg-[#9AD84A] hover:bg-[#8bc93e] text-white font-sans font-medium text-[16px] px-[24px] py-[10px] rounded-full flex items-center gap-[8px] transition-colors cursor-pointer"
          >
            <span>Go to Course Outline</span>
            <svg className="w-[18px] h-[18px]" fill="none" stroke="#141B34" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      ) : (
        <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-[18px]`}>
          {filteredResources.map((item) => (
          <div
            key={item.id}
            className="border border-[#E5E7EB] rounded-[16px] p-[20px] bg-white flex items-center justify-between gap-[16px] hover:border-[#D1D5DB] transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            {/* Left Icon and Title */}
            <div className="flex items-center gap-[16px] min-w-0">
              {/* Type SVG Badge */}
              <div className="shrink-0 flex items-center justify-center">
                {item.iconType === "pdf" && (
                  <img src={Icons.pdfResource} alt="PDF" className="w-[42px] h-[48px]" />
                )}
                {item.iconType === "doc" && (
                  <img src={Icons.docResource} alt="DOC" className="w-[42px] h-[48px]" />
                )}
                {item.iconType === "link" && (
                  <img src={Icons.externalResource} alt="Link" className="w-[44px] h-[44px]" />
                )}
                {item.iconType === "video" && (
                  <img src={Icons.videoResource} alt="Video" className="w-[44px] h-[44px]" />
                )}
              </div>

              {/* Title & Type Description */}
              <div className="flex flex-col min-w-0">
                <h3 className="font-sans font-medium text-[15px] leading-snug text-[#111827] truncate">
                  {item.title}
                </h3>
                <span className="font-sans font-normal text-[13px] leading-normal text-[#6B7280] mt-[2px]">
                  {item.subtitle}
                </span>
              </div>
            </div>

            {/* Right Action Button Icon */}
            <button
              type="button"
              className="w-[38px] h-[38px] rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#141B34] hover:bg-[#E5E7EB] transition-colors shrink-0 cursor-pointer"
            >
              {item.actionType === "view" && (
                <img src={Icons.eye} alt="View" className="w-[18px] h-[18px]" />
              )}
              {item.actionType === "external" && (
                <svg className="w-[18px] h-[18px]" fill="none" stroke="#141B34" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              )}
              {item.actionType === "play" && (
                <svg className="w-[18px] h-[18px]" fill="none" stroke="#141B34" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <circle cx="12" cy="12" r="9" strokeWidth="2" />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default ResourceTabSection;
