import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CyberSecurityPng from "../../assets/images/cyber-security.png";
import { SearchFilterBar, ViewToggle } from "../../components/shared/search-filter-bar.jsx";
import { EmptyState } from "../../components/shared/empty-state.jsx";
import { Icons } from "../../assets/icons/icons.js";

const CONTINUE_LEARNING_COURSES = [
  {
    id: "cyber-security-fundamentals-continue",
    title: "Cyber Security Fundamentals",
    description: "Build a strong foundation in cybersecurity through structured lessons, practical exercises...",
    progressPercentage: 42,
    status: "in-progress",
    startDate: "01 Aug 2026",
    endDate: "31 Aug 2026",
    xp: 100,
    badgeText: "42% Complete",
    statusBadge: "In Progress",
    actionLabel: "Continue Course"
  }
];

const MY_COURSES = [
  {
    id: "cyber-security-fundamentals-not-started",
    title: "Cyber Security Fundamentals",
    description: "Build a strong foundation in cybersecurity through structured lessons, practical exercises...",
    progressPercentage: 0,
    status: "not-started",
    startDate: "01 Aug 2026",
    endDate: "31 Aug 2026",
    xp: 100,
    image: CyberSecurityPng,
    statusBadge: "Not Started",
    actionLabel: "Start Course"
  },
  {
    id: "cyber-security-fundamentals-in-progress",
    title: "Cyber Security Fundamentals",
    description: "Build a strong foundation in cybersecurity through structured lessons, practical exercises...",
    progressPercentage: 42,
    status: "in-progress",
    startDate: "01 Aug 2026",
    endDate: "31 Aug 2026",
    xp: 100,
    badgeText: "42% Complete",
    statusBadge: "In Progress",
    actionLabel: "Continue Course"
  },
  {
    id: "cyber-security-fundamentals-completed",
    title: "Cyber Security Fundamentals",
    description: "Build a strong foundation in cybersecurity through structured lessons, practical exercises...",
    progressPercentage: 100,
    status: "completed",
    startDate: "01 Aug 2026",
    endDate: "31 Aug 2026",
    xp: 100,
    statusBadge: "Completed",
    actionLabel: "View Course"
  }
];

