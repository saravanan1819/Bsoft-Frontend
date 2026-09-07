import React, { useState, useMemo } from "react";
import { Icons } from "../../assets/icons/icons.js";
import { StatusBadge, DifficultyBadge } from "./components/lab-badges.jsx";
import SearchFilterBar from "../../components/shared/search-filter-bar.jsx";
import { EmptyState } from "../../components/shared/empty-state.jsx";

// Mock Data for Hands-on Labs
const initialLabs = [
  {
    id: "leaky-devops",
    title: "Leaky DevOps Environment",
    description: "Analyze a vulnerable DevOps pipeline and identify critical security misconfigurations.",
    status: "In Progress", // "In Progress", "Completed", "Not Started"
    difficulty: "Easy", // "Easy", "Medium", "Difficult"
    duration: "60 min",
    xp: "100 XP",
    completedSteps: 3,
    totalSteps: 5,
    progressPercent: 44,
    isFeatured: true,
  },
  {
    id: "secure-linux-server",
    title: "Secure Your First Linux Server",
    description: "Learn how to configure users, permissions, SSH access, and basic security controls on a Linux...",
    status: "Completed",
    difficulty: "Medium",
    duration: "45 min",
    xp: "100 XP",
    isFeatured: false,
  },
  {
    id: "linux-file-permissions",
    title: "Linux File Permissions",
    description: "Practice ownership, groups, and Linux file permissions using a controlled server .",
    status: "Not Started",
    difficulty: "Difficult",
    duration: "30 min",
    xp: "70 XP",
    isFeatured: false,
  },
  {
    id: "sql-injection-detection",
    title: "SQL Injection Detection",
    description: "Identify and analyze SQL injection vulnerabilities in a controlled web application.",
    status: "Completed",
    difficulty: "Medium",
    duration: "60 min",
    xp: "175 XP",
    isFeatured: false,
  },
  {
    id: "firewall-configuration",
    title: "Firewall Configuration",
    description: "Configure firewall rules and verify network access controls on a Linux server.",
    status: "Not Started",
    difficulty: "Easy",
    duration: "75 min",
    xp: "100 XP",
    isFeatured: false,
  },
];

const getActionButton = (lab) => {
  if (lab.status === "In Progress") {
    return (
      <button className="bg-[#84CC16] hover:bg-[#65A30D] text-white px-[16px] py-[8px] rounded-[10px] text-[14px] font-normal flex items-center gap-[6px] transition-colors cursor-pointer ml-auto">
        <img src={Icons.startLab} alt="Continue" className="w-[14px] h-[14px]" />
        Continue Lab
      </button>
    );
  }
  if (lab.status === "Completed") {
    return (
      <button className="bg-[#84CC16] hover:bg-[#65A30D] text-white px-[16px] py-[8px] rounded-[10px] text-[14px] font-normal flex items-center gap-[6px] transition-colors cursor-pointer ml-auto">
        <img src={Icons.startLab} alt="Result" className="w-[14px] h-[14px]" />
        View Result
      </button>
    );
  }
  return (
    <button className="bg-[#84CC16] hover:bg-[#65A30D] text-white px-[16px] py-[8px] rounded-[10px] text-[14px] font-normal flex items-center gap-[6px] transition-colors cursor-pointer ml-auto">
      <img src={Icons.startLab} alt="Start" className="w-[14px] h-[14px]" />
      Start Lab
    </button>
  );
};

