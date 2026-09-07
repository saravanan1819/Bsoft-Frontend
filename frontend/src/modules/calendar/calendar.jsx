import React, { useState, useMemo, useRef, useEffect } from "react";
import { Icons } from "../../assets/icons/icons.js";

// Master dataset of events tied to actual dates (YYYY-MM-DD)
const allEventsDatabase = [
  {
    id: "live-session-1",
    date: "2026-07-01",
    dayIndex: 1, // Column 1 (Mon/Wed)
    startHour: 10.0, // 10:00 AM
    endHour: 11.5, // 11:30 AM
    timeRange: "10.00 - 11.30",
    statusBadge: "UpComing",
    dayBadgeNumber: "25",
    monthName: "JULY",
    cardTitle: "Week 1 : Linux Basic",
    detailTitle: "Live Session",
    subtitle: "Week2 - Session 1",
    courseName: "Cyber Security Fundamentals",
    fullDateText: "Tuesday, 05 July 2026",
    fullTimeText: "10.00 AM - 11.30 AM",
    facultyName: "Mr. Arun Kumar",
    description: "Join the live session to learn about core security principle.",
    actionText: "Join Live Session",
    secondaryActionText: "View Session Details",
    bgColor: "bg-[#F3E8FF]",
    headerBg: "bg-[#C084FC]",
    borderColor: "border-[#C084FC]",
    textColor: "text-[#7E22CE]",
    badgeText: "text-[#7E22CE]",
    badgeIcon: "live",
    badgeType: "Live Session",
    faculty: "Saravanan",
  },
  {
    id: "recall-quiz-1",
    date: "2026-07-02",
    dayIndex: 2, // Column 2 (Tue/Thu)
    startHour: 11.5, // 11:30 AM
    endHour: 12.0, // 12:00 PM
    timeRange: "11.30 - 12.00",
    statusBadge: "UpComing",
    dayBadgeNumber: "02",
    monthName: "JULY",
    cardTitle: "Week 1 : Recall Quiz",
    detailTitle: "Recall Quiz",
    subtitle: "Week 1 - Quiz",
    courseName: "Cyber Security Fundamentals",
    fullDateText: "Thursday, 02 July 2026",
    fullTimeText: "11.30 AM - 12.00 PM",
    facultyName: "Mr. Arun Kumar",
    description: "Complete the recall quiz to test your understanding of Linux fundamentals.",
    actionText: "Start Quiz",
    secondaryActionText: "View Quiz Details",
    bgColor: "bg-[#FFEDD5]",
    headerBg: "bg-[#FB923C]",
    borderColor: "border-[#FB923C]",
    textColor: "text-[#C2410C]",
    badgeText: "text-[#C2410C]",
    badgeIcon: "quiz",
    badgeType: "Recall Quiz",
    duration: "20 Min",
  },
  {
    id: "tutor-meeting-1",
    date: "2026-07-03",
    dayIndex: 3, // Column 3 (Wed/Fri)
    startHour: 10.0, // 10:00 AM
    endHour: 10.5, // 10:30 AM
    timeRange: "10.00 - 10.30",
    statusBadge: "Scheduled",
    dayBadgeNumber: "03",
    monthName: "JULY",
    cardTitle: "Session 1",
    detailTitle: "Tutor Meeting",
    subtitle: "Session 1",
    courseName: "Cyber Security Fundamentals",
    fullDateText: "Friday, 03 July 2026",
    fullTimeText: "10.00 AM - 10.30 AM",
    facultyName: "Saravanan",
    description: "1-on-1 tutoring session to review lab assignments and Q&A.",
    actionText: "Join Meeting",
    secondaryActionText: "Reschedule Meeting",
    bgColor: "bg-[#CFFAFE]",
    headerBg: "bg-[#22D3EE]",
    borderColor: "border-[#22D3EE]",
    textColor: "text-[#0891B2]",
    badgeText: "text-[#0891B2]",
    badgeIcon: "meeting",
    badgeType: "Tutor Meeting",
    faculty: "Saravanan",
  },
  {
    id: "hands-on-lab-1",
    date: "2026-07-05",
    dayIndex: 5, // Column 5 (Sun)
    startHour: 12.5, // 12:30 PM
    endHour: 13.5, // 01:30 PM
    timeRange: "12.30 - 01.30",
    statusBadge: "In Progress",
    dayBadgeNumber: "05",
    monthName: "JULY",
    cardTitle: "Linux File Permission",
    detailTitle: "Hands on Lab",
    subtitle: "Linux File Permission",
    courseName: "Cyber Security Fundamentals",
    fullDateText: "Sunday, 05 July 2026",
    fullTimeText: "12.30 PM - 01.30 PM",
    facultyName: "Mr. Arun Kumar",
    description: "Practice configuring file permissions and user access rights in guided terminal sandbox.",
    actionText: "Launch Lab Workspace",
    secondaryActionText: "View Lab Guide",
    bgColor: "bg-[#FCE7F3]",
    headerBg: "bg-[#F472B6]",
    borderColor: "border-[#F472B6]",
    textColor: "text-[#BE185D]",
    badgeText: "text-[#BE185D]",
    badgeIcon: "lab",
    badgeType: "Hands on Lab",
    duration: "60 Min",
  },
];

