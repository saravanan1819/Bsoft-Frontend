import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons/icons.js";
import pdfFile from "../../assets/pdf/Cybersecurity_Landscape_Careers.pdf";
import * as pdfjsLib from "pdfjs-dist";

// Set worker source for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Shared PDF document cache to avoid reloading the PDF for every page
const pdfDocCache = {};

import { CYBER_SECURITY_COURSE_DATA } from "./data/cyber-security-course-data.js";
import { CourseQuizPage } from "./course-quiz-page.jsx";

// Default Dynamic Course Data Schema (API Integration Ready)
const DEFAULT_COURSE_DATA = CYBER_SECURITY_COURSE_DATA;

const NativePdfCanvas = ({ pdfUrl, zoomLevel = 100 }) => {
  const [numPages, setNumPages] = useState(0);
  const [pdfDoc, setPdfDoc] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const loadPdf = async () => {
      try {
        // Reuse cached doc if available
        if (pdfDocCache[pdfUrl]) {
          const doc = pdfDocCache[pdfUrl];
          if (isMounted) {
            setPdfDoc(doc);
            setNumPages(doc.numPages);
          }
          return;
        }
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const doc = await loadingTask.promise;
        pdfDocCache[pdfUrl] = doc;
        if (isMounted) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
        }
      } catch (err) {
        console.error("PDF load error:", err);
      }
    };
    loadPdf();
    return () => { isMounted = false; };
  }, [pdfUrl]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center gap-[24px]">
      {pdfDoc && Array.from({ length: numPages }, (_, index) => (
        <SinglePageCanvas key={index + 1} pdfDoc={pdfDoc} pageNum={index + 1} zoomLevel={zoomLevel} />
      ))}
    </div>
  );
};

const SinglePageCanvas = ({ pdfDoc, pageNum, zoomLevel = 100 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!pdfDoc) return;
    let renderTask = null;
    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(pageNum);

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Reset canvas completely before rendering to avoid bleed from previous renders
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Compute scale based on desired CSS width with zoom ratio
        const baseWidth = 840;
        const desiredWidth = baseWidth * (zoomLevel / 100);
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const scale = desiredWidth / unscaledViewport.width;
        const viewport = page.getViewport({ scale });

        // HiDPI: canvas backing store = logical px × DPR
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(viewport.width * dpr);
        canvas.height = Math.round(viewport.height * dpr);
        canvas.style.width = Math.round(viewport.width) + "px";
        canvas.style.height = Math.round(viewport.height) + "px";

        // Pass DPR as a transform to page.render (official PDF.js HiDPI pattern)
        const transform = dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : null;

        renderTask = page.render({
          canvasContext: context,
          viewport,
          ...(transform ? { transform } : {}),
        });
        await renderTask.promise;
      } catch (err) {
        if (err.name !== "RenderingCancelledException") {
          console.error("Page render error:", err);
        }
      }
    };

    renderPage();
    return () => {
      if (renderTask) renderTask.cancel();
    };
  }, [pdfDoc, pageNum, zoomLevel]);

  const baseWidth = 840;
  const desiredWidth = baseWidth * (zoomLevel / 100);

  return (
    <canvas
      ref={canvasRef}
      id={`pdf-page-${pageNum}`}
      style={{ width: `${desiredWidth}px` }}
      className="max-w-full bg-white shadow-sm border border-[#D0D3D9] rounded-[8px] transition-all duration-200"
    />
  );
};