export default function HandsOnLabsPage() {
  const [hasLabs, setHasLabs] = useState(true);
  const [activeFilterTab, setActiveFilterTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list"); // "list" or "grid" for all labs list below
  const [continueViewMode, setContinueViewMode] = useState("list"); // "list" or "grid" exclusively for Continue Learning section

  const stats = useMemo(() => {
    const completed = initialLabs.filter((l) => l.status === "Completed").length;
    const inProgress = initialLabs.filter((l) => l.status === "In Progress").length;
    const available = initialLabs.length + 10;
    return { completed: 10, inProgress: 2, available: 15 };
  }, []);

  const continueLab = useMemo(() => {
    return initialLabs.find((l) => l.isFeatured || l.status === "In Progress");
  }, []);

  const filteredLabs = useMemo(() => {
    return initialLabs.filter((lab) => {
      if (activeFilterTab === "Not Started" && lab.status !== "Not Started") return false;
      if (activeFilterTab === "In Progress" && lab.status !== "In Progress") return false;
      if (activeFilterTab === "Completed" && lab.status !== "Completed") return false;

      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const titleMatch = lab.title.toLowerCase().includes(query);
        const descMatch = lab.description.toLowerCase().includes(query);
        return titleMatch || descMatch;
      }

      return true;
    });
  }, [activeFilterTab, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-white px-[12px] md:px-[16px] pt-[4px] md:pt-[8px] pb-[24px] md:pb-[32px] space-y-[28px] font-sans tracking-normal">
      {/* State Switcher Bar */}
      <div className="w-full px-[16px] py-[10px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] flex flex-wrap items-center justify-between gap-[8px] -mt-[4px]">
        <span className="font-sans font-medium text-[13px] text-[#374151]">
          Hands-on Labs State Switcher (API Backend Simulation):
        </span>
        <div className="flex items-center gap-[6px]">
          <button
            type="button"
            onClick={() => setHasLabs(true)}
            className={`px-[12px] py-[4px] rounded-[6px] font-sans text-[12px] font-medium transition-colors cursor-pointer ${
              hasLabs ? "bg-[#9AD84A] text-white" : "bg-white border border-[#E5E7EB] text-[#4B5563]"
            }`}
          >
            Labs Available
          </button>
          <button
            type="button"
            onClick={() => setHasLabs(false)}
            className={`px-[12px] py-[4px] rounded-[6px] font-sans text-[12px] font-medium transition-colors cursor-pointer ${
              !hasLabs ? "bg-[#9AD84A] text-white" : "bg-white border border-[#E5E7EB] text-[#4B5563]"
            }`}
          >
            No Labs Available (Empty State)
          </button>
        </div>
      </div>

      {!hasLabs ? (
        <EmptyState
          title="No Hands-on Labs Available"
          description="There are no labs available for you yet. Once a lab is assigned to your course, it will appear here."
          onRefresh={() => setHasLabs(true)}
        />
      ) : (
        <>
      {/* Sub-header description */}
      <div className="-mt-[12px] mb-[20px]">
        <p className="font-sans font-normal text-[16px] leading-normal text-[#000000]">
          Practice cybersecurity through guided and real-world hands-on environments.
        </p>
      </div>

      {/* Top Stat & AI Cards */}
      <div className="flex flex-wrap lg:flex-nowrap items-stretch gap-[16px] w-full">
        {/* Card 1: Labs Completed */}
        <div className="w-full sm:w-[218px] shrink-0 h-[127px] border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[14px] bg-white flex flex-col justify-between">
          <div className="flex items-center gap-[8px] text-[14px] text-[#737373] font-normal">
            <img src={Icons.taskDone} alt="Labs Completed" className="w-[18px] h-[18px]" />
            <span className="whitespace-nowrap">Labs Completed</span>
          </div>
          <div className="flex flex-col gap-[4px] mt-[6px]">
            <div className="flex items-baseline gap-[6px]">
              <span className="text-[32px] font-bold text-[#000000] leading-none">10</span>
              <span className="text-[14px] text-[#737373] font-normal">Labs</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="bg-[#EF4444] text-white text-[8px] font-normal px-[6px] py-[1.5px] rounded-[6px]">
                -2.1%
              </span>
              <span className="text-[13px] text-[#737373] font-normal">vs Last week</span>
            </div>
          </div>
        </div>

        {/* Card 2: In Progress */}
        <div className="w-full sm:w-[218px] shrink-0 h-[127px] border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[14px] bg-white flex flex-col justify-between">
          <div className="flex items-center gap-[8px] text-[14px] text-[#737373] font-normal">
            <img src={Icons.inProgressIcon} alt="In Progress" className="w-[18px] h-[18px]" />
            <span className="whitespace-nowrap">In Progress</span>
          </div>
          <div className="flex flex-col gap-[4px] mt-[6px]">
            <div className="flex items-baseline gap-[6px]">
              <span className="text-[32px] font-bold text-[#000000] leading-none">2</span>
              <span className="text-[14px] text-[#737373] font-normal">Labs</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="bg-[#10B981] text-white text-[8px] font-normal px-[6px] py-[1.5px] rounded-[6px]">
                +3.1%
              </span>
              <span className="text-[13px] text-[#737373] font-normal">vs Last week</span>
            </div>
          </div>
        </div>

        {/* Card 3: Available Labs */}
        <div className="w-full sm:w-[218px] shrink-0 h-[127px] border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[14px] bg-white flex flex-col justify-between">
          <div className="flex items-center gap-[8px] text-[14px] text-[#737373] font-normal">
            <img src={Icons.lockOutlineGray} alt="Available Labs" className="w-[18px] h-[18px]" />
            <span className="whitespace-nowrap">Available Labs</span>
          </div>
          <div className="flex items-baseline gap-[6px] mt-[6px]">
            <span className="text-[32px] font-bold text-[#000000] leading-none">21</span>
            <span className="text-[14px] text-[#737373] font-normal">Labs</span>
          </div>
        </div>

        {/* Card 4: AI Insights (Reduced width with extra right padding) */}
        <div className="w-full sm:w-[320px] lg:w-[350px] shrink-0 h-[127px] border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[14px] pr-[28px] md:pr-[36px] bg-white flex flex-col justify-between relative overflow-hidden">
          <img src={Icons.aiInsightsGradient} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0" />
          <div className="relative z-10 flex items-center gap-[6px]">
            <img src={Icons.aiMagic} alt="AI Insights" className="w-[18px] h-[18px]" />
            <span className="text-[14px] font-normal text-[#9AD84A]">AI Insights</span>
          </div>
          <p className="relative z-10 text-[12px] text-[#000000] font-normal leading-snug mt-[4px]">
            You're most consistent with hands-on practice on weekdays. Keep the same pace to maintain your progress.
          </p>
          <div className="relative z-10 flex items-center gap-[6px] justify-end mt-[4px]">
            <div className="w-[18px] h-[3.5px] bg-[#9AD84A] rounded-full" />
            <div className="w-[18px] h-[3.5px] bg-[#D1D5DB] rounded-full" />
            <div className="w-[18px] h-[3.5px] bg-[#D1D5DB] rounded-full" />
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      {continueLab && (
        <div className="space-y-[14px] pt-[8px]">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-medium text-[#111827]">Continue Learning</h2>
            <div className="flex items-center border-[0.5px] border-[#B9BEC7] rounded-[10px] p-[3px] bg-[#F0F1F3]">
              <button
                onClick={() => setContinueViewMode("list")}
                className={`p-[6px] rounded-[7px] transition-colors cursor-pointer ${
                  continueViewMode === "list" ? "bg-white text-[#111827] shadow-sm" : "text-[#374151] hover:bg-black/5"
                }`}
              >
                <img src={Icons.menuLine} alt="List view" className="w-[16px] h-[16px]" />
              </button>
              <button
                onClick={() => setContinueViewMode("grid")}
                className={`p-[6px] rounded-[7px] transition-colors cursor-pointer ${
                  continueViewMode === "grid" ? "bg-white text-[#111827] shadow-sm" : "text-[#374151] hover:bg-black/5"
                }`}
              >
                <img src={Icons.menuSquare} alt="Grid view" className="w-[16px] h-[16px]" />
              </button>
            </div>
          </div>

          <div
            className={`border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[20px] bg-white flex flex-col justify-between space-y-[16px] transition-all ${
              continueViewMode === "grid" ? "w-full sm:w-[400px] md:w-[440px]" : "w-full"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <StatusBadge status={continueLab.status} />
                <DifficultyBadge difficulty={continueLab.difficulty} />
              </div>
              <h3 className="text-[16px] font-normal text-[#000000] mt-[10px]">{continueLab.title}</h3>
              <p className="text-[14px] font-normal text-[#737373] leading-[1.4] mt-[6px]">
                {continueLab.description}
              </p>
            </div>

            <div className="space-y-[8px]">
              <div className="flex items-center justify-between text-[13px] font-medium text-[#374151]">
                <span>{continueLab.completedSteps} of {continueLab.totalSteps} completed</span>
                <span>{continueLab.progressPercent} %</span>
              </div>
              <div className="w-full bg-[#E5E7EB] h-[8px] rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#D7FFA3] to-[#9AD84A] h-full rounded-full transition-all duration-300"
                  style={{ width: `${continueLab.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-[4px]">
              <div className="flex items-center gap-[8px]">
                <div className="flex items-center gap-[4px] border-[0.5px] border-[#B9BEC7] rounded-[10px] px-[10px] py-[5px] text-[12px] font-medium text-[#374151]">
                  <img src={Icons.clockFading} alt="Timer" className="w-[14px] h-[14px]" />
                  <span>{continueLab.duration}</span>
                </div>
                <div className="flex items-center gap-[4px] border-[0.5px] border-[#B9BEC7] rounded-[10px] px-[10px] py-[5px] text-[12px] font-medium text-[#374151]">
                  <img src={Icons.goldenStar} alt="XP" className="w-[14px] h-[14px]" />
                  <span>{continueLab.xp}</span>
                </div>
              </div>
              {getActionButton(continueLab)}
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="pt-[8px]">
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeFilterTab}
          onTabChange={setActiveFilterTab}
          tabs={["All", "Not Started", "In Progress", "Completed"]}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </div>

      {/* Lab Cards Grid / List */}
      {filteredLabs.length === 0 ? (
        <EmptyState
          title="No Labs Found"
          description="We couldn't find any hands-on labs matching your search or active filter."
          onRefresh={() => {
            setSearchQuery("");
            setActiveFilterTab("All");
          }}
          actionLabel="Reset Filters"
          centerInViewport={false}
          showBorder={true}
        />
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]" : "flex flex-col space-y-[16px]"}>
          {filteredLabs.map((lab) => (
            <div
              key={lab.id}
              className={`w-full border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[20px] bg-white flex flex-col justify-between space-y-[16px] hover:border-[#CBD5E1] transition-all ${
                viewMode === "grid" ? "min-h-[220px]" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <StatusBadge status={lab.status} />
                  <DifficultyBadge difficulty={lab.difficulty} />
                </div>

                <h3 className="text-[16px] font-normal text-[#000000] mt-[12px]">{lab.title}</h3>
                <p className="text-[14px] font-normal text-[#737373] leading-[1.4] mt-[6px]">
                  {lab.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-[4px]">
                <div className="flex items-center gap-[8px]">
                  <div className="flex items-center gap-[4px] border-[0.5px] border-[#B9BEC7] rounded-[10px] px-[10px] py-[5px] text-[12px] font-medium text-[#374151]">
                    <img src={Icons.clockFading} alt="Timer" className="w-[14px] h-[14px]" />
                    <span>{lab.duration}</span>
                  </div>
                  <div className="flex items-center gap-[4px] border-[0.5px] border-[#B9BEC7] rounded-[10px] px-[10px] py-[5px] text-[12px] font-medium text-[#374151]">
                    <img src={Icons.goldenStar} alt="XP" className="w-[14px] h-[14px]" />
                    <span>{lab.xp}</span>
                  </div>
                </div>
                {getActionButton(lab)}
              </div>
            </div>
          ))}
        </div>
      )}

        </>
      )}
    </div>
  );
}
