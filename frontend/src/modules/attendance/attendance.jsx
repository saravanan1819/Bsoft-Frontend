import React, { useState, useMemo, useRef, useEffect } from "react";
import { Icons } from "../../assets/icons/icons.js";

// Mock Attendance History Data
const initialAttendanceHistory = [
  {
    id: 1,
    date: "28 Aug 2026",
    day: "Friday",
    course: "Cyber Security Fundamentals",
    session: "Week 2 - Session 1",
    time: "10:00 AM - 11:00 AM",
    faculty: "Mr. Arun Kumar",
    status: "Present",
  },
  {
    id: 2,
    date: "29 Aug 2026",
    day: "Saturday",
    course: "Network Security & Firewalls",
    session: "Week 3 - Session 1",
    time: "10:00 AM - 11:00 AM",
    faculty: "Ms. Priya Sharma",
    status: "Absent",
  },
  {
    id: 3,
    date: "01 Sep 2026",
    day: "Tuesday",
    course: "Ethical Hacking 101",
    session: "Week 1 - Session 2",
    time: "02:00 PM - 03:30 PM",
    faculty: "Mr. Rajesh Verma",
    status: "Present",
  },
  {
    id: 4,
    date: "02 Sep 2026",
    day: "Wednesday",
    course: "Cyber Security Fundamentals",
    session: "Week 3 - Session 2",
    time: "10:00 AM - 11:00 AM",
    faculty: "Mr. Arun Kumar",
    status: "Present",
  },
  {
    id: 5,
    date: "03 Sep 2026",
    day: "Thursday",
    course: "Network Security & Firewalls",
    session: "Week 4 - Session 1",
    time: "11:30 AM - 01:00 PM",
    faculty: "Ms. Priya Sharma",
    status: "Absent",
  },
  {
    id: 6,
    date: "04 Sep 2026",
    day: "Friday",
    course: "Ethical Hacking 101",
    session: "Week 2 - Session 1",
    time: "02:00 PM - 03:30 PM",
    faculty: "Mr. Rajesh Verma",
    status: "Present",
  },
  {
    id: 7,
    date: "05 Sep 2026",
    day: "Saturday",
    course: "Cyber Security Fundamentals",
    session: "Week 4 - Session 1",
    time: "10:00 AM - 11:00 AM",
    faculty: "Mr. Arun Kumar",
    status: "Present",
  },
  {
    id: 8,
    date: "06 Sep 2026",
    day: "Sunday",
    course: "Network Security & Firewalls",
    session: "Week 4 - Session 2",
    time: "11:30 AM - 01:00 PM",
    faculty: "Ms. Priya Sharma",
    status: "Absent",
  },
  {
    id: 9,
    date: "06 Sep 2026",
    day: "Sunday",
    course: "Ethical Hacking 101",
    session: "Week 2 - Session 2",
    time: "02:00 PM - 03:30 PM",
    faculty: "Mr. Rajesh Verma",
    status: "Present",
  },
];

const dateRangeOptions = ["Date Range", "Last 7 Days", "Last 30 Days", "This Month", "Last Month"];
const courseOptions = [
  "All Courses",
  "Cyber Security Fundamentals",
  "Network Security & Firewalls",
  "Ethical Hacking 101",
];

