import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons/icons.js";
import { useCourses } from "./hooks/courses.js";
import { AssessmentTabSection } from "./components/assessment-tab-section.jsx";
import { ResourceTabSection } from "./components/resource-tab-section.jsx";
import { CertificateTabSection } from "./components/certificate-tab-section.jsx";

export const CoursesPage = () => {
  const navigate = useNavigate();
  const { course } = useCourses();
  const [activeTab, setActiveTab] = useState("Course Outline");
  const [expandedMilestone, setExpandedMilestone] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedWeek, setExpandedWeek] = useState("week-2");
  const [activeSessionId, setActiveSessionId] = useState("session-1");
  const [openContentAccordions, setOpenContentAccordions] = useState({
    lecture: true,
    guidedLab: true,
    unguidedLab: true
  });

  const toggleAccordion = (key) => {
    setOpenContentAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const courseOutlineWeeks = [
    {
      id: "week-1",
      title: "Week 1",
      name: "Introduction to Cyber Security",
      status: "completed",
      progress: 100,
      sessions: [
        { id: "session-w1-1", title: "Session 1" },
        { id: "session-w1-2", title: "Session 2" }
      ]
    },
    {
      id: "week-2",
      title: "Week 2",
      name: "Security Principles & Fundamentals",
      status: "in-progress",
      progress: 55,
      sessions: [
        { id: "session-1", title: "Session 1" },
        { id: "session-2", title: "Session 2" }
      ]
    },
    {
      id: "week-3",
      title: "Week 3",
      name: "Networking Fundamentals",
      status: "in-progress",
      progress: 100,
      sessions: [
        { id: "session-w3-1", title: "Session 1" },
        { id: "session-w3-2", title: "Session 2" }
      ]
    },
    {
      id: "week-4",
      title: "Week 4",
      name: "Operating Systems & Security",
      status: "locked",
      progress: 0,
      sessions: [
        { id: "session-w4-1", title: "Session 1" },
        { id: "session-w4-2", title: "Session 2" }
      ]
    },
    {
      id: "week-5",
      title: "Week 5",
      name: "Cyber Attacks & Defense Basics",
      status: "locked",
      progress: 0,
      sessions: [
        { id: "session-w5-1", title: "Session 1" },
        { id: "session-w5-2", title: "Session 2" }
      ]
    }
  ];


  if (!course) return null;

  const {
    title,
    description,
    level,
    status,
    progressPercentage,
    currentMilestone,
    totalMilestones,
    completedLessons,
    totalLessons,
    completedLabs,
    totalLabs,
    about,
    skills = [],
    tabs = ["Course Info", "Course Outline", "Assessments", "Resource", "Certificate"],
    milestones = []
  } = course;

  const pipelineMilestones = [
    { id: 1, title: "Milestone 1", subtitle: "Basic", status: "completed" },
    { id: 2, title: "Milestone 2", subtitle: "Network Security", status: "in-progress" },
    { id: 3, title: "Milestone 3", subtitle: "Web Security", status: "locked" },
    { id: 4, title: "Milestone 4", subtitle: "System Hacking", status: "locked" },
    { id: 5, title: "Milestone 5", subtitle: "Advanced Security", status: "locked" }
  ];

  return (
    <div className="w-full max-w-none pb-[40px] font-sans text-black">
      {/* Outer Single White Card Frame */}
      <div className="w-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[24px] overflow-hidden flex flex-col">
        {/* Course Header Area */}
        <div className="pt-[22px] flex flex-col">
          {/* Header Title & Badges Row */}
          <div className="px-[26px] md:px-[30px] pb-[18px] border-b-[0.5px] border-[#B9BEC7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px]">
            <div>
              <h1 className="font-sans font-semibold text-[22px] text-[#000000] leading-normal">
                {title}
              </h1>
              <p className="font-sans font-normal text-[16px] leading-normal text-[#737373] mt-[4px]">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-[9px] shrink-0 -mt-6">
              <span className="bg-transparent border-[0.5px] border-[#B9BEC7] text-[#000000] font-sans text-[14px] font-medium px-[14px] py-[5px] rounded-[9px]">
                {level}
              </span>
              <span className="bg-[#9AD84A] text-white font-sans text-[14px] font-medium px-[14px] py-[5px] rounded-[9px]">
                {status}
              </span>
            </div>
          </div>

          {/* 4 Stats Columns Row */}
          <div className="px-[26px] md:px-[30px] flex flex-col lg:flex-row items-stretch">
            {/* Stat 1: Course Progress */}
            <div className="w-full lg:w-[460px] shrink-0 pr-0 lg:pr-[28px] border-r-0 lg:border-r-[0.5px] border-[#B9BEC7] flex flex-col justify-between py-[18px]">
              <span className="font-sans font-normal text-[13.5px] leading-normal text-[#737373]">
                Course Progress
              </span>
              <div className="flex flex-col gap-[7px] mt-[9px]">
                <div className="font-sans font-medium text-[36px] text-[#000000] leading-none flex items-baseline gap-[6px]">
                  <span>{progressPercentage} %</span>
                  <span className="font-sans font-normal text-[14px] leading-normal text-[#1C1C1C]">of completed</span>
                </div>
                <div className="w-full max-w-[390px] h-[8.5px] bg-[#F0F1F3] rounded-full border-[0.5px] border-[#B9BEC7] overflow-hidden mt-[3px]">
                  <div
                    className="bg-[#9AD84A] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Stat 2: Milestone (Evenly distributed) */}
            <div className="w-full lg:flex-1 min-w-0 px-0 lg:px-[26px] border-r-0 lg:border-r-[0.5px] border-[#B9BEC7] flex flex-col justify-between py-[18px]">
              <span className="font-sans font-normal text-[13.5px] leading-normal text-[#737373]">
                Milestone
              </span>
              <div className="flex flex-col gap-[3px] mt-[9px]">
                <div className="font-sans font-medium text-[36px] text-[#000000] leading-none">
                  {currentMilestone} of {totalMilestones}
                </div>
                <span className="font-sans font-normal text-[14px] leading-normal text-[#1C1C1C]">
                  {status}
                </span>
              </div>
            </div>

            {/* Stat 3: Total Lessons (Evenly distributed) */}
            <div className="w-full lg:flex-1 min-w-0 px-0 lg:px-[26px] border-r-0 lg:border-r-[0.5px] border-[#B9BEC7] flex flex-col justify-between py-[18px]">
              <span className="font-sans font-normal text-[13.5px] leading-normal text-[#737373]">
                Total Lessons
              </span>
              <div className="flex flex-col gap-[3px] mt-[9px]">
                <div className="font-sans font-medium text-[36px] text-[#000000] leading-none">
                  {totalLessons}
                </div>
                <span className="font-sans font-normal text-[14px] leading-normal text-[#1C1C1C]">
                  {completedLessons} / {totalLessons} Completed
                </span>
              </div>
            </div>

            {/* Stat 4: Total Labs (Evenly distributed) */}
            <div className="w-full lg:flex-1 min-w-0 pl-0 lg:pl-[26px] flex flex-col justify-between py-[18px]">
              <span className="font-sans font-normal text-[13.5px] leading-normal text-[#737373]">
                Total Labs
              </span>
              <div className="flex flex-col gap-[3px] mt-[9px]">
                <div className="font-sans font-medium text-[36px] text-[#000000] leading-none">
                  {totalLabs}
                </div>
                <span className="font-sans font-normal text-[14px] leading-normal text-[#1C1C1C]">
                  {completedLabs} / {totalLabs} Completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gray Bar Sub-Tabs Navigation */}
        <div className="bg-[#F0F1F3] border-y-[0.5px] border-[#B9BEC7] px-[26px] md:px-[30px] flex items-center gap-[30px] overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`py-[12px] font-sans text-[15px] leading-[21px] transition-all relative whitespace-nowrap cursor-pointer ${
                  isActive ? "text-[#000000] font-medium" : "text-[#737373] hover:text-black font-normal"
                }`}
              >
                {tab}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#9AD84A] rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Body Section */}
        {activeTab === "Course Info" ? (
          <div className="p-[26px] md:p-[30px] flex flex-col gap-[26px] bg-white">
            {/* About this course */}
            <section className="flex flex-col gap-[9px]">
              <h2 className="font-sans font-medium [font-weight:500] text-[16.5px] leading-[21px] tracking-[0px] text-[#000000]">
                About this course
              </h2>
              <p className="font-sans font-normal text-[14px] leading-[21px] text-[#737373]">
                {about}
              </p>
            </section>

            {/* Skill you will gain */}
            <section className="flex flex-col gap-[11px]">
              <h2 className="font-sans font-medium [font-weight:500] text-[16.5px] leading-[21px] tracking-[0px] text-[#000000]">
                Skill you will gain
              </h2>
              <div className="flex flex-wrap gap-[9px]">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#F0F1F3] text-[#000000] font-sans text-[14px] font-medium leading-normal px-[14px] py-[7px] rounded-[9px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Syllabus Section */}
            <section className="flex flex-col gap-[15px]">
              <h2 className="font-sans font-medium [font-weight:500] text-[16.5px] leading-[21px] tracking-[0px] text-[#000000]">
                Syllabus
              </h2>

              <div className="flex flex-col gap-[11px] w-full">
                {milestones.map((milestone) => {
                  const isExpanded = expandedMilestone === milestone.id;
                  return (
                    <div
                      key={milestone.id}
                      className="border-[0.5px] border-[#B9BEC7] rounded-[11px] bg-[#F0F1F3] overflow-hidden transition-all duration-200"
                    >
                      {/* Accordion Header */}
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedMilestone(isExpanded ? null : milestone.id)
                        }
                        className="w-full flex items-center justify-between px-[17px] py-[13px] text-left cursor-pointer bg-[#F0F1F3] hover:bg-[#E4E5E8] transition-colors"
                      >
                        <div className="flex items-center gap-[9px]">
                          <img
                            src={isExpanded ? Icons.folder : Icons.folderClosed}
                            alt={isExpanded ? "Folder" : "Folder Closed"}
                            className="w-[17px] h-[17px]"
                          />
                          <span className="font-sans font-medium text-[15px] text-[#000000]">
                            {milestone.title}
                          </span>
                        </div>
                        <img
                          src={Icons.arrow1Black}
                          alt="Toggle"
                          className={`w-[18px] h-[18px] transition-transform duration-500 ease-in-out ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Accordion Body */}
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-[22px] pb-[26px] pt-[18px] bg-white border-t-[0.5px] border-[#B9BEC7] flex flex-col gap-[18px]">
                            {/* Overview */}
                            <div>
                              <h3 className="font-sans font-bold text-[13.5px] text-[#0C0C0C] mb-[7px]">
                                Overview
                              </h3>
                              <p className="font-sans font-normal text-[14px] leading-[21px] text-[#737373] mb-[11px]">
                                {milestone.overviewParagraph1}
                              </p>
                              <p className="font-sans font-normal text-[14px] leading-[21px] text-[#737373]">
                                {milestone.overviewParagraph2}
                              </p>
                            </div>

                            {/* Key Objectives */}
                            <div>
                              <h3 className="font-sans font-bold text-[13.5px] text-[#0C0C0C] mb-[6px]">
                                Key Objectives
                              </h3>
                              <p className="font-sans font-normal text-[14px] leading-[21px] text-[#737373] mb-[9px]">
                                By the end of this milestone, students should be able to :
                              </p>
                              <ul className="flex flex-col gap-[7px] pl-[4px]">
                                {milestone.objectives?.map((obj, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-[9px] font-sans font-normal text-[14px] leading-[21px] text-[#737373]"
                                  >
                                    <span className="w-[5.5px] h-[5.5px] rounded-full bg-[#9AD84A] shrink-0 mt-[8px]" />
                                    <span>{obj}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        ) : activeTab === "Course Outline" ? (
          <div className="flex flex-col gap-[30px] bg-[#FAFAFA]">
            {/* Visual Milestone Pipeline Container */}
            <div className="w-full py-[36px] px-[26px] md:px-[30px] border-b-[0.5px] border-[#B9BEC7]">
              <div className="flex items-center justify-between w-full relative">
                {pipelineMilestones.map((m, idx) => {
                  const isCompleted = m.status === "completed";
                  const isInProgress = m.status === "in-progress";
                  const nextM = pipelineMilestones[idx + 1];

                  return (
                    <React.Fragment key={m.id}>
                      <div
                        className="relative flex flex-col items-center shrink-0 group cursor-pointer"
                        onClick={() => setExpandedMilestone(m.id)}
                      >
                        {/* Circle Icon Container (72x72 outer, 54x54 inner) */}
                        <div
                          className={`w-[72px] h-[72px] rounded-full flex items-center justify-center transition-all ${
                            isCompleted || isInProgress
                              ? "bg-[rgba(154,216,74,0.12)] border border-[#9AD84A]"
                              : "bg-white border border-[#D1D5DB]"
                          }`}
                        >
                          {isCompleted ? (
                            <div className="w-[54px] h-[54px] rounded-full bg-[#9AD84A] flex items-center justify-center shadow-[0px_2px_0.2px_rgba(0,0,0,0.1)]">
                              <img src={Icons.milestoneCompleted} alt="Completed" className="w-[23px] h-[23px]" />
                            </div>
                          ) : isInProgress ? (
                            <div className="w-[54px] h-[54px] rounded-full bg-[#9AD84A] flex items-center justify-center shadow-[0px_2px_0.2px_rgba(0,0,0,0.1)]">
                              <img src={Icons.milestoneInProgress} alt="In Progress" className="w-[23px] h-[23px]" />
                            </div>
                          ) : (
                            <img src={Icons.lockOutline} alt="Locked" className="w-[25px] h-[25px]" />
                          )}
                        </div>

                        {/* Title & Subtitle Labels Below Circle */}
                        <div className="mt-[11px] flex flex-col items-center text-center w-[120px]">
                          <span className="font-sans font-medium text-[15px] text-[#000000] leading-tight">
                            {m.title}
                          </span>
                          <span className="font-sans font-normal text-[12px] text-[#737373] mt-[2px] leading-snug">
                            {m.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Connecting Line between Milestones */}
                      {nextM && (
                        <div className="flex-1 h-[6.5px] flex items-center shrink min-w-[10px] -mx-[4px] -mt-[38px]">
                          {isCompleted ? (
                            <div className="w-full h-[6.5px] rounded-full bg-[#9AD84A]" />
                          ) : isInProgress ? (
                            <div className="w-full h-[6.5px] flex items-center">
                              <div className="w-[60%] h-[6.5px] rounded-l-full bg-[#9AD84A]" />
                              <div
                                className="w-[40%] h-[6.5px] rounded-r-full"
                                style={{
                                  backgroundImage:
                                    "repeating-linear-gradient(135deg, #9AD84A, #9AD84A 2px, rgba(154, 216, 74, 0.2) 2px, rgba(154, 216, 74, 0.2) 6px)",
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-full h-[6.5px] rounded-full bg-[#DEDEDE]" />
                          )}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Session Detail View Section */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[22px] px-[26px] md:px-[30px] pb-[30px]">
              {/* Left Navigation Sidebar (Hierarchy Tree matching left-siderbar.jpg) */}
              <div className="lg:col-span-4 bg-white border border-[#B9BEC7] rounded-[16px] overflow-hidden flex flex-col h-fit self-start">
                {/* Header Title Bar */}
                <div className="bg-white px-[20px] py-[16px] border-b border-[#E5E7EB] flex items-center justify-between">
                  <h3 className="font-sans font-medium text-[17px] text-[#000000] tracking-tight">
                    Cyber Security Fundamentals
                  </h3>
                  <button type="button" className="text-[#374151] hover:text-black cursor-pointer">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </button>
                </div>

                {/* Sidebar Tree Items List */}
                <div className="flex flex-col divide-y divide-[#F3F4F6]">
                  {/* Milestone 1 Block */}
                  <div>
                    {/* Milestone 1 Header */}
                    <div className="px-[16px] py-[13px] flex items-center justify-between hover:bg-gray-50/60 cursor-pointer transition-colors">
                      <div className="flex items-center gap-[12px]">
                        <div className="w-[24px] h-[24px] rounded-full bg-[#9AD84A] flex items-center justify-center shrink-0">
                          <svg className="w-[14px] h-[14px] text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-sans text-[11.5px] font-normal text-[#737373] leading-none mb-[2px]">
                            Milestone 1
                          </span>
                          <span className="font-sans text-[14.5px] font-medium text-[#111827] leading-tight">
                            Cyber Security Foundations
                          </span>
                        </div>
                      </div>
                      <img src={Icons.arrow1Black} alt="Toggle" className="w-[16px] h-[16px] text-[#6B7280]" />
                    </div>

                    {/* Week 1 Block */}
                    <div className="pl-[8px]">
                      <button
                        type="button"
                        onClick={() => setExpandedWeek(expandedWeek === "week-1" ? null : "week-1")}
                        className="w-full px-[12px] py-[11px] flex items-center justify-between hover:bg-gray-50/60 text-left transition-colors"
                      >
                        <div className="flex items-center gap-[12px]">
                          <div className="w-[24px] h-[24px] rounded-full bg-[#9AD84A] flex items-center justify-center shrink-0">
                            <svg className="w-[14px] h-[14px] text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-sans text-[11.5px] font-normal text-[#737373] leading-none mb-[2px]">
                              Week 1
                            </span>
                            <span className="font-sans text-[14px] font-medium text-[#111827] leading-tight">
                              Introduction to Cyber Security
                            </span>
                          </div>
                        </div>
                        <img
                          src={Icons.arrow1Black}
                          alt="Toggle"
                          className={`w-[16px] h-[16px] transition-transform duration-300 ${
                            expandedWeek === "week-1" ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Week 1 Sessions */}
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                          expandedWeek === "week-1" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden pl-[16px] flex flex-col">
                          <div className="py-[9px] px-[8px] flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center gap-[10px]">
                              <div className="w-[20px] h-[20px] rounded-full bg-[#9AD84A] flex items-center justify-center shrink-0">
                                <svg className="w-[12px] h-[12px] text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="font-sans text-[14px] font-medium text-[#111827]">Session 1</span>
                            </div>
                            <img src={Icons.arrow1Black} alt="Toggle" className="w-[14px] h-[14px] opacity-60" />
                          </div>
                          <div className="py-[9px] px-[8px] flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center gap-[10px]">
                              <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#9AD84A] bg-white shrink-0" />
                              <span className="font-sans text-[14px] font-medium text-[#111827]">Session 2</span>
                            </div>
                            <img src={Icons.arrow1Black} alt="Toggle" className="w-[14px] h-[14px] opacity-60" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Week 2 Block (Active & Detailed Tree) */}
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setExpandedWeek(expandedWeek === "week-2" ? null : "week-2")}
                      className="w-full px-[16px] py-[12px] flex items-center justify-between hover:bg-gray-50/60 text-left transition-colors"
                    >
                      <div className="flex items-center gap-[12px]">
                        <div className="w-[24px] h-[24px] rounded-full border-[1.5px] border-[#9AD84A] flex items-center justify-center font-sans text-[8.5px] font-semibold text-[#111827] shrink-0">
                          56%
                        </div>
                        <div className="flex flex-col">
                          <span className="font-sans text-[11.5px] font-normal text-[#737373] leading-none mb-[2px]">
                            Week 2
                          </span>
                          <span className="font-sans text-[14px] font-medium text-[#111827] leading-tight">
                            Security Principles & Fundamentals
                          </span>
                        </div>
                      </div>
                      <img
                        src={Icons.arrow1Black}
                        alt="Toggle"
                        className={`w-[16px] h-[16px] transition-transform duration-300 ${
                          expandedWeek === "week-2" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Week 2 Content Tree */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                        expandedWeek === "week-2" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden flex flex-col">
                        {/* Session 1 */}
                        <div
                          onClick={() => setActiveSessionId("session-1")}
                          className={`pl-[32px] pr-[16px] py-[9px] flex items-center justify-between cursor-pointer transition-colors ${
                            activeSessionId === "session-1" ? "bg-gray-50/60" : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-[10px]">
                            <div className="w-[20px] h-[20px] rounded-full bg-[#9AD84A] flex items-center justify-center shrink-0">
                              <svg className="w-[12px] h-[12px] text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="font-sans text-[14px] font-medium text-[#111827]">Session 1</span>
                          </div>
                          <img src={Icons.arrow1Black} alt="Toggle" className="w-[14px] h-[14px] opacity-60" />
                        </div>

                        {/* Lecture Accordion Header */}
                        <div className="flex flex-col">
                          <div
                            onClick={() => toggleAccordion("lecture")}
                            className="pl-[32px] pr-[16px] py-[9px] flex items-center justify-between cursor-pointer hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-[10px]">
                              <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#9AD84A] bg-white shrink-0" />
                              <span className="font-sans text-[14px] font-medium text-[#111827]">Lecture</span>
                            </div>
                            <img
                              src={Icons.arrow1Black}
                              alt="Toggle"
                              className={`w-[14px] h-[14px] opacity-60 transition-transform duration-300 ${
                                openContentAccordions.lecture ? "rotate-180" : ""
                              }`}
                            />
                          </div>

                          {/* Items directly under Lecture: Study Notes & Live Session */}
                          <div
                            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                              openContentAccordions.lecture ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <div className="overflow-hidden flex flex-col">
                              {/* Study Notes */}
                              <div className="pl-[52px] pr-[16px] py-[9px] bg-[#F6FBEB] flex items-center gap-[10px] cursor-pointer">
                                <img src={Icons.pdf} alt="PDF" className="w-[18px] h-[18px] shrink-0" />
                                <span className="font-sans text-[14px] font-medium text-[#111827]">Study Notes</span>
                              </div>

                              {/* Live Session */}
                              <div className="pl-[52px] pr-[16px] py-[9px] flex items-center gap-[10px] cursor-pointer hover:bg-gray-50">
                                <svg className="w-[18px] h-[18px] text-[#4B5563] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <rect x="3" y="5" width="14" height="14" rx="2" strokeWidth="1.8" />
                                  <path strokeWidth="1.8" strokeLinecap="round" d="M17 9l4-2v10l-4-2" />
                                </svg>
                                <span className="font-sans text-[14px] font-medium text-[#111827]">Live Session</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Guided Lab Accordion */}
                        <div
                          onClick={() => toggleAccordion("guidedLab")}
                          className="pl-[32px] pr-[16px] py-[9px] flex items-center justify-between cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-[10px]">
                            <div className="w-[20px] h-[20px] rounded-full border border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-center shrink-0">
                              <img src={Icons.lockOutlineGray} alt="Locked" className="w-[11px] h-[11px]" />
                            </div>
                            <span className="font-sans text-[14px] font-medium text-[#111827]">Guided Lab</span>
                          </div>
                          <img
                            src={Icons.arrow1Black}
                            alt="Toggle"
                            className={`w-[14px] h-[14px] opacity-60 transition-transform duration-300 ${
                              openContentAccordions.guidedLab ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        {/* Unguided Lab Accordion */}
                        <div
                          onClick={() => toggleAccordion("unguidedLab")}
                          className="pl-[32px] pr-[16px] py-[9px] flex items-center justify-between cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-[10px]">
                            <div className="w-[20px] h-[20px] rounded-full border border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-center shrink-0">
                              <img src={Icons.lockOutlineGray} alt="Locked" className="w-[11px] h-[11px]" />
                            </div>
                            <span className="font-sans text-[14px] font-medium text-[#111827]">Unguided Lab</span>
                          </div>
                          <img
                            src={Icons.arrow1Black}
                            alt="Toggle"
                            className={`w-[14px] h-[14px] opacity-60 transition-transform duration-300 ${
                              openContentAccordions.unguidedLab ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        {/* Session 2 */}
                        <div
                          onClick={() => setActiveSessionId("session-2")}
                          className="pl-[32px] pr-[16px] py-[9px] flex items-center justify-between cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-[10px]">
                            <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#9AD84A] bg-white shrink-0" />
                            <span className="font-sans text-[14px] font-medium text-[#111827]">Session 2</span>
                          </div>
                          <img src={Icons.arrow1Black} alt="Toggle" className="w-[14px] h-[14px] opacity-60" />
                        </div>

                        {/* Recall Quiz */}
                        <div className="pl-[32px] pr-[16px] py-[9px] flex items-center justify-between cursor-pointer hover:bg-gray-50">
                          <div className="flex items-center gap-[10px]">
                            <div className="w-[20px] h-[20px] rounded-full border border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-center shrink-0">
                              <img src={Icons.lockOutlineGray} alt="Locked" className="w-[11px] h-[11px]" />
                            </div>
                            <span className="font-sans text-[14px] font-medium text-[#111827]">Recall Quiz</span>
                          </div>
                          <svg className="w-[14px] h-[14px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Week 3 (Percentage indicator) */}
                  <div className="px-[16px] py-[12px] flex items-center justify-between hover:bg-gray-50/60 cursor-pointer">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[24px] h-[24px] rounded-full border-[1.5px] border-[#9AD84A] flex items-center justify-center font-sans text-[8.5px] font-semibold text-[#111827] shrink-0">
                        56%
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans text-[11.5px] font-normal text-[#737373] leading-none mb-[2px]">
                          Week 3
                        </span>
                        <span className="font-sans text-[14px] font-medium text-[#111827] leading-tight">
                          Security Principles & Fundamentals
                        </span>
                      </div>
                    </div>
                    <img src={Icons.arrow1Black} alt="Toggle" className="w-[16px] h-[16px] text-[#6B7280]" />
                  </div>

                  {/* Week 3 (Locked) */}
                  <div className="px-[16px] py-[12px] flex items-center justify-between hover:bg-gray-50/60 cursor-pointer">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[24px] h-[24px] rounded-full border border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-center shrink-0">
                        <img src={Icons.lockOutlineGray} alt="Locked" className="w-[12px] h-[12px]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans text-[11.5px] font-normal text-[#737373] leading-none mb-[2px]">
                          Week 3
                        </span>
                        <span className="font-sans text-[14px] font-medium text-[#111827] leading-tight">
                          Networking Fundamentals
                        </span>
                      </div>
                    </div>
                    <img src={Icons.arrow1Black} alt="Toggle" className="w-[16px] h-[16px] text-[#6B7280]" />
                  </div>

                  {/* Week 4 (Locked) */}
                  <div className="px-[16px] py-[12px] flex items-center justify-between hover:bg-gray-50/60 cursor-pointer">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[24px] h-[24px] rounded-full border border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-center shrink-0">
                        <img src={Icons.lockOutlineGray} alt="Locked" className="w-[12px] h-[12px]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans text-[11.5px] font-normal text-[#737373] leading-none mb-[2px]">
                          Week 4
                        </span>
                        <span className="font-sans text-[14px] font-medium text-[#111827] leading-tight">
                          Operating Systems & Security
                        </span>
                      </div>
                    </div>
                    <img src={Icons.arrow1Black} alt="Toggle" className="w-[16px] h-[16px] text-[#6B7280]" />
                  </div>

                  {/* Week 5 (Locked) */}
                  <div className="px-[16px] py-[12px] flex items-center justify-between hover:bg-gray-50/60 cursor-pointer">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[24px] h-[24px] rounded-full border border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-center shrink-0">
                        <img src={Icons.lockOutlineGray} alt="Locked" className="w-[12px] h-[12px]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans text-[11.5px] font-normal text-[#737373] leading-none mb-[2px]">
                          Week 5
                        </span>
                        <span className="font-sans text-[14px] font-medium text-[#111827] leading-tight">
                          Cyber Attacks & Defense Basics
                        </span>
                      </div>
                    </div>
                    <img src={Icons.arrow1Black} alt="Toggle" className="w-[16px] h-[16px] text-[#6B7280]" />
                  </div>

                  {/* Milestone 2 (Locked) */}
                  <div className="px-[16px] py-[13px] flex items-center justify-between hover:bg-gray-50/60 cursor-pointer">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[24px] h-[24px] rounded-full border border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-center shrink-0">
                        <img src={Icons.lockOutlineGray} alt="Locked" className="w-[12px] h-[12px]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans text-[11.5px] font-normal text-[#737373] leading-none mb-[2px]">
                          Milestone 2
                        </span>
                        <span className="font-sans text-[14.5px] font-medium text-[#111827] leading-tight">
                          Networking & System Security
                        </span>
                      </div>
                    </div>
                    <img src={Icons.arrow1Black} alt="Toggle" className="w-[16px] h-[16px] text-[#6B7280]" />
                  </div>

                  {/* Milestone 3 (Locked) */}
                  <div className="px-[16px] py-[13px] flex items-center justify-between hover:bg-gray-50/60 cursor-pointer">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[24px] h-[24px] rounded-full border border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-center shrink-0">
                        <img src={Icons.lockOutlineGray} alt="Locked" className="w-[12px] h-[12px]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans text-[11.5px] font-normal text-[#737373] leading-none mb-[2px]">
                          Milestone 3
                        </span>
                        <span className="font-sans text-[14.5px] font-medium text-[#111827] leading-tight">
                          Ethical Hacking & Vulnerability Assessment
                        </span>
                      </div>
                    </div>
                    <img src={Icons.arrow1Black} alt="Toggle" className="w-[16px] h-[16px] text-[#6B7280]" />
                  </div>

                  {/* Milestone 4 (Locked) */}
                  <div className="px-[16px] py-[13px] flex items-center justify-between hover:bg-gray-50/60 cursor-pointer">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[24px] h-[24px] rounded-full border border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-center shrink-0">
                        <img src={Icons.lockOutlineGray} alt="Locked" className="w-[12px] h-[12px]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans text-[11.5px] font-normal text-[#737373] leading-none mb-[2px]">
                          Milestone 4
                        </span>
                        <span className="font-sans text-[14.5px] font-medium text-[#111827] leading-tight">
                          Web Security & Application Defense
                        </span>
                      </div>
                    </div>
                    <img src={Icons.arrow1Black} alt="Toggle" className="w-[16px] h-[16px] text-[#6B7280]" />
                  </div>

                  {/* Milestone 5 (Locked) */}
                  <div className="px-[16px] py-[13px] flex items-center justify-between hover:bg-gray-50/60 cursor-pointer">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[24px] h-[24px] rounded-full border border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-center shrink-0">
                        <img src={Icons.lockOutlineGray} alt="Locked" className="w-[12px] h-[12px]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans text-[11.5px] font-normal text-[#737373] leading-none mb-[2px]">
                          Milestone 5
                        </span>
                        <span className="font-sans text-[14.5px] font-medium text-[#111827] leading-tight">
                          Security Operations & Real World Defense
                        </span>
                      </div>
                    </div>
                    <img src={Icons.arrow1Black} alt="Toggle" className="w-[16px] h-[16px] text-[#6B7280]" />
                  </div>
                </div>
              </div>

              {/* Right Content Panel (Session Details) */}
              {(() => {
                let currentSessionMeta = null;
                for (const w of courseOutlineWeeks) {
                  if (w.sessions) {
                    const match = w.sessions.find((s) => s.id === activeSessionId);
                    if (match) {
                      currentSessionMeta = { weekName: w.name, ...match };
                      break;
                    }
                  }
                }

                const defaultDetails = {
                  sessionTitle: currentSessionMeta?.title || "Session 1",
                  heading: currentSessionMeta?.heading || currentSessionMeta?.weekName || "Introduction to Cyber Security",
                  description: "Understand the fundamentals of cyber security, its importance, goals and the core principles.",
                  duration: "55 Min",
                  xpReward: "250 XP",
                  assessmentScore: "100 Marks",
                  objectives: [
                    "Explain Cyber Security.",
                    "Identify common cyber threats and attacks.",
                    "Understand the CIA Triad.",
                    "Recognize real-world security risks.",
                    "Apply basic cybersecurity best practices."
                  ],
                  lectures: [
                    { id: "l1", title: "Cyber Security Fundamentals", type: "Study Notes • 8 min", icon: Icons.pdf, check: true },
                    { id: "l2", title: "Introduction to Cyber Security", type: "Live Session • 1 hr", icon: Icons.zoomSquare, check: true },
                    { id: "l3", title: "Real-World Attack Walkthrough", type: "Recorded Video • 25 min", icon: Icons.play, check: true }
                  ],
                  guidedLabs: [
                    { id: "gl1", title: "Secure Your First Linux Server", type: "Guided Lab • 30 min", success: true },
                    { id: "gl2", title: "Identify Security Misconfigurations", type: "Guided Lab • 48 min", success: false }
                  ],
                  unguidedLabs: [
                    { id: "ugl1", title: "Secure Your First Linux Server", type: "Unguided Lab • 30 min" },
                    { id: "ugl2", title: "Identify Security Misconfigurations", type: "Unguided Lab • 48 min" }
                  ]
                };

                const sessionMap = {
                  "session-1": {
                    sessionTitle: "Session 1",
                    heading: "Introduction to Cyber Security",
                    description: "Understand the fundamentals of cyber security, its importance, goals and the core principles.",
                    duration: "55 Min",
                    xpReward: "250 XP",
                    assessmentScore: "100 Marks",
                    objectives: [
                      "Explain Cyber Security.",
                      "Identify common cyber threats and attacks.",
                      "Understand the CIA Triad.",
                      "Recognize real-world security risks.",
                      "Apply basic cybersecurity best practices."
                    ],
                    lectures: [
                      { id: "l1", title: "Cyber Security Fundamentals", type: "Study Notes • 8 min", icon: Icons.pdf, check: true },
                      { id: "l2", title: "Introduction to Cyber Security", type: "Live Session • 1 hr", icon: Icons.zoomSquare, check: true },
                      { id: "l3", title: "Real-World Attack Walkthrough", type: "Recorded Video • 25 min", icon: Icons.play, check: true }
                    ],
                    guidedLabs: [
                      { id: "gl1", title: "Secure Your First Linux Server", type: "Guided Lab • 30 min", success: true },
                      { id: "gl2", title: "Identify Security Misconfigurations", type: "Guided Lab • 48 min", success: false }
                    ],
                    unguidedLabs: [
                      { id: "ugl1", title: "Secure Your First Linux Server", type: "Unguided Lab • 30 min" },
                      { id: "ugl2", title: "Identify Security Misconfigurations", type: "Unguided Lab • 48 min" }
                    ]
                  },
                  "session-2": {
                    sessionTitle: "Session 2",
                    heading: "Security Principles & CIA Triad",
                    description: "Deep dive into Confidentiality, Integrity, Availability and defense-in-depth principles.",
                    duration: "60 Min",
                    xpReward: "300 XP",
                    assessmentScore: "100 Marks",
                    objectives: [
                      "Master Confidentiality, Integrity, Availability principles.",
                      "Analyze real-world breach scenarios.",
                      "Implement access control policies.",
                      "Design defense-in-depth architecture."
                    ],
                    lectures: [
                      { id: "l1", title: "CIA Triad Principles & Frameworks", type: "Study Notes • 12 min", icon: Icons.pdf, check: true },
                      { id: "l2", title: "Defense-in-Depth Architecture", type: "Live Session • 45 min", icon: Icons.play, check: false }
                    ],
                    guidedLabs: [
                      { id: "gl1", title: "Configuring Role-Based Access Control", type: "Guided Lab • 40 min", success: true }
                    ],
                    unguidedLabs: [
                      { id: "ugl1", title: "Simulate a Security Breach Mitigation", type: "Unguided Lab • 50 min" }
                    ]
                  },
                  "session-w1-1": {
                    sessionTitle: "Session 1",
                    heading: "Overview of Cyber Threats",
                    description: "Explore malware types, phishing techniques, social engineering and attack vectors.",
                    duration: "45 Min",
                    xpReward: "200 XP",
                    assessmentScore: "100 Marks",
                    objectives: [
                      "Recognize social engineering tactics.",
                      "Differentiate malware variants.",
                      "Implement email security hygiene."
                    ],
                    lectures: [
                      { id: "l1", title: "Malware & Phishing 101", type: "Study Notes • 10 min", icon: Icons.pdf, check: true }
                    ],
                    guidedLabs: [
                      { id: "gl1", title: "Analyze Suspicious Email Headers", type: "Guided Lab • 25 min", success: true }
                    ],
                    unguidedLabs: [
                      { id: "ugl1", title: "Phishing Attack Identification Challenge", type: "Unguided Lab • 30 min" }
                    ]
                  },
                  "session-w1-2": {
                    sessionTitle: "Session 2",
                    heading: "Cyber History & Industry Landscape",
                    description: "Learn historical security events, compliance regulations, and modern threat landscapes.",
                    duration: "50 Min",
                    xpReward: "220 XP",
                    assessmentScore: "100 Marks",
                    objectives: [
                      "Understand cybersecurity regulations.",
                      "Trace major historical cyber incidents."
                    ],
                    lectures: [
                      { id: "l1", title: "History of Major Cyber Attacks", type: "Recorded Video • 30 min", icon: Icons.play, check: true }
                    ],
                    guidedLabs: [],
                    unguidedLabs: []
                  },
                  "session-w3-1": {
                    sessionTitle: "Session 1",
                    heading: "Networking Fundamentals & Protocols",
                    description: "Understand TCP/IP, OSI model layers, IP addressing, subnetting and packet flows.",
                    duration: "75 Min",
                    xpReward: "350 XP",
                    assessmentScore: "100 Marks",
                    objectives: [
                      "Explain OSI and TCP/IP models.",
                      "Perform basic IP subnetting calculations.",
                      "Analyze network traffic packets in Wireshark."
                    ],
                    lectures: [
                      { id: "l1", title: "OSI & TCP/IP Layer Breakdown", type: "Study Notes • 15 min", icon: Icons.pdf, check: false },
                      { id: "l2", title: "Wireshark Packet Capture Live", type: "Live Session • 1 hr", icon: Icons.play, check: false }
                    ],
                    guidedLabs: [
                      { id: "gl1", title: "Capture & Analyze Network Packets", type: "Guided Lab • 45 min", success: false }
                    ],
                    unguidedLabs: [
                      { id: "ugl1", title: "Troubleshoot Network Connectivity", type: "Unguided Lab • 40 min" }
                    ]
                  },
                  "session-w3-2": {
                    sessionTitle: "Session 2",
                    heading: "Routing & Subnetting Mechanics",
                    description: "Master CIDR notation, router configurations, NAT, and port forwarding.",
                    duration: "65 Min",
                    xpReward: "320 XP",
                    assessmentScore: "100 Marks",
                    objectives: [
                      "Calculate CIDR subnets efficiently.",
                      "Configure static routes and NAT rules."
                    ],
                    lectures: [
                      { id: "l1", title: "Subnetting & Routing Deep Dive", type: "Study Notes • 20 min", icon: Icons.pdf, check: false }
                    ],
                    guidedLabs: [],
                    unguidedLabs: []
                  },
                  "session-w4-1": {
                    sessionTitle: "Session 1",
                    heading: "Linux Security & Hardening",
                    description: "Explore Linux file permissions, SSH security, sudoer privilege management and firewall UFW rules.",
                    duration: "60 Min",
                    xpReward: "280 XP",
                    assessmentScore: "100 Marks",
                    objectives: [
                      "Configure UFW firewall rules.",
                      "Audit Linux file permissions and root privileges.",
                      "Harden SSH daemon configuration."
                    ],
                    lectures: [
                      { id: "l1", title: "Linux Privilege Hardening", type: "Study Notes • 15 min", icon: Icons.pdf, check: false }
                    ],
                    guidedLabs: [
                      { id: "gl1", title: "Harden Ubuntu Linux Server", type: "Guided Lab • 35 min", success: false }
                    ],
                    unguidedLabs: []
                  },
                  "session-w4-2": {
                    sessionTitle: "Session 2",
                    heading: "Windows Security & Active Directory",
                    description: "Learn Windows registry security, Group Policy Objects (GPO), and Active Directory basics.",
                    duration: "70 Min",
                    xpReward: "310 XP",
                    assessmentScore: "100 Marks",
                    objectives: [
                      "Configure Windows Group Policy Objects.",
                      "Understand Active Directory domain security."
                    ],
                    lectures: [
                      { id: "l1", title: "Windows GPO & AD Architecture", type: "Live Session • 50 min", icon: Icons.play, check: false }
                    ],
                    guidedLabs: [],
                    unguidedLabs: []
                  },
                  "session-w5-1": {
                    sessionTitle: "Session 1",
                    heading: "Common Web Vulnerabilities & OWASP Top 10",
                    description: "Understand SQL injection, Cross-Site Scripting (XSS), CSRF, and broken authentication patterns.",
                    duration: "80 Min",
                    xpReward: "400 XP",
                    assessmentScore: "100 Marks",
                    objectives: [
                      "Identify OWASP Top 10 vulnerabilities.",
                      "Exploit and remediate SQL Injection.",
                      "Prevent Stored and Reflected XSS."
                    ],
                    lectures: [
                      { id: "l1", title: "OWASP Top 10 Masterclass", type: "Study Notes • 25 min", icon: Icons.pdf, check: false }
                    ],
                    guidedLabs: [
                      { id: "gl1", title: "Exploit & Fix SQL Injection", type: "Guided Lab • 45 min", success: false }
                    ],
                    unguidedLabs: []
                  },
                  "session-w5-2": {
                    sessionTitle: "Session 2",
                    heading: "Incident Response & Defense Basics",
                    description: "Learn log analysis, SIEM dashboard monitoring, threat hunting, and incident response playbooks.",
                    duration: "65 Min",
                    xpReward: "330 XP",
                    assessmentScore: "100 Marks",
                    objectives: [
                      "Analyze SIEM security alerts.",
                      "Follow incident response handling lifecycle."
                    ],
                    lectures: [
                      { id: "l1", title: "Incident Response Playbooks", type: "Recorded Video • 40 min", icon: Icons.play, check: false }
                    ],
                    guidedLabs: [],
                    unguidedLabs: []
                  }
                };

                const sData = sessionMap[activeSessionId] || defaultDetails;

                return (
                  <div className="lg:col-span-8 border border-[#B9BEC7] rounded-[16px] overflow-hidden bg-white flex flex-col">
                    {/* Shaded Header Row: Session Title & Start Session Button */}
                    <div className="bg-[#F0F1F3] px-[22px] md:px-[26px] py-[13px] flex items-center justify-between border-b border-[#B9BEC7]">
                      <h3 className="font-sans text-[16.5px] font-semibold text-[#000000]">
                        {sData.sessionTitle}
                      </h3>
                      <button
                        type="button"
                        onClick={() => navigate(`/courses/session/${activeSessionId}`)}
                        className="bg-[#9AD84A] hover:bg-[#8bc93e] text-white font-sans font-medium text-[14px] leading-normal px-[18px] py-[2.5px] h-[25.5px] rounded-full flex items-center justify-center transition-colors cursor-pointer"
                      >
                        Start Session
                      </button>
                    </div>

                    <div className="p-[22px] md:p-[26px] flex flex-col gap-[24px]">
                      {/* Session Intro */}
                      <div>
                        <h4 className="font-sans font-medium text-[16.5px] leading-normal text-[#181818]">
                          {sData.heading}
                        </h4>
                        <p className="font-sans font-normal text-[14px] leading-[21px] text-[#737373] mt-[5px]">
                          {sData.description}
                        </p>
                      </div>

                      {/* Stat Cards Row */}
                      <div className="flex flex-wrap gap-[14px]">
                        {/* Duration */}
                        <div className="w-[175px] h-[78px] shrink-0 bg-white border border-[#B9BEC7] rounded-[11px] p-[11px] flex flex-col justify-between">
                          <div className="flex items-center gap-[5px] text-[12.5px] font-normal text-[#737373]">
                            <img src={Icons.clockFading} alt="Duration" className="w-[14px] h-[14px] opacity-70" />
                            <span>Duration</span>
                          </div>
                          <span className="text-[18px] font-bold text-[#000000] leading-none">{sData.duration}</span>
                        </div>

                        {/* XP Reward */}
                        <div className="w-[175px] h-[78px] shrink-0 bg-white border border-[#B9BEC7] rounded-[11px] p-[11px] flex flex-col justify-between">
                          <div className="flex items-center gap-[5px] text-[12.5px] font-normal text-[#737373]">
                            <img src={Icons.star} alt="XP" className="w-[14px] h-[14px] opacity-70" />
                            <span>XP Reward</span>
                          </div>
                          <span className="text-[18px] font-bold text-[#000000] leading-none">{sData.xpReward}</span>
                        </div>

                        {/* Assessment Score */}
                        <div className="w-[175px] h-[78px] shrink-0 bg-white border border-[#B9BEC7] rounded-[11px] p-[11px] flex flex-col justify-between">
                          <div className="flex items-center gap-[5px] text-[12.5px] font-normal text-[#737373]">
                            <img src={Icons.status} alt="Assessment" className="w-[14px] h-[14px] opacity-70" />
                            <span>Assessment Score</span>
                          </div>
                          <span className="text-[18px] font-bold text-[#000000] leading-none">{sData.assessmentScore}</span>
                        </div>
                      </div>

                      {/* Learning Objectives */}
                      {sData.objectives && sData.objectives.length > 0 && (
                        <div className="flex flex-col gap-[9px]">
                          <h4 className="font-sans font-medium text-[16.5px] leading-normal text-[#181818]">Learning Objectives</h4>
                          <p className="font-sans font-normal text-[14px] leading-[21px] text-[#737373]">By the end of this session, you will be able to :</p>
                          <ul className="flex flex-col gap-[9px] mt-[3px]">
                            {sData.objectives.map((obj, i) => (
                              <li key={i} className="flex items-center gap-[11px] font-sans font-light text-[14px] leading-normal text-[#737373]">
                                <img src={Icons.lineDotRightHorizontal} alt="Bullet" className="w-[16px] h-[16px] opacity-80 shrink-0" />
                                <span>{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Session Content Accordions */}
                      <div className="flex flex-col gap-[15px]">
                        <h4 className="font-sans font-medium text-[16.5px] leading-normal text-[#181818]">Session Content</h4>

                        {/* Accordion 1: Lecture */}
                        {sData.lectures && (
                          <div className="border border-[#B9BEC7] rounded-[13px] overflow-hidden bg-white">
                            <button
                              type="button"
                              onClick={() => toggleAccordion("lecture")}
                              className="w-full bg-[#F0F1F3] px-[15px] py-[11px] flex items-center justify-between text-left hover:bg-[#E4E5E8] transition-colors"
                            >
                              <div className="flex items-center gap-[7px] font-semibold text-[13.5px] text-[#000000]">
                                <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                                <span>Lecture</span>
                              </div>
                              <div className="flex items-center gap-[9px]">
                                <span className="bg-[#DCFCE7] border border-[#15803D] text-[#15803D] font-sans font-medium text-[11.5px] leading-normal px-[9px] py-[2.5px] rounded-full flex items-center gap-[3px]">
                                  <svg className="w-[11px] h-[11px]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                                  Complete
                                </span>
                                <img
                                  src={Icons.arrow1Black}
                                  alt="Toggle"
                                  className={`w-[17px] h-[17px] transition-transform duration-200 ${
                                    openContentAccordions.lecture ? "rotate-180" : ""
                                  }`}
                                />
                              </div>
                            </button>

                            {openContentAccordions.lecture && (
                              <div className="p-[15px] flex flex-col gap-[13px]">
                                {sData.lectures.map((item, idx) => (
                                  <div key={item.id} className={`flex items-center justify-between py-[5px] ${idx !== 0 ? "border-t border-[#F0F1F3]" : ""}`}>
                                    <div className="flex items-center gap-[11px]">
                                      <img src={item.icon} alt="Icon" className="w-[28px] h-[28px] shrink-0" />
                                      <div>
                                        <div className="flex items-center gap-[5px]">
                                          <span className="font-sans font-normal text-[13.5px] leading-normal text-[#15803D]">{item.title}</span>
                                          {item.check && <img src={Icons.circleCheck} alt="Check" className="w-[13px] h-[13px]" />}
                                        </div>
                                        <span className="font-sans font-light text-[11.5px] leading-normal text-[#525252]">{item.type}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Accordion 2: Guided Lab */}
                        {sData.guidedLabs && (
                          <div className="border border-[#B9BEC7] rounded-[13px] overflow-hidden bg-white">
                            <button
                              type="button"
                              onClick={() => toggleAccordion("guidedLab")}
                              className="w-full bg-[#F0F1F3] px-[15px] py-[11px] flex items-center justify-between text-left hover:bg-[#E4E5E8] transition-colors"
                            >
                              <div className="flex items-center gap-[7px] font-semibold text-[13.5px] text-[#000000]">
                                <img src={Icons.flaskConical} alt="Lab" className="w-[15px] h-[15px]" />
                                <span>Guided Lab</span>
                              </div>
                              <img
                                src={Icons.arrow1Black}
                                alt="Toggle"
                                className={`w-[17px] h-[17px] transition-transform duration-200 ${
                                  openContentAccordions.guidedLab ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {openContentAccordions.guidedLab && (
                              <div className="p-[15px] flex flex-col gap-[13px]">
                                {sData.guidedLabs.map((lab, idx) => (
                                  <div key={lab.id} className={`flex items-center justify-between py-[5px] ${idx !== 0 ? "border-t border-[#F0F1F3]" : ""}`}>
                                    <div className="flex items-center gap-[11px]">
                                      <img src={Icons.squareTerminal} alt="Terminal" className="w-[28px] h-[28px] shrink-0" />
                                      <div>
                                        <div className="flex items-center gap-[5px]">
                                          <span className={`font-sans font-normal text-[13.5px] leading-normal ${lab.success ? "text-[#15803D]" : "text-[#FF383C]"}`}>{lab.title}</span>
                                          {lab.success ? (
                                            <img src={Icons.circleCheck} alt="Check" className="w-[13px] h-[13px]" />
                                          ) : (
                                            <img src={Icons.inCompleteCircle} alt="Incomplete" className="w-[13px] h-[13px]" />
                                          )}
                                        </div>
                                        <span className="font-sans font-light text-[11.5px] leading-normal text-[#525252]">{lab.type}</span>
                                      </div>
                                    </div>
                                    {lab.success ? (
                                      <button type="button" className="font-sans font-normal text-[11.5px] leading-normal text-[#0088FF] underline cursor-pointer hover:opacity-80 transition-opacity">
                                        View Result
                                      </button>
                                    ) : (
                                      <button type="button" className="bg-[#FFF7ED] text-[#EA580C] font-sans font-medium text-[11.5px] leading-normal px-[11px] py-[2.5px] rounded-full flex items-center gap-[3.5px] hover:bg-[#ffeedb] transition-colors cursor-pointer">
                                        <img src={Icons.replay} alt="Retake" className="w-[11.5px] h-[11.5px]" />
                                        Retake
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Accordion 3: Unguided Lab */}
                        {sData.unguidedLabs && (
                          <div className="border border-[#B9BEC7] rounded-[13px] overflow-hidden bg-white">
                            <button
                              type="button"
                              onClick={() => toggleAccordion("unguidedLab")}
                              className="w-full bg-[#F0F1F3] px-[15px] py-[11px] flex items-center justify-between text-left hover:bg-[#E4E5E8] transition-colors"
                            >
                              <div className="flex items-center gap-[7px] font-semibold text-[13.5px] text-[#000000]">
                                <img src={Icons.squareTerminal} alt="Unguided" className="w-[15px] h-[15px]" />
                                <span>Unguided Lab</span>
                              </div>
                              <img
                                src={Icons.arrow1Black}
                                alt="Toggle"
                                className={`w-[17px] h-[17px] transition-transform duration-200 ${
                                  openContentAccordions.unguidedLab ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {openContentAccordions.unguidedLab && (
                              <div className="p-[15px] flex flex-col gap-[13px]">
                                {sData.unguidedLabs.map((lab, idx) => (
                                  <div key={lab.id} className={`flex items-center justify-between py-[5px] ${idx !== 0 ? "border-t border-[#F0F1F3]" : ""}`}>
                                    <div className="flex items-center gap-[11px]">
                                      <img src={Icons.squareTerminal} alt="Terminal" className="w-[28px] h-[28px] shrink-0 opacity-70" />
                                      <div>
                                        <span className="font-sans font-normal text-[13.5px] leading-normal text-[#000000] block">{lab.title}</span>
                                        <span className="font-sans font-light text-[11.5px] leading-normal text-[#525252]">{lab.type}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        ) : activeTab === "Assessments" ? (
          <AssessmentTabSection status={course?.assessmentStatus} isLocked={course?.isAssessmentLocked} />
        ) : activeTab === "Resource" ? (
          <ResourceTabSection onGoToOutline={() => setActiveTab("Course Outline")} />
        ) : activeTab === "Certificate" ? (
          <CertificateTabSection isUnlocked={course?.isCertificateUnlocked} />
        ) : (
          <div className="w-full py-[40px] bg-white flex items-center justify-center text-[#737373] font-medium text-[14px]">
            Content for {activeTab} will be available soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;


