import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { WelcomeBanner } from "./components/welcome-banner.jsx";
import { SkillGraphCard } from "./components/skill-graph.jsx";
import { UpcomingAssessmentCard } from "./components/upcoming-assessment.jsx";
import { UpcomingScheduleCard } from "./components/upcoming-schedule.jsx";
import { RecommendedSectionCard } from "./components/recommended.jsx";
import { OverviewStatCard } from "./components/overview-statcard.jsx";
import { CircularProgress } from "./components/circular-progress.jsx";
import { MilestonePipeline } from "./components/milestone-pipeline.jsx";
import { LearningConsistencyHeatmap, formatDuration } from "./components/learning-consistency.jsx";
import { TopStudentsCard } from "./components/top-students.jsx";
import { RecentActivityCard } from "./components/recent-activity.jsx";
import { FirstUserDashboard } from "./components/first-user-dashboard.jsx";
import { useDashboard } from "./hooks/use-dashboard.js";
import { Icons } from "../../assets/icons/icons.js";

export const DashboardPage = () => {
  const { data } = useDashboard();
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const outletCtx = useOutletContext();
  const isProfileOpen = outletCtx?.isProfileOpen || false;

  // TODO: Replace with API response, e.g. GET /api/skill-graph?period={period}
  const handleSkillGraphRefresh = async (period) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
  };

  return (
    <div className="flex flex-col gap-[24px] w-full max-w-full min-w-0 pb-[36px] overflow-x-hidden">
      {/* Dashboard State Switcher (API Backend Simulation) */}
      <div className="w-full px-[16px] py-[10px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] flex flex-wrap items-center justify-between gap-[8px]">
        <span className="font-sans font-medium text-[13px] text-[#374151]">
          Dashboard State Switcher (API Backend Simulation):
        </span>
        <div className="flex items-center gap-[6px]">
          <button
            type="button"
            onClick={() => setIsFirstTimeUser(false)}
            className={`px-[12px] py-[4px] rounded-[6px] font-sans text-[12px] font-medium transition-colors cursor-pointer ${
              !isFirstTimeUser ? "bg-[#9AD84A] text-white" : "bg-white border border-[#E5E7EB] text-[#4B5563]"
            }`}
          >
            Regular Dashboard (Enrolled User)
          </button>
          <button
            type="button"
            onClick={() => setIsFirstTimeUser(true)}
            className={`px-[12px] py-[4px] rounded-[6px] font-sans text-[12px] font-medium transition-colors cursor-pointer ${
              isFirstTimeUser ? "bg-[#9AD84A] text-white" : "bg-white border border-[#E5E7EB] text-[#4B5563]"
            }`}
          >
            First Time User (New User Locked State)
          </button>
        </div>
      </div>

      {isFirstTimeUser ? (
        <FirstUserDashboard />
      ) : (
        <>
          {/* Welcome Section */}
          <WelcomeBanner userName={data.user.name} />

     
      <div className="w-full min-w-0">
  {/* Header Button */}
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
        {data.aiAssistant.summaryText}
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

  {/* Smooth Animated Dropdown Container */}
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
          {data.aiAssistant.recommendations.map((item) => (
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

      {/* Rows Container */}
      <div className={`flex flex-col ${isProfileOpen ? "w-full gap-[20px]" : "xl:flex-row items-stretch gap-[20px] w-full min-w-0"} mt-[2px]`}>
        {/* Learning Overview Card */}
        <div className={`w-full ${isProfileOpen ? "" : "xl:w-[280px]"} h-auto bg-white border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[20px] box-border flex flex-col justify-between shrink-0`}>
          <div className="flex flex-col h-full">
            {/* Title */}
            <div className="flex items-center gap-[6px] mb-[20px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
                  <img src={Icons.learningOverview} alt="Overview" className="w-[16px] h-[16px]" />
                </div>
                <h3 className="font-sans font-semibold text-[15px] text-black">
                  Learning Overview
                </h3>
              </div>
              <img src={Icons.alertCircle} alt="Alert" className="w-[14px] h-[14px] cursor-help opacity-70" />
            </div>

            {/* Stats Row */}
            <div className={`grid grid-cols-1 ${isProfileOpen ? "md:grid-cols-3" : "md:grid-cols-1"} auto-rows-fr gap-[12px] w-full flex-1`}>
              {data.overview.map((stat) => (
                <OverviewStatCard
                  key={stat.id}
                  label={stat.label}
                  value={stat.value}
                  unit={stat.unit}
                  trend={stat.trend}
                />
              ))}
            </div>
          </div>
        </div>

        {/* My Progress Card */}
        <div className={`w-full ${isProfileOpen ? "min-w-0" : "flex-1 min-w-0"} h-auto bg-white border-[0.5px] border-[#B9BEC7] rounded-[20px] px-[20px] py-[18px] box-border flex flex-col justify-between shrink-0 gap-5`}>
          <div>
            {/* Title */}
            <div className="flex items-center justify-between mb-[14px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
                  <img src={Icons.myProgress} alt="Progress" className="w-[19px] h-[19px]" />
                </div>
                <h3 className="font-sans font-semibold text-[15px] text-black flex items-center">
                  My Progress
                  <img src={Icons.alertCircle} alt="Alert" className="w-[14px] h-[14px] cursor-help opacity-70 ml-[5px]" />
                </h3>
              </div>
            </div>

            {/* Progress content columns */}
            <div className="flex flex-col md:flex-row justify-between w-full gap-5 md:gap-0">
              {/* Left Column: Milestone details */}
              <div className="flex flex-col gap-[2px] pl-[4px]">
                <span className="font-sans font-normal text-[11.5px] text-[#71717A]">
                  Current Milestone
                </span>
                <span className="font-sans font-semibold text-[22px] leading-none text-black mt-[1px]">
                  {data.progress.milestone}
                </span>
                <span className="font-sans font-light text-[13px] text-[#0D0D0D] mt-[3px]">
                  {data.progress.milestoneTitle}
                </span>

                <span className="font-sans font-normal text-[11.5px] text-[#71717A] mt-[20px]">
                  Estimated Time Left
                </span>
                <span className="font-sans font-semibold text-[22px] leading-none text-black mt-[2px]">
                  {data.progress.timeLeft}
                </span>
              </div>


              <div className="w-full md:max-w-[460px] h-auto sm:h-[155px] bg-[#FAFAFA] border-[0.5px] border-[#B9BEC7] rounded-[18px] p-[16px] box-border flex flex-col sm:flex-row items-center justify-between shrink-0 gap-5 sm:gap-0">
                <CircularProgress percent={data.progress.percentComplete} label="Completed" />
                {/* Details Table */}
                <div className="flex flex-col w-full sm:max-w-[270px] gap-[15px] pr-[4px]">
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-normal text-[11.5px] text-black">Total Lessons</span>
                    <span className="font-sans font-normal text-[11.5px] text-[#767676]">
                      {data.progress.lessons.current}  <span className="text-black"> / {data.progress.lessons.total}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-normal text-[11.5px] text-black">Labs Completed</span>
                    <span className="font-sans font-normal text-[11.5px] text-[#767676]">
                      {data.progress.labs.current}<span className="text-black"> / {data.progress.labs.total}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-normal text-[11.5px] text-black">Quizzes Completed</span>
                    <span className="font-sans font-normal text-[11.5px] text-[#767676]">
                      {data.progress.quizzes.current} <span className="text-black"> / {data.progress.quizzes.total}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-normal text-[11.5px] text-black">Assessments</span>
                    <span className="font-sans font-normal text-[11.5px] text-[#767676]">
                      {data.progress.assessments.current} / <span className="text-black">{data.progress.assessments.total}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>


            <MilestonePipeline milestones={data.milestones} />
          </div>

          {/* Resume Learning CTA button */}
          <button className="w-full h-[40px] py-[8px] bg-[#9AD84A] rounded-[9px] flex items-center justify-center cursor-pointer hover:opacity-90 outline-none border-none shadow-[2px_2px_4px_0px_rgba(0,0,0,0.12)] shrink-0">
            <span className="font-sans font-medium text-[14px] text-white">
              Resume Learning
            </span>
          </button>
        </div>
      </div>

      {/* Learning Consistency Heatmap */}
      <div className="w-full h-auto min-h-[250px] bg-white border-[0.5px] border-[#B9BEC7] rounded-[18px] pl-[18px] md:pl-[28px] pr-[14px] pt-[22px] pb-[14px] box-border mt-[6px] flex flex-col justify-between gap-5 md:gap-0 min-w-0">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
              <img src={Icons.learningConsistency} alt="Consistency" className="w-[16px] h-[16px]" />
            </div>
            <h3 className="font-sans font-semibold text-[15px] text-black ml-[10px]">
              Learning Consistency
            </h3>
            <img src={Icons.alertCircle} alt="Alert" className="w-[14px] h-[14px] cursor-help opacity-70 ml-[5px]" />
          </div>

          {/* totalHours + streakCount */}
          <div className="flex items-center gap-[7px] mr-[8px]">
            <div className="flex items-center gap-[5px] border-2 border-[#EAEAEA] rounded-full px-[10px] py-[4px] h-[26px] box-border">
              <span className="font-sans font-light text-[11px] text-[#181818]">
                Total Hours : {formatDuration(data.consistency.totalMinutes)} 
              </span>
            </div>

            <div className="flex items-center gap-[5px] border-2 border-[#EAEAEA] rounded-full px-[10px] py-[4px] h-[26px] box-border">
              <img src={Icons.dayStreakFire} alt="Streak" className="w-[13px] h-[13px]" />
              <span className="font-sans font-light text-[11px] text-[#181818]">
                {data.consistency.streakCount} Day Streak
              </span>
            </div>
          </div>
        </div>

        {/* Heatmap Grid larning consistency */}
        
        <LearningConsistencyHeatmap
          activityData={data.consistency.activityData}
          year={data.consistency.year}
          dailyGoalMinutes={data.consistency.dailyGoalMinutes}
          monthsToShow={data.consistency.monthsToShow}
        />
      </div>

      {/* Skill Graph Card */}
      
      <SkillGraphCard data={data.skillGraph} onRefresh={handleSkillGraphRefresh} />

      {/* Upcoming Assessment & Schedule Row (1 Row, 2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] w-full min-w-0">
        <UpcomingAssessmentCard />
        <UpcomingScheduleCard />
      </div>

      {/* Recommended for you Section */}
      <RecommendedSectionCard />

      {/* Top Students & Recent Activity Row (1 Row, 2 Columns - Equal Height) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-[20px] w-full items-stretch min-w-0">
        <div className="xl:col-span-7 flex flex-col min-w-0">
          <TopStudentsCard />
        </div>
        <div className="xl:col-span-5 flex flex-col min-w-0">
          <RecentActivityCard />
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;