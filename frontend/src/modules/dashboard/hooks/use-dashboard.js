import { useState } from "react";

// Replace with API response ai-recommendations

const MOCK_AIASSISTANT_RECOMMENDATIONS = [
  { id: "rec-1", text: "Review Network Security Fundamentals — Milestone 3" },
  { id: "rec-2", text: "Practice: Firewall configuration lab" },
  { id: "rec-3", text: "Quiz: Intro to Threat Detection" },
  { id: "rec-4", text: "Watch: Zero Trust Architecture overview" },
  { id: "rec-5", text: "Complete: Weekly cybersecurity assessment" },
];

// Replace with API response overview

const MOCK_OVERVIEW = [
  {
    id: "enrolled",
    label: "Courses Enrolled",
    value: 12,
    unit: "",
    trend: { value: 1, isIncrease: true, label: "this month" },
  },
  {
    id: "completed",
    label: "Courses Completed",
    value: 3,
    unit: "",
    trend: { value: 1, isIncrease: true, label: "this month" },
  },
  {
    id: "attendance",
    label: "Attendance",
    value: 79,
    unit: "%",
    trend: { value: 2, isIncrease: false, label: "" },
  },
];

// Replace with API response progress
const MOCK_PROGRESS = {
  milestone: "Milestone 3",
  milestoneTitle: "Network Security Fundamentals",
  percentComplete: 85,
  timeLeft: "8h 32 mins",
  lessons: { current: 48, total: 66 },
  labs: { current: 18, total: 25 },
  quizzes: { current: 24, total: 30 },
  assessments: { current: 4, total: 6 },
};

// Replace with API response milestones
const MOCK_MILESTONES = [
  { id: 1, label: "Milestone 1", status: "completed" },
  { id: 2, label: "Milestone 2", status: "in-progress" },
  { id: 3, label: "Milestone 3", status: "locked" },
  { id: 4, label: "Milestone 4", status: "locked" },
  { id: 5, label: "Milestone 5", status: "locked" },
];

// TODO: Replace with API response, e.g. GET /api/skill-growth/start-date
const SKILL_GRAPH_ALL_TIME_START_DATE = new Date(2026, 0, 1);

// Deterministic pseudo-random (seeded LCG) so mock values don't shift on every render
const seededRandom = (seed) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Builds one lineData point every 4 months from startDate through referenceDate
const buildAllTimeLineData = (startDate, referenceDate = new Date()) => {
  const points = [];
  const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  const rand = seededRandom(42);

  while (cursor <= referenceDate) {
    points.push({
      label: `${MONTH_LABELS[cursor.getMonth()]} ${cursor.getFullYear()}`,
      frontend: Math.round(30 + rand() * 60),
      backend: Math.round(30 + rand() * 60),
      cybersecurity: Math.round(30 + rand() * 60),
      aws: Math.round(30 + rand() * 60),
    });
    cursor.setMonth(cursor.getMonth() + 4);
  }
  return points;
};

//  Replace with API response skill-graph 
const MOCK_SKILL_GRAPH = {
  week: {
    overallPercent: 75,
    indicatorBars: [
      "#FF8A34",
      "#FF8A34",
      "#FFB800",
      "#B175FF",
      "#3B72F6",
      "#3B72F6",
      "#3B72F6",
      "#22C55E",
      "#22C55E",
      "#E4E4E7",
      "#E4E4E7",
      "#E4E4E7",
    ],
    // Standard Recharts data format for line charts (easily returned from API endpoints)
    lineData: [
      { label: "Week 1", frontend: 20, backend: 28, cybersecurity: 18, aws: 0 },
      { label: "Week 2", frontend: 58, backend: 55, cybersecurity: 50, aws: 38 },
      { label: "Week 3", frontend: 50, backend: 65, cybersecurity: 57, aws: 62 },
      { label: "Week 4", frontend: 75, backend: 88, cybersecurity: 75, aws: 75 },
      { label: "Week 5", frontend: 80, backend: 93, cybersecurity: 40, aws: 70 },
      { label: "Week 6", frontend: 50, backend: 93, cybersecurity: 75, aws: 78 },
      { label: "Week 7", frontend: 65, backend: null, cybersecurity: 82, aws: 92 },
    ],
    // Standard Recharts pie data format
    pieData: [
      { name: "Frontend", value: 42, color: "#FF8A34" },
      { name: "Backend", value: 20, color: "#B175FF" },
      { name: "Cyber Security", value: 10, color: "#3B72F6" },
      { name: "AWS", value: 10, color: "#22C55E" },
    ],
  },
  month: {
    overallPercent: 68,
    indicatorBars: [
      "#FF8A34",
      "#FF8A34",
      "#FFB800",
      "#FFB800",
      "#B175FF",
      "#3B72F6",
      "#3B72F6",
      "#22C55E",
      "#E4E4E7",
      "#E4E4E7",
      "#E4E4E7",
      "#E4E4E7",
    ],
    lineData: [
      { label: "Jan", frontend: 15, backend: 20, cybersecurity: 10, aws: 5 },
      { label: "Feb", frontend: 35, backend: 40, cybersecurity: 28, aws: 20 },
      { label: "Mar", frontend: 50, backend: 55, cybersecurity: 45, aws: 38 },
      { label: "Apr", frontend: 62, backend: 68, cybersecurity: 58, aws: 50 },
      { label: "May", frontend: 70, backend: 75, cybersecurity: 64, aws: 60 },
      { label: "Jun", frontend: 68, backend: 80, cybersecurity: 70, aws: 65 },
    ],
    pieData: [
      { name: "Frontend", value: 40, color: "#FF8A34" },
      { name: "Backend", value: 30, color: "#B175FF" },
      { name: "Cyber Security", value: 20, color: "#3B72F6" },
      { name: "AWS", value: 10, color: "#22C55E" },
    ],
  },
  "all-time": {
    overallPercent: 71,
    indicatorBars: [
      "#FF8A34",
      "#FF8A34",
      "#FFB800",
      "#B175FF",
      "#B175FF",
      "#3B72F6",
      "#3B72F6",
      "#22C55E",
      "#22C55E",
      "#E4E4E7",
      "#E4E4E7",
      "#E4E4E7",
    ],
    lineData: buildAllTimeLineData(SKILL_GRAPH_ALL_TIME_START_DATE),
    pieData: [
      { name: "Frontend", value: 38, color: "#FF8A34" },
      { name: "Backend", value: 28, color: "#B175FF" },
      { name: "Cyber Security", value: 22, color: "#3B72F6" },
      { name: "AWS", value: 12, color: "#22C55E" },
    ],
  },
};

