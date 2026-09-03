import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons/icons.js";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the difference between authentication and authorization?",
    options: [
      { key: "A", text: "Authentication grants permissions, authorization verifies identity" },
      { key: "B", text: "Authentication verifies identity, authorization determines access permissions", isCorrect: true },
      { key: "C", text: "Both terms mean the same thing" },
      { key: "D", text: "Authorization encrypts passwords, authentication stores them" }
    ]
  },
  {
    id: 2,
    question: "What does the CIA Triad stand for in Cybersecurity?",
    options: [
      { key: "A", text: "Confidentiality, Integrity, Availability", isCorrect: true },
      { key: "B", text: "Control, Inspection, Authentication" },
      { key: "C", text: "Communication, Isolation, Analysis" },
      { key: "D", text: "Central Intelligence Agency" }
    ]
  },
  {
    id: 3,
    question: "Which of the following is considered a passive attack?",
    options: [
      { key: "A", text: "Eavesdropping and traffic analysis", isCorrect: true },
      { key: "B", text: "Man-in-the-middle packet modification" },
      { key: "C", text: "Distributed Denial of Service (DDoS)" },
      { key: "D", text: "SQL Injection attack" }
    ]
  },
  {
    id: 4,
    question: "What type of threat actor attacks systems primarily for political or social causes?",
    options: [
      { key: "A", text: "Script Kiddie" },
      { key: "B", text: "Hacktivist", isCorrect: true },
      { key: "C", text: "Insider Threat" },
      { key: "D", text: "Nation-state Actor" }
    ]
  },
  {
    id: 5,
    question: "In Linux, which command is used to change file permissions?",
    options: [
      { key: "A", text: "chown" },
      { key: "B", text: "chmod", isCorrect: true },
      { key: "C", text: "chgrp" },
      { key: "D", text: "umask" }
    ]
  },
  {
    id: 6,
    question: "Which protocol operates securely on port 443 by default?",
    options: [
      { key: "A", text: "HTTP" },
      { key: "B", text: "HTTPS", isCorrect: true },
      { key: "C", text: "FTP" },
      { key: "D", text: "SSH" }
    ]
  },
  {
    id: 7,
    question: "What is the primary purpose of a Firewall in a network?",
    options: [
      { key: "A", text: "To speed up internet bandwidth" },
      { key: "B", text: "To filter incoming and outgoing network traffic based on security rules", isCorrect: true },
      { key: "C", text: "To assign IP addresses dynamically" },
      { key: "D", text: "To host web servers securely" }
    ]
  },
  {
    id: 8,
    question: "Which attack vector tricks users into revealing sensitive login credentials via fake emails?",
    options: [
      { key: "A", text: "Phishing", isCorrect: true },
      { key: "B", text: "Zero-day exploit" },
      { key: "C", text: "Buffer overflow" },
      { key: "D", text: "Port scanning" }
    ]
  },
  {
    id: 9,
    question: "What does Principle of Least Privilege (PoLP) mean?",
    options: [
      { key: "A", text: "Users should be given minimum necessary access permissions to perform their job", isCorrect: true },
      { key: "B", text: "All users should have administrator privileges" },
      { key: "C", text: "Passwords must be changed every 30 days" },
      { key: "D", text: "Access permissions are granted based on seniority" }
    ]
  },
  {
    id: 10,
    question: "Which tool is commonly used for network packet sniffing and protocol analysis?",
    options: [
      { key: "A", text: "Wireshark", isCorrect: true },
      { key: "B", text: "Nmap" },
      { key: "C", text: "Metasploit" },
      { key: "D", text: "John the Ripper" }
    ]
  },
  {
    id: 11,
    question: "What is a Zero-Day Vulnerability?",
    options: [
      { key: "A", text: "A vulnerability that has been known for zero days by hackers" },
      { key: "B", text: "A security flaw unknown to the vendor with no official patch available", isCorrect: true },
      { key: "C", text: "A virus that deletes data at midnight" },
      { key: "D", text: "An exploit that takes 0 seconds to run" }
    ]
  },
  {
    id: 12,
    question: "What does MFA stand for in access management?",
    options: [
      { key: "A", text: "Multi-Factor Authentication", isCorrect: true },
      { key: "B", text: "Master File Allocation" },
      { key: "C", text: "Network Multi-Frequency Access" },
      { key: "D", text: "Mandatory Functional Assessment" }
    ]
  },
  {
    id: 13,
    question: "Which port is standard for SSH (Secure Shell) connections?",
    options: [
      { key: "A", text: "Port 80" },
      { key: "B", text: "Port 22", isCorrect: true },
      { key: "C", text: "Port 21" },
      { key: "D", text: "Port 53" }
    ]
  },
  {
    id: 14,
    question: "What type of malware encrypts victim files and demands payment for decryption?",
    options: [
      { key: "A", text: "Ransomware", isCorrect: true },
      { key: "B", text: "Spyware" },
      { key: "C", text: "Adware" },
      { key: "D", text: "Trojan Horse" }
    ]
  },
  {
    id: 15,
    question: "What is the primary role of DNS in web networking?",
    options: [
      { key: "A", text: "Translating domain names to IP addresses", isCorrect: true },
      { key: "B", text: "Encrypting database traffic" },
      { key: "C", text: "Routing local Wi-Fi packets" },
      { key: "D", text: "Managing web browser cookies" }
    ]
  }
];

