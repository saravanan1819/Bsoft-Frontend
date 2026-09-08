import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OverviewStatCard } from "./overview-statcard.jsx";
import { CircularProgress } from "./circular-progress.jsx";
import { MilestonePipeline } from "./milestone-pipeline.jsx";
import { LearningConsistencyHeatmap } from "./learning-consistency.jsx";
import { SkillGraphCard } from "./skill-graph.jsx";
import { UpcomingAssessmentCard } from "./upcoming-assessment.jsx";
import { UpcomingScheduleCard } from "./upcoming-schedule.jsx";
import { RecommendedSectionCard } from "./recommended.jsx";
import { TopStudentsCard } from "./top-students.jsx";
import { RecentActivityCard } from "./recent-activity.jsx";
import { Icons } from "../../../assets/icons/icons.js";

const LOCKED_MILESTONES = [
  { id: 1, label: "Milestone 1", status: "locked" },
  { id: 2, label: "Milestone 2", status: "locked" },
  { id: 3, label: "Milestone 3", status: "locked" },
  { id: 4, label: "Milestone 4", status: "locked" },
  { id: 5, label: "Milestone 5", status: "locked" },
];

const EMPTY_SKILL_GRAPH = {
  week: {
    overallPercent: 0,
    indicatorBars: ["#E4E4E7", "#E4E4E7", "#E4E4E7"],
    lineData: [
      { label: "Week 1", frontend: 0, backend: 0, cybersecurity: 0, aws: 0 },
      { label: "Week 2", frontend: 0, backend: 0, cybersecurity: 0, aws: 0 },
      { label: "Week 3", frontend: 0, backend: 0, cybersecurity: 0, aws: 0 },
      { label: "Week 4", frontend: 0, backend: 0, cybersecurity: 0, aws: 0 },
    ],
    pieData: [
      { name: "Frontend", value: 0, color: "#FF8A34" },
      { name: "Backend", value: 0, color: "#B175FF" },
      { name: "Cyber Security", value: 0, color: "#3B72F6" },
      { name: "AWS", value: 0, color: "#22C55E" },
    ],
  },
  month: {
    overallPercent: 0,
    indicatorBars: ["#E4E4E7", "#E4E4E7", "#E4E4E7"],
    lineData: [
      { label: "Jan", frontend: 0, backend: 0, cybersecurity: 0, aws: 0 },
      { label: "Feb", frontend: 0, backend: 0, cybersecurity: 0, aws: 0 },
      { label: "Mar", frontend: 0, backend: 0, cybersecurity: 0, aws: 0 },
    ],
    pieData: [
      { name: "Frontend", value: 0, color: "#FF8A34" },
      { name: "Backend", value: 0, color: "#B175FF" },
      { name: "Cyber Security", value: 0, color: "#3B72F6" },
      { name: "AWS", value: 0, color: "#22C55E" },
    ],
  },
  "all-time": {
    overallPercent: 0,
    indicatorBars: ["#E4E4E7", "#E4E4E7", "#E4E4E7"],
    lineData: [
      { label: "Jan 2026", frontend: 0, backend: 0, cybersecurity: 0, aws: 0 },
      { label: "May 2026", frontend: 0, backend: 0, cybersecurity: 0, aws: 0 },
    ],
    pieData: [
      { name: "Frontend", value: 0, color: "#FF8A34" },
      { name: "Backend", value: 0, color: "#B175FF" },
      { name: "Cyber Security", value: 0, color: "#3B72F6" },
      { name: "AWS", value: 0, color: "#22C55E" },
    ],
  },
};

const MOCK_AI_RECOMMENDATIONS = [
  { id: "rec-1", text: "Complete your profile to unlock personalized learning paths." },
  { id: "rec-2", text: "Explore Cybersecurity Fundamentals course." },
  { id: "rec-3", text: "Take your first hands-on lab assignment." },
  { id: "rec-4", text: "Check upcoming assessments schedule." },
  { id: "rec-5", text: "Set up your daily learning goal." },
];

