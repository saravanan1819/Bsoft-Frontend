import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/app-layout";
import DashboardPage from "./modules/dashboard/dashboard";

// ---------------------------------------------------------
// 1. Reusable Dummy Page Component
// ---------------------------------------------------------
const DummyPage = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
      <h2 className="text-2xl font-semibold text-gray-400 mb-2">{title}</h2>
      <p className="text-gray-500 text-sm">This page is currently under construction.</p>
    </div>
  );
};

// ---------------------------------------------------------
// 2. Specific Page Exports (Placeholder for your feature folders)
// ---------------------------------------------------------
// Replaced with import from @/features/dashboard
import CoursesPage from "./modules/courses/courses.jsx";
import HandsOnLabsPage from "./modules/hands-on-labs/hands-on-labs.jsx";
import AttendancePage from "./modules/attendance/attendance.jsx";
import CalendarPage from "./modules/calendar/calendar.jsx";
import LabsPage from "./modules/dashboard/dashboard";

const PlaceholderPage = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[60vh] border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
    <h2 className="text-2xl font-semibold text-gray-400 mb-2">{title}</h2>
    <p className="text-gray-500 text-sm">This page is currently under construction.</p>
  </div>
);

import CourseSessionDetailPage from "./modules/courses/course-session-detail.jsx";
import CourseLabWorkspacePage from "./modules/courses/course-lab-workspace.jsx";
import CourseQuizPage from "./modules/courses/course-quiz-page.jsx";

// ---------------------------------------------------------
// 3. Main App Routing
// ---------------------------------------------------------
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Full screen route without layout (no sidebar / topbar) */}
        <Route path="courses/session/:sessionId" element={<CourseSessionDetailPage />} />
        <Route path="courses/session/:sessionId/lab/:labId" element={<CourseLabWorkspacePage />} />
        <Route path="courses/session/:sessionId/quiz/:quizId" element={<CourseQuizPage />} />
        <Route path="courses/lab/:labId" element={<CourseLabWorkspacePage />} />
        <Route path="courses/quiz/:quizId" element={<CourseQuizPage />} />

        <Route path="/" element={<AppLayout />}>
          {/* Default redirect to Dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Main Section */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="hands-on-labs" element={<HandsOnLabsPage />} />
          <Route path="challenges" element={<DummyPage title="Challenges" />} />

          {/* Learning Section */}
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="ai-mentor" element={<DummyPage title="AI Mentor" />} />
          <Route path="ide-editor" element={<DummyPage title="IDE Editor" />} />

          {/* General Section */}
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="feedback-report" element={<DummyPage title="Feedback & Report" />} />
          <Route path="settings" element={<DummyPage title="Settings" />} />
          <Route path="help-support" element={<DummyPage title="Help & Support" />} />

          {/* Account Section */}
          <Route path="logout" element={<DummyPage title="Logging Out..." />} />
          
          {/* 404 Catch-all */}
          <Route path="*" element={<DummyPage title="404 - Page Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;