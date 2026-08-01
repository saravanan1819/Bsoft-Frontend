import { Icons } from "../assets/icons/icons.js";

export const sidebarMenu = [
  {
    title: "Menu",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: Icons.dashboard,
        activeIcon: Icons.dashboardActive,
        path: "/dashboard",
      },
      {
        id: "courses",
        label: "Courses",
        icon: Icons.courses,
        activeIcon: Icons.coursesActive,
        path: "/courses",
      },
      {
        id: "labs",
        label: "Hands on Labs",
        icon: Icons.labs,
        activeIcon: Icons.labsActive,
        path: "/hands-on-labs",
      },
      {
        id: "challenges",
        label: "Challenges",
        icon: Icons.challenges,
        activeIcon: Icons.challengesActive,
        path: "/challenges",
      },
      {
        id: "attendance",
        label: "Attendance",
        icon: Icons.attendance,
        activeIcon: Icons.attendanceActive,
        path: "/attendance",
      },
    ],
  },
  {
    title: "Quick access",
    items: [
      {
        id: "ai-mentor",
        label: "AI Mentor",
        icon: Icons.ai,
        activeIcon: Icons.ai,
        path: "/ai-mentor",
      },
      {
        id: "editor",
        label: "IDE Editor",
        icon: Icons.editor,
        activeIcon: Icons.editorActive,
        path: "/ide-editor",
      },
      {
        id: "calendar",
        label: "Calender",
        icon: Icons.calendar,
        activeIcon: Icons.calendarActive,
        path: "/calendar",
      },
      {
        id: "feedback",
        label: "Feedback & Report",
        icon: Icons.feedback,
        activeIcon: Icons.feedbackActive,
        path: "/feedback-report",
      },
    ],
  },
  {
    title: "Bottom",
    items: [
      {
        id: "settings",
        label: "Settings",
        icon: Icons.settings,
        activeIcon: Icons.settingsActive,
        path: "/settings",
      },
      {
        id: "help",
        label: "Help & Support",
        icon: Icons.help,
        activeIcon: Icons.helpActive,
        path: "/help-support",
      },
      {
        id: "logout",
        label: "Log Out",
        icon: Icons.logout,
        activeIcon: Icons.logoutActive,
path: "/logout",
      },
    ],
  },
];