export default function AttendancePage() {
  const [activeFilterTab, setActiveFilterTab] = useState("All");
  const [selectedDateRange, setSelectedDateRange] = useState("Date Range");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dateDropdownRef = useRef(null);
  const courseDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
        setIsDateDropdownOpen(false);
      }
      if (courseDropdownRef.current && !courseDropdownRef.current.contains(event.target)) {
        setIsCourseDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter attendance records based on status, course, and date range
  const filteredRecords = useMemo(() => {
    return initialAttendanceHistory.filter((record) => {
      // Filter by Status Pill Tab
      if (activeFilterTab === "Present" && record.status !== "Present") return false;
      if (activeFilterTab === "Absent" && record.status !== "Absent") return false;

      // Filter by Selected Course
      if (selectedCourse !== "All Courses" && record.course !== selectedCourse) return false;

      // Filter by Date Range option
      if (selectedDateRange === "Last 7 Days" && !["06 Sep 2026", "05 Sep 2026", "04 Sep 2026", "03 Sep 2026", "02 Sep 2026", "01 Sep 2026"].includes(record.date)) {
        return false;
      }
      if (selectedDateRange === "This Month" && !record.date.includes("Sep 2026")) {
        return false;
      }
      if (selectedDateRange === "Last Month" && !record.date.includes("Aug 2026")) {
        return false;
      }

      return true;
    });
  }, [activeFilterTab, selectedCourse, selectedDateRange]);

  return (
    <div className="w-full min-h-screen bg-white px-[12px] md:px-[16px] pt-[4px] md:pt-[8px] pb-[24px] md:pb-[32px] space-y-[28px] font-sans tracking-normal">
      {/* Header & Export Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[12px] -mt-[12px] mb-[20px]">
        <p className="font-sans font-normal text-[16px] leading-normal text-[#000000]">
          View your attendance records and session-wise attendance summary.
        </p>
        <button
          onClick={() => alert("Exporting attendance records...")}
          className="border-[0.5px] border-[#B9BEC7] bg-white hover:bg-[#F9FAFB] text-[#374151] px-[14px] py-[7px] rounded-[10px] text-[13.5px] font-medium flex items-center gap-[6px] transition-colors cursor-pointer shrink-0 ml-auto sm:ml-0"
        >
          <img src={Icons.exportIcon} alt="Export" className="w-[15px] h-[15px]" />
          <span>Export</span>
        </button>
      </div>

      {/* Top Stat & AI Cards (Identical style to Hands-on Labs) */}
      <div className="flex flex-wrap lg:flex-nowrap items-stretch gap-[16px] w-full">
        {/* Card 1: Attendance Rate */}
        <div className="w-full sm:w-[250px] lg:w-[265px] shrink-0 h-[127px] border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[14px] bg-white flex flex-col justify-between">
          <div className="flex items-center gap-[8px] text-[14px] text-[#737373] font-normal">
            <img src={Icons.attendanceRate} alt="Attendance Rate" className="w-[18px] h-[18px]" />
            <span className="whitespace-nowrap">Attendance Rate</span>
          </div>
          <div className="flex flex-col gap-[4px] mt-[6px]">
            <div className="flex items-baseline gap-[6px]">
              <span className="text-[32px] font-bold text-[#000000] leading-none">89 %</span>
              <span className="text-[13px] text-[#737373] font-normal whitespace-nowrap">18 of 20 sessions</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="bg-[#EF4444] text-white text-[8px] font-normal px-[6px] py-[1.5px] rounded-[6px]">
                -2.1%
              </span>
              <span className="text-[13px] text-[#737373] font-normal">vs Last week</span>
            </div>
          </div>
        </div>

        {/* Card 2: Present */}
        <div className="w-full sm:w-[218px] shrink-0 h-[127px] border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[14px] bg-white flex flex-col justify-between">
          <div className="flex items-center gap-[8px] text-[14px] text-[#737373] font-normal">
            <img src={Icons.presentIcon} alt="Present" className="w-[18px] h-[18px]" />
            <span className="whitespace-nowrap">Present</span>
          </div>
          <div className="flex flex-col gap-[4px] mt-[6px]">
            <div className="flex items-baseline gap-[6px]">
              <span className="text-[32px] font-bold text-[#000000] leading-none">210</span>
              <span className="text-[14px] text-[#737373] font-normal">Session</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="bg-[#10B981] text-white text-[8px] font-normal px-[6px] py-[1.5px] rounded-[6px]">
                +3.1%
              </span>
              <span className="text-[13px] text-[#737373] font-normal">vs Last week</span>
            </div>
          </div>
        </div>

        {/* Card 3: Absent */}
        <div className="w-full sm:w-[218px] shrink-0 h-[127px] border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[14px] bg-white flex flex-col justify-between">
          <div className="flex items-center gap-[8px] text-[14px] text-[#737373] font-normal">
            <img src={Icons.absentIcon} alt="Absent" className="w-[18px] h-[18px]" />
            <span className="whitespace-nowrap">Absent</span>
          </div>
          <div className="flex flex-col gap-[4px] mt-[6px]">
            <div className="flex items-baseline gap-[6px]">
              <span className="text-[32px] font-bold text-[#000000] leading-none">21</span>
              <span className="text-[14px] text-[#737373] font-normal">Session</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="bg-[#EF4444] text-white text-[8px] font-normal px-[6px] py-[1.5px] rounded-[6px]">
                -2.1%
              </span>
              <span className="text-[13px] text-[#737373] font-normal">vs Last week</span>
            </div>
          </div>
        </div>

        {/* Card 4: AI Insights */}
        <div className="w-full sm:w-[320px] lg:w-[350px] shrink-0 h-[127px] border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[14px] pr-[28px] md:pr-[36px] bg-white flex flex-col justify-between relative overflow-hidden">
          <img src={Icons.aiInsightsGradient} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0" />
          <div className="relative z-10 flex items-center gap-[6px]">
            <img src={Icons.aiMagic} alt="AI Insights" className="w-[18px] h-[18px]" />
            <span className="text-[14px] font-normal text-[#9AD84A]">AI Insights</span>
          </div>
          <p className="relative z-10 text-[12px] text-[#000000] font-normal leading-snug mt-[4px]">
            Your attendance improved by 5% this month. You attended more sessions compared with the previous period.
          </p>
          <div className="relative z-10 flex items-center gap-[6px] justify-end mt-[4px]">
            <div className="w-[18px] h-[3.5px] bg-[#9AD84A] rounded-full" />
            <div className="w-[18px] h-[3.5px] bg-[#D1D5DB] rounded-full" />
            <div className="w-[18px] h-[3.5px] bg-[#D1D5DB] rounded-full" />
          </div>
        </div>
      </div>

      {/* Attendance History Table Card */}
      <div className="border-[0.5px] border-[#B9BEC7] rounded-[20px] bg-white overflow-hidden flex flex-col">
        {/* Table Filter Header Bar */}
        <div className="px-[20px] py-[16px] border-b-[0.5px] border-[#B9BEC7] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <img src={Icons.attendanceHistory} alt="Attendance History" className="w-[18px] h-[18px]" />
            <h2 className="text-[16px] font-medium text-[#111827]">Attendance History</h2>
          </div>

          <div className="flex flex-wrap items-center gap-[12px]">
            {/* Filter Pills */}
            <div className="flex items-center bg-[#F0F1F3] border-[0.5px] border-[#B9BEC7] p-[3px] rounded-[10px]">
              {["All", "Present", "Absent"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilterTab(tab)}
                  className={`px-[14px] py-[5px] rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer ${
                    activeFilterTab === tab
                      ? "bg-white text-[#111827] shadow-sm"
                      : "text-[#6B7280] hover:text-[#111827]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Date Range Dropdown */}
            <div className="relative" ref={dateDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsDateDropdownOpen((prev) => !prev);
                  setIsCourseDropdownOpen(false);
                }}
                className="flex items-center gap-[6px] border-[0.5px] border-[#B9BEC7] bg-white hover:bg-[#F9FAFB] text-[#374151] px-[12px] py-[6px] rounded-[10px] text-[13px] font-medium transition-colors cursor-pointer"
              >
                <img src={Icons.dateRange} alt="Calendar" className="w-[15px] h-[15px]" />
                <span>{selectedDateRange}</span>
                <img
                  src={Icons.openDropdown}
                  alt="Dropdown"
                  className={`w-[12px] h-[12px] opacity-60 ml-[2px] transition-transform ${
                    isDateDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDateDropdownOpen && (
                <div className="absolute right-0 mt-[6px] w-[170px] bg-white border-[0.5px] border-[#B9BEC7] rounded-[12px] shadow-lg z-50 py-[4px]">
                  {dateRangeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSelectedDateRange(option);
                        setIsDateDropdownOpen(false);
                      }}
                      className={`w-full text-left px-[14px] py-[7px] text-[13px] font-medium transition-colors cursor-pointer ${
                        selectedDateRange === option
                          ? "bg-[#F3F4F6] text-[#111827]"
                          : "text-[#374151] hover:bg-[#F9FAFB]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* All Courses Dropdown */}
            <div className="relative" ref={courseDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsCourseDropdownOpen((prev) => !prev);
                  setIsDateDropdownOpen(false);
                }}
                className="flex items-center gap-[6px] border-[0.5px] border-[#B9BEC7] bg-white hover:bg-[#F9FAFB] text-[#374151] px-[12px] py-[6px] rounded-[10px] text-[13px] font-medium transition-colors cursor-pointer"
              >
                <img src={Icons.allCourses} alt="Courses" className="w-[15px] h-[15px]" />
                <span>{selectedCourse}</span>
                <img
                  src={Icons.openDropdown}
                  alt="Dropdown"
                  className={`w-[12px] h-[12px] opacity-60 ml-[2px] transition-transform ${
                    isCourseDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCourseDropdownOpen && (
                <div className="absolute right-0 mt-[6px] w-[230px] bg-white border-[0.5px] border-[#B9BEC7] rounded-[12px] shadow-lg z-50 py-[4px]">
                  {courseOptions.map((course) => (
                    <button
                      key={course}
                      type="button"
                      onClick={() => {
                        setSelectedCourse(course);
                        setIsCourseDropdownOpen(false);
                      }}
                      className={`w-full text-left px-[14px] py-[7px] text-[13px] font-medium transition-colors cursor-pointer ${
                        selectedCourse === course
                          ? "bg-[#F3F4F6] text-[#111827]"
                          : "text-[#374151] hover:bg-[#F9FAFB]"
                      }`}
                    >
                      {course}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Records Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F0F1F3] border-b-[0.5px] border-[#B9BEC7] text-[13px] font-medium text-[#111827]">
                <th className="py-[14px] px-[20px]">Date</th>
                <th className="py-[14px] px-[20px]">Course</th>
                <th className="py-[14px] px-[20px]">Session</th>
                <th className="py-[14px] px-[20px]">Faculty</th>
                <th className="py-[14px] px-[20px] text-right pr-[28px]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((item) => {
                const isPresent = item.status === "Present";
                return (
                  <tr key={item.id} className="hover:bg-[#F9FAFB]/60 transition-colors text-[14px]">
                    {/* Date */}
                    <td className="py-[14px] px-[20px] align-middle">
                      <div className="flex flex-col">
                        <span className="font-normal text-[#111827]">{item.date}</span>
                        <span className="text-[12px] text-[#737373] font-normal">{item.day}</span>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-[14px] px-[20px] align-middle font-normal text-[#111827]">
                      {item.course}
                    </td>

                    {/* Session & Time */}
                    <td className="py-[14px] px-[20px] align-middle">
                      <div className="flex flex-col">
                        <span className="font-normal text-[#111827]">{item.session}</span>
                        <span className="text-[12px] text-[#737373] font-normal">{item.time}</span>
                      </div>
                    </td>

                    {/* Faculty */}
                    <td className="py-[14px] px-[20px] align-middle font-normal text-[#111827]">
                      {item.faculty}
                    </td>

                    {/* Status Badge */}
                    <td className="py-[14px] px-[20px] align-middle text-right pr-[28px]">
                      <span
                        className={`inline-block px-[14px] py-[4px] rounded-[5px] text-[14px] font-normal text-center ${
                          isPresent
                            ? "bg-[#DCFCE7] text-[#15803D]"
                            : "bg-[#FEE2E2] text-[#B91C1C]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-[12px] pt-[4px]">
        <span className="text-[16px] text-[#000000] font-normal">
          Showing 1 to 9 of 22
        </span>

        <div className="flex items-center gap-[8px]">
          {/* Previous Arrow */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-[36px] h-[36px] rounded-[5px] border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center text-[#374151] hover:bg-[#F9FAFB] cursor-pointer transition-colors"
          >
            <img src={Icons.previous} alt="Prev" className="w-[12px] h-[12px]" />
          </button>

          {/* Page Numbers Pill Container */}
          <div className="flex items-center bg-[#F0F1F3] border-[0.5px] border-[#B9BEC7] p-[3px] rounded-[5px]">
            {["1", "2", "3", "...", "8"].map((page, idx) => {
              const isActive = currentPage === Number(page);
              if (page === "...") {
                return (
                  <span key={idx} className="px-[8px] text-[14px] font-normal text-[#111827]">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(Number(page))}
                  className={`w-[30px] h-[30px] flex items-center justify-center rounded-[5px] text-[14px] transition-colors cursor-pointer ${
                    isActive
                      ? "bg-white text-[#111827] shadow-sm font-medium"
                      : "text-[#111827] hover:bg-black/5 font-normal"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next Arrow */}
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="w-[36px] h-[36px] rounded-[5px] border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center text-[#374151] hover:bg-[#F9FAFB] cursor-pointer transition-colors"
          >
            <img src={Icons.next} alt="Next" className="w-[12px] h-[12px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
