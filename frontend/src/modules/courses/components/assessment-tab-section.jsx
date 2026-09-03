import React, { useState } from "react";
import { Icons } from "../../../assets/icons/icons.js";

// Helper Component for Common Table Breakdown
const SectionBreakdownTable = ({ sections }) => {
  const defaultSections = [
    { name: "MCQ", questions: 20, duration: "30 min", marks: 20 },
    { name: "Practical Lab", questions: 2, duration: "60 min", marks: 80 }
  ];
  const list = sections || defaultSections;

  return (
    <div className="border-[0.5px] border-[#B9BEC7] rounded-[16px] overflow-hidden">
      <div className="bg-[#F3F4F6] grid grid-cols-4 px-[20px] py-[12px] font-sans font-medium text-[14px] text-[#000000]">
        <div>Name</div>
        <div>Questions</div>
        <div>Duration</div>
        <div>Marks</div>
      </div>
      {list.map((sec, index) => (
        <div
          key={sec.name || index}
          className={`grid grid-cols-4 px-[20px] py-[14px] font-sans font-normal text-[14px] text-[#000000] ${
            index > 0 ? "" : "border-t-[0.5px] border-[#B9BEC7]"
          }`}
        >
          <div className="font-normal text-[#000000]">{sec.name}</div>
          <div>{sec.questions}</div>
          <div>{sec.duration}</div>
          <div>{sec.marks}</div>
        </div>
      ))}
    </div>
  );
};

// Helper Component for Top Pill Badges Row
const TopPillRow = ({ totalMarks = "100 Marks", totalDuration = "1hr 30min", totalXp = "100 XP", badgeText, badgeBg = "bg-[#FD8C28]" }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-[12px]">
      <div className="flex flex-wrap items-center gap-[10px]">
        <div className="bg-white border-[0.5px] border-[#B9BEC7] rounded-[10px] px-[16px] py-[6px] flex items-center gap-[6px] font-sans font-normal text-[14px] text-[#000000]">
          <img src={Icons.trophy} alt="Trophy" className="w-[18px] h-[18px]" />
          <span>{totalMarks}</span>
        </div>
        <div className="bg-white border-[0.5px] border-[#B9BEC7] rounded-[10px] px-[16px] py-[6px] flex items-center gap-[6px] font-sans font-normal text-[14px] text-[#000000]">
          <img src={Icons.clockFading} alt="Duration" className="w-[18px] h-[18px]" />
          <span>{totalDuration}</span>
        </div>
        <div className="bg-white border-[0.5px] border-[#B9BEC7] rounded-[10px] px-[16px] py-[6px] flex items-center gap-[6px] font-sans font-normal text-[14px] text-[#000000]">
          <img src={Icons.goldenStar} alt="XP" className="w-[18px] h-[18px]" />
          <span>{totalXp}</span>
        </div>
      </div>

      {badgeText && (
        <span className={`${badgeBg.includes("text-") ? "" : "text-white "} ${badgeBg} font-sans font-normal text-[14px] px-[16px] py-[6px] rounded-[10px] shrink-0`}>
          {badgeText}
        </span>
      )}
    </div>
  );
};

