import React, { useState } from "react";
import { Icons } from "../../../assets/icons/icons.js";

// Helper component for Certificate Preview Graphic
const CertificateGraphic = ({ recipientName = "Saravanan S", isBlurred = false }) => {
  return (
    <div className="w-full bg-[#FFFFFF] border-[0.5px] border-[#E5E7EB] rounded-[16px] p-[16px] md:p-[24px] relative overflow-hidden flex flex-col items-center justify-center min-h-[340px] text-center shadow-sm select-none">
      {/* Certificate Image */}
      <img
        src="/certificate.png"
        alt="Course Certificate"
        className={`w-full h-auto object-contain rounded-[12px] transition-all ${isBlurred ? "filter blur-[4px] opacity-40" : ""}`}
      />

      {/* Lock Overlay for Locked State */}
      {isBlurred && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-[20px] bg-white/40 backdrop-blur-[2px]">
          <img src={Icons.certificateLock} alt="Locked" className="w-[48px] h-[48px] mb-[12px]" />
          <p className="font-sans font-medium text-[14px] text-[#111827] max-w-[240px] text-center leading-normal">
            Complete the remaining requirements to unlock your certificate.
          </p>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 1. UNLOCKED / EARNED CERTIFICATE VIEW
// ==========================================
export const CertificateUnlockedView = ({ data = {} }) => {
  const [copied, setCopied] = useState(false);

  const {
    recipientName = "Saravanan S",
    courseTitle = "Cyber Security Fundamentals.",
    issuedTo = "Saravanan S",
    issuedOn = "21 Aug 2026",
    issuedBy = "BSoft",
    finalScore = "86 %",
    certificateId = "BL-CYBER-2026-00124"
  } = data;

  const handleCopyId = () => {
    navigator.clipboard?.writeText(certificateId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[16px]">
      {/* Left Card: Certificate Preview */}
      <div className="lg:col-span-7 border-[0.7px] border-[#B9BEC7] rounded-[24px] p-[14px] md:p-[16px] bg-white flex flex-col gap-[12px]">
        <div className="flex items-center justify-between px-[2px]">
          <h3 className="font-sans font-medium text-[16px] text-[#111827]">
            Certificate Preview
          </h3>
          <button
            type="button"
            onClick={() => alert("Opening Full Certificate...")}
            className="font-sans font-normal text-[14px] text-[#111827] hover:underline flex items-center gap-[4px] cursor-pointer"
          >
            <span>View Certificate</span>
            <svg className="w-[14px] h-[14px] text-[#111827]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
        </div>

        {/* Certificate Image Container */}
        <div className="w-full flex-1 border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[8px] md:p-[10px] bg-white flex items-center justify-center my-auto">
          <img
            src="/certificate.png"
            alt="Course Certificate"
            className="w-full h-auto object-contain rounded-[10px]"
          />
        </div>
      </div>

      {/* Right Card: Certificate Details & Download */}
      <div className="lg:col-span-5 border-[0.7px] border-[#B9BEC7] rounded-[24px] p-[14px] md:p-[18px] bg-white flex flex-col items-center text-center justify-between gap-[14px]">
        <div className="w-full flex flex-col items-center gap-[16px]">
          {/* Trophy Header */}
          <div className="w-[48px] h-[48px] flex items-center justify-center">
            <img src={Icons.trophyStar} alt="Trophy Star" className="w-[48px] h-[48px]" />
          </div>

          <div className="flex flex-col gap-[6px]">
            <h2 className="font-sans font-semibold text-[20px] text-[#111827]">
              Congratulations!
            </h2>
            <p className="font-sans font-normal text-[14px] text-[#000000] max-w-[280px] leading-relaxed">
              You've successfully completed {courseTitle}
            </p>
          </div>

          {/* 2x2 Details Grid */}
          <div className="grid grid-cols-2 gap-[12px] w-full text-left mt-[4px]">
            <div className="bg-[#F9FAFB] border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[14px]">
              <span className="block font-sans font-medium text-[14px] text-[#000000] mb-[4px]">Issued to</span>
              <span className="block font-sans font-normal text-[14px] text-[#000000]">{issuedTo}</span>
            </div>

            <div className="bg-[#F9FAFB] border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[14px]">
              <span className="block font-sans font-medium text-[14px] text-[#000000] mb-[4px]">Issued on</span>
              <span className="block font-sans font-normal text-[14px] text-[#000000]">{issuedOn}</span>
            </div>

            <div className="bg-[#F9FAFB] border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[14px]">
              <span className="block font-sans font-medium text-[14px] text-[#000000] mb-[4px]">Issued by</span>
              <span className="block font-sans font-normal text-[14px] text-[#000000]">{issuedBy}</span>
            </div>

            <div className="bg-[#F9FAFB] border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[14px]">
              <span className="block font-sans font-medium text-[14px] text-[#000000] mb-[4px]">Final Score</span>
              <span className="block font-sans font-normal text-[14px] text-[#000000]">{finalScore}</span>
            </div>
          </div>

          {/* Certificate ID Box */}
          <div className="w-full bg-[#F9FAFB] border-[0.5px] border-[#B9BEC7] rounded-[16px] p-[14px] flex items-center justify-between text-left">
            <div>
              <span className="block font-sans font-medium text-[14px] text-[#000000] mb-[4px]">Certificate ID</span>
              <span className="font-sans font-normal text-[14px] text-[#000000]">{certificateId}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyId}
              title="Copy Certificate ID"
              className="text-[#6B7280] hover:text-[#111827] transition-colors p-[4px] cursor-pointer"
            >
              {copied ? (
                <span className="text-[12px] text-[#15803D] font-medium">Copied!</span>
              ) : (
                <svg className="w-[18px] h-[18px] text-[#000000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="1.5" />
                  <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" strokeWidth="1.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px] w-full pt-[4px]">
          <button
            type="button"
            onClick={() => alert("Sharing Certificate...")}
            className="border border-[#3B82F6] text-[#3B82F6] hover:bg-[#EFF6FF] rounded-[10px] py-[10px] px-[8px] sm:px-[12px] font-sans font-normal text-[13px] sm:text-[14px] flex items-center justify-center gap-[4px] sm:gap-[6px] whitespace-nowrap transition-colors cursor-pointer"
          >
            <svg className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-[#3B82F6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="whitespace-nowrap">Share Certificate</span>
          </button>

          <button
            type="button"
            onClick={() => alert("Downloading Certificate PDF...")}
            className="bg-[#9AD84A] hover:bg-[#8bc93e] text-white rounded-[10px] py-[10px] px-[8px] sm:px-[12px] font-sans font-normal text-[13px] sm:text-[14px] flex items-center justify-center gap-[4px] sm:gap-[6px] whitespace-nowrap transition-colors cursor-pointer shadow-sm"
          >
            <svg className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="whitespace-nowrap">Download Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. LOCKED CERTIFICATE VIEW
// ==========================================
export const CertificateLockedView = ({ requirements }) => {
  const defaultRequirements = [
    { title: "Milestones", completed: 2, total: 7, percentage: Math.round((2 / 7) * 100) },
    { title: "Practical Labs", completed: 2, total: 5, percentage: Math.round((2 / 5) * 100) },
    { title: "Recall Quizzes", completed: 8, total: 10, percentage: Math.round((8 / 10) * 100) },
    { title: "Final Assessment", statusText: "Not Passed", isComplete: false }
  ];

  const list = requirements || defaultRequirements;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[16px]">
      {/* Left Card: Certificate Preview (Locked Overlay) */}
      <div className="lg:col-span-7 border-[0.7px] border-[#B9BEC7] rounded-[24px] p-[14px] md:p-[16px] bg-white flex flex-col gap-[12px]">
        <h3 className="font-sans font-medium text-[16px] text-[#111827]">
          Certificate Preview
        </h3>

        <div className="w-full flex-1 border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[16px] bg-white flex items-center justify-center relative overflow-hidden my-auto min-h-[260px]">
          <img
            src="/certificate.png"
            alt="Course Certificate"
            className="w-full max-w-[85%] max-h-[300px] h-auto object-contain rounded-[10px] filter blur-[4px] opacity-40 mx-auto"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-[20px] bg-white/40 backdrop-blur-[2px]">
            <img src={Icons.certificateLock} alt="Locked" className="w-[48px] h-[48px] mb-[12px]" />
            <p className="font-sans font-normal text-[12px] text-[#131313] max-w-[240px] text-center leading-normal">
              Complete the remaining requirements to unlock your certificate.
            </p>
          </div>
        </div>
      </div>

      {/* Right Card: Certificate Requirement Card */}
      <div className="lg:col-span-5 border-[0.7px] border-[#B9BEC7] rounded-[24px] p-[14px] md:p-[18px] bg-white flex flex-col justify-between gap-[20px]">
        <div>
          <h3 className="font-sans font-medium text-[18px] text-[#000000] mb-[24px]">
            Certificate Requirement
          </h3>

          <div className="flex flex-col gap-[20px]">
            {list.map((req, index) => (
              <div key={req.title || index} className="flex flex-col gap-[8px]">
                <div className="flex items-center justify-between font-sans text-[14px]">
                  <span className="font-normal text-[#111827]">{req.title}</span>
                  <span className="font-normal text-[#111827]">
                    {req.statusText ? req.statusText : `${req.completed} / ${req.total} Completed`}
                  </span>
                </div>
                <div className="w-full h-[10px] bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      req.statusText && !req.isComplete ? "bg-[#E5E7EB]" : "bg-[#9AD84A]"
                    }`}
                    style={{ width: `${req.percentage || (req.isComplete ? 100 : 0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="font-sans font-medium text-[12px] text-[#000000] text-center mt-[16px]">
          You are just few steps away ! Complete the course to unlock your certificate.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// MAIN CERTIFICATE TAB SECTION COMPONENT
// ==========================================
export const CertificateTabSection = ({
  isUnlocked = false,
  certificateData,
  requirements
}) => {
  const [internalUnlocked, setInternalUnlocked] = useState(null);
  const activeUnlocked = internalUnlocked !== null ? internalUnlocked : isUnlocked;

  return (
    <div className="w-full flex flex-col items-center pb-[32px] md:pb-[48px]">
      {/* State Switcher Bar for Quick Review */}
      <div className="w-full max-w-[1080px] mb-[16px] px-[16px] py-[10px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] flex flex-wrap items-center justify-between gap-[8px]">
        <span className="font-sans font-medium text-[13px] text-[#374151]">
          Certificate State Switcher (API Backend Simulation):
        </span>
        <div className="flex items-center gap-[6px]">
          <button
            type="button"
            onClick={() => setInternalUnlocked(true)}
            className={`px-[12px] py-[4px] rounded-[6px] font-sans text-[12px] font-medium transition-colors cursor-pointer ${
              activeUnlocked ? "bg-[#9AD84A] text-white" : "bg-white border border-[#E5E7EB] text-[#4B5563]"
            }`}
          >
            Unlocked / Earned
          </button>
          <button
            type="button"
            onClick={() => setInternalUnlocked(false)}
            className={`px-[12px] py-[4px] rounded-[6px] font-sans text-[12px] font-medium transition-colors cursor-pointer ${
              !activeUnlocked ? "bg-[#9AD84A] text-white" : "bg-white border border-[#E5E7EB] text-[#4B5563]"
            }`}
          >
            Locked State
          </button>
        </div>
      </div>

      <div className="w-full max-w-[1080px]">
        {activeUnlocked ? (
          <CertificateUnlockedView data={certificateData} />
        ) : (
          <CertificateLockedView requirements={requirements} />
        )}
      </div>
    </div>
  );
};

export default CertificateTabSection;