export const CourseQuizPage = ({
  quizTitle = "Cyber Security Fundamentals - Week 1 Quiz",
  facultyName = "Saravanan",
  studentId = "727723eucy051",
  onExit
}) => {
  const navigate = useNavigate();

  // Navigation state
  const [currentIdx, setCurrentIdx] = useState(0);

  // User responses state: { [questionId]: optionKey }
  const [userAnswers, setUserAnswers] = useState({
    1: "B",
    2: "A"
  });

  // Bookmarked questions state: { [questionId]: boolean }
  const [bookmarked, setBookmarked] = useState({
    5: true
  });

  // Skipped questions state: { [questionId]: boolean }
  const [skipped, setSkipped] = useState({
    3: true
  });

  // Timer countdown state (52 min 18 sec allocated)
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(52 * 60 + 18);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? "0" : ""}${mins} : ${secs < 10 ? "0" : ""}${secs}`;
  };

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (key) => {
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: key }));
    // Remove from skipped if answered
    setSkipped((prev) => ({ ...prev, [currentQ.id]: false }));
  };

  const handleClearAnswer = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const toggleBookmark = () => {
    setBookmarked((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  const handleNext = () => {
    if (!userAnswers[currentQ.id] && !bookmarked[currentQ.id]) {
      setSkipped((prev) => ({ ...prev, [currentQ.id]: true }));
    }
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  // End Test Modal State
  const [showEndTestModal, setShowEndTestModal] = useState(false);

  const handleOpenEndTestModal = () => {
    setShowEndTestModal(true);
  };

  const handleConfirmSubmitQuiz = () => {
    setShowEndTestModal(false);
    if (onExit) {
      onExit();
    } else {
      navigate(-1);
    }
  };

  // Calculate status counts
  const answeredCount = Object.keys(userAnswers).length;
  const skippedCount = Object.keys(skipped).filter((k) => skipped[k]).length;
  const bookmarkedCount = Object.keys(bookmarked).filter((k) => bookmarked[k]).length;
  const notViewedCount = totalQuestions - answeredCount - skippedCount;

  return (
    <div className="fixed inset-0 z-50 bg-[#F0F1F3] font-sans text-black flex flex-col h-screen overflow-hidden">
      {/* 1. TOP HEADER BAR */}
      <header className="bg-[#F0F1F3] px-[24px] md:px-[36px] py-[8px] flex items-center justify-between shrink-0 h-[52px]">
        {/* Left: Title | Faculty | Student ID */}
        <div className="flex items-center gap-[12px] truncate">
          <h1 className="font-sans font-semibold text-[17px] md:text-[18px] text-[#000000] truncate">
            {quizTitle}
          </h1>
          <span className="text-[#B9BEC7] font-light">|</span>
          <span className="font-sans font-medium text-[15px] text-[#111827] hidden sm:inline">
            {facultyName}
          </span>
          <span className="text-[#B9BEC7] font-light hidden sm:inline">|</span>
          <span className="font-sans font-normal text-[14px] text-[#4B5563] hidden md:inline">
            {studentId}
          </span>
        </div>

        {/* Right: Timer & End Test */}
        <div className="flex items-center gap-[14px] shrink-0">
          <div className="bg-white border border-[#B9BEC7] rounded-[10px] px-[16px] py-[6px] flex items-center gap-[8px] font-sans font-medium text-[14px] text-[#111827] shadow-2xs">
            <img src={Icons.clockFading} alt="Timer" className="w-[18px] h-[18px] object-contain" />
            <span>{formatTimer(timeRemainingSeconds)} remaining</span>
          </div>

          <button
            type="button"
            onClick={handleOpenEndTestModal}
            className="bg-white hover:bg-gray-50 border border-[#B9BEC7] text-[#000000] font-sans font-medium text-[14px] px-[20px] py-[6px] rounded-[10px] transition-colors cursor-pointer shadow-2xs"
          >
            End Test
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT BODY (Left Navigator + Right Question Card) */}
      <main className="flex-1 px-[20px] md:px-[36px] pb-[10px] pt-[2px] flex flex-col md:flex-row gap-[16px] items-stretch min-h-0 overflow-hidden">
        
        {/* LEFT SIDEBAR: Question Navigator Panel */}
        <aside className="w-full md:w-[152px] shrink-0 bg-white rounded-[24px] pt-[16px] pb-[16px] flex flex-col justify-between h-full shadow-xs">
          <div className="px-[18px] flex flex-col items-center">
            <h2 className="font-sans font-semibold text-[15px] text-[#000000] mb-[16px] text-center">
              Question ({totalQuestions})
            </h2>

            {/* Grid of question buttons (2 columns with balanced gap) */}
            <div className="grid grid-cols-5 md:grid-cols-2 gap-x-[10px] gap-y-[10px] justify-center max-h-[calc(100vh-280px)] overflow-y-auto no-scrollbar">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const qNum = idx + 1;
                const isSelected = userAnswers[q.id];
                const isBookmarked = bookmarked[q.id];
                const isSkipped = skipped[q.id];
                const isCurrent = currentIdx === idx;

                let btnStyle = "bg-[#E5E5E5] text-[#374151] border-transparent hover:bg-gray-300";
                if (isCurrent) {
                  btnStyle = "bg-white text-[#000000] border-2 border-[#9AD84A] font-bold shadow-2xs";
                } else if (isSelected) {
                  btnStyle = "bg-[#4ADE80] text-white border-transparent font-bold";
                } else if (isBookmarked) {
                  btnStyle = "bg-[#FACC15] text-white border-transparent font-bold";
                } else if (isSkipped) {
                  btnStyle = "bg-[#F87171] text-white border-transparent font-bold";
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-[40px] h-[40px] rounded-[5px] font-sans font-semibold text-[14px] flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                  >
                    {qNum}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Status Legend Box (Full-width edge-to-edge border line) */}
          <div className="border-t border-[#E5E7EB] pt-[12px] mt-auto flex flex-col gap-[8px] items-center text-center w-full px-[14px]">
            {/* Answered */}
            <div className="flex flex-col items-center gap-[3px]">
              <div className="w-[24px] h-[24px] rounded-[7px] bg-[#4ADE80] flex items-center justify-center shrink-0">
                <img src={Icons.answered} alt="Answered" className="w-[13px] h-[13px] brightness-200" />
              </div>
              <span className="font-sans font-normal text-[11px] text-[#000000]">
                Answered {answeredCount}/{totalQuestions}
              </span>
            </div>

            {/* Skipped */}
            <div className="flex flex-col items-center gap-[3px]">
              <div className="w-[24px] h-[24px] rounded-[7px] bg-[#F87171] flex items-center justify-center shrink-0">
                <img src={Icons.skipped} alt="Skipped" className="w-[13px] h-[13px] brightness-200" />
              </div>
              <span className="font-sans font-normal text-[11px] text-[#000000]">
                Skipped {skippedCount}/{totalQuestions}
              </span>
            </div>

            {/* Not viewed */}
            <div className="flex flex-col items-center gap-[3px]">
              <div className="w-[24px] h-[24px] rounded-[7px] bg-[#E5E5E5] flex items-center justify-center shrink-0">
                <img src={Icons.eye} alt="Not viewed" className="w-[13px] h-[13px] opacity-70" />
              </div>
              <span className="font-sans font-normal text-[11px] text-[#000000]">
                Not viewed {notViewedCount}/{totalQuestions}
              </span>
            </div>

            {/* Bookmark */}
            <div className="flex flex-col items-center gap-[3px]">
              <div className="w-[24px] h-[24px] rounded-[7px] bg-[#FACC15] flex items-center justify-center shrink-0">
                <img src={Icons.bookmark} alt="Bookmark" className="w-[13px] h-[13px] brightness-200" />
              </div>
              <span className="font-sans font-normal text-[11px] text-[#000000]">
                Bookmark {bookmarkedCount}/{totalQuestions}
              </span>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN WORKSPACE: Question Card Container */}
        <section className="flex-1 bg-white rounded-[24px] p-[28px] md:p-[36px] flex flex-col justify-between shadow-xs overflow-y-auto no-scrollbar">
          
          {/* Top Question Bar */}
          <div>
            <div className="flex items-center justify-between w-full">
              <span className="font-sans font-medium text-[15px] text-[#4B5563]">
                Question {currentIdx + 1} of {totalQuestions}
              </span>

              <button
                type="button"
                onClick={toggleBookmark}
                className="flex items-center gap-[6px] font-sans font-medium text-[14px] text-[#111827] hover:text-[#000000] transition-colors cursor-pointer"
              >
                <img src={Icons.bookmark} alt="Bookmark" className={`w-[18px] h-[18px] object-contain transition-all ${bookmarked[currentQ.id] ? "brightness-0 opacity-100" : "brightness-0 opacity-70 hover:opacity-100"}`} />
                <span>Mark for Review</span>
              </button>
            </div>

            {/* Question Text */}
            <h2 className="font-sans font-semibold text-[20px] md:text-[22px] text-[#000000] mt-[16px] mb-[28px] leading-[1.4]">
              {currentQ.question}
            </h2>

            {/* Answer Options List */}
            <div className="flex flex-col gap-[14px] w-full">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt.key;

                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full text-left p-[16px] md:p-[18px] rounded-[16px] transition-all cursor-pointer flex items-center gap-[14px] ${
                      isSelected
                        ? "bg-[#9AD84A]/60 border-2 border-dashed border-[#9AD84A] text-[#000000] font-medium shadow-2xs"
                        : "bg-white border border-dashed border-[#D0D3D9] text-[#111827] hover:border-[#9AD84A] hover:bg-gray-50/60"
                    }`}
                  >
                    {/* Key Badge Circle (A, B, C, D) */}
                    <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center font-sans font-semibold text-[13px] shrink-0 ${
                      isSelected
                        ? "bg-white text-[#000000] border border-[#9AD84A]"
                        : "border border-[#D0D3D9] text-[#6B7280] bg-white"
                    }`}>
                      {opt.key}
                    </div>

                    <span className="font-sans text-[15px] md:text-[16px] leading-[1.4]">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Footer Controls */}
          <div className="flex items-center justify-between w-full pt-[24px] mt-[24px] border-t border-[#F0F1F3]">
            {/* Clear Button */}
            <button
              type="button"
              onClick={handleClearAnswer}
              className="bg-white hover:bg-gray-50 border border-[#D0D3D9] text-[#111827] font-sans font-normal text-[16px] px-[24px] py-[10px] rounded-[10px] transition-colors cursor-pointer shadow-2xs"
            >
              Clear
            </button>

            {/* Previous & Next Buttons */}
            <div className="flex items-center gap-[12px]">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className={`bg-white border border-[#D0D3D9] font-sans font-normal text-[16px] px-[24px] py-[10px] rounded-[10px] transition-colors flex items-center gap-[6px] shadow-2xs ${
                  currentIdx === 0
                    ? "opacity-40 cursor-not-allowed text-[#9CA3AF]"
                    : "hover:bg-gray-50 text-[#111827] cursor-pointer"
                }`}
              >
                <span>‹ Previous</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="bg-[#9AD84A] hover:bg-[#8bc93e] text-white font-sans font-normal text-[16px] px-[28px] py-[10px] rounded-[10px] transition-colors cursor-pointer flex items-center gap-[6px] shadow-xs"
              >
                <span>Next</span>
                <span>›</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* END TEST CONFIRMATION MODAL (endquiz.jpg spec) */}
      {showEndTestModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-[16px]">
          <div className="bg-white rounded-[10px] max-w-[760px] w-full overflow-hidden shadow-2xl flex flex-col transition-all">
            {/* Modal Header */}
            <div className="px-[28px] py-[20px] border-b border-[#E5E7EB] flex items-center justify-between">
              <h2 className="font-sans font-semibold text-[20px] text-[#000000]">
                End Test
              </h2>
              <button
                type="button"
                onClick={() => setShowEndTestModal(false)}
                className="text-[#6B7280] hover:text-[#111827] transition-colors p-[4px] rounded-md cursor-pointer"
                title="Close"
              >
                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-[28px] py-[24px] flex flex-col gap-[20px]">
              <div>
                <h3 className="font-sans font-medium text-[17px] text-[#111827] mb-[6px]">
                  Ready to Submit ?
                </h3>
                <p className="font-sans font-normal text-[14px] text-[#6B7280] leading-[1.5]">
                  You're almost done. Review your remaining questions or submit your quiz to see your results.
                </p>
              </div>

              {/* 4 Metrics Box: Score | Accuracy | Time Taken | XP Earned */}
              <div className="border border-[#E5E7EB] rounded-[16px] overflow-hidden bg-[#FAFBFD] grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#E5E7EB]">
                <div className="p-[16px] flex flex-col">
                  <span className="font-sans font-normal text-[16px] text-[#000000] mb-[4px]">Score</span>
                  <span className="font-sans font-medium text-[25px] text-[#000000]">8 / 15</span>
                </div>
                <div className="p-[16px] flex flex-col">
                  <span className="font-sans font-normal text-[16px] text-[#000000] mb-[4px]">Accuracy</span>
                  <span className="font-sans font-medium text-[25px] text-[#000000]">80 %</span>
                </div>
                <div className="p-[16px] flex flex-col">
                  <span className="font-sans font-normal text-[16px] text-[#000000] mb-[4px]">Time Taken</span>
                  <span className="font-sans font-medium text-[25px] text-[#000000]">10m 23s</span>
                </div>
                <div className="p-[16px] flex flex-col">
                  <span className="font-sans font-normal text-[16px] text-[#000000] mb-[4px]">XP Earned</span>
                  <span className="font-sans font-medium text-[25px] text-[#000000]">+25 XP</span>
                </div>
              </div>

              {/* Test Summary Table */}
              <div className="border border-[#E5E7EB] rounded-[16px] overflow-hidden bg-white">
                <div className="bg-[#F3F4F6] text-center font-sans font-medium text-[15px] text-[#111827] py-[12px] border-b border-[#E5E7EB]">
                  Test Summary
                </div>
                <div className="divide-y divide-[#E5E7EB]">
                  <div className="px-[20px] py-[12px] flex items-center justify-between text-[14px] text-[#111827]">
                    <span className="font-sans font-normal">Total Questions</span>
                    <span className="font-sans font-medium">15</span>
                  </div>
                  <div className="px-[20px] py-[12px] flex items-center justify-between text-[14px] text-[#111827]">
                    <span className="font-sans font-normal">Answered</span>
                    <span className="font-sans font-medium">{answeredCount || 14}</span>
                  </div>
                  <div className="px-[20px] py-[12px] flex items-center justify-between text-[14px] text-[#111827]">
                    <span className="font-sans font-normal">Skipped</span>
                    <span className="font-sans font-medium">{skippedCount || 4}</span>
                  </div>
                  <div className="px-[20px] py-[12px] flex items-center justify-between text-[14px] text-[#111827]">
                    <span className="font-sans font-normal">Not Viewed</span>
                    <span className="font-sans font-medium">{notViewedCount || 3}</span>
                  </div>
                  <div className="px-[20px] py-[12px] flex items-center justify-between text-[14px] text-[#111827]">
                    <span className="font-sans font-normal">Marked for Review</span>
                    <span className="font-sans font-medium">{bookmarkedCount || 14}</span>
                  </div>
                </div>
              </div>

              {/* Warning Notice Banner Line */}
              <div className="flex items-center gap-[8px] text-[#EF4444] text-[13px] font-sans font-normal">
                <div className="w-[16px] h-[16px] rounded-full bg-[#EF4444] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  i
                </div>
                <span>Some questions are still unanswered. You can review them now or submit your quiz.</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-[28px] pb-[24px] pt-[8px] flex items-center justify-end gap-[12px]">
              <button
                type="button"
                onClick={() => setShowEndTestModal(false)}
                className="bg-white hover:bg-gray-50 border border-[#D0D3D9] text-[#111827] font-sans font-medium text-[15px] px-[24px] py-[10px] rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmSubmitQuiz}
                className="bg-[#9AD84A] hover:bg-[#8bc93e] text-white font-sans font-medium text-[15px] px-[28px] py-[10px] rounded-full transition-colors cursor-pointer shadow-xs"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseQuizPage;