// Helper: Format Date to YYYY-MM-DD
function formatYYYYMMDD(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function CalendarPage() {
  // Current active reference date (Default: system real-time date)
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("Week"); // "Day", "Week", "Month"
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const dateDropdownRef = useRef(null);

  // Selected Event state for the Right Drawer Sidebar
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Dynamic system time ticker state
  const [nowTime, setNowTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNowTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Compute dynamic hours range centered around current time
  const { startHour, hoursList } = useMemo(() => {
    const curHour = nowTime.getHours();
    const start = Math.max(7, Math.min(14, curHour - 1));
    const list = [];
    for (let i = 0; i < 7; i++) {
      const h = (start + i) % 24;
      const ampm = h >= 12 ? "PM" : "AM";
      const displayH = h % 12 === 0 ? 12 : h % 12;
      list.push({ hourNum: h, label: `${displayH}${ampm}` });
    }
    return { startHour: start, hoursList: list };
  }, [nowTime]);

  // Current time position & label calculation
  const currentDecimalHour = nowTime.getHours() + nowTime.getMinutes() / 60;
  const isRedLineInView = currentDecimalHour >= startHour && currentDecimalHour <= startHour + 7;
  const redLineTopPx = Math.round((currentDecimalHour - startHour) * 80);
  const formattedCurrentTime = nowTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).replace(" ", "");

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
        setIsDateDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mini Calendar Viewport Month state inside popover
  const [pickerMonth, setPickerMonth] = useState(new Date("2026-07-01T00:00:00"));

  // Keep pickerMonth in sync with currentDate when popover opens
  useEffect(() => {
    if (isDateDropdownOpen) {
      setPickerMonth(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
    }
  }, [isDateDropdownOpen, currentDate]);

  // Mini calendar grid calculations
  const miniCalendarData = useMemo(() => {
    const year = pickerMonth.getFullYear();
    const month = pickerMonth.getMonth();
    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun
    const totalDays = new Date(year, month + 1, 0).getDate();

    const blanks = Array.from({ length: firstDayOfWeek });
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);

    const monthName = pickerMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    return { year, month, blanks, days, monthName };
  }, [pickerMonth]);

  // 1. Calculate all 7 Days of the active week
  const weekDays = useMemo(() => {
    const baseDay = new Date("2026-07-01T00:00:00");
    const diffDays = Math.floor((currentDate - baseDay) / (1000 * 60 * 60 * 24));
    const weekIndex = Math.floor(diffDays / 7);
    
    const days = [];
    for (let i = 1; i <= 7; i++) {
      const d = new Date("2026-07-01T00:00:00");
      d.setDate(1 + (weekIndex * 7) + (i - 1));
      days.push({
        date: d,
        dayNum: i,
      });
    }
    return days;
  }, [currentDate]);

  // 2. Navigation Handlers
  const handlePrev = () => {
    const d = new Date(currentDate);
    if (activeTab === "Day") {
      d.setDate(d.getDate() - 1);
    } else if (activeTab === "Month") {
      d.setMonth(d.getMonth() - 1);
    } else {
      d.setDate(d.getDate() - 7);
    }
    setCurrentDate(d);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    if (activeTab === "Day") {
      d.setDate(d.getDate() + 1);
    } else if (activeTab === "Month") {
      d.setMonth(d.getMonth() + 1);
    } else {
      d.setDate(d.getDate() + 7);
    }
    setCurrentDate(d);
  };

  const handleToday = () => {
    setCurrentDate(new Date("2026-07-05T00:00:00"));
  };

  const handleDateChange = (e) => {
    if (e.target.value) {
      setCurrentDate(new Date(e.target.value + "T00:00:00"));
    }
  };

  // Header Month Title (e.g. "July 2026")
  const monthYearTitle = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Pill Label (e.g. "05 July 2026")
  const selectedDateLabel = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Hours rows starting from current evening 7PM range onwards
  const hours = ["7PM", "8PM", "9PM", "10PM", "11PM", "12AM", "1AM"];

  return (
    <div className="w-full flex-1 bg-white font-sans flex flex-col lg:flex-row items-stretch min-h-full">
      
      {/* LEFT CALENDAR GRID FRAME CONTAINER */}
      <div className="flex-1 min-w-0 w-full bg-white flex flex-col mt-[8px] mb-[24px] ml-[24px] mr-[16px] lg:mr-[24px]">
        
        {/* Calendar Top Navigation Header Bar */}
        <div className="px-[20px] md:px-[24px] pt-[6px] pb-[12px] flex flex-wrap items-center justify-between gap-[16px]">
          {/* Month & Date Selector */}
          <div className="flex items-center gap-[12px]">
            <h1 className="font-sans font-medium text-[22px] text-[#000000]">
              {monthYearTitle}
            </h1>

            {/* Dynamic Interactive Date Picker Dropdown */}
            <div className="relative z-30" ref={dateDropdownRef}>
              <button
                type="button"
                onClick={() => setIsDateDropdownOpen((prev) => !prev)}
                className="flex items-center gap-[8px] border-[0.5px] border-[#B9BEC7] bg-white hover:bg-[#F9FAFB] text-[#374151] px-[12px] py-[6px] rounded-[10px] text-[13.5px] font-medium transition-colors cursor-pointer"
              >
                <img src={Icons.dateRange} alt="Date" className="w-[15px] h-[15px]" />
                <span>{selectedDateLabel}</span>
                <img
                  src={Icons.openDropdown}
                  alt="Dropdown"
                  className={`w-[12px] h-[12px] opacity-60 ml-[2px] transition-transform duration-200 ${
                    isDateDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Date Dropdown Mini Calendar Popover */}
              {isDateDropdownOpen && (
                <div className="absolute top-full left-0 mt-[8px] w-[290px] bg-white border border-[#B9BEC7] rounded-[20px] shadow-xl p-[16px] z-50 flex flex-col gap-[12px]">
                  {/* Popover Month Header & Controls */}
                  <div className="flex items-center justify-between px-[4px]">
                    <button
                      type="button"
                      onClick={() =>
                        setPickerMonth(
                          new Date(miniCalendarData.year, miniCalendarData.month - 1, 1)
                        )
                      }
                      className="w-[28px] h-[28px] rounded-full border border-[#B9BEC7] flex items-center justify-center text-[#374151] hover:bg-[#F3F4F6] cursor-pointer text-[14px]"
                    >
                      ‹
                    </button>
                    <span className="font-sans font-semibold text-[14px] text-[#000000]">
                      {miniCalendarData.monthName}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setPickerMonth(
                          new Date(miniCalendarData.year, miniCalendarData.month + 1, 1)
                        )
                      }
                      className="w-[28px] h-[28px] rounded-full border border-[#B9BEC7] flex items-center justify-center text-[#374151] hover:bg-[#F3F4F6] cursor-pointer text-[14px]"
                    >
                      ›
                    </button>
                  </div>

                  {/* Days of Week Header Row */}
                  <div className="grid grid-cols-7 text-center font-sans font-medium text-[11px] text-[#737373]">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((dayName) => (
                      <div key={dayName} className="py-1">
                        {dayName}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid 7 Columns */}
                  <div className="grid grid-cols-7 text-center gap-y-[4px]">
                    {miniCalendarData.blanks.map((_, idx) => (
                      <div key={`blank-${idx}`} className="w-[32px] h-[32px]" />
                    ))}

                    {miniCalendarData.days.map((dayNum) => {
                      const dayDate = new Date(
                        miniCalendarData.year,
                        miniCalendarData.month,
                        dayNum
                      );
                      const dateStr = formatYYYYMMDD(dayDate);
                      const isSelected = dateStr === formatYYYYMMDD(currentDate);
                      const hasEvent = allEventsDatabase.some(
                        (ev) => ev.date === dateStr
                      );

                      return (
                        <button
                          key={dayNum}
                          type="button"
                          onClick={() => {
                            setCurrentDate(dayDate);
                            setIsDateDropdownOpen(false);
                          }}
                          className={`w-[32px] h-[32px] mx-auto rounded-full font-sans text-[12px] flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#9AD84A] text-white font-semibold shadow-xs"
                              : "text-[#000000] hover:bg-[#F3F4F6] font-normal"
                          }`}
                        >
                          <span>{dayNum}</span>
                          {hasEvent && (
                            <span
                              className={`w-[4px] h-[4px] rounded-full absolute bottom-[3px] ${
                                isSelected ? "bg-white" : "bg-[#9AD84A]"
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Select Today Footer */}
                  <div className="border-t border-[#E5E7EB] pt-[10px] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        const todayDate = new Date("2026-07-05T00:00:00");
                        setCurrentDate(todayDate);
                        setPickerMonth(new Date(2026, 6, 1));
                        setIsDateDropdownOpen(false);
                      }}
                      className="text-[12px] font-sans font-medium text-[#737373] hover:text-black cursor-pointer"
                    >
                      Reset to 05 July 2026
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls: Day/Week/Month Switcher + Today + Arrow Nav */}
          <div className="flex items-center gap-[12px] flex-wrap">
            {/* View Tab Switcher Pills */}
            <div className="flex items-center bg-[#F3F4F6] border-[0.5px] border-[#B9BEC7] p-[3px] rounded-[10px]">
              {["Day", "Week", "Month"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-[14px] py-[5px] rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "bg-white text-[#111827] shadow-sm"
                      : "text-[#6B7280] hover:text-[#111827]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Today Button */}
            <button
              onClick={handleToday}
              className="border-[0.5px] border-[#B9BEC7] bg-white hover:bg-[#F9FAFB] text-[#374151] px-[14px] py-[6px] rounded-[10px] text-[13px] font-medium transition-colors cursor-pointer"
            >
              Today
            </button>

            {/* Previous / Next Arrow Controls */}
            <div className="flex items-center gap-[4px]">
              <button
                onClick={handlePrev}
                title="Previous"
                className="w-[30px] h-[30px] rounded-[8px] border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center text-[#374151] hover:bg-[#F9FAFB] cursor-pointer"
              >
                <img src={Icons.previous} alt="Previous" className="w-[11px] h-[11px]" />
              </button>
              <button
                onClick={handleNext}
                title="Next"
                className="w-[30px] h-[30px] rounded-[8px] border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center text-[#374151] hover:bg-[#F9FAFB] cursor-pointer"
              >
                <img src={Icons.next} alt="Next" className="w-[11px] h-[11px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid View Container */}
        <div className="w-full border border-[#B9BEC7] rounded-[15px] overflow-hidden bg-white flex flex-col">
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="min-w-[1050px] flex flex-col">
            {/* Days Header Row */}
            <div className="grid grid-cols-8 border-b-[0.5px] border-[#B9BEC7] bg-white text-center">
              {/* GMT Timezone Label (regular 12px #000000) */}
              <div className="py-[12px] px-[8px] border-r-[0.5px] border-[#B9BEC7] font-sans font-normal text-[12px] text-[#000000] flex items-center justify-center">
                GMT+05.30
              </div>

              {/* Days Columns Header */}
              {weekDays.map(({ date: dayDate, dayNum }) => {
                const dateStr = formatYYYYMMDD(dayDate);
                const isSelected = dateStr === formatYYYYMMDD(currentDate);
                const formattedLabel = dayDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                });

                return (
                  <div
                    key={dateStr}
                    onClick={() => setCurrentDate(dayDate)}
                    className={`py-[12px] px-[8px] border-r-[0.5px] border-[#B9BEC7] last:border-r-0 font-sans text-[14px] flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out ${
                      isSelected ? "bg-[#F7FBEB] font-semibold text-[#000000]" : "bg-white font-normal text-[#000000] hover:bg-gray-50"
                    }`}
                  >
                    {formattedLabel}
                  </div>
                );
              })}
            </div>

            {/* Time Slots & Days Grid Matrix */}
            <div className="relative grid grid-cols-8">
              {/* Red Current Time Line Indicator dynamically positioned */}
              {isRedLineInView && (
                <div
                  style={{ top: `${redLineTopPx}px` }}
                  className="absolute left-0 right-0 z-10 flex items-center pointer-events-none transition-all duration-500"
                >
                  <span className="bg-[#FF383C] text-white text-[10px] font-semibold px-[6px] py-[2px] rounded-[4px] ml-[6px] shadow-xs">
                    {formattedCurrentTime}
                  </span>
                  <div className="flex-1 h-[1.5px] bg-[#FF383C]/70" />
                </div>
              )}

              {/* Column 1: Hours Column */}
              <div className="border-r-[0.5px] border-[#B9BEC7] flex flex-col bg-white">
                {hoursList.map(({ hourNum, label }) => (
                  <div
                    key={hourNum}
                    className="h-[80px] flex items-center justify-center font-sans font-normal text-[14px] text-[#000000]"
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Columns 2 to 8: Days Columns */}
              {weekDays.map(({ date: dayDate, dayNum }) => {
                const dateStr = formatYYYYMMDD(dayDate);
                const isSelected = dateStr === formatYYYYMMDD(currentDate);

                // Filter events strictly for this dayDate OR matching dayNum (1-7) for base week
                const dayEvents = allEventsDatabase.filter((ev) => ev.date === dateStr || ev.dayIndex === dayNum);

                return (
                  <div
                    key={dateStr}
                    onClick={() => setCurrentDate(dayDate)}
                    className={`relative border-r-[0.5px] border-[#B9BEC7] last:border-r-0 flex flex-col cursor-pointer transition-colors duration-300 ease-in-out ${
                      isSelected ? "bg-[#F7FBEB]" : "bg-white"
                    }`}
                  >
                    {/* Active Day Top Green Accent Bar (#9BD94A) */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[3px] bg-[#9BD94A] z-10 transition-all duration-300 ease-in-out ${
                        isSelected ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                      }`}
                    />

                    {/* Background Hour Grid Slots */}
                    {hoursList.map(({ hourNum }) => (
                      <div
                        key={hourNum}
                        className="h-[80px] border-b-[0.5px] border-[#B9BEC7]/60 last:border-b-0"
                      />
                    ))}

                    {/* Positioned Events Cards in this column */}
                    {dayEvents.map((event) => {
                      const topPx = Math.round((event.startHour - startHour) * 80) + 10;
                      const durationHours = event.endHour - event.startHour;
                      const heightPx = Math.max(145, Math.round(durationHours * 110));
                      const isCurrentlySelected = selectedEvent?.id === event.id;

                      return (
                        <div
                          key={event.id}
                          style={{ top: `${topPx}px`, height: `${heightPx}px` }}
                          onClick={() => setSelectedEvent(event)}
                          className={`absolute left-[4px] right-[4px] ${event.bgColor} border-[0.7px] ${event.borderColor} rounded-[8px] flex flex-col justify-between cursor-pointer z-2`}
                        >
                          {/* Event Coloured Time Header Bar */}
                          <div className={`${event.headerBg} px-[8px] py-[3px] rounded-t-[7px]`}>
                            <span className="block font-sans text-[11px] font-medium text-white">
                              {event.timeRange}
                            </span>
                          </div>

                          {/* Event Body Content */}
                          <div className="p-[8px] flex-1 flex flex-col justify-between">
                            <div>
                              {/* Badge Type */}
                              <div className="inline-flex items-center gap-[4px] px-[6px] py-[2px] rounded-[6px] bg-white border-[0.5px] border-[#B9BEC7]/60 shadow-2xs mb-[6px]">
                                {event.badgeIcon === "live" && (
                                  <img src={Icons.zoomCircle} alt="Live Session" className="w-[11px] h-[11px] shrink-0" />
                                )}
                                {event.badgeIcon === "meeting" && (
                                  <img src={Icons.calendarTutor} alt="Tutor Meeting" className="w-[11px] h-[11px] shrink-0" />
                                )}
                                {event.badgeIcon === "lab" && (
                                  <img src={Icons.labs} alt="Lab" className="w-[11px] h-[11px] shrink-0" />
                                )}
                                {event.badgeIcon === "quiz" && (
                                  <img src={Icons.calendarRecall} alt="Recall Quiz" className="w-[11px] h-[11px] shrink-0" />
                                )}
                                <span style={{ color: '#374151', fontSize: '10px', fontWeight: '500', whiteSpace: 'nowrap' }}>
                                  {event.badgeType}
                                </span>
                              </div>

                              {/* Event Title */}
                              <h4 className={`font-sans font-normal text-[12.5px] leading-tight ${event.textColor}`}>
                                {event.cardTitle || event.title}
                              </h4>
                            </div>

                            {/* Event Footer (Faculty or Duration) */}
                            <div className="mt-[6px]">
                              {event.faculty && (
                                <div>
                                  <span className="block text-[9.5px] text-[#737373] font-normal">Faculty</span>
                                  <span className="block text-[11px] text-[#111827] font-semibold leading-tight">
                                    {event.faculty}
                                  </span>
                                </div>
                              )}
                              {event.duration && (
                                <div>
                                  <span className="block text-[9.5px] text-[#737373] font-normal">Duration</span>
                                  <span className="block text-[11px] text-[#111827] font-semibold leading-tight">
                                    {event.duration}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* RIGHT SIDEBAR PANEL matching event.png */}
      {selectedEvent && (
        <aside className="w-full lg:w-[320px] shrink-0 bg-white border-l-[0.7px] border-r-[0.7px] border-[#B9BEC7] rounded-none p-[24px] flex flex-col justify-between space-y-[24px] shadow-sm animate-in fade-in slide-in-from-right duration-200 self-stretch min-h-full">
          
          <div className="space-y-[20px]">
            {/* Top Row: UpComing Badge + Menu Icon */}
            <div className="flex items-center justify-between">
              <span className="px-[12px] py-[4px] rounded-[10px] bg-[#DBEAFE] text-[#2563EB] text-[12px] font-medium">
                {selectedEvent.statusBadge || "UpComing"}
              </span>

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="text-[#6B7280] hover:text-[#111827] p-[4px] rounded-[6px] transition-colors cursor-pointer"
                title="Minimize panel"
              >
                <img src={Icons.menuCollapse} alt="Minimize" className="w-[18px] h-[18px]" />
              </button>
            </div>

            {/* Date Badge Box + Title Header */}
            <div className="flex items-start gap-[14px]">
              {/* Calendar Icon Date Badge */}
              <div className="w-[52px] h-[52px] rounded-[12px] bg-white overflow-hidden flex flex-col shrink-0 border-[0.7px] border-[#E5E7EB] shadow-sm">
                {/* Red Month Strip - pinned to top */}
                <div className="w-full bg-[#EF4444] text-white text-[10px] font-medium text-center py-[2px] uppercase font-sans">
                  {selectedEvent.monthName || "JULY"}
                </div>
                {/* Date Number - centered in remaining space */}
                <div className="flex-1 flex items-center justify-center bg-[#F9FAFB]">
                  <span className="text-[20px] font-bold text-[#111827] leading-none">
                    {selectedEvent.dayBadgeNumber || "25"}
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-[17px] font-bold text-[#111827] leading-snug">
                  {selectedEvent.detailTitle || selectedEvent.title}
                </h3>
                <p className="text-[13px] text-[#6B7280] font-normal mt-[2px]">
                  {selectedEvent.subtitle || "Week2 - Session 1"}
                </p>
              </div>
            </div>

            {/* Course Title */}
            <div>
              <h4 className="text-[15px] font-medium text-[#111827]">
                {selectedEvent.courseName || "Cyber Security Fundamentals"}
              </h4>
            </div>

            {/* Meta Info List (Date, Time, Faculty) */}
            <div className="space-y-[12px] pt-[4px]">
              {/* Date */}
              <div className="flex items-center gap-[10px] text-[13.5px] text-[#374151]">
                <img src={Icons.calendar} alt="Date" className="w-[16px] h-[16px] opacity-70" />
                <span>{selectedEvent.fullDateText || "Tuesday, 05 July 2026"}</span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-[10px] text-[13.5px] text-[#374151]">
                <img src={Icons.clock} alt="Time" className="w-[16px] h-[16px] opacity-70" />
                <span>{selectedEvent.fullTimeText || "10.00 AM - 11.00 AM"}</span>
              </div>

              {/* Faculty */}
              <div className="flex items-center gap-[10px] text-[13.5px] text-[#374151]">
                <img src={Icons.user} alt="Faculty" className="w-[16px] h-[16px] opacity-70" />
                <span>{selectedEvent.facultyName || selectedEvent.faculty || "Mr. Arun Kumar"}</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="pt-[6px]">
              <h5 className="text-[14px] font-medium text-[#111827] mb-[6px]">
                Description
              </h5>
              <p className="text-[13px] text-[#6B7280] font-normal leading-relaxed">
                {selectedEvent.description || "Join the live session to learn about core security principle."}
              </p>
            </div>

            {/* Action Buttons right after Description */}
            <div className="space-y-[10px] pt-[16px] w-full">
              {/* Primary Action Button (Green Pill with external link icon) */}
              <button
                type="button"
                className="w-full bg-[#9AD84A] hover:bg-[#88C43B] text-white font-medium text-[14px] py-[11px] px-[16px] rounded-full flex items-center justify-center gap-[8px] transition-colors cursor-pointer shadow-xs"
              >
                <svg className="w-[16px] h-[16px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>{selectedEvent.actionText || "Join Live Session"}</span>
              </button>

              {/* Secondary Action Button (Outlined Blue/White Pill) */}
              <button
                type="button"
                className="w-full bg-white hover:bg-gray-50 border border-[#3B82F6] text-[#2563EB] font-medium text-[14px] py-[11px] px-[16px] rounded-full flex items-center justify-center transition-colors cursor-pointer"
              >
                <span>{selectedEvent.secondaryActionText || "View Session Details"}</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