export const CourseSessionDetailPage = ({ initialCourseData = DEFAULT_COURSE_DATA }) => {
  const navigate = useNavigate();
  const pdfScrollRef = useRef(null);
  const pdfViewerRef = useRef(null);

  // Dynamic Course State (API integration ready)
  const [courseData, setCourseData] = useState(initialCourseData);
  const [isLoading, setIsLoading] = useState(false);

  // Accordion and selection state for Left Sidebar with localStorage persistence
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [showMissedBanner, setShowMissedBanner] = useState(true);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [liveSessionState, setLiveSessionState] = useState("upcoming"); // "upcoming" | "attended" | "missed"
  const [notesList, setNotesList] = useState([]);
  const [noteInputText, setNoteInputText] = useState("");
  const [expandedMilestones, setExpandedMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem("bsoft_expandedMilestones");
      return saved ? JSON.parse(saved) : { 1: true };
    } catch {
      return { 1: true };
    }
  });

  const [expandedWeeks, setExpandedWeeks] = useState(() => {
    try {
      const saved = localStorage.getItem("bsoft_expandedWeeks");
      return saved ? JSON.parse(saved) : { "w1-1": true };
    } catch {
      return { "w1-1": true };
    }
  });

  const [expandedSections, setExpandedSections] = useState(() => {
    try {
      const saved = localStorage.getItem("bsoft_expandedSections");
      return saved ? JSON.parse(saved) : { "s1-1-1": true };
    } catch {
      return { "s1-1-1": true };
    }
  });

  const [expandedLabs, setExpandedLabs] = useState({});

  const toggleLab = (labId) => {
    setExpandedLabs((prev) => ({ ...prev, [labId]: !prev[labId] }));
  };

  const [activeItem, setActiveItem] = useState(() => {
    try {
      const saved = localStorage.getItem("bsoft_activeItem");
      return saved || "pdf-notes-w1-1-s1";
    } catch {
      return "pdf-notes-w1-1-s1";
    }
  });

  // Sync states to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem("bsoft_activeItem", activeItem);
    } catch (e) { console.error(e); }
  }, [activeItem]);

  useEffect(() => {
    try {
      localStorage.setItem("bsoft_expandedMilestones", JSON.stringify(expandedMilestones));
    } catch (e) { console.error(e); }
  }, [expandedMilestones]);

  useEffect(() => {
    try {
      localStorage.setItem("bsoft_expandedWeeks", JSON.stringify(expandedWeeks));
    } catch (e) { console.error(e); }
  }, [expandedWeeks]);

  useEffect(() => {
    try {
      localStorage.setItem("bsoft_expandedSections", JSON.stringify(expandedSections));
    } catch (e) { console.error(e); }
  }, [expandedSections]);

  const [completedActivities, setCompletedActivities] = useState([
    "pdf-notes-w1-1-s1"
  ]);

  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // PDF Page navigation state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  // Real-time Allocated Reading Session Timer (10 min = 600s allocated)
  const totalReadTimeSeconds = 600; // 10 minutes total allocated time
  const [elapsedTimeSeconds, setElapsedTimeSeconds] = useState(0);

  useEffect(() => {
    let timer = null;
    if (isPdfItem(activeItem)) {
      timer = setInterval(() => {
        setElapsedTimeSeconds((prev) => Math.min(totalReadTimeSeconds, prev + 1));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeItem]);

  // PDF Zoom state (100% default & minimum zoom out level)
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showZoomDropdown, setShowZoomDropdown] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (active) {
        setZoomLevel(150);
      } else {
        setZoomLevel(100);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(250, prev + 25));
  };

  const handleZoomOut = () => {
    const minZoom = isFullscreen ? 125 : 100;
    setZoomLevel((prev) => Math.max(minZoom, prev - 25));
  };

  const toggleFullscreen = () => {
    const container = pdfViewerRef.current || pdfScrollRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch((err) => console.error(err));
    } else {
      document.exitFullscreen?.().catch((err) => console.error(err));
    }
  };

  const scrollToPage = (pageNum) => {
    const container = pdfScrollRef.current;
    const el = document.getElementById(`pdf-page-${pageNum}`);
    if (!el || !container) return;
    // Position relative to the PDF scroll container
    const containerTop = container.getBoundingClientRect().top;
    const elTop = el.getBoundingClientRect().top;
    const offset = elTop - containerTop + container.scrollTop - 24;
    container.scrollTo({ top: offset, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    const nextP = Math.max(1, currentPage - 1);
    setCurrentPage(nextP);
    scrollToPage(nextP);
  };

  const handleNextPage = () => {
    const nextP = Math.min(totalPages, currentPage + 1);
    setCurrentPage(nextP);
    scrollToPage(nextP);
  };

  // Helper to extract active item details
  const getActiveItemDetails = () => {
    if (!courseData || !courseData.milestones) return { title: "Study Notes — Introduction to Cyber Security", type: "Lecture", sectionTitle: "Introduction to Cyber Security" };
    for (const m of courseData.milestones) {
      for (const w of (m.weeks || [])) {
        if (w.recallQuiz && w.recallQuiz.id === activeItem) {
          return { title: `Week ${w.number} Recall Quiz`, subtitle: "Test your understanding of this week's learning", type: "Recall Quiz", sectionTitle: w.title, weekTitle: w.title, milestoneTitle: m.title };
        }
        for (const s of (w.sections || [])) {
          if (s.lecture && s.lecture.id === activeItem) {
            return { title: s.lecture.title, type: "Lecture", sectionTitle: s.title, weekTitle: w.title, milestoneTitle: m.title };
          }
          if (s.liveSession && s.liveSession.id === activeItem) {
            return { title: s.liveSession.title, type: "Live Session", sectionTitle: s.title, weekTitle: w.title, milestoneTitle: m.title, recordingText: s.liveSession.recordingText };
          }
          for (const gl of (s.guidedLabs || [])) {
            if (gl.id === activeItem) {
              return { title: gl.title, type: "Guided Lab", sectionTitle: s.title, weekTitle: w.title, milestoneTitle: m.title };
            }
          }
          for (const ugl of (s.unguidedLabs || [])) {
            if (ugl.id === activeItem) {
              return { title: ugl.title, type: "Unguided Lab", sectionTitle: s.title, weekTitle: w.title, milestoneTitle: m.title };
            }
          }
        }
      }
    }
    if (activeItem && activeItem.includes("quiz")) {
      return { title: "Week 1 Recall Quiz", subtitle: "Test your understanding of this week's learning", type: "Recall Quiz", sectionTitle: "Introduction to Cyber Security" };
    }
    return { title: "Introduction to Cyber Security", type: "Lecture", sectionTitle: "Introduction to Cyber Security" };
  };

  const isLabItem = (id) => {
    if (!id) return false;
    return id.includes("lab") || id.startsWith("gl-") || id.startsWith("ugl-");
  };

  const isQuizItem = (id) => {
    if (!id) return false;
    return id.includes("quiz") || id.startsWith("recall-quiz");
  };

  const isPdfItem = (id) => {
    if (!id) return false;
    return id.includes("pdf-notes") || (!id.includes("live-session") && !id.includes("recorded-video") && !isLabItem(id) && !isQuizItem(id));
  };

  const activeItemDetails = getActiveItemDetails();

  // Calculate session activities completed
  const totalSessionActivities = 6; // 1 lecture + 1 live + 2 guided + 2 unguided
  const completedCount = completedActivities.length > 0 ? Math.min(totalSessionActivities, completedActivities.length) : 1;
  const sessionProgressPct = Math.round((completedCount / totalSessionActivities) * 100);

  const handleAddNote = (e) => {
    if (e.key === "Enter" && noteInputText.trim()) {
      setNotesList((prev) => [...prev, noteInputText.trim()]);
      setNoteInputText("");
    }
  };

  const handleGoToNextItem = () => {
    if (!completedActivities.includes(activeItem)) {
      setCompletedActivities((prev) => [...prev, activeItem]);
    }
  };

  const toggleMilestone = (mId) => {
    setExpandedMilestones((prev) => (prev[mId] ? {} : { [mId]: true }));
  };

  const toggleWeek = (wId) => {
    setExpandedWeeks((prev) => ({ ...prev, [wId]: !prev[wId] }));
  };

  const toggleSection = (sId) => {
    setExpandedSections((prev) => (prev[sId] ? {} : { [sId]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F0F1F3] font-sans text-black flex flex-col h-screen overflow-hidden">
      {/* 1. Main Topbar from Figma specs */}
      <header className="bg-[#F0F1F3] px-[24px] md:px-[28px] pt-[16px] pb-[8px] sticky top-0 z-10 shrink-0 h-auto">
        <div className="max-w-[1550px] w-full mx-auto flex items-center justify-between">
          {/* Left: Logo & Title */}
          <div className={`${isSidebarCollapsed ? "w-auto" : "w-full lg:w-[440px]"} shrink-0 flex items-center gap-[35px] transition-all duration-300`}>
            <img src={Icons.logo} alt="BSOFT Logo" className="w-[102px] h-[36px] object-contain" />
            <span className="font-sans font-semibold text-[20px] text-[#000000] tracking-normal leading-normal">
              Learning Workspace
            </span>
          </div>

          {/* Right Header group */}
          <div className="flex-1 flex items-center justify-between ml-0 lg:ml-[15px]">
            <div className="hidden md:flex items-center gap-[20px] bg-white border-[0.5px] border-[#B9BEC7] rounded-full px-[20px] py-[6px]">
              <span className="font-sans text-[16px] text-[#000000] tracking-normal leading-normal">
                <span className="font-normal">{completedCount} / {totalSessionActivities}</span>{" "}
                <span className="font-light">Section Activities Completed</span>
              </span>
              <div className="flex items-center gap-[8px]">
                <div className="w-[200px] h-[8px] bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="bg-[#9AD84A] h-full rounded-full transition-all duration-300"
                    style={{ width: `${sessionProgressPct}%` }}
                  />
                </div>
                <span className="font-sans font-semibold text-[16px] text-[#000000] tracking-normal leading-normal">
                  {sessionProgressPct}%
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-white hover:bg-gray-50 border-[0.5px] border-[#B9BEC7] text-[#000000] font-sans font-medium text-[16px] tracking-normal leading-normal px-[20px] py-[6px] rounded-[10px] transition-colors cursor-pointer ml-auto"
            >
              Exit Session
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Body Layout */}
      <main className="flex-1 px-[24px] md:px-[28px] pb-[8px] pt-[12px] max-w-[1550px] w-full mx-auto flex flex-col lg:flex-row gap-[12px] items-stretch min-h-0 overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <aside
          className={`${
            isSidebarCollapsed ? "w-[64px]" : "w-full lg:w-[440px]"
          } shrink-0 bg-white rounded-[24px] overflow-hidden flex flex-col h-full transition-all duration-300`}
        >
          {/* Left Header */}
          <div className={`h-[70px] ${isSidebarCollapsed ? "px-[16px] justify-center" : "px-[25px] justify-between"} flex items-center border-b border-[#B9BEC7]/50`}>
            {!isSidebarCollapsed && (
              <h2 className="font-sans font-medium text-[20px] text-[#000000] truncate">
                {courseData?.title || "Cyber Security Fundamentals"}
              </h2>
            )}
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-[6px] hover:bg-gray-100 rounded-md transition-colors cursor-pointer flex items-center justify-center"
              title={isSidebarCollapsed ? "Expand Sidebar" : "Minimize Sidebar"}
            >
              <img
                src={Icons.menu}
                alt="Toggle Sidebar"
                className="w-[24px] h-[24px]"
              />
            </button>
          </div>

          {/* Left Accordion Tree List (Milestone -> Week -> Section -> Learning Content) */}
          {!isSidebarCollapsed && (
            <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col py-[8px]">
              {courseData?.milestones?.map((milestone) => {
                const isMilestoneExpanded = expandedMilestones[milestone.number];

                return (
                  <div key={milestone.id} className="border-b border-[#B9BEC7]/30 last:border-b-0">
                    {/* Milestone Row */}
                    <button
                      type="button"
                      onClick={() => toggleMilestone(milestone.number)}
                      className="w-full px-[25px] py-[16px] flex items-center justify-between text-left hover:bg-gray-50/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-[12px]">
                        {(() => {
                          const isCompleted = milestone.status === "completed";
                          const isLocked = milestone.status === "locked";
                          if (isCompleted) {
                            return (
                              <div className="w-[30px] h-[30px] rounded-full bg-[#9AD84A] flex items-center justify-center shrink-0">
                                <svg className="w-[16px] h-[16px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            );
                          }
                          if (isLocked) {
                            return (
                              <div className="w-[30px] h-[30px] rounded-full bg-[#F0F1F3] border border-[#B9BEC7] flex items-center justify-center shrink-0">
                                <img src={Icons.lockOutlineGray} alt="Locked" className="w-[14px] h-[14px]" />
                              </div>
                            );
                          }
                          const progressVal = milestone.progress !== undefined ? milestone.progress : 56;
                          const radius = 12;
                          const circumference = 2 * Math.PI * radius;
                          const strokeDashoffset = circumference * (1 - progressVal / 100);

                          return (
                            <svg className="w-[30px] h-[30px] shrink-0 -rotate-90" viewBox="0 0 30 30">
                              <circle cx="15" cy="15" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="2.5" />
                              {progressVal > 0 && (
                                <circle
                                  cx="15"
                                  cy="15"
                                  r={radius}
                                  fill="none"
                                  stroke="#9AD84A"
                                  strokeWidth="2.5"
                                  strokeDasharray={circumference}
                                  strokeDashoffset={strokeDashoffset}
                                  strokeLinecap="round"
                                />
                              )}
                            </svg>
                          );
                        })()}
                        <div className="flex flex-col">
                          <span className="font-sans text-[12px] text-[#737373]">Milestone {milestone.number}</span>
                          <span className="font-sans font-semibold text-[15px] text-[#000000]">{milestone.title}</span>
                        </div>
                      </div>
                      <img
                        src={Icons.arrow1Black}
                        alt="Toggle"
                        className={`w-[21px] h-[21px] transition-transform duration-200 ${
                          isMilestoneExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Milestone Weeks */}
                    {isMilestoneExpanded && milestone.weeks && (
                      <div className="flex flex-col border-t border-[#F0F1F3]">
                        {milestone.weeks.map((week) => {
                          const isWeekExpanded = expandedWeeks[week.id];

                          return (
                            <div key={week.id} className="border-b border-[#F0F1F3] last:border-b-0">
                              {/* Week Header */}
                              <button
                                type="button"
                                onClick={() => toggleWeek(week.id)}
                                className="w-full px-[35px] py-[12px] flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
                              >
                                <div className="flex items-center gap-[10px]">
                                  {(() => {
                                    const isCompleted = week.status === "completed";
                                    const isLocked = week.status === "locked";
                                    if (isCompleted) {
                                      return (
                                        <div className="w-[24px] h-[24px] rounded-full bg-[#9AD84A] flex items-center justify-center shrink-0">
                                          <svg className="w-[14px] h-[14px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                          </svg>
                                        </div>
                                      );
                                    }
                                    if (isLocked) {
                                      return (
                                        <div className="w-[24px] h-[24px] rounded-full bg-[#F0F1F3] border border-[#B9BEC7] flex items-center justify-center shrink-0">
                                          <img src={Icons.lockOutlineGray} alt="Locked" className="w-[12px] h-[12px]" />
                                        </div>
                                      );
                                    }
                                    const progressVal = week.progress !== undefined ? week.progress : 56;
                                    const radius = 9;
                                    const circumference = 2 * Math.PI * radius;
                                    const strokeDashoffset = circumference * (1 - progressVal / 100);

                                    return (
                                      <svg className="w-[24px] h-[24px] shrink-0 -rotate-90" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="2" />
                                        {progressVal > 0 && (
                                          <circle
                                            cx="12"
                                            cy="12"
                                            r={radius}
                                            fill="none"
                                            stroke="#9AD84A"
                                            strokeWidth="2"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={strokeDashoffset}
                                            strokeLinecap="round"
                                          />
                                        )}
                                      </svg>
                                    );
                                  })()}
                                  <div className="flex flex-col">
                                    <span className="font-sans text-[11px] text-[#737373]">Week {week.number}</span>
                                    <span className="font-sans font-medium text-[14px] text-[#000000]">{week.title}</span>
                                  </div>
                                </div>
                                <img
                                  src={Icons.arrow1Black}
                                  alt="Toggle"
                                  className={`w-[18px] h-[18px] transition-transform duration-300 ${
                                    isWeekExpanded ? "rotate-180" : ""
                                  }`}
                                />
                              </button>

                              {/* Sections List */}
                              {isWeekExpanded && week.sections && (
                                <div className="flex flex-col border-t border-[#F0F1F3]/60 bg-[#FAFBFD]">
                                  {week.sections.map((section) => {
                                    const isSectionLocked = week.status === "locked" || section.status === "locked";
                                    const isSectionExpanded = !isSectionLocked && !!expandedSections[section.id];
                                    const guidedLabGroupId = `${section.id}-guided-labs`;
                                    const unguidedLabGroupId = `${section.id}-unguided-labs`;

                                    const isGuidedExpanded = expandedLabs[guidedLabGroupId] !== false;
                                    const isUnguidedExpanded = expandedLabs[unguidedLabGroupId] !== false;

                                    return (
                                      <div key={section.id} className="border-b border-[#E5E7EB]/50 last:border-b-0">
                                        {/* Section Title Bar */}
                                        <button
                                          type="button"
                                          onClick={() => !isSectionLocked && toggleSection(section.id)}
                                          className="w-full pl-[50px] pr-[20px] py-[10px] flex items-center justify-between text-left hover:bg-gray-100/60 transition-colors cursor-pointer"
                                        >
                                          <div className="flex items-center gap-[10px]">
                                            {(() => {
                                              const isCompleted = week.status === "completed" || section.isCompleted;
                                              if (isCompleted) {
                                                return (
                                                  <div className="w-[20px] h-[20px] rounded-full bg-[#9AD84A] flex items-center justify-center shrink-0">
                                                    <svg className="w-[12px] h-[12px] text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                  </div>
                                                );
                                              }
                                              if (isSectionLocked) {
                                                return (
                                                  <div className="w-[20px] h-[20px] rounded-full bg-[#F0F1F3] border border-[#B9BEC7] flex items-center justify-center shrink-0">
                                                    <img src={Icons.lockOutlineGray} alt="Locked" className="w-[10px] h-[10px]" />
                                                  </div>
                                                );
                                              }
                                              const progressVal = section.progress !== undefined ? section.progress : (section.number === 1 ? 50 : 0);
                                              const radius = 8;
                                              const circumference = 2 * Math.PI * radius;
                                              const strokeDashoffset = circumference * (1 - progressVal / 100);

                                              return (
                                                <svg className="w-[20px] h-[20px] shrink-0 -rotate-90" viewBox="0 0 20 20">
                                                  <circle
                                                    cx="10"
                                                    cy="10"
                                                    r={radius}
                                                    fill="none"
                                                    stroke="#E5E7EB"
                                                    strokeWidth="1.8"
                                                  />
                                                  {progressVal > 0 && (
                                                    <circle
                                                      cx="10"
                                                      cy="10"
                                                      r={radius}
                                                      fill="none"
                                                      stroke="#9AD84A"
                                                      strokeWidth="1.8"
                                                      strokeDasharray={circumference}
                                                      strokeDashoffset={strokeDashoffset}
                                                      strokeLinecap="round"
                                                    />
                                                  )}
                                                </svg>
                                              );
                                            })()}
                                            <span className="font-sans font-medium text-[16px] text-[#000000]">
                                              Session {section.number}
                                            </span>
                                          </div>
                                          <img
                                            src={Icons.arrow1Black}
                                            alt="Toggle"
                                            className={`w-[16px] h-[16px] transition-transform duration-200 ${
                                              isSectionExpanded ? "rotate-180" : ""
                                            }`}
                                          />
                                        </button>

                                        {/* Section Items */}
                                        {isSectionExpanded && (
                                          <div className="flex flex-col py-[2px] bg-white">
                                            {/* 1. LECTURE (Group containing Study Notes & Live Session) */}
                                            {(section.lecture || section.liveSession) && (
                                              <div>
                                                <button
                                                  type="button"
                                                  onClick={() => toggleLab(`lecture-${section.id}`)}
                                                  className="w-full pl-[60px] pr-[20px] pt-[8px] pb-[4px] flex items-center justify-between text-left hover:bg-gray-50 cursor-pointer"
                                                >
                                                  <span className="text-[16px] font-medium tracking-normal text-[#000000]">
                                                    Lecture
                                                  </span>
                                                  <img
                                                    src={Icons.arrow1Black}
                                                    alt="Toggle"
                                                    className={`w-[12px] h-[12px] transition-transform duration-200 ${
                                                      expandedLabs[`lecture-${section.id}`] !== false ? "rotate-180" : ""
                                                    }`}
                                                  />
                                                </button>

                                                {expandedLabs[`lecture-${section.id}`] !== false && (
                                                  <div className="flex flex-col">
                                                    {/* Study Notes */}
                                                    {section.lecture && (
                                                      <button
                                                        type="button"
                                                        onClick={() => setActiveItem(section.lecture.id)}
                                                        className={`w-full pl-[70px] pr-[20px] py-[8px] flex items-center justify-between text-left transition-colors cursor-pointer ${
                                                          activeItem === section.lecture.id ? "bg-[#E6F4D7]" : "hover:bg-gray-50"
                                                        }`}
                                                      >
                                                        <div className="flex items-center gap-[10px]">
                                                          {week.status === "completed" || completedActivities.includes(section.lecture.id) ? (
                                                            <div className="w-[18px] h-[18px] rounded-full bg-[#9AD84A] flex items-center justify-center shrink-0">
                                                              <svg className="w-[10px] h-[10px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                              </svg>
                                                            </div>
                                                          ) : (
                                                            <img src={Icons.pdf} alt="Study Notes" className="w-[18px] h-[18px] shrink-0" />
                                                          )}
                                                          <span className={`font-sans text-[13px] ${
                                                            activeItem === section.lecture.id ? "font-semibold text-[#000000]" : "font-normal text-[#374151]"
                                                          }`}>
                                                            Study Notes
                                                          </span>
                                                        </div>
                                                        {activeItem === section.lecture.id && (
                                                          <div className="w-[6px] h-[6px] rounded-full bg-[#9AD84A]" />
                                                        )}
                                                      </button>
                                                    )}

                                                    {/* Live Session */}
                                                    {section.liveSession && (
                                                      <button
                                                        type="button"
                                                        onClick={() => setActiveItem(section.liveSession.id)}
                                                        className={`w-full pl-[70px] pr-[20px] py-[8px] flex items-center justify-between text-left transition-colors cursor-pointer ${
                                                          activeItem === section.liveSession.id ? "bg-[#E6F4D7]" : "hover:bg-gray-50"
                                                        }`}
                                                      >
                                                        <div className="flex items-center gap-[10px]">
                                                          {week.status === "completed" || completedActivities.includes(section.liveSession.id) ? (
                                                            <div className="w-[18px] h-[18px] rounded-full bg-[#9AD84A] flex items-center justify-center shrink-0">
                                                              <svg className="w-[10px] h-[10px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                              </svg>
                                                            </div>
                                                          ) : (
                                                            <img src={Icons.zoomSquare} alt="Live Session" className="w-[18px] h-[18px] shrink-0" />
                                                          )}
                                                          <span className={`font-sans text-[13px] ${
                                                            activeItem === section.liveSession.id ? "font-semibold text-[#000000]" : "font-normal text-[#374151]"
                                                          }`}>
                                                            Live Session
                                                          </span>
                                                        </div>
                                                        {activeItem === section.liveSession.id && (
                                                          <div className="w-[6px] h-[6px] rounded-full bg-[#9AD84A]" />
                                                        )}
                                                      </button>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            )}

                                            {/* 3. GUIDED LAB (Lab 1, Lab 2) */}
                                            {section.guidedLabs && section.guidedLabs.length > 0 && (
                                              <div>
                                                <button
                                                  type="button"
                                                  onClick={() => toggleLab(guidedLabGroupId)}
                                                  className="w-full pl-[60px] pr-[20px] pt-[8px] pb-[4px] flex items-center justify-between text-left hover:bg-gray-50 cursor-pointer"
                                                >
                                                  <span className="text-[16px] font-medium tracking-normal text-[#000000]">
                                                    Guided Lab
                                                  </span>
                                                  <img
                                                    src={Icons.arrow1Black}
                                                    alt="Toggle"
                                                    className={`w-[12px] h-[12px] transition-transform duration-200 ${
                                                      isGuidedExpanded ? "rotate-180" : ""
                                                    }`}
                                                  />
                                                </button>

                                                {isGuidedExpanded && section.guidedLabs.map((gl, idx) => (
                                                  <button
                                                    key={gl.id}
                                                    type="button"
                                                    onClick={() => setActiveItem(gl.id)}
                                                    className={`w-full pl-[70px] pr-[20px] py-[8px] flex items-center justify-between text-left transition-colors cursor-pointer ${
                                                      activeItem === gl.id ? "bg-[#E6F4D7]" : "hover:bg-gray-50"
                                                    }`}
                                                  >
                                                    <div className="flex items-center gap-[10px]">
                                                      {week.status === "completed" || completedActivities.includes(gl.id) ? (
                                                        <div className="w-[18px] h-[18px] rounded-full bg-[#9AD84A] flex items-center justify-center shrink-0">
                                                          <svg className="w-[10px] h-[10px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                          </svg>
                                                        </div>
                                                      ) : (
                                                        <img src={Icons.squareTerminal} alt="Lab" className="w-[18px] h-[18px] shrink-0" />
                                                      )}
                                                      <span className={`font-sans text-[13px] ${
                                                        activeItem === gl.id ? "font-semibold text-[#000000]" : "font-normal text-[#374151]"
                                                      }`}>
                                                        Lab {idx + 1}
                                                      </span>
                                                    </div>
                                                    {activeItem === gl.id && (
                                                      <div className="w-[6px] h-[6px] rounded-full bg-[#9AD84A]" />
                                                    )}
                                                  </button>
                                                ))}
                                              </div>
                                            )}

                                            {/* 4. UNGUIDED LAB (Lab 1, Lab 2) */}
                                            {section.unguidedLabs && section.unguidedLabs.length > 0 && (
                                              <div>
                                                <button
                                                  type="button"
                                                  onClick={() => toggleLab(unguidedLabGroupId)}
                                                  className="w-full pl-[60px] pr-[20px] pt-[8px] pb-[4px] flex items-center justify-between text-left hover:bg-gray-50 cursor-pointer"
                                                >
                                                  <span className="text-[16px] font-medium tracking-normal text-[#000000]">
                                                    Unguided Lab
                                                  </span>
                                                  <img
                                                    src={Icons.arrow1Black}
                                                    alt="Toggle"
                                                    className={`w-[12px] h-[12px] transition-transform duration-200 ${
                                                      isUnguidedExpanded ? "rotate-180" : ""
                                                    }`}
                                                  />
                                                </button>

                                                {isUnguidedExpanded && section.unguidedLabs.map((ugl, idx) => (
                                                  <button
                                                    key={ugl.id}
                                                    type="button"
                                                    onClick={() => setActiveItem(ugl.id)}
                                                    className={`w-full pl-[70px] pr-[20px] py-[8px] flex items-center justify-between text-left transition-colors cursor-pointer ${
                                                      activeItem === ugl.id ? "bg-[#E6F4D7]" : "hover:bg-gray-50"
                                                    }`}
                                                  >
                                                    <div className="flex items-center gap-[10px]">
                                                      {week.status === "completed" || completedActivities.includes(ugl.id) ? (
                                                        <div className="w-[18px] h-[18px] rounded-full bg-[#9AD84A] flex items-center justify-center shrink-0">
                                                          <svg className="w-[10px] h-[10px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                          </svg>
                                                        </div>
                                                      ) : (
                                                        <img src={Icons.squareTerminal} alt="Lab" className="w-[18px] h-[18px] shrink-0" />
                                                      )}
                                                      <span className={`font-sans text-[13px] ${
                                                        activeItem === ugl.id ? "font-semibold text-[#000000]" : "font-normal text-[#374151]"
                                                      }`}>
                                                        Lab {idx + 1}
                                                      </span>
                                                    </div>
                                                    {activeItem === ugl.id && (
                                                      <div className="w-[6px] h-[6px] rounded-full bg-[#9AD84A]" />
                                                    )}
                                                  </button>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}

                                  {/* Recall Quiz Block after Session 2 */}
                                  {(() => {
                                    const quizId = week.recallQuiz?.id || `recall-quiz-${week.id}`;
                                    const isCompleted = completedActivities.includes(quizId);
                                    const isActive = activeItem === quizId;

                                    return (
                                      <div className="border-t border-[#E5E7EB]/50 bg-white">
                                        <button
                                          type="button"
                                          onClick={() => setActiveItem(quizId)}
                                          className={`w-full pl-[50px] pr-[20px] py-[12px] flex items-center justify-between text-left transition-colors cursor-pointer ${
                                            isActive ? "bg-[#E6F4D7]" : "hover:bg-gray-50"
                                          }`}
                                        >
                                          <div className="flex items-center gap-[10px]">
                                            {isCompleted ? (
                                              <div className="w-[20px] h-[20px] rounded-full bg-[#9AD84A] flex items-center justify-center shrink-0">
                                                <svg className="w-[11px] h-[11px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                              </div>
                                            ) : (
                                              <div className="w-[20px] h-[20px] rounded-full bg-[#F3F4F6] border border-[#D0D3D9] flex items-center justify-center shrink-0">
                                                <svg className="w-[11px] h-[11px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                              </div>
                                            )}
                                            <span className={`font-sans text-[13px] ${
                                              isActive ? "font-semibold text-[#000000]" : "font-normal text-[#374151]"
                                            }`}>
                                              Recall Quiz
                                            </span>
                                          </div>
                                          <img
                                            src={Icons.arrow1Black}
                                            alt="Quiz"
                                            className="w-[14px] h-[14px] -rotate-90 opacity-60"
                                          />
                                        </button>
                                      </div>
                                    );
                                  })()}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </aside>

        {/* RIGHT WORKSPACE (Flex-1, rounded-[24px], bg-white) */}
        <section className="flex-1 bg-white rounded-[24px] overflow-hidden flex flex-col px-[32px] pt-[16px] pb-[12px] md:px-[40px] md:pt-[20px] md:pb-[14px] justify-start gap-[10px] min-h-0">
                    {/* Header Title & Student Metadata Row (Matched to Lab Screen Top Bar) */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[16px] w-full">
            <div className="flex items-center gap-[14px] flex-wrap">
              <h2 className="font-sans font-semibold text-[20px] md:text-[22px] text-[#000000] tracking-normal leading-normal">
                {activeItemDetails.title}
              </h2>

              <span className="text-[#9CA3AF] font-light text-[18px]">|</span>

              <span className="font-sans font-normal text-[16px] md:text-[18px] text-[#000000]">
                Saravanan
              </span>

              <span className="text-[#9CA3AF] font-light text-[18px]">|</span>

              <span className="font-sans font-normal text-[16px] md:text-[18px] text-[#000000]">
                727723eucy051
              </span>
            </div>

            {/* Tags Group */}
            <div className="flex items-center gap-[12px] flex-wrap">
              {isLabItem(activeItem) ? (
                <>
                  <div className="flex items-center gap-[6px] border border-[#B9BEC7] bg-white rounded-[10px] px-[14px] py-[6px]">
                    <img src={Icons.clockFading} alt="Duration" className="w-[18px] h-[18px]" />
                    <span className="font-sans font-normal text-[14px] text-[#000000]">60 min</span>
                  </div>
                  <div className="flex items-center gap-[6px] border border-[#B9BEC7] bg-white rounded-[10px] px-[14px] py-[6px]">
                    <img src={Icons.goldenStar} alt="XP" className="w-[18px] h-[18px]" />
                    <span className="font-sans font-normal text-[14px] text-[#000000]">100 XP</span>
                  </div>
                  <div className="bg-[#FFEDD5] text-[#F97316] font-sans font-normal text-[14px] px-[14px] py-[6px] rounded-[10px]">
                    Not Started
                  </div>
                </>
              ) : isQuizItem(activeItem) ? (
                <>
                  <div className="flex items-center gap-[6px] border border-[#B9BEC7] bg-white rounded-[10px] px-[14px] py-[6px]">
                    <img src={Icons.clockFading} alt="Duration" className="w-[18px] h-[18px]" />
                    <span className="font-sans font-normal text-[14px] text-[#000000]">30 min</span>
                  </div>
                  <div className="flex items-center gap-[6px] border border-[#B9BEC7] bg-white rounded-[10px] px-[14px] py-[6px]">
                    <img src={Icons.goldenStar} alt="XP" className="w-[18px] h-[18px]" />
                    <span className="font-sans font-normal text-[14px] text-[#000000]">75 XP</span>
                  </div>
                  <div className="bg-[#FFEDD5] text-[#F97316] font-sans font-medium text-[14px] px-[14px] py-[6px] rounded-[10px]">
                    Not Started
                  </div>
                </>
              ) : activeItem.includes("live-session") ? (
                <>
                  <div className="flex items-center gap-[6px] border border-[#B9BEC7] bg-white rounded-[10px] px-[14px] py-[6px]">
                    <img src={Icons.clockFading} alt="Duration" className="w-[18px] h-[18px]" />
                    <span className="font-sans font-normal text-[14px] text-[#000000]">60 min</span>
                  </div>
                  <div className="flex items-center gap-[6px] border border-[#B9BEC7] bg-white rounded-[10px] px-[14px] py-[6px]">
                    <img src={Icons.goldenStar} alt="XP" className="w-[18px] h-[18px]" />
                    <span className="font-sans font-normal text-[14px] text-[#000000]">30 XP</span>
                  </div>
                  <div className="bg-[#FFEAD5] text-[#FF8800] font-sans font-medium text-[14px] px-[14px] py-[6px] rounded-[10px]">
                    Upcoming
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-[6px] border border-[#B9BEC7] bg-white rounded-[10px] px-[14px] py-[6px]">
                    <img src={Icons.pages} alt="Pages" className="w-[18px] h-[18px]" />
                    <span className="font-sans font-normal text-[14px] text-[#000000]">20 Pages</span>
                  </div>
                  <div className="flex items-center gap-[6px] border border-[#B9BEC7] bg-white rounded-[10px] px-[14px] py-[6px]">
                    <img src={Icons.clockFading} alt="Duration" className="w-[18px] h-[18px]" />
                    <span className="font-sans font-normal text-[14px] text-[#000000]">10 min read</span>
                  </div>
                  <div className="flex items-center gap-[6px] border border-[#B9BEC7] bg-white rounded-[10px] px-[14px] py-[6px]">
                    <img src={Icons.goldenStar} alt="XP" className="w-[18px] h-[18px]" />
                    <span className="font-sans font-normal text-[14px] text-[#000000]">50 XP</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Activity Content Display Box */}
          <div className={`w-full rounded-[16px] overflow-hidden flex flex-col relative ${
            (activeItem.includes("live-session") || isLabItem(activeItem) || isQuizItem(activeItem))
              ? "h-auto shrink-0 bg-transparent border-0"
              : "flex-1 min-h-0 bg-[#F0F1F3] border border-[#D0D3D9]"
          }`}>
            
            {/* 1. PDF STUDY NOTES VIEW */}
            {(!activeItem.includes("live-session") && !activeItem.includes("recorded-video") && !isLabItem(activeItem) && !isQuizItem(activeItem)) && (
              <>
                {/* PDF Top Bar Toolbar */}
                <div className="h-[44px] bg-white border-b border-[#D0D3D9] px-[16px] flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-[16px]">
                    <div className="flex items-center gap-[4px]">
                      <button
                        type="button"
                        onClick={handlePrevPage}
                        className="p-[4px] hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
                        title="Previous Page"
                      >
                        <img src={Icons.squareLeft} alt="Prev" className="w-[20px] h-[20px]" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextPage}
                        className="p-[4px] hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
                        title="Next Page"
                      >
                        <img src={Icons.squareRight} alt="Next" className="w-[20px] h-[20px]" />
                      </button>
                    </div>

                    <span className="font-sans font-medium text-[14px] text-[#181818]">
                      Page {currentPage} / {totalPages}
                    </span>

                    <div className="h-[16px] w-[1px] bg-[#D0D3D9]" />

                    <div className="hidden sm:flex items-center gap-[12px]">
                      {(() => {
                        const elapsedMins = Math.floor(elapsedTimeSeconds / 60);
                        const elapsedSecs = elapsedTimeSeconds % 60;
                        const timeFormatted = `${elapsedMins}:${elapsedSecs < 10 ? "0" : ""}${elapsedSecs} min`;
                        const timePct = Math.min(100, Math.round((elapsedTimeSeconds / totalReadTimeSeconds) * 100));

                        return (
                          <>
                            <span className="font-sans text-[14px] text-[#525252]">
                              {timeFormatted} / 10 min read
                            </span>
                            <div className="w-[100px] h-[6px] bg-[#E5E7EB] rounded-full overflow-hidden">
                              <div
                                className="bg-[#9AD84A] h-full rounded-full transition-all duration-300"
                                style={{ width: `${timePct}%` }}
                              />
                            </div>
                            <span className="font-sans font-semibold text-[14px] text-[#181818]">
                              {timePct}%
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="flex items-center gap-[10px]">
                    <button
                      type="button"
                      onClick={() => setZoomLevel((prev) => Math.min(200, prev + 25))}
                      className="p-[4px] hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
                      title="Zoom In"
                    >
                      <img src={Icons.zoomIn} alt="Zoom In" className="w-[20px] h-[20px]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel((prev) => Math.max(100, prev - 25))}
                      className={`p-[4px] rounded-md transition-colors ${
                        zoomLevel <= 100 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"
                      }`}
                      title="Zoom Out (100% Minimum)"
                    >
                      <img src={Icons.zoomOut} alt="Zoom Out" className="w-[20px] h-[20px]" />
                    </button>
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="p-[4px] hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
                      title="Toggle Fullscreen"
                    >
                      <img src={Icons.expand} alt="Fullscreen" className="w-[20px] h-[20px]" />
                    </button>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowZoomDropdown((prev) => !prev)}
                        className="flex items-center gap-[6px] bg-[#F0F1F3] border border-[#D0D3D9] px-[10px] py-[4px] rounded-[6px] text-[14px] font-medium text-[#181818] cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        <span>{zoomLevel}%</span>
                        <img src={Icons.arrow1Black} alt="Select" className="w-[12px] h-[12px]" />
                      </button>

                      {showZoomDropdown && (
                        <div className="absolute right-0 top-[32px] bg-white border border-[#D0D3D9] rounded-[8px] shadow-lg py-[4px] z-50 min-w-[90px]">
                          {[100, 125, 150, 175, 200].map((z) => (
                            <button
                              key={z}
                              type="button"
                              onClick={() => {
                                setZoomLevel(z);
                                setShowZoomDropdown(false);
                              }}
                              className={`w-full text-left px-[12px] py-[6px] text-[14px] hover:bg-gray-100 transition-colors ${
                                zoomLevel === z ? "font-semibold bg-gray-50 text-[#9AD84A]" : "text-[#181818]"
                              }`}
                            >
                              {z}%
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div ref={pdfScrollRef} className="flex-1 w-full h-full bg-[#F0F1F3] p-[10px] md:p-[12px] overflow-auto no-scrollbar flex flex-col items-center gap-[12px]">
                  <div className="flex flex-col items-center justify-center shrink-0 min-w-full">
                    <NativePdfCanvas pdfUrl={pdfFile} zoomLevel={zoomLevel} />
                  </div>
                </div>

                {/* Bottom-to-Top Fade Gradient Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-[#F0F1F3] to-transparent pointer-events-none z-10" />
              </>
            )}

            {/* 2. LIVE SESSION (ZOOM) VIEW WITH STATE SWITCHER */}
            {activeItem.includes("live-session") && (
              <div className="w-full h-auto bg-transparent p-0 overflow-y-auto flex flex-col gap-[16px]">
                {/* State Switcher Bar */}
                <div className="w-full bg-white border border-[#E5E7EB] rounded-[16px] p-[12px] flex flex-wrap items-center justify-between gap-[12px] shadow-2xs">
                  <div className="flex items-center gap-[8px]">
                    <span className="w-[8px] h-[8px] rounded-full bg-[#9AD84A]" />
                    <span className="font-sans font-medium text-[13px] text-[#374151]">
                      State Switcher (API Backend Simulation):
                    </span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    {[
                      { id: "upcoming", label: "Upcoming / Active" },
                      { id: "attended", label: "Attended" },
                      { id: "missed", label: "Missed" }
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          setLiveSessionState(st.id);
                          setShowMissedBanner(true);
                        }}
                        className={`px-[12px] py-[5px] rounded-full font-sans text-[12px] font-medium transition-colors cursor-pointer ${
                          liveSessionState === st.id
                            ? "bg-[#9AD84A] text-white shadow-2xs"
                            : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 1. ATTENDED STATE */}
                {liveSessionState === "attended" && (
                  <>
                    {/* Attended Live Session Green Alert Banner */}
                    {showMissedBanner && (
                      <div className="w-full bg-[#EBF7EE] border border-[#D1F0D9] rounded-[16px] px-[20px] py-[14px] flex items-start justify-between gap-[16px] shrink-0">
                        <div className="flex flex-col">
                          <span className="font-sans font-semibold text-[15px] text-[#1E7E34]">
                            You attended this live session.
                          </span>
                          <span className="font-sans font-normal text-[14px] text-[#374151] mt-[2px]">
                            The recording is available if you want to review the session.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowMissedBanner(false)}
                          className="text-[#6B7280] hover:text-[#111827] transition-colors p-[2px] cursor-pointer"
                          title="Dismiss notice"
                        >
                          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}

                    {/* Main About This Session Card Container */}
                    <div className="w-full bg-[#FBFBFB] rounded-[20px] border border-[#E5E7EB] overflow-hidden flex flex-col shadow-xs">
                      {/* Top Card Content Row */}
                      <div className="p-[20px] md:p-[24px] flex flex-col md:flex-row items-start justify-between gap-[24px]">
                        {/* Left Details Column */}
                        <div className="flex-1 max-w-[560px] flex flex-col justify-between self-stretch">
                          <div>
                            <h3 className="font-sans font-semibold text-[18px] text-[#000000] mb-[8px]">
                              About this session
                            </h3>
                            <p className="font-sans text-[14px] text-[#4B5563] leading-[1.5]">
                              This live session covers the fundamentals of cybersecurity, including key concepts, type of threats, attack vectors and the CIA triad Model.
                            </p>
                          </div>

                          {/* Faculty Info Pill & Live Session Container */}
                          <div className="mt-[24px]">
                            <div className="inline-flex items-center gap-[10px] bg-white border border-[#E5E7EB] rounded-full px-[14px] py-[4px] mb-[16px] shadow-2xs">
                              <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-[#E5E7EB] shrink-0">
                                <img src={Icons.profile} alt="Saravanan S" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-sans font-semibold text-[13px] text-[#000000]">Saravanan S</span>
                                <span className="font-sans text-[11px] text-[#6B7280]">Faculty</span>
                              </div>
                            </div>

                            {/* Live Session was conducted on Box */}
                            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-[16px] flex flex-col gap-[10px] max-w-[460px] shadow-2xs">
                              <span className="font-sans font-medium text-[14px] text-[#111827]">
                                Live Session was conducted on
                              </span>
                              <div className="flex flex-wrap items-center gap-[10px]">
                                <div className="flex items-center gap-[6px] bg-white border border-[#D0D3D9] rounded-[12px] px-[12px] py-[6px]">
                                  <img src={Icons.calendar} alt="Calendar" className="w-[16px] h-[16px]" />
                                  <span className="font-sans font-medium text-[13px] text-[#111827]">
                                    12 Aug 2026 ( Tue )
                                  </span>
                                </div>

                                <div className="flex items-center gap-[6px] bg-white border border-[#D0D3D9] rounded-[12px] px-[12px] py-[6px]">
                                  <img src={Icons.clockTimer} alt="Time" className="w-[16px] h-[16px]" />
                                  <span className="font-sans font-medium text-[13px] text-[#111827]">
                                    10.00 AM - 11.00 AM (IST)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Illustration Column */}
                        <div className="w-full md:w-[280px] shrink-0 flex items-center justify-center p-[8px]">
                          <img src={Icons.digitalNomad} alt="Live Class Attended" className="w-full max-w-[240px] h-auto object-contain" />
                        </div>
                      </div>

                      {/* Card Bottom Row: Rewatch session action bar */}
                      <div className="px-[24px] py-[16px] bg-white border-t border-[#E5E7EB] flex flex-col md:flex-row items-start md:items-center justify-between gap-[16px]">
                        <span className="font-sans font-normal text-[15px] text-[#111827]">
                          Rewatch the session anytime for revision.
                        </span>

                        <button
                          type="button"
                          onClick={() => setActiveItem("recorded-video")}
                          className="bg-[#9AD84A] hover:bg-[#8bc93e] text-white font-sans font-medium text-[15px] px-[24px] py-[10px] rounded-full transition-colors cursor-pointer flex items-center gap-[8px] shrink-0 shadow-xs"
                        >
                          <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <span>Watch Again</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* 2. MISSED STATE */}
                {liveSessionState === "missed" && (
                  <>
                    {showMissedBanner && (
                      <div className="w-full bg-[#FFF9F2] border border-[#FFE4C4] rounded-[16px] px-[20px] py-[14px] flex items-start justify-between gap-[16px] shadow-xs shrink-0">
                        <div className="flex items-start gap-[12px]">
                          <div className="w-[24px] h-[24px] rounded-full border-[1.5px] border-[#FF8800] text-[#FF8800] flex items-center justify-center font-sans text-[13px] font-bold shrink-0 mt-[1px]">
                            !
                          </div>
                          <div className="flex flex-col">
                            <span className="font-sans font-semibold text-[15px] text-[#FF8800]">
                              You missed this live session
                            </span>
                            <span className="font-sans font-normal text-[14px] text-[#4B5563] mt-[2px]">
                              Don't worry! You can watch the recorded session to complete this activity.
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowMissedBanner(false)}
                          className="text-[#9CA3AF] hover:text-[#374151] transition-colors p-[2px] cursor-pointer"
                          title="Dismiss notice"
                        >
                          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}

                    {/* Main About This Session Card Container */}
                    <div className="w-full bg-[#FBFBFB] rounded-[20px] border border-[#B9BEC7]/30 overflow-hidden flex flex-col shadow-xs">
                      <div className="p-[20px] md:p-[24px] flex flex-col md:flex-row items-start justify-between gap-[24px]">
                        <div className="flex-1 max-w-[580px] flex flex-col justify-between self-stretch">
                          <div>
                            <h3 className="font-sans font-normal text-[16px] text-[#000000] mb-[8px]">
                              About this session
                            </h3>
                            <p className="font-sans font-normal text-[14px] leading-[22px] text-[#4B5563]">
                              This live session covers the fundamentals of cybersecurity, including key concepts, type of threats, attack vectors and the CIA triad Model.
                            </p>
                          </div>

                          <div className="mt-[24px] flex flex-col gap-[14px]">
                            <div className="inline-flex items-center gap-[10px] bg-white border border-[#E5E7EB] rounded-full px-[14px] py-[6px] w-fit shadow-2xs">
                              <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-[#E5E7EB] shrink-0">
                                <img src={Icons.profile} alt="Saravanan S" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex flex-col pr-[8px]">
                                <span className="font-sans font-semibold text-[13px] text-[#000000]">Saravanan S</span>
                                <span className="font-sans text-[11px] text-[#6B7280]">Faculty</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-[12px]">
                              <div className="flex items-center gap-[8px] bg-white border border-[#E5E7EB] rounded-[12px] px-[14px] py-[8px] shadow-2xs">
                                <img src={Icons.calendar} alt="Calendar" className="w-[18px] h-[18px]" />
                                <span className="font-sans font-normal text-[14px] text-[#111827]">
                                  12 Aug 2026 ( Tue )
                                </span>
                              </div>

                              <div className="flex items-center gap-[8px] bg-white border border-[#E5E7EB] rounded-[12px] px-[14px] py-[8px] shadow-2xs">
                                <img src={Icons.clockTimer} alt="Time" className="w-[18px] h-[18px]" />
                                <span className="font-sans font-normal text-[14px] text-[#111827]">
                                  10.00 AM - 11.00 AM (IST)
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full md:w-[280px] shrink-0 flex items-center justify-center p-[8px]">
                          <img src={Icons.digitalNomad} alt="Live Class Missed" className="w-full max-w-[260px] h-auto object-contain" />
                        </div>
                      </div>

                      <div className="px-[24px] py-[16px] bg-white border-t border-[#B9BEC7]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-[16px]">
                        <span className="font-sans font-normal text-[14px] text-[#4B5563] leading-[1.4] max-w-[480px]">
                          You can watch the record video to complete this session and receive attendance and marks.
                        </span>

                        <button
                          type="button"
                          onClick={() => setActiveItem("recorded-video")}
                          className="bg-[#9AD84A] hover:bg-[#8bc93e] text-white font-sans font-normal text-[16px] px-[24px] py-[10px] rounded-full transition-colors cursor-pointer flex items-center gap-[8px] shrink-0 shadow-xs"
                        >
                          <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <span>Watch Record Video</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* 3. UPCOMING / ACTIVE STATE */}
                {liveSessionState === "upcoming" && (
                  <div className="w-full bg-[#FBFBFB] rounded-[20px] border border-[#B9BEC7]/30 overflow-hidden flex flex-col shadow-xs">
                    <div className="p-[20px] md:p-[24px] flex flex-col md:flex-row items-start justify-between gap-[24px]">
                      <div className="flex-1 max-w-[580px] flex flex-col justify-between self-stretch">
                        <div>
                          <h3 className="font-sans font-normal text-[16px] text-[#000000] mb-[8px]">
                            About this session
                          </h3>
                          <p className="font-sans font-normal text-[14px] leading-[22px] text-[#4B5563]">
                            This live session covers the fundamentals of cybersecurity, including key concepts, type of threats, attack vectors and the CIA triad Model.
                          </p>
                        </div>

                        <div className="mt-[24px] flex flex-col gap-[14px]">
                          <div className="inline-flex items-center gap-[10px] bg-white border border-[#E5E7EB] rounded-full px-[14px] py-[6px] w-fit shadow-2xs">
                            <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-[#E5E7EB] shrink-0">
                              <img src={Icons.profile} alt="Saravanan S" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col pr-[8px]">
                              <span className="font-sans font-semibold text-[13px] text-[#000000]">Saravanan S</span>
                              <span className="font-sans text-[11px] text-[#6B7280]">Faculty</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-[12px]">
                            <div className="flex items-center gap-[8px] bg-white border border-[#E5E7EB] rounded-[12px] px-[14px] py-[8px] shadow-2xs">
                              <img src={Icons.calendar} alt="Calendar" className="w-[18px] h-[18px]" />
                              <span className="font-sans font-normal text-[14px] text-[#111827]">
                                12 Aug 2026 ( Tue )
                              </span>
                            </div>

                            <div className="flex items-center gap-[8px] bg-white border border-[#E5E7EB] rounded-[12px] px-[14px] py-[8px] shadow-2xs">
                              <img src={Icons.clockTimer} alt="Time" className="w-[18px] h-[18px]" />
                              <span className="font-sans font-normal text-[14px] text-[#111827]">
                                10.00 AM - 11.00 AM (IST)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-[280px] shrink-0 flex items-center justify-center p-[8px]">
                        <img src={Icons.digitalNomad} alt="Live Class Working" className="w-full max-w-[260px] h-auto object-contain" />
                      </div>
                    </div>

                    <div className="px-[24px] py-[16px] bg-white border-t border-[#B9BEC7]/30 flex items-center justify-between gap-[16px]">
                      <div className="flex items-center gap-[12px]">
                        <span className="font-sans font-normal text-[16px] text-[#000000]">Platform</span>
                        <div className="flex items-center gap-[6px]">
                          <img src={Icons.zoomSquare} alt="Zoom" className="w-[24px] h-[24px]" />
                          <span className="font-sans font-medium text-[16px] text-[#2D8CFF]">zoom</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="bg-[#9AD84A] hover:bg-[#8bc93e] text-white font-sans font-normal text-[16px] px-[26px] py-[10px] rounded-full transition-colors cursor-pointer flex items-center gap-[8px] shadow-xs"
                      >
                        <svg className="w-[18px] h-[18px] stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>Join Live Session</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. RECORDED VIDEO LECTURE VIEW */}
            {activeItem.includes("recorded-video") && (
              <div className="flex-1 w-full h-full bg-black flex flex-col items-center justify-center relative">
                <div className="w-[72px] h-[72px] rounded-full bg-[#9AD84A] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
                  <img src={Icons.play} alt="Play" className="w-[28px] h-[28px] ml-[4px]" />
                </div>
                <span className="font-sans font-medium text-[16px] text-white mt-[16px]">
                  Click to play recorded lecture video
                </span>
              </div>
            )}

            {/* 4. LAB WORKSPACE VIEW (LAB 1, LAB 2, GUIDED & UNGUIDED LABS) */}
            {isLabItem(activeItem) && (
              <div className="w-full h-auto bg-transparent p-0 overflow-y-auto flex flex-col gap-[16px]">
                {/* Main About This Lab Card Container (Right.png spec) */}
                <div className="w-full bg-[#FBFBFB] rounded-[20px] border border-[#B9BEC7]/30 overflow-hidden flex flex-col shadow-xs">
                  {/* Top Card Content Row */}
                  <div className="p-[20px] md:p-[24px] flex flex-col md:flex-row items-start justify-between gap-[24px]">
                    {/* Left Details Column */}
                    <div className="flex-1 max-w-[560px] flex flex-col justify-between self-stretch">
                      <div>
                        <h3 className="font-sans font-normal text-[16px] text-[#000000] mb-[8px]">
                          About this lab
                        </h3>
                        <p className="font-sans font-normal text-[14px] leading-[22px] text-[#4B5563]">
                          Learn the basic of securing a Linux server through a guided hands-on exercise.
                        </p>
                      </div>

                      {/* What to expect Container (Right.png spec) */}
                      <div className="mt-[32px]">
                        <div className="bg-white border border-[#B9BEC7]/30 rounded-[16px] p-[16px] flex flex-col gap-[10px] max-w-[360px] shadow-2xs">
                          <div className="flex items-center gap-[8px]">
                            <img src={Icons.challenges} alt="What to expect" className="w-[18px] h-[18px]" />
                            <span className="font-sans font-normal text-[14px] text-[#111827]">What to expect</span>
                          </div>

                          <div className="flex flex-col gap-[4px] mt-[2px]">
                            <span className="font-sans font-normal text-[14px] text-[#111827]">
                              <span className="font-medium text-[#111827]">Due by</span> - 12 Aug 2026 , 11.59 PM
                            </span>
                            <span className="font-sans font-normal text-[14px] text-[#111827]">
                              <span className="font-medium text-[#111827]">Attempts</span> - 3 attempts
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Lab Illustration Column with about-lab.svg */}
                    <div className="w-full md:w-[320px] shrink-0 flex flex-col items-center justify-center p-[8px] relative">
                      <div className="w-full flex justify-center relative">
                        <img src={Icons.aboutLab} alt="About Lab Exercise" className="w-full max-w-[300px] h-auto object-contain" />
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Row: Action Buttons */}
                  <div className="px-[24px] py-[16px] bg-white border-t border-[#B9BEC7]/30 flex items-center justify-between gap-[16px]">
                    <button
                      type="button"
                      onClick={() => setShowInstructionsModal(true)}
                      className="border border-[#0088FF] text-[#0088FF] hover:bg-[#F0F8FF] font-sans font-normal text-[16px] px-[24px] py-[10px] rounded-full transition-colors cursor-pointer"
                    >
                      View Instructions
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/courses/session/1/lab/${activeItem}`)}
                      className="bg-[#9AD84A] hover:bg-[#8bc93e] text-white font-sans font-normal text-[16px] px-[26px] py-[10px] rounded-full transition-colors cursor-pointer flex items-center gap-[8px] shadow-xs"
                    >
                      <img src={Icons.startLab} alt="Start Lab" className="w-[18px] h-[18px]" />
                      <span>Start Lab</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 5. RECALL QUIZ VIEW (quiz.png spec) */}
            {isQuizItem(activeItem) && (
              <div className="w-full h-auto bg-transparent p-0 overflow-y-auto flex flex-col gap-[16px]">
                {!quizStarted ? (
                  /* Quiz Overview Container (matching quiz.png spec) */
                  <div className="w-full bg-[#FBFBFB] rounded-[20px] border border-[#B9BEC7]/30 overflow-hidden flex flex-col shadow-xs">
                    {/* Top Card Content Row */}
                    <div className="p-[20px] md:p-[24px] flex flex-col md:flex-row items-start justify-between gap-[24px]">
                      {/* Left Details Column */}
                      <div className="flex-1 max-w-[560px] flex flex-col justify-between self-stretch">
                        <div>
                          <h3 className="font-sans font-normal text-[16px] text-[#000000] mb-[8px]">
                            Quiz Overview
                          </h3>
                          <p className="font-sans font-normal text-[14px] leading-[22px] text-[#4B5563]">
                            Check your understanding of the key concepts covered in this week.
                          </p>
                        </div>

                        {/* What to expect Container */}
                        <div className="mt-[32px]">
                          <div className="bg-white border border-[#B9BEC7]/30 rounded-[16px] p-[16px] flex flex-col gap-[10px] max-w-[360px] shadow-2xs">
                            <div className="flex items-center gap-[8px]">
                              <img src={Icons.challenges} alt="What to expect" className="w-[18px] h-[18px]" />
                              <span className="font-sans font-normal text-[14px] text-[#111827]">What to expect</span>
                            </div>

                            <div className="flex flex-col gap-[4px] mt-[2px]">
                              <span className="font-sans font-normal text-[14px] text-[#111827]">
                                <span className="font-medium text-[#111827]">Due by</span> - 12 Aug 2026 , 11.59 PM
                              </span>
                              <span className="font-sans font-normal text-[14px] text-[#111827]">
                                <span className="font-medium text-[#111827]">Attempts</span> - 3 attempts
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Digital Nomad Illustration Column */}
                      <div className="w-full md:w-[320px] shrink-0 flex flex-col items-center justify-center p-[8px] relative">
                        <div className="w-full flex justify-center relative">
                          <img src={Icons.digitalNomad} alt="Quiz Overview" className="w-full max-w-[300px] h-auto object-contain" />
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom Row: Action Buttons */}
                    <div className="px-[24px] py-[16px] bg-white border-t border-[#B9BEC7]/30 flex items-center justify-between gap-[16px]">
                      <button
                        type="button"
                        onClick={() => setShowInstructionsModal(true)}
                        className="border border-[#0088FF] text-[#0088FF] hover:bg-[#F0F8FF] font-sans font-normal text-[16px] px-[24px] py-[10px] rounded-full transition-colors cursor-pointer"
                      >
                        View Instructions
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate(`/courses/session/1/quiz/${activeItem}`)}
                        className="bg-[#9AD84A] hover:bg-[#8bc93e] text-white font-sans font-normal text-[16px] px-[26px] py-[10px] rounded-full transition-colors cursor-pointer flex items-center gap-[8px] shadow-xs"
                      >
                        <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>Start Quiz</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <CourseQuizPage onExit={() => setQuizStarted(false)} />
                )}
              </div>
            )}
          </div>

          {/* Bottom Action Footer Row */}
          <div className={`flex items-center ${(activeItem.includes("live-session") || isLabItem(activeItem) || isQuizItem(activeItem)) ? "justify-end" : "justify-between"} w-full pt-[8px] mt-auto shrink-0`}>
            {/* Save Note Button */}
            {(!activeItem.includes("live-session") && !isLabItem(activeItem) && !isQuizItem(activeItem)) && (
              <button
                type="button"
                onClick={() => {
                  setIsSidebarCollapsed(true);
                  setShowNotesPanel(true);
                }}
                className="flex items-center gap-[7px] border border-[#B9BEC7] bg-white hover:bg-gray-50 text-[#292D32] font-sans font-normal text-[14px] tracking-normal leading-normal text-center px-[16px] py-[6px] rounded-full transition-colors cursor-pointer"
              >
                <img src={Icons.squareNote} alt="Save note" className="w-[16px] h-[16px]" />
                <span>Save note</span>
              </button>
            )}

            {/* Go to next item Button */}
            <button
              type="button"
              disabled={activeItem.includes("live-session") || isLabItem(activeItem)}
              onClick={handleGoToNextItem}
              className={`flex items-center gap-[10px] font-sans font-normal text-[14px] tracking-normal leading-normal text-center px-[20px] py-[8px] rounded-full transition-colors ${
                (activeItem.includes("live-session") || isLabItem(activeItem))
                  ? "bg-[#C4E798] text-white opacity-70 cursor-not-allowed"
                  : "bg-[#9AD84A] hover:bg-[#8bc93e] text-white cursor-pointer"
              }`}
            >
              <span>Go to next item</span>
              <img
                src={Icons.arrow1}
                alt="Next"
                className="w-[16px] h-[16px] -rotate-90"
              />
            </button>
          </div>
        </section>

        {/* RIGHT SIDE NOTES PANEL (Renders when Left Sidebar is minimized and showNotesPanel is true) */}
        {isSidebarCollapsed && showNotesPanel && (
          <aside className="w-full lg:w-[320px] shrink-0 bg-[#FFFFFF] rounded-[24px] overflow-hidden flex flex-col h-full transition-all duration-300">
            {/* Notes Panel Header */}
            <div className="h-[70px] px-[24px] flex items-center justify-between border-b border-[#B9BEC7]/40">
              <h3 className="font-sans font-medium text-[20px] text-[#000000] tracking-normal leading-normal">Notes</h3>
              <button
                type="button"
                onClick={() => setShowNotesPanel(false)}
                className="p-[4px] hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-[#737373] hover:text-[#000000]"
                title="Close Notes"
              >
                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Notes Body Content */}
            <div className="flex-1 p-[24px] flex flex-col overflow-y-auto no-scrollbar">
              {/* Add a note section */}
              <div className="mb-[24px]">
                <h4 className="font-sans font-normal text-[16px] text-[#000000] mb-[4px]">Add a note</h4>
                <p className="font-sans font-normal text-[14px] text-[#737373] mb-[12px]">
                  Write something you want to remember...
                </p>
                <div className="relative">
                  <input
                    type="text"
                    value={noteInputText}
                    onChange={(e) => setNoteInputText(e.target.value)}
                    onKeyDown={handleAddNote}
                    placeholder="Type your note here..."
                    className="w-full bg-white border border-[#D0D3D9] rounded-[10px] px-[14px] py-[10px] font-normal text-[12px] text-[#3E3E3E] placeholder:font-normal placeholder:text-[12px] placeholder:text-[#3E3E3E] focus:outline-none focus:border-[#9AD84A] transition-colors"
                  />
                </div>
              </div>

              {/* Saved Notes List or Empty State */}
              {notesList.length > 0 ? (
                <div className="flex flex-col gap-[10px]">
                  <h4 className="font-sans font-semibold text-[14px] text-[#000000]">Your Notes</h4>
                  {notesList.map((n, idx) => (
                    <div key={idx} className="bg-[#F0F1F3] p-[12px] rounded-[10px] text-[14px] text-[#000000] border border-[#D0D3D9]/60">
                      {n}
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty state with notepad icon */
                <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-[20px]">
                  <div className="mb-[16px] flex items-center justify-center">
                    <img src={Icons.notesCollections} alt="No notes" className="w-[80px] h-[80px] object-contain" />
                  </div>
                  <h4 className="font-sans font-normal text-[16px] leading-[22px] text-[#000000] mb-[6px]">No notes yet</h4>
                  <p className="font-sans font-normal text-[16px] leading-[22px] text-[#737373] max-w-[260px]">
                    Save notes while studying to quickly revisit important points.
                  </p>
                </div>
              )}
            </div>
          </aside>
        )}

      </main>

      {/* LAB INSTRUCTIONS MODAL OVERLAY (Right-aligned drawer spec) */}
      {showInstructionsModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-end z-50 p-0 md:p-[20px] md:pr-[24px]">
          <div className="bg-white rounded-l-[12px] md:rounded-[12px] w-full max-w-[780px] lg:max-w-[840px] h-full md:h-[calc(100vh-40px)] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Modal Header */}
            <div className="pl-[36px] pr-[24px] py-[20px] border-b border-[#E5E7EB] flex items-center justify-between shrink-0">
              <h2 className="font-sans font-semibold text-[20px] text-[#000000]">
                Lab Instructions
              </h2>
              <button
                type="button"
                onClick={() => setShowInstructionsModal(false)}
                className="text-[#6B7280] hover:text-[#111827] transition-colors p-[4px] rounded-md cursor-pointer"
                title="Close"
              >
                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body Scrollable Content */}
            <div className="pl-[36px] pr-[24px] py-[24px] overflow-y-auto no-scrollbar flex flex-col gap-[20px]">
              {/* Section 1: Before you begin */}
              <div className="flex flex-col gap-[10px]">
                <h3 className="font-sans font-medium text-[18px] text-[#181818] pl-[12px]">
                  Before you begin
                </h3>
                <ul className="flex flex-col gap-[10px] font-sans font-normal text-[16px] text-[#737373] pl-[28px]">
                  <li className="flex items-start gap-[10px]">
                    <img src={Icons.lineDotRightHorizontal} alt="Bullet" className="w-[18px] h-[18px] shrink-0 mt-[4px]" />
                    <span>Complete the lab within the allocated time shown above.</span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <img src={Icons.lineDotRightHorizontal} alt="Bullet" className="w-[18px] h-[18px] shrink-0 mt-[4px]" />
                    <span>Use only the provided lab environment and resources authorized for this lab.</span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <img src={Icons.lineDotRightHorizontal} alt="Bullet" className="w-[18px] h-[18px] shrink-0 mt-[4px]" />
                    <span>Read each task carefully and complete the steps in the required order.</span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <img src={Icons.lineDotRightHorizontal} alt="Bullet" className="w-[18px] h-[18px] shrink-0 mt-[4px]" />
                    <span>Make sure your system and internet connection are ready before starting.</span>
                  </li>
                </ul>
              </div>

              {/* Section 2: During the lab */}
              <div className="flex flex-col gap-[10px]">
                <h3 className="font-sans font-medium text-[18px] text-[#181818] pl-[12px]">
                  During the lab
                </h3>
                <ul className="flex flex-col gap-[10px] font-sans font-normal text-[16px] text-[#737373] pl-[28px]">
                  <li className="flex items-start gap-[10px]">
                    <img src={Icons.lineDotRightHorizontal} alt="Bullet" className="w-[18px] h-[18px] shrink-0 mt-[4px]" />
                    <span>Work only within the authorized lab environment.</span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <img src={Icons.lineDotRightHorizontal} alt="Bullet" className="w-[18px] h-[18px] shrink-0 mt-[4px]" />
                    <span>Do not use external resources, tools, or assistance unless explicitly permitted.</span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <img src={Icons.lineDotRightHorizontal} alt="Bullet" className="w-[18px] h-[18px] shrink-0 mt-[4px]" />
                    <span>Do not share credentials, solutions, answers, flags, or lab data with others.</span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <img src={Icons.lineDotRightHorizontal} alt="Bullet" className="w-[18px] h-[18px] shrink-0 mt-[4px]" />
                    <span>Do not attempt to bypass lab restrictions, authentication, or security controls.</span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <img src={Icons.lineDotRightHorizontal} alt="Bullet" className="w-[18px] h-[18px] shrink-0 mt-[4px]" />
                    <span>If you experience a technical issue, contact your instructor or lab administrator.</span>
                  </li>
                </ul>
              </div>

              {/* Section 3: Submission & completion */}
              <div className="flex flex-col gap-[10px]">
                <h3 className="font-sans font-medium text-[18px] text-[#181818] pl-[12px]">
                  Submission & completion
                </h3>
                <ul className="flex flex-col gap-[10px] font-sans font-normal text-[16px] text-[#737373] pl-[28px]">
                  <li className="flex items-start gap-[10px]">
                    <img src={Icons.lineDotRightHorizontal} alt="Bullet" className="w-[18px] h-[18px] shrink-0 mt-[4px]" />
                    <span>Complete all required tasks before the timer expires.</span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <img src={Icons.lineDotRightHorizontal} alt="Bullet" className="w-[18px] h-[18px] shrink-0 mt-[4px]" />
                    <span>Submit your work using the provided submission mechanism.</span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <img src={Icons.lineDotRightHorizontal} alt="Bullet" className="w-[18px] h-[18px] shrink-0 mt-[4px]" />
                    <span>Once the timer ends, stop working and follow the submission instructions.</span>
                  </li>
                  <li className="flex items-start gap-[10px]">
                    <img src={Icons.lineDotRightHorizontal} alt="Bullet" className="w-[18px] h-[18px] shrink-0 mt-[4px]" />
                    <span>Your activity and submission may be subject to the lab's academic or integrity policies.</span>
                  </li>
                </ul>
              </div>

              {/* Bottom Notice Box */}
              <div className="bg-[#B9BEC7]/20 border border-[#B9BEC7] rounded-[12px] p-[16px] font-sans font-normal text-[16px] text-[#000000] leading-[1.5]">
                Stay within the authorized lab environment and follow the instructions provided for this lab. Failure to follow the rules may affect your lab result.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-[24px] py-[16px] border-t border-[#E5E7EB] flex items-center justify-end shrink-0">
              <button
                type="button"
                onClick={() => {
                  setShowInstructionsModal(false);
                  navigate(`/courses/session/1/lab/${activeItem}`);
                }}
                className="bg-[#9AD84A] hover:bg-[#8bc93e] text-white font-sans font-medium text-[15px] px-[24px] py-[10px] rounded-full transition-colors cursor-pointer flex items-center gap-[8px] shadow-xs"
              >
                <img src={Icons.startLab} alt="Start Lab" className="w-[18px] h-[18px]" />
                <span>Start Lab</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSessionDetailPage;