export const CourseListPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [continueViewMode, setContinueViewMode] = useState("grid"); // "grid" | "list" for Continue Learning
  const [simulationState, setSimulationState] = useState("courses"); // "courses" | "empty"

  const filteredMyCourses = MY_COURSES.filter((c) => {
    if (activeFilter === "Not Started" && c.status !== "not-started") return false;
    if (activeFilter === "In Progress" && c.status !== "in-progress") return false;
    if (activeFilter === "Completed" && c.status !== "completed") return false;

    if (
      searchQuery.trim() &&
      !c.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleOpenCourse = () => {
    navigate("/courses/detail");
  };

  const handleResetFilters = () => {
    setActiveFilter("All");
    setSearchQuery("");
  };

  return (
    <div className="w-full max-w-none pb-8 font-sans text-black flex flex-col gap-6 flex-1 min-h-[calc(100vh-140px)]">
      {/* Course Listing State Switcher (API Backend Simulation Bar matching Certificate page) */}
      <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] px-[16px] py-[10px] flex flex-wrap items-center justify-between gap-[8px]">
        <span className="font-sans font-medium text-[13px] text-[#374151]">
          Course Listing State Switcher (API Backend Simulation):
        </span>
        <div className="flex items-center gap-[6px]">
          <button
            type="button"
            onClick={() => setSimulationState("courses")}
            className={`px-[12px] py-[4px] rounded-[6px] font-sans text-[12px] font-medium transition-colors cursor-pointer ${
              simulationState === "courses" ? "bg-[#9AD84A] text-white shadow-xs" : "bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50"
            }`}
          >
            With Courses
          </button>
          <button
            type="button"
            onClick={() => setSimulationState("empty")}
            className={`px-[12px] py-[4px] rounded-[6px] font-sans text-[12px] font-medium transition-colors cursor-pointer ${
              simulationState === "empty" ? "bg-[#9AD84A] text-white shadow-xs" : "bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50"
            }`}
          >
            Empty State
          </button>
        </div>
      </div>

      {/* Conditionally Render Empty State or Full Course List */}
      {simulationState === "empty" ? (
        <EmptyState
          title="No Courses Assigned Yet"
          description="You don't have any courses assigned to you yet. Once your faculty assigns a course, it will appear here."
          onRefresh={() => window.location.reload()}
        />
      ) : (
        <>
          {/* Section 1: Continue Learning */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-sans font-semibold text-[17px] sm:text-[18px] text-[#000000]">
                Continue Learning
              </h2>
              <ViewToggle viewMode={continueViewMode} onViewModeChange={setContinueViewMode} />
            </div>

            <div className="w-full">
              {CONTINUE_LEARNING_COURSES.map((course) => (
                <div
                  key={course.id}
                  className={`bg-white border-[0.5px] border-[#B9BEC7] rounded-[16px] p-3.5 flex transition-all ${
                    continueViewMode === "grid"
                      ? "flex-col justify-between w-full sm:w-[400px] md:w-[440px]"
                      : "flex-col md:flex-row md:items-center justify-between gap-4 w-full"
                  }`}
                >
                  <div className={`flex ${continueViewMode === "list" ? "flex-col md:flex-row items-start md:items-center gap-4 flex-1 min-w-0" : "flex-col"}`}>
                    <div
                      className={`relative bg-[#E9F3DF] border-[0.5px] border-[#C5DDA8] rounded-[12px] overflow-hidden flex items-center justify-center p-2 shrink-0 ${
                        continueViewMode === "list"
                          ? "w-full md:w-[180px] h-[110px]"
                          : "w-full h-[145px]"
                      }`}
                    >
                      {/* Badges: Side-by-side in Grid view, 2-Row Stacked in List view */}
                      <div
                        className={`absolute top-2.5 left-2.5 z-10 flex ${
                          continueViewMode === "list"
                            ? "flex-col items-start gap-1"
                            : "right-2.5 items-center justify-between"
                        }`}
                      >
                        <span className="bg-[#9AD84A] text-white font-sans text-[10px] font-normal px-2 py-0.5 rounded-[6px] shadow-xs whitespace-nowrap">
                          {course.badgeText}
                        </span>
                        <span className="bg-[#3B82F6] text-white font-sans text-[10px] font-normal px-2 py-0.5 rounded-[6px] shadow-xs whitespace-nowrap">
                          {course.statusBadge}
                        </span>
                      </div>
                    </div>

                    <div className={continueViewMode === "list" ? "flex-1 min-w-0" : "mt-3"}>
                      <h3 className="font-sans font-medium text-[16px] text-[#000000] leading-snug">
                        {course.title}
                      </h3>
                      <p className="font-sans font-normal text-[14px] text-[#737373] mt-1 leading-snug line-clamp-2">
                        {course.description}
                      </p>

                      <div className="mt-2.5">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] border-[0.5px] border-[#B9BEC7] bg-white text-[#000000] font-normal text-[12px] whitespace-nowrap">
                          <svg className="w-3.5 h-3.5 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.8" />
                            <path strokeWidth="1.8" strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
                          </svg>
                          <span>{course.startDate} - {course.endDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-3 shrink-0 ${
                      continueViewMode === "list"
                        ? "md:ml-auto"
                        : "mt-4 pt-2.5 border-t border-gray-100 justify-between w-full"
                    }`}
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border-[0.5px] border-[#B9BEC7] bg-white text-[#000000] font-normal text-[12px] shrink-0 whitespace-nowrap">
                      <span className="text-[12px]">⭐</span>
                      <span>{course.xp} XP</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleOpenCourse}
                      className="bg-[#9AD84A] hover:bg-[#8EC63F] text-white font-normal text-[14px] py-1.5 px-4 rounded-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-[0.98] shrink-0 whitespace-nowrap"
                    >
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>{course.actionLabel}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: My Courses */}
          <section className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <h2 className="font-sans font-semibold text-[17px] sm:text-[18px] text-[#000000]">
                My Courses
              </h2>

              <SearchFilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeTab={activeFilter}
                onTabChange={setActiveFilter}
                tabs={["All", "Not Started", "In Progress", "Completed"]}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </div>

            {filteredMyCourses.length === 0 ? (
              <EmptyState
                title="No Courses Found"
                description="We couldn't find any courses matching your search or active filter."
                onRefresh={handleResetFilters}
                actionLabel="Reset Filters"
                centerInViewport={false}
                showBorder={true}
              />
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "flex flex-col gap-3.5 w-full"
                }
              >
                {filteredMyCourses.map((course) => (
                  <div
                    key={course.id}
                    className={`w-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[16px] p-3.5 flex transition-all ${
                      viewMode === "list"
                        ? "flex-col md:flex-row md:items-center justify-between gap-4"
                        : "flex-col justify-between"
                    }`}
                  >
                    <div className={`flex ${viewMode === "list" ? "flex-col md:flex-row items-start md:items-center gap-4 flex-1 min-w-0" : "flex-col"}`}>
                      <div
                        className={`relative bg-[#E9F3DF] border-[0.5px] border-[#C5DDA8] rounded-[12px] overflow-hidden flex items-center justify-center shrink-0 ${
                          viewMode === "list"
                            ? "w-full md:w-[180px] h-[110px]"
                            : "w-full h-[145px]"
                        }`}
                      >
                        {/* Badges: Side-by-side in Grid view, 2-Row Stacked in List view */}
                        <div
                          className={`absolute top-2.5 left-2.5 z-10 flex ${
                            viewMode === "list"
                              ? "flex-col items-start gap-1"
                              : "right-2.5 items-center justify-between"
                          }`}
                        >
                          {course.badgeText ? (
                            <span className="bg-[#9AD84A] text-white font-sans text-[10px] font-normal px-2 py-0.5 rounded-[6px] shadow-xs whitespace-nowrap">
                              {course.badgeText}
                            </span>
                          ) : (
                            viewMode === "grid" && <div />
                          )}

                          {course.status === "not-started" && (
                            <span className="bg-[#F97316] text-white font-sans text-[10px] font-normal px-2 py-0.5 rounded-[6px] shadow-xs whitespace-nowrap ml-auto">
                              {course.statusBadge}
                            </span>
                          )}

                          {course.status === "in-progress" && (
                            <span className="bg-[#3B82F6] text-white font-sans text-[10px] font-normal px-2 py-0.5 rounded-[6px] shadow-xs whitespace-nowrap ml-auto">
                              {course.statusBadge}
                            </span>
                          )}

                          {course.status === "completed" && (
                            <span className="bg-[#22C55E] text-white font-sans text-[10px] font-normal px-2 py-0.5 rounded-[6px] shadow-xs whitespace-nowrap ml-auto">
                              {course.statusBadge}
                            </span>
                          )}
                        </div>

                        {course.image && (
                          <img
                            src={course.image}
                            alt={course.title}
                            className="max-h-full max-w-full object-contain"
                          />
                        )}
                      </div>

                      <div className={viewMode === "list" ? "flex-1 min-w-0" : "mt-3"}>
                        <h3 className="font-sans font-medium text-[16px] text-[#000000] leading-snug">
                          {course.title}
                        </h3>
                        <p className="font-sans font-normal text-[14px] text-[#737373] mt-1 leading-snug line-clamp-2">
                          {course.description}
                        </p>

                        <div className="mt-2.5">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] border-[0.5px] border-[#B9BEC7] bg-white text-[#000000] font-normal text-[12px] whitespace-nowrap">
                            <svg className="w-3.5 h-3.5 text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.8" />
                              <path strokeWidth="1.8" strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
                            </svg>
                            <span>{course.startDate} - {course.endDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-3 shrink-0 ${
                        viewMode === "list"
                          ? "md:ml-auto"
                          : "mt-4 pt-2.5 border-t border-gray-100 justify-between w-full"
                      }`}
                    >
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border-[0.5px] border-[#B9BEC7] bg-white text-[#000000] font-normal text-[12px] shrink-0 whitespace-nowrap">
                        <span className="text-[12px]">⭐</span>
                        <span>{course.xp} XP</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleOpenCourse}
                        className="bg-[#9AD84A] hover:bg-[#8EC63F] text-white font-normal text-[14px] py-1.5 px-4 rounded-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-[0.98] shrink-0 whitespace-nowrap"
                      >
                        <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>{course.actionLabel}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default CourseListPage;