// Helper Component for Your Result Grid
const ResultBox = ({ result }) => {
  const { score = "68 / 100", accuracy = "68 %", timeTaken = "10m 23s", xpEarned = "+25 XP" } = result || {};

  return (
    <div className="border-[0.5px] border-[#B9BEC7] rounded-[18px] p-[20px] bg-white flex flex-col gap-[14px]">
      <h4 className="font-sans font-medium text-[14px] text-[#111827] text-center">
        Your Result
      </h4>

      <div className="grid grid-cols-2 md:grid-cols-4 border-[0.5px] border-[#B9BEC7] rounded-[12px] overflow-hidden text-center divide-x divide-[#B9BEC7]">
        <div className="p-[14px] flex flex-col gap-[4px]">
          <span className="font-sans font-normal text-[14px] text-[#000000]">Score</span>
          <span className="font-sans font-medium text-[20px] text-[#000000]">{score}</span>
        </div>
        <div className="p-[14px] flex flex-col gap-[4px]">
          <span className="font-sans font-normal text-[14px] text-[#000000]">Accuracy</span>
          <span className="font-sans font-medium text-[20px] text-[#000000]">{accuracy}</span>
        </div>
        <div className="p-[14px] flex flex-col gap-[4px]">
          <span className="font-sans font-normal text-[14px] text-[#000000]">Time Taken</span>
          <span className="font-sans font-medium text-[20px] text-[#000000]">{timeTaken}</span>
        </div>
        <div className="p-[14px] flex flex-col gap-[4px]">
          <span className="font-sans font-normal text-[14px] text-[#000000]">XP Earned</span>
          <span className="font-sans font-medium text-[20px] text-[#000000]">{xpEarned}</span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 1. LOCKED STATE VIEW
// ==========================================
export const AssessmentLockedView = ({ requirements }) => {
  const defaultRequirements = [
    { title: "Milestones", completed: 2, total: 7, percentage: Math.round((2 / 7) * 100) },
    { title: "Practical Labs", completed: 2, total: 5, percentage: Math.round((2 / 5) * 100) },
    { title: "Recall Quizzes", completed: 8, total: 10, percentage: Math.round((8 / 10) * 100) }
  ];

  const list = requirements || defaultRequirements;

  return (
    <div className="p-[32px] md:p-[48px] bg-white flex flex-col items-center justify-center text-center w-full">
      <div className="w-full max-w-[640px] flex flex-col items-center">
        <img
          src={Icons.assessmentLock}
          alt="Final Assessment Locked"
          className="w-[220px] md:w-[260px] h-auto mb-[28px]"
        />

        <h2 className="font-sans font-medium text-[23px] leading-normal tracking-[0px] text-[#000000] mb-[10px]">
          Final Assessment Locked
        </h2>

        <p className="font-sans font-normal text-[18px] leading-[26px] text-[#737373] whitespace-nowrap mb-[32px]">
          Complete all Milestones, Practical labs, and recall quizzes to unlock the Final Assessment.
        </p>

        <div className="w-full bg-[#F0F1F3] border border-[#E5E7EB] rounded-[16px] p-[18px] md:p-[20px] flex items-start gap-[12px] text-left mb-[24px]">
          <div className="shrink-0 mt-[2px]">
            <svg className="w-[20px] h-[20px] text-[#737373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
              <path strokeLinecap="round" strokeWidth="1.5" d="M12 16v-4m0-4h.01" />
            </svg>
          </div>
          <p className="font-sans font-normal text-[16px] leading-[24px] text-[#737373]">
            The assessment evaluates your overall understanding of the course and require a minimum score of 75% to unlock your certificate.
          </p>
        </div>

        <div className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-[24px] p-[24px] md:p-[32px] flex flex-col gap-[24px] text-left">
          <div className="flex items-center justify-between">
            <h3 className="font-sans font-normal text-[16px] leading-normal text-[#000000]">
              Assessment Requirement
            </h3>
            <svg className="w-[20px] h-[20px] text-[#000000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>

          <div className="flex flex-col gap-[20px]">
            {list.map((req) => (
              <div key={req.title} className="flex flex-col gap-[8px]">
                <div className="flex items-center justify-between font-sans text-[14px]">
                  <span className="font-normal text-[#111827]">{req.title}</span>
                  <span className="font-normal text-[#111827]">
                    {req.completed} / {req.total} Completed
                  </span>
                </div>
                <div className="w-full h-[10px] bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#9AD84A] rounded-full transition-all duration-300"
                    style={{ width: `${req.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="font-sans font-medium text-[12px] leading-normal text-[#000000] text-center mt-[8px]">
            Keep Learning and completing the remaining items to unlock the Final Assessment
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. READY / UNLOCKED STATE VIEW (assessment-ready.png)
// ==========================================
export const AssessmentReadyView = ({ data = {}, onStartAssessment, onViewInstructions }) => {
  const {
    title = "You are Ready for the Final Assessment !",
    subtitle = "You have completed all the required milestones, practical labs, and recall quizzes. You can now attempt the Final Assessment.",
    infoBanner = "The assessment evaluates your overall understanding of the course and require a minimum score of 75% to unlock your certificate.",
    dueBy = "12 Aug 2026 , 11.59 PM",
    attempts = "1 attempt",
    sections
  } = data;

  return (
    <div className="p-[32px] md:p-[48px] bg-white flex flex-col items-center text-center w-full">
      <div className="w-full max-w-[760px] flex flex-col items-center">
        <img
          src={Icons.assessmentReady || Icons.assessmentPassed}
          alt="Ready for Assessment"
          className="w-[220px] md:w-[260px] h-auto mb-[24px]"
        />

        <h2 className="font-sans font-medium text-[23px] leading-normal tracking-[0px] text-[#000000] mb-[8px]">
          {title}
        </h2>

        <p className="font-sans font-normal text-[16px] leading-[24px] text-[#737373] max-w-[620px] mb-[24px]">
          {subtitle}
        </p>

        {/* Info Box */}
        <div className="w-full bg-[#F3F4F6] border border-[#E5E7EB] rounded-[16px] p-[16px] md:p-[18px] flex items-start gap-[12px] text-left mb-[28px]">
          <svg className="w-[20px] h-[20px] text-[#737373] shrink-0 mt-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <path strokeLinecap="round" strokeWidth="1.5" d="M12 16v-4m0-4h.01" />
          </svg>
          <p className="font-sans font-normal text-[14px] leading-[22px] text-[#4B5563]">
            {infoBanner}
          </p>
        </div>

        {/* Main Details Outer Card */}
        <div className="w-full border-[0.5px] border-[#B9BEC7] rounded-[24px] p-[24px] md:p-[32px] flex flex-col gap-[24px] bg-white text-left">
          <TopPillRow badgeText="Not Started" badgeBg="bg-[#FFEDD5] text-[#F97316]" />
          <SectionBreakdownTable sections={sections} />

          {/* Two-Column Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            {/* Left Card: Certificate Locked */}
            <div className="bg-[#DBEAFE] rounded-[16px] p-[18px] flex flex-col gap-[6px]">
              <h4 className="font-sans font-medium text-[14px] text-[#1E40AF]">
                Certificate Locked
              </h4>
              <p className="font-sans font-normal text-[16px] leading-[22px] text-[#000000]">
                Score 75% or higher to unlock your course certificate.
              </p>
            </div>

            {/* Right Card: What to expect */}
            <div className="bg-white border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[18px] flex flex-col gap-[8px]">
              <div className="flex items-center gap-[6px] font-sans font-normal text-[14px] text-[#111827]">
                <img src={Icons.challenges} alt="Challenge" className="w-[18px] h-[18px]" />
                <span>What to expect</span>
              </div>
              <p className="font-sans font-normal text-[14px] text-[#000000]">
                <span className="font-medium text-[14px] text-[#000000]">Due by</span> - {dueBy}
              </p>
              <p className="font-sans font-normal text-[14px] text-[#000000]">
                <span className="font-medium text-[14px] text-[#000000]">Attempts</span> - {attempts}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-[16px] pt-[8px]">
            <button
              type="button"
              onClick={onViewInstructions}
              className="w-full sm:w-auto border border-[#0088FF] text-[#0088FF] hover:bg-[#F0F8FF] px-[24px] py-[10px] rounded-[50px] font-sans font-normal text-[14px] transition-colors cursor-pointer text-center"
            >
              View Instructions
            </button>

            <button
              type="button"
              onClick={onStartAssessment}
              className="w-full sm:w-auto bg-[#9AD84A] hover:bg-[#8bc93e] text-white px-[26px] py-[10px] rounded-[50px] font-sans font-normal text-[14px] flex items-center justify-center gap-[8px] transition-colors cursor-pointer shadow-sm"
            >
              <img src={Icons.startLab} alt="Start" className="w-[15px] h-[15px]" />
              <span className="font-sans font-normal text-[14px] text-white">Start Final Assessment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. COMPLETED / PASSED STATE VIEW (assesment-completed.png)
// ==========================================
export const AssessmentCompletedView = ({ data = {}, onViewCertificate, onViewInstructions }) => {
  const {
    title = "Assessment Completed",
    subtitle = "You passed the final assessment and unlocked your course certificate.",
    scorePercentage = "86%",
    submittedAt = "12 Aug 2026 , 11.59 PM",
    sections,
    result = { score: "86 / 100", accuracy: "86 %", timeTaken: "10m 23s", xpEarned: "+25 XP" }
  } = data;

  return (
    <div className="p-[32px] md:p-[48px] bg-white flex flex-col items-center text-center w-full">
      <div className="w-full max-w-[760px] flex flex-col items-center">
        <img
          src={Icons.assessmentCompleted || Icons.assessmentPassed}
          alt="Assessment Completed"
          className="w-[220px] md:w-[260px] h-auto mb-[24px]"
        />

        <h2 className="font-sans font-medium text-[23px] leading-normal tracking-[0px] text-[#000000] mb-[8px]">
          {title}
        </h2>

        <p className="font-sans font-normal text-[16px] leading-[24px] text-[#737373] max-w-[580px] mb-[28px]">
          {subtitle}
        </p>

        <div className="w-full border-[0.5px] border-[#B9BEC7] rounded-[24px] p-[24px] md:p-[32px] flex flex-col gap-[24px] bg-white text-left">
          <TopPillRow badgeText="Completed" badgeBg="bg-[#9AD84A]" />
          <SectionBreakdownTable sections={sections} />

          {/* Two-Column Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            {/* Left Card: Certificate Unlocked */}
            <div className="bg-[#DCFCE7] rounded-[16px] p-[18px] flex flex-col gap-[6px]">
              <h4 className="font-sans font-medium text-[14px] text-[#15803D]">
                Certificate Unlocked
              </h4>
              <p className="font-sans font-normal text-[16px] leading-[22px] text-[#000000]">
                You scored {scorePercentage}, above the required 75% passing score.
              </p>
            </div>

            {/* Right Card: Assessment Status */}
            <div className="bg-white border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[18px] flex flex-col gap-[8px]">
              <div className="flex items-center gap-[6px] font-sans font-normal text-[14px] text-[#111827]">
                <img src={Icons.challenges} alt="Status" className="w-[18px] h-[18px]" />
                <span>Assessment Status</span>
              </div>
              <p className="font-sans font-normal text-[14px] text-[#000000]">
                <span className="font-medium text-[14px] text-[#000000]">Submitted</span> - {submittedAt}
              </p>
              <p className="font-sans font-normal text-[14px] text-[#000000]">
                <span className="font-medium text-[14px] text-[#000000]">Status</span> - Passed
              </p>
            </div>
          </div>

          <ResultBox result={result} />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-[16px] pt-[8px]">
            <button
              type="button"
              onClick={onViewInstructions}
              className="w-full sm:w-auto border border-[#0088FF] text-[#0088FF] hover:bg-[#F0F8FF] px-[24px] py-[10px] rounded-[50px] font-sans font-normal text-[14px] transition-colors cursor-pointer text-center"
            >
              View Instructions
            </button>

            <button
              type="button"
              onClick={onViewCertificate}
              className="w-full sm:w-auto bg-[#9AD84A] hover:bg-[#8bc93e] text-white px-[26px] py-[10px] rounded-[50px] font-sans font-normal text-[14px] flex items-center justify-center gap-[8px] transition-colors cursor-pointer shadow-sm"
            >
              <img src={Icons.startLab} alt="View" className="w-[15px] h-[15px]" />
              <span className="font-sans font-normal text-[14px] text-white">View Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. REOPENED / NOT PASSED RETAKE ENABLED STATE VIEW
// ==========================================
export const AssessmentReopenedView = ({ data = {}, onRetake, onViewInstructions }) => {
  const [showBanner, setShowBanner] = useState(true);

  const {
    title = "Assessment Not Passed",
    subtitle = "You didn't reach the required score of 75%. Review your results and try again.",
    banner = {
      title: "Assessment reopened",
      description: "Your faculty has approved another attempt. You can now retake the final assessment."
    },
    sections,
    result = { score: "68 / 100", accuracy: "68 %", timeTaken: "10m 23s", xpEarned: "+25 XP" },
    dueBy = "12 Aug 2026 , 11.59 PM",
    facultyStatus = "Reopened by Faculty"
  } = data;

  return (
    <div className="p-[32px] md:p-[48px] bg-white flex flex-col items-center text-center w-full">
      <div className="w-full max-w-[760px] flex flex-col items-center">
        <img
          src={Icons.assessmentNotPassed || Icons.assessmentPassed}
          alt="Assessment Not Passed"
          className="w-[220px] md:w-[260px] h-auto mb-[24px]"
        />

        <h2 className="font-sans font-medium text-[23px] leading-normal tracking-[0px] text-[#000000] mb-[8px]">
          {title}
        </h2>

        <p className="font-sans font-normal text-[16px] leading-[24px] tracking-[0px] text-center text-[#737373] whitespace-nowrap mb-[28px]">
          {subtitle}
        </p>

        {showBanner && banner && (
          <div className="w-full bg-[#F0FDF4] border border-[#A7F3D0] rounded-[14px] p-[16px] md:p-[18px] flex items-start justify-between text-left mb-[28px] relative transition-all">
            <div className="flex flex-col gap-[4px] pr-[24px]">
              <h4 className="font-sans font-medium text-[16px] text-[#22C55E]">
                {banner.title}
              </h4>
              <p className="font-sans font-normal text-[14px] text-[#000000] leading-normal">
                {banner.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowBanner(false)}
              className="text-[#141B34] hover:opacity-80 transition-opacity p-[2px] cursor-pointer shrink-0"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="w-full border-[0.5px] border-[#B9BEC7] rounded-[24px] p-[24px] md:p-[32px] flex flex-col gap-[24px] bg-white text-left">
          <TopPillRow badgeText="Retake Enabled" badgeBg="bg-[#FD8C28]" />
          <SectionBreakdownTable sections={sections} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            <div className="bg-[#FEE2E2] rounded-[16px] p-[18px] flex flex-col gap-[6px]">
              <h4 className="font-sans font-medium text-[14px] text-[#991B1B]">
                Certificate Locked
              </h4>
              <p className="font-sans font-normal text-[14px] leading-[20px] text-[#000000]">
                A minimum score of 75% is required to unlock your course certificate.
              </p>
            </div>

            <div className="bg-white border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[18px] flex flex-col gap-[8px]">
              <div className="flex items-center gap-[6px] font-sans font-normal text-[14px] text-[#111827]">
                <img src={Icons.challenges} alt="Challenge" className="w-[18px] h-[18px]" />
                <span>What to expect</span>
              </div>
              <p className="font-sans font-normal text-[14px] text-[#000000]">
                <span className="font-medium text-[14px] text-[#000000]">New Due by</span> - {dueBy}
              </p>
              <p className="font-sans font-normal text-[14px] text-[#000000]">
                <span className="font-medium text-[14px] text-[#000000]">Status</span> - {facultyStatus}
              </p>
            </div>
          </div>

          <ResultBox result={result} />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-[16px] pt-[8px]">
            <button
              type="button"
              onClick={onViewInstructions}
              className="w-full sm:w-auto border border-[#0088FF] text-[#0088FF] hover:bg-[#F0F8FF] px-[24px] py-[10px] rounded-[50px] font-sans font-normal text-[14px] transition-colors cursor-pointer text-center"
            >
              View Instructions
            </button>

            <button
              type="button"
              onClick={onRetake}
              className="w-full sm:w-auto bg-[#9AD84A] hover:bg-[#8bc93e] text-white px-[26px] py-[10px] rounded-[50px] font-sans font-normal text-[14px] flex items-center justify-center gap-[8px] transition-colors cursor-pointer shadow-sm"
            >
              <img src={Icons.startLab} alt="Start" className="w-[15px] h-[15px]" />
              <span className="font-sans font-normal text-[14px] text-white">Retake Final Assessment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. NOT PASSED STATE VIEW (assesment-not-passed.png)
// ==========================================
export const AssessmentNotPassedView = ({ data = {}, onViewInstructions }) => {
  const [showBanner, setShowBanner] = useState(true);

  const {
    title = "Assessment Not Passed",
    subtitle = "You didn't reach the required score of 75%. Review your results and try again.",
    banner = {
      title: "You did not pass the final assessment.",
      description: "Your attempt has been used. Contact your faculty if you need another attempt."
    },
    sections,
    result = { score: "68 / 100", accuracy: "68 %", timeTaken: "10m 23s", xpEarned: "+25 XP" },
    submittedAt = "12 Aug 2026 , 11.59 PM"
  } = data;

  return (
    <div className="p-[32px] md:p-[48px] bg-white flex flex-col items-center text-center w-full">
      <div className="w-full max-w-[760px] flex flex-col items-center">
        <img
          src={Icons.assessmentNotPassed || Icons.assessmentPassed}
          alt="Assessment Not Passed"
          className="w-[220px] md:w-[260px] h-auto mb-[24px]"
        />

        <h2 className="font-sans font-medium text-[23px] leading-normal tracking-[0px] text-[#000000] mb-[8px]">
          {title}
        </h2>

        <p className="font-sans font-normal text-[16px] leading-[24px] tracking-[0px] text-center text-[#737373] whitespace-nowrap mb-[28px]">
          {subtitle}
        </p>

        {showBanner && banner && (
          <div className="w-full bg-[#FFF7ED] border border-[#FFEDD5] rounded-[14px] p-[16px] md:p-[18px] flex items-start justify-between text-left mb-[28px] relative transition-all">
            <div className="flex items-start gap-[10px] pr-[24px]">
              <svg className="w-[20px] h-[20px] text-[#F97316] shrink-0 mt-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                <path strokeLinecap="round" strokeWidth="1.5" d="M12 16v-4m0-4h.01" />
              </svg>
              <div className="flex flex-col gap-[2px]">
                <h4 className="font-sans font-medium text-[16px] text-[#F97316]">
                  {banner.title}
                </h4>
                <p className="font-sans font-normal text-[14px] text-[#000000] leading-normal">
                  {banner.description}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowBanner(false)}
              className="text-[#141B34] hover:opacity-80 transition-opacity p-[2px] cursor-pointer shrink-0"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="w-full border-[0.5px] border-[#B9BEC7] rounded-[24px] p-[24px] md:p-[32px] flex flex-col gap-[24px] bg-white text-left">
          <TopPillRow badgeText="Failed" badgeBg="bg-[#EF4444]" />
          <SectionBreakdownTable sections={sections} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            <div className="bg-[#FEE2E2] rounded-[16px] p-[18px] flex flex-col gap-[6px]">
              <h4 className="font-sans font-medium text-[14px] text-[#991B1B]">
                Certificate Locked
              </h4>
              <p className="font-sans font-normal text-[14px] leading-[20px] text-[#000000]">
                A minimum score of 75% is required to unlock your course certificate.
              </p>
            </div>

            <div className="bg-white border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[18px] flex flex-col gap-[8px]">
              <div className="flex items-center gap-[6px] font-sans font-normal text-[14px] text-[#111827]">
                <img src={Icons.challenges} alt="Challenge" className="w-[18px] h-[18px]" />
                <span>Assessment Status</span>
              </div>
              <p className="font-sans font-normal text-[14px] text-[#000000]">
                <span className="font-medium text-[14px] text-[#000000]">Submitted</span> - {submittedAt}
              </p>
              <p className="font-sans font-normal text-[14px] text-[#000000]">
                <span className="font-medium text-[14px] text-[#000000]">Status</span> - Not Passed
              </p>
            </div>
          </div>

          <ResultBox result={result} />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-[16px] pt-[8px]">
            <button
              type="button"
              onClick={onViewInstructions}
              className="w-full sm:w-auto border border-[#0088FF] text-[#0088FF] hover:bg-[#F0F8FF] px-[24px] py-[10px] rounded-[50px] font-sans font-normal text-[14px] transition-colors cursor-pointer text-center"
            >
              View Instructions
            </button>

            <button
              type="button"
              disabled
              className="w-full sm:w-auto bg-[#D1E7B4] text-white px-[26px] py-[10px] rounded-[50px] font-sans font-normal text-[14px] flex items-center justify-center gap-[8px] cursor-not-allowed opacity-80"
            >
              <svg className="w-[18px] h-[18px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <circle cx="12" cy="12" r="9" strokeWidth="2" />
              </svg>
              <span className="font-sans font-normal text-[14px] text-white">Retake Final Assessment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. MISSED STATE VIEW (assesment-missed.png)
// ==========================================
export const AssessmentMissedView = ({ data = {}, onViewInstructions }) => {
  const [showBanner, setShowBanner] = useState(true);

  const {
    title = "Final Assessment Missed",
    subtitle = "The due date has passed, and the final assessment is no longer available.",
    banner = {
      title: "You missed the due date for the final assessment.",
      description: "The assessment is no longer available. Contact your faculty if you need access."
    },
    sections,
    dueBy = "12 Aug 2026 , 11.59 PM"
  } = data;

  return (
    <div className="p-[32px] md:p-[48px] bg-white flex flex-col items-center text-center w-full">
      <div className="w-full max-w-[760px] flex flex-col items-center">
        <img
          src={Icons.assessmentMissed || Icons.assessmentPassed}
          alt="Assessment Missed"
          className="w-[220px] md:w-[260px] h-auto mb-[24px]"
        />

        <h2 className="font-sans font-medium text-[23px] leading-normal tracking-[0px] text-[#000000] mb-[8px]">
          {title}
        </h2>

        <p className="font-sans font-normal text-[16px] leading-[24px] text-[#737373] max-w-[620px] mb-[28px]">
          {subtitle}
        </p>

        {showBanner && banner && (
          <div className="w-full bg-[#FFF7ED] border border-[#FFEDD5] rounded-[14px] p-[16px] md:p-[18px] flex items-start justify-between text-left mb-[28px] relative transition-all">
            <div className="flex items-start gap-[10px] pr-[24px]">
              <svg className="w-[20px] h-[20px] text-[#F97316] shrink-0 mt-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                <path strokeLinecap="round" strokeWidth="1.5" d="M12 16v-4m0-4h.01" />
              </svg>
              <div className="flex flex-col gap-[2px]">
                <h4 className="font-sans font-medium text-[16px] text-[#F97316]">
                  {banner.title}
                </h4>
                <p className="font-sans font-normal text-[14px] text-[#000000] leading-normal">
                  {banner.description}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowBanner(false)}
              className="text-[#141B34] hover:opacity-80 transition-opacity p-[2px] cursor-pointer shrink-0"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="w-full border-[0.5px] border-[#B9BEC7] rounded-[24px] p-[24px] md:p-[32px] flex flex-col gap-[24px] bg-white text-left">
          <TopPillRow badgeText="Missed" badgeBg="bg-[#EF4444]" />
          <SectionBreakdownTable sections={sections} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            <div className="bg-[#DBEAFE] rounded-[16px] p-[18px] flex flex-col gap-[6px]">
              <h4 className="font-sans font-medium text-[14px] text-[#1E40AF]">
                Certificate Locked
              </h4>
              <p className="font-sans font-normal text-[16px] leading-[22px] text-[#000000]">
                Score 75% or higher to unlock your course certificate.
              </p>
            </div>

            <div className="bg-white border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[18px] flex flex-col gap-[8px]">
              <div className="flex items-center gap-[6px] font-sans font-normal text-[14px] text-[#111827]">
                <img src={Icons.challenges} alt="Challenge" className="w-[18px] h-[18px]" />
                <span>Assessment Status</span>
              </div>
              <p className="font-sans font-normal text-[14px] text-[#000000]">
                <span className="font-medium text-[14px] text-[#000000]">Due by</span> - {dueBy}
              </p>
              <p className="font-sans font-normal text-[14px] text-[#000000]">
                <span className="font-medium text-[14px] text-[#000000]">Status</span> - Missed
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-[16px] pt-[8px]">
            <button
              type="button"
              onClick={onViewInstructions}
              className="w-full sm:w-auto border border-[#0088FF] text-[#0088FF] hover:bg-[#F0F8FF] px-[24px] py-[10px] rounded-[50px] font-sans font-normal text-[14px] transition-colors cursor-pointer text-center"
            >
              View Instructions
            </button>

            <button
              type="button"
              disabled
              className="w-full sm:w-auto bg-[#D1E7B4] text-white px-[26px] py-[10px] rounded-[50px] font-sans font-normal text-[14px] flex items-center justify-center gap-[8px] cursor-not-allowed opacity-80"
            >
              <svg className="w-[18px] h-[18px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <circle cx="12" cy="12" r="9" strokeWidth="2" />
              </svg>
              <span className="font-sans font-normal text-[14px] text-white">Start Final Assessment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 7. IN-PROGRESS STATE VIEW
// ==========================================
export const AssessmentInProgressView = ({ data = {}, onResumeAssessment, onViewInstructions }) => {
  const {
    title = "Final Assessment In Progress",
    subtitle = "You have an active assessment session in progress. Please complete your exam.",
    sections,
    timeRemaining = "45 Mins Remaining"
  } = data;

  return (
    <div className="p-[32px] md:p-[48px] bg-white flex flex-col items-center text-center w-full">
      <div className="w-full max-w-[760px] flex flex-col items-center">
        <img
          src={Icons.assessmentReady || Icons.assessmentPassed}
          alt="Assessment In Progress"
          className="w-[220px] md:w-[260px] h-auto mb-[24px]"
        />

        <h2 className="font-sans font-medium text-[23px] leading-normal tracking-[0px] text-[#000000] mb-[8px]">
          {title}
        </h2>

        <p className="font-sans font-normal text-[16px] leading-[24px] text-[#737373] max-w-[620px] mb-[28px]">
          {subtitle}
        </p>

        <div className="w-full border-[0.5px] border-[#B9BEC7] rounded-[24px] p-[24px] md:p-[32px] flex flex-col gap-[24px] bg-white text-left">
          <TopPillRow badgeText="In Progress" badgeBg="bg-[#3B82F6]" />
          <SectionBreakdownTable sections={sections} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            <div className="bg-[#EFF6FF] rounded-[16px] p-[18px] flex flex-col gap-[6px]">
              <h4 className="font-sans font-medium text-[14px] text-[#1D4ED8]">
                Session Active
              </h4>
              <p className="font-sans font-normal text-[14px] leading-[20px] text-[#1E3A8A]">
                Time remaining: <span className="font-medium text-[#1D4ED8]">{timeRemaining}</span>. Ensure steady submission.
              </p>
            </div>

            <div className="bg-white border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[18px] flex flex-col gap-[8px]">
              <div className="flex items-center gap-[6px] font-sans font-normal text-[14px] text-[#111827]">
                <img src={Icons.challenges} alt="Challenge" className="w-[18px] h-[18px]" />
                <span>Assessment Status</span>
              </div>
              <p className="font-sans font-normal text-[14px] text-[#000000]">
                <span className="font-medium text-[14px] text-[#000000]">Status</span> - In Progress
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-[16px] pt-[8px]">
            <button
              type="button"
              onClick={onViewInstructions}
              className="w-full sm:w-auto border border-[#0088FF] text-[#0088FF] hover:bg-[#F0F8FF] px-[24px] py-[10px] rounded-[50px] font-sans font-normal text-[14px] transition-colors cursor-pointer text-center"
            >
              View Instructions
            </button>

            <button
              type="button"
              onClick={onResumeAssessment}
              className="w-full sm:w-auto bg-[#3B82F6] hover:bg-[#2563EB] text-white px-[26px] py-[10px] rounded-[50px] font-sans font-normal text-[14px] flex items-center justify-center gap-[8px] transition-colors cursor-pointer shadow-sm"
            >
              <svg className="w-[18px] h-[18px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <circle cx="12" cy="12" r="9" strokeWidth="2" />
              </svg>
              <span className="font-sans font-normal text-[14px] text-white">Resume Assessment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN ASSESSMENT PAGE COMPONENT (1 Page with 7 Dynamic States)
// ==========================================
export const AssessmentTabSection = ({
  status = "ready", // State options: "locked", "ready", "completed", "reopened", "not-passed", "missed", "in-progress"
  isLocked,
  requirements,
  assessmentData,
  onStartAssessment,
  onRetakeAssessment,
  onViewInstructions,
  onViewCertificate,
  onResumeAssessment
}) => {
  // Allow interactive state switching for demo/testing purposes
  const [internalStatus, setInternalStatus] = useState(null);
  const activeStatus = internalStatus || (isLocked ? "locked" : (status || "ready"));

  const renderView = () => {
    switch (activeStatus) {
      case "locked":
        return <AssessmentLockedView requirements={requirements} {...assessmentData} />;

      case "ready":
      case "unlocked":
      case "not-started":
        return (
          <AssessmentReadyView
            data={assessmentData}
            onStartAssessment={onStartAssessment || (() => alert("Starting Final Assessment..."))}
            onViewInstructions={onViewInstructions || (() => alert("Viewing Instructions..."))}
          />
        );

      case "completed":
      case "passed":
        return (
          <AssessmentCompletedView
            data={assessmentData}
            onViewCertificate={onViewCertificate || (() => alert("Viewing Certificate..."))}
            onViewInstructions={onViewInstructions || (() => alert("Viewing Instructions..."))}
          />
        );

      case "reopened":
        return (
          <AssessmentReopenedView
            data={assessmentData}
            onRetake={onRetakeAssessment || (() => alert("Retaking Assessment..."))}
            onViewInstructions={onViewInstructions || (() => alert("Viewing Instructions..."))}
          />
        );

      case "not-passed":
      case "failed":
        return (
          <AssessmentNotPassedView
            data={assessmentData}
            onViewInstructions={onViewInstructions || (() => alert("Viewing Instructions..."))}
          />
        );

      case "missed":
        return (
          <AssessmentMissedView
            data={assessmentData}
            onViewInstructions={onViewInstructions || (() => alert("Viewing Instructions..."))}
          />
        );

      case "in-progress":
        return (
          <AssessmentInProgressView
            data={assessmentData}
            onResumeAssessment={onResumeAssessment || (() => alert("Resuming Assessment..."))}
            onViewInstructions={onViewInstructions || (() => alert("Viewing Instructions..."))}
          />
        );

      default:
        return (
          <AssessmentReadyView
            data={assessmentData}
            onStartAssessment={onStartAssessment || (() => alert("Starting Final Assessment..."))}
            onViewInstructions={onViewInstructions || (() => alert("Viewing Instructions..."))}
          />
        );
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* State Switcher Bar for Quick Inspection & Backend Testing */}
      <div className="w-full max-w-[760px] mb-[16px] px-[16px] py-[10px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] flex flex-wrap items-center justify-between gap-[8px]">
        <span className="font-sans font-medium text-[13px] text-[#374151]">
          State Switcher (API Backend Simulation):
        </span>
        <div className="flex flex-wrap items-center gap-[6px]">
          {[
            { key: "ready", label: "Ready" },
            { key: "completed", label: "Completed" },
            { key: "reopened", label: "Reopened" },
            { key: "not-passed", label: "Not Passed" },
            { key: "missed", label: "Missed" },
            { key: "in-progress", label: "In Progress" },
            { key: "locked", label: "Locked" }
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setInternalStatus(item.key)}
              className={`px-[10px] py-[4px] rounded-[6px] font-sans text-[12px] font-medium transition-colors cursor-pointer ${
                activeStatus === item.key
                  ? "bg-[#9AD84A] text-white"
                  : "bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F3F4F6]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Render Active Assessment View State */}
      {renderView()}
    </div>
  );
};

export default AssessmentTabSection;