// Replace with API response
const MOCK_USER = {
  name: "Jabez",
};


const MOCK_ACTIVITY_START_DATE = "2025-01-01";
const MOCK_ACTIVITY_END_DATE = "2025-10-31";

export const useDashboard = () => {
  
  // Dummy data calculation for daily activity 
  const generateMockActivityData = (startDateStr, endDateStr) => {
    const activity = {};
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    // Deterministic pseudo-random generator so mock data is stable across renders
    let seed = 42;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const roll = pseudoRandom();
      let minutes;
      if (roll > 0.93) minutes = 0; // occasional missed day
      else if (roll > 0.8) minutes = Math.round(15 + pseudoRandom() * 14); // < 30 min
      else if (roll > 0.6) minutes = Math.round(30 + pseudoRandom() * 29); // 30-60 min
      else if (roll > 0.4) minutes = Math.round(60 + pseudoRandom() * 59); // 1-2 hr
      else if (roll > 0.15) minutes = Math.round(120 + pseudoRandom() * 119); // 2-4 hr
      else minutes = Math.round(240 + pseudoRandom() * 90); // 4+ hr

      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      activity[key] = minutes;
    }

    // Force the last few days to guarantee a visible active streak in the mock
    for (let i = 0; i < 3; i++) {
      const d = new Date(end);
      d.setDate(d.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      activity[key] = 135; // guaranteed goal-achieving day
    }

    return activity;
  };

  // Daily streak calculation
  const calculateStreak = (activityData, dailyGoalMinutes, referenceDate = new Date()) => {
    let streak = 0;
    const cursor = new Date(referenceDate);
    for (let i = 0; i < 366; i++) {
      const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
      const minutes = activityData[key] ?? 0;
      if (minutes >= dailyGoalMinutes) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const dailyGoalMinutes = 120; // 2 hour 
  const activityData = generateMockActivityData(MOCK_ACTIVITY_START_DATE, MOCK_ACTIVITY_END_DATE);
  const streakCount = calculateStreak(activityData, dailyGoalMinutes, new Date(MOCK_ACTIVITY_END_DATE));
  const totalMinutes = Object.values(activityData).reduce((sum, minutes) => sum + minutes, 0);

  const [data, setData] = useState({
    user: MOCK_USER,
    aiAssistant: {
      summaryText: "You have 5 personalized recommendations to improve your cybersecurity skills.",
      recommendations: MOCK_AIASSISTANT_RECOMMENDATIONS,
    },
    overview: MOCK_OVERVIEW,
    progress: MOCK_PROGRESS,
    milestones: MOCK_MILESTONES,
    consistency: {
      streakCount,
      totalMinutes,
      dailyGoalMinutes,
      year: new Date(MOCK_ACTIVITY_START_DATE).getFullYear(),
      monthsToShow: new Date(MOCK_ACTIVITY_END_DATE).getMonth(),
      activityData,
    },
    skillGraph: MOCK_SKILL_GRAPH,
  });

  return { data, setData };
};