export const FirstUserDashboard = () => {
  const navigate = useNavigate();
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState("All time");
  const outletCtx = useOutletContext();
  const isProfileOpen = outletCtx?.isProfileOpen || false;

  return (
    <div className="flex flex-col gap-[24px] w-full max-w-full min-w-0 pb-[36px] overflow-x-hidden font-sans tracking-normal">
      {/* 1. Welcome Section */}
      <div className="flex flex-col h-auto">
        <h2 className="font-sans font-semibold text-[19px] sm:text-[21px] leading-tight text-black">
          Welcome to Bsoft, Jabez 👋
        </h2>
        <p className="font-sans font-normal text-[13.5px] sm:text-[15px] leading-normal text-[#737373] mt-[5px] sm:mt-[9px]">
          Your courses, learning activities, hands-on-labs and assessments will appear here once you are enrolled.
        </p>
      </div>

      {/* 2. AI Assistant Dropdown Banner */}
      <div className="w-full min-w-0">
        <button
          type="button"
          onClick={() => setIsAiAssistantOpen((prev) => !prev)}
          aria-expanded={isAiAssistantOpen}
          className={`w-full md:h-[44px] min-h-[44px] py-2.5 md:py-0 bg-[#F0F1F3] flex items-center pl-[8px] pr-[14px] md:pr-[24px] box-border text-left cursor-pointer transition-all duration-300 ease-in-out ${
            isAiAssistantOpen
              ? "rounded-t-[18px] rounded-b-none"
              : "rounded-[18px] md:rounded-full"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center flex-1 gap-2 md:gap-0">
            <div className="flex items-center">
              <div className="w-[32px] h-[32px] rounded-full bg-white border-[0.5px] border-[#B9BEC7] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0">
                <img src={Icons.aiAssistant} alt="AI" className="w-[18px] h-[18px]" />
              </div>
              <span className="font-sans font-semibold text-[15px] text-black ml-[10px]">
                AI Assistant
              </span>
            </div>
            <div className="hidden md:block w-[1px] h-[18px] bg-[#858D9D] opacity-80 mx-[14px]" />
            <span className="font-sans font-normal text-[13.5px] text-[#737373] ml-2 md:ml-0">
              You have 5 personalized recommendations to improve your cybersecurity skills.
            </span>
          </div>
          <div className="flex items-center justify-center cursor-pointer hover:opacity-85 shrink-0 ml-4">
            <img
              src={Icons.arrow1Black}
              alt="Toggle"
              className={`w-[18px] h-[18px] opacity-70 transition-transform duration-300 ease-in-out ${
                isAiAssistantOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isAiAssistantOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div className="w-full bg-[#F0F1F3] rounded-b-[18px] px-[14px] md:px-[24px] pb-[14px] pt-[4px] box-border">
              <ul className="flex flex-col gap-[8px]">
                {MOCK_AI_RECOMMENDATIONS.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {}}
                      className="w-full text-left font-sans font-normal text-[13.5px] text-[#404040] bg-white rounded-[10px] px-[12px] py-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.08)] cursor-pointer hover:opacity-85 transition-opacity duration-150"
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Profile Completion Banner */}
      <div className="w-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[20px] box-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-[16px]">
          <img src={Icons.avatarProfile} alt="Profile" className="w-[52px] h-[52px] shrink-0" />
          <div>
            <h3 className="font-sans font-semibold text-[15px] text-black mb-[2px]">
              Complete Your Profile
            </h3>
            <p className="font-sans font-normal text-[13.5px] text-[#737373]">
              Your profile is 40% complete. Add the remaining details to finish setting it up.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/create-profile")}
          className="w-[170px] h-[40px] py-[8px] bg-[#9AD84A] rounded-[9px] flex items-center justify-center gap-[8px] cursor-pointer hover:opacity-90 transition-opacity outline-none border-none shadow-[2px_2px_4px_0px_rgba(0,0,0,0.12)] shrink-0"
        >
          <span className="font-sans font-medium text-[14px] text-white">Complete Profile</span>
          <img src={Icons.getStarted} alt="Arrow" className="w-[14px] h-[9px]" />
        </button>
      </div>

      {/* 4. Rows Container: Learning Overview & My Progress */}
      <div className={`flex flex-col ${isProfileOpen ? "w-full gap-[20px]" : "xl:flex-row items-stretch gap-[20px] w-full min-w-0"} mt-[2px]`}>
        {/* Learning Overview Empty Card */}
        <div className={`w-full ${isProfileOpen ? "" : "xl:w-[280px]"} h-auto bg-white border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[20px] box-border flex flex-col justify-between shrink-0`}>
          <div className="flex flex-col h-full">
            {/* Title */}
            <div className="flex items-center gap-[6px] mb-[20px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-[#F0F1F3] flex items-center justify-center shrink-0">
                  <img src={Icons.learningOverview} alt="Overview" className="w-[16px] h-[16px]" />
                </div>
                <h3 className="font-sans font-semibold text-[15px] text-black">
                  Learning Overview
                </h3>
              </div>
              <img src={Icons.alertCircle} alt="Alert" className="w-[14px] h-[14px] cursor-help opacity-70" />
            </div>

            {/* Empty Overview Content */}
            <div className="flex flex-col items-center justify-center my-auto py-4">
              <div className="w-[88px] h-[88px] rounded-full bg-[#F0F1F3] flex items-center justify-center mb-4">
                <img src={Icons.gitbook} alt="Not Started" className="w-[40px] h-[40px]" />
              </div>
              <h4 className="font-sans font-semibold text-[17px] text-black mb-1 tracking-normal">
                Not Started
              </h4>
              <p className="font-sans font-normal text-[14px] text-[#737373] text-center max-w-[210px] leading-snug mb-[44px] tracking-normal">
                Start learning to see you overview here
              </p>
              <button
                type="button"
                onClick={() => navigate("/courses")}
                className="w-[200px] h-[40px] bg-[#9BD94A] rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 outline-none border-none shadow-sm shrink-0"
              >
                <span className="font-sans font-medium text-[14px] text-white tracking-normal">
                  Explore My Courses
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* My Progress Card matching MYProgress.jpg */}
        <div className={`w-full ${isProfileOpen ? "min-w-0" : "flex-1 min-w-0"} h-auto bg-white border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[20px] box-border flex flex-col justify-between shrink-0 gap-6`}>
          <div>
            {/* Title */}
            <div className="flex items-center gap-[6px] mb-[18px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-[#F0F1F3] flex items-center justify-center shrink-0">
                  <img src={Icons.myProgress} alt="Progress" className="w-[18px] h-[18px]" />
                </div>
                <h3 className="font-sans font-semibold text-[15px] text-black flex items-center gap-[5px] tracking-normal">
                  My Progress
                  <img src={Icons.alertCircle} alt="Alert" className="w-[14px] h-[14px] cursor-help opacity-70" />
                </h3>
              </div>
            </div>

            {/* Empty Progress Content with Analytics Icon */}
            <div className="flex flex-col items-center justify-center py-2 mb-4">
              <div className="w-[88px] h-[88px] rounded-full bg-[#F0F1F3] flex items-center justify-center mb-3">
                <img src={Icons.analytics} alt="Analytics" className="w-[40px] h-[40px]" />
              </div>
              <h4 className="font-sans font-semibold text-[17px] text-black mb-1 tracking-normal">
                No active learning yet
              </h4>
              <p className="font-sans font-normal text-[14px] text-[#737373] text-center tracking-normal">
                Once you start the course, your progress will appear here
              </p>
            </div>

            {/* Stepper Pipeline Box from MYProgress.jpg */}
            <div className="w-full bg-[#FAFAFA] border-[0.5px] border-[#E5E7EB] rounded-[18px] py-[20px] px-[16px] md:px-[28px] overflow-x-auto no-scrollbar">
              <div className="flex items-center justify-between min-w-[540px] relative">
                {/* Connecting Line */}
                <div className="absolute top-[26px] left-[30px] right-[30px] h-[2px] bg-[#E5E7EB] z-0" />

                {[
                  { num: 1, label: "Milestone 1", statusLabel: "Completed" },
                  { num: 2, label: "Milestone 2", statusLabel: "In Progress" },
                  { num: 3, label: "Milestone 3", statusLabel: "Locked" },
                  { num: 4, label: "Milestone 4", statusLabel: "Locked" },
                  { num: 5, label: "Milestone 5", statusLabel: "Locked" },
                ].map((item) => (
                  <div key={item.num} className="flex flex-col items-center z-10">
                    <div className="w-[52px] h-[52px] rounded-full bg-white border border-[#D1D5DB] flex items-center justify-center shadow-sm mb-[8px]">
                      <svg className="w-[20px] h-[20px] text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                    </div>
                    <span className="font-sans font-semibold text-[13px] text-black whitespace-nowrap">
                      {item.label}
                    </span>
                    <span className="font-sans font-normal text-[11px] text-[#737373] whitespace-nowrap mt-[2px]">
                      {item.statusLabel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/courses")}
            className="w-full h-[44px] bg-[#9BD94A] hover:bg-[#8EC63F] rounded-[12px] flex items-center justify-center cursor-pointer transition-opacity outline-none border-none shadow-sm shrink-0"
          >
            <span className="font-sans font-semibold text-[15px] text-white">
              Start Learning
            </span>
          </button>
        </div>
      </div>

      {/* 5. Learning Consistency Heatmap */}
      {/* 5. Learning Consistency Empty Card matching Rectangle 92.jpg */}
      <div className="w-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[20px] box-border mt-[6px] flex flex-col justify-between shrink-0 min-h-[230px]">
        {/* Title */}
        <div className="flex items-center gap-[6px] mb-[12px]">
          <div className="flex items-center gap-[8px]">
            <div className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-[#F0F1F3] flex items-center justify-center shrink-0">
              <img src={Icons.learningConsistency} alt="Consistency" className="w-[16px] h-[16px]" />
            </div>
            <h3 className="font-sans font-semibold text-[15px] text-black flex items-center gap-[5px]">
              Learning Consistency
              <img src={Icons.alertCircle} alt="Alert" className="w-[14px] h-[14px] cursor-help opacity-70" />
            </h3>
          </div>
        </div>

        {/* Empty Content with Chart Icon */}
        <div className="flex flex-col items-center justify-center my-auto py-4">
          <div className="w-[88px] h-[88px] rounded-full bg-[#F0F1F3] flex items-center justify-center mb-3">
            <img src={Icons.chart} alt="Chart" className="w-[40px] h-[40px]" />
          </div>
          <h4 className="font-sans font-semibold text-[17px] text-black mb-1 tracking-normal">
            No active learning yet
          </h4>
          <p className="font-sans font-normal text-[14px] text-[#737373] text-center tracking-normal">
            Once you start the course, your progress will appear here
          </p>
        </div>
      </div>

      {/* 6. Skill Growth Empty Card matching Skill Grraph.jpg */}
      <div className="w-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[20px] box-border mt-[6px] flex flex-col justify-between shrink-0 min-h-[260px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <div className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-[#F0F1F3] flex items-center justify-center shrink-0">
              <img src={Icons.learningConsistency} alt="Skill Growth" className="w-[16px] h-[16px]" />
            </div>
            <h3 className="font-sans font-semibold text-[15px] text-black flex items-center gap-[5px]">
              Skill Growth
              <img src={Icons.alertCircle} alt="Alert" className="w-[14px] h-[14px] cursor-help opacity-70" />
            </h3>
          </div>

          {/* Refresh + Period Tabs Switcher */}
          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              className="w-[30px] h-[30px] rounded-full border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center shrink-0 hover:bg-[#F4F4F5] transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#404040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                <path d="M21 3v6h-6" />
              </svg>
            </button>

            <div className="bg-[#F4F4F5] p-[2.5px] rounded-full flex items-center">
              {["All time", "Week", "Month"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveSkillTab(tab)}
                  className={`px-[14px] py-[3.5px] text-[11.5px] font-medium rounded-full transition-all duration-200 cursor-pointer ${
                    activeSkillTab === tab
                      ? "bg-white text-black shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                      : "text-[#71717A] hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty Content with ChartUp Icon */}
        <div className="flex flex-col items-center justify-center my-auto py-6">
          <div className="w-[88px] h-[88px] rounded-full bg-[#F0F1F3] flex items-center justify-center mb-3">
            <img src={Icons.chartUp} alt="Chart Up" className="w-[40px] h-[40px]" />
          </div>
          <h4 className="font-sans font-semibold text-[17px] text-black mb-1 tracking-normal">
            No skill data yet
          </h4>
          <p className="font-sans font-normal text-[14px] text-[#737373] text-center tracking-normal">
            Complete learning activites to see your skill growth over time.
          </p>
        </div>
      </div>

      {/* 7. Upcoming Assessment & Schedule Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] w-full min-w-0">
        <UpcomingAssessmentCard />
        <UpcomingScheduleCard />
      </div>

      {/* 8. Recommended for You Empty Card matching Recommed For You.jpg */}
      <div className="w-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[20px] box-border mt-[6px] flex flex-col justify-between shrink-0 min-h-[260px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <div className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-[#F0F1F3] flex items-center justify-center shrink-0">
              <img src={Icons.timer} alt="Recommended" className="w-[16px] h-[16px]" />
            </div>
            <h3 className="font-sans font-semibold text-[15px] text-black flex items-center gap-[5px]">
              Recommended for you
              <img src={Icons.alertCircle} alt="Alert" className="w-[14px] h-[14px] cursor-help opacity-70" />
            </h3>
          </div>

          <button
            type="button"
            className="flex items-center gap-[4px] px-[14px] py-[4px] rounded-full border border-[#D1D5DB] text-[12.5px] font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <span>See All</span>
            <span className="text-[11px]">›</span>
          </button>
        </div>

        {/* Empty Content with Puzzle Icon in Center Circle */}
        <div className="flex flex-col items-center justify-center my-auto py-6">
          <div className="w-[88px] h-[88px] rounded-full bg-[#F0F1F3] flex items-center justify-center mb-3">
            <img src={Icons.puzzle} alt="Puzzle" className="w-[40px] h-[40px]" />
          </div>
          <h4 className="font-sans font-semibold text-[17px] text-black mb-1 tracking-normal">
            No recommendations yet
          </h4>
          <p className="font-sans font-normal text-[14px] text-[#737373] text-center max-w-[480px] leading-relaxed tracking-normal">
            Once you start the courses and complete some activities, we will suggest personalized recommendations here.
          </p>
        </div>
      </div>

      {/* 9. Top Students & Recent Activity Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-[20px] w-full items-stretch min-w-0">
        <div className="xl:col-span-7 flex flex-col min-w-0">
          {/* Top Students Empty Card matching Top Students.jpg */}
          <div className="w-full h-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[20px] box-border flex flex-col justify-between shrink-0 min-h-[260px]">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-[#F0F1F3] flex items-center justify-center shrink-0">
                  <img src={Icons.userGroup || Icons.students} alt="Students" className="w-[16px] h-[16px]" />
                </div>
                <h3 className="font-sans font-semibold text-[15px] text-black flex items-center gap-[5px]">
                  Top Students
                  <img src={Icons.alertCircle} alt="Alert" className="w-[14px] h-[14px] cursor-help opacity-70" />
                </h3>
              </div>

              <button
                type="button"
                className="flex items-center gap-[4px] px-[14px] py-[4px] rounded-full border border-[#D1D5DB] text-[12.5px] font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                <span>See All</span>
                <span className="text-[11px]">›</span>
              </button>
            </div>

            {/* Empty Content with Trophy Black Icon */}
            <div className="flex flex-col items-center justify-center my-auto py-6">
              <div className="w-[88px] h-[88px] rounded-full bg-[#F0F1F3] flex items-center justify-center mb-3">
                <img src={Icons.trophyBlack} alt="Trophy" className="w-[40px] h-[40px]" />
              </div>
              <h4 className="font-sans font-semibold text-[17px] text-black mb-1 tracking-normal">
                Leaderboard will appear here
              </h4>
              <p className="font-sans font-normal text-[14px] text-[#737373] text-center max-w-[480px] leading-relaxed tracking-normal">
                Start learning and complete activities to see your rank on the leaderbaord
              </p>
            </div>
          </div>
        </div>
        <div className="xl:col-span-5 flex flex-col min-w-0">
          {/* Recent Activity Empty Card matching Recent Activity.png */}
          <div className="w-full h-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[20px] box-border flex flex-col justify-between shrink-0 min-h-[260px]">
            {/* Header */}
            <div className="flex items-center gap-[6px] mb-[12px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-[#F0F1F3] flex items-center justify-center shrink-0">
                  <img src={Icons.recentActivity} alt="Recent Activity" className="w-[16px] h-[16px]" />
                </div>
                <h3 className="font-sans font-semibold text-[15px] text-black flex items-center gap-[5px]">
                  Recent Activity
                  <img src={Icons.alertCircle} alt="Alert" className="w-[14px] h-[14px] cursor-help opacity-70" />
                </h3>
              </div>
            </div>

            {/* Empty Content with Clock No Activity Icon */}
            <div className="flex flex-col items-center justify-center my-auto py-6">
              <div className="w-[88px] h-[88px] rounded-full bg-[#F0F1F3] flex items-center justify-center mb-3">
                <img src={Icons.clockNoActivity} alt="No Activity" className="w-[40px] h-[40px]" />
              </div>
              <h4 className="font-sans font-semibold text-[17px] text-black mb-1 tracking-normal">
                No recent activity
              </h4>
              <p className="font-sans font-normal text-[14px] text-[#737373] text-center tracking-normal">
                Your learning activity will be displayed here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstUserDashboard;
