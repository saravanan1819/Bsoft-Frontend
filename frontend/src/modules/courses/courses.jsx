import React, { useState } from "react";
import { Icons } from "../../assets/icons/icons.js";

export const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState("Course Info");
  const [expandedMilestone, setExpandedMilestone] = useState(1);

  const skillsList = [
    "Linux",
    "Networking",
    "Web Security",
    "Nmap",
    "Burp Suite",
    "OWASP",
    "Incident Response"
  ];

  const milestonesData = [
    {
      id: 1,
      title: "Milestone 1",
      overviewParagraph1:
        "This milestone serves as the foundation of the cybersecurity learning journey, introducing students to the core principles, technologies, and real-world concepts that drive modern cybersecurity operations. Students will explore how digital systems function, how cyber threats target organizations and individuals, and how security professionals protect networks, systems, and data against evolving attacks.",
      overviewParagraph2:
        "The milestone combines theoretical understanding with practical exposure to networking, operating systems, cybersecurity tools, and security methodologies. Learners will gain a strong understanding of the cybersecurity landscape while developing the technical mindset required for advanced offensive and defensive security topics in later milestones. By the end of this milestone, students will have the foundational knowledge needed to confidently navigate cybersecurity environments, understand attack surfaces, and begin working with industry-relevant tools and technologies.",
      objectives: [
        "Understand the fundamentals and importance of cybersecurity in modern digital environments",
        "Identify and explain common cyber threats, attack vectors, and threat actors",
        "Understand core networking concepts, communication protocols, and network architecture",
        "Work with basic Linux and Windows operating system environments",
        "Understand essential cybersecurity terminologies, frameworks, and security principles",
        "Explain the CIA Triad and other foundational security models",
        "Understand ethical hacking concepts and responsible security practices",
        "Use introductory cybersecurity and networking tools in controlled environments",
        "Recognize basic vulnerabilities, risks, and security weaknesses in systems",
        "Build a foundational mindset for offensive security, defensive security, and security operations"
      ]
    },
    {
      id: 2,
      title: "Milestone 2",
      overviewParagraph1:
        "Network Security Deep-dive and Traffic Analysis. Learn how to monitor, capture, and defend against network protocol attacks using tools like Wireshark and Tcpdump.",
      overviewParagraph2:
        "Gain hands-on skills in configuring firewalls, intrusion detection systems, and segmenting enterprise networks securely.",
      objectives: [
        "Analyze TCP/IP network traffic and protocol behaviors",
        "Configure firewalls and Intrusion Detection Systems (IDS)",
        "Perform packet analysis to spot anomalies and malware beacons"
      ]
    },
    {
      id: 3,
      title: "Milestone 3",
      overviewParagraph1:
        "Web Application Security & OWASP Top 10. Hands-on exploitation and remediation of common web vulnerabilities.",
      overviewParagraph2:
        "Understand server-side logic flaws and practical defense strategies against client-side script injection.",
      objectives: [
        "Identify and exploit SQL Injection, XSS, and CSRF flaws",
        "Perform automated and manual vulnerability scans with Burp Suite",
        "Apply secure coding standards to patch vulnerabilities"
      ]
    }
  ];

  return (
    <div className="w-full max-w-none pb-[40px] font-sans text-black">
      {/* Outer Single White Card Frame */}
      <div className="w-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[24px] overflow-hidden flex flex-col">
        {/* Course Header Area */}
        <div className="pt-[28px] md:pt-[32px] pb-[28px] md:pb-[32px] flex flex-col gap-[24px]">
          {/* Header Title & Badges Row */}
          <div className="px-[28px] md:px-[32px] pb-[20px] border-b-[0.5px] border-[#B9BEC7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px]">
            <div>
              <h1 className="font-sans font-semibold text-[22px] md:text-[24px] text-[#0C0C0C] leading-snug">
                Cyber Security Fundamentals
              </h1>
              <p className="font-sans text-[14px] text-[#737373] mt-[4px]">
                Master the Core Concepts of cybersecurity and ethical hacking from scratch.
              </p>
            </div>
            <div className="flex items-center gap-[10px] shrink-0">
              <span className="bg-transparent border-[0.5px] border-[#B9BEC7] text-[#000000] font-sans text-[16px] font-medium px-[16px] py-[6px] rounded-[10px]">
                Beginner
              </span>
              <span className="bg-[#9AD84A] text-white font-sans text-[16px] font-medium px-[16px] py-[6px] rounded-[10px]">
                In Progress
              </span>
            </div>
          </div>

          {/* 4 Stats Columns Grid */}
          <div className="px-[28px] md:px-[32px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
            {/* Stat 1: Course Progress */}
            <div className="flex flex-col justify-between pr-[10px] border-r-0 lg:border-r-[0.5px] border-[#B9BEC7]">
              <span className="font-sans font-normal text-[14px] leading-normal tracking-[0px] text-[#737373] mb-[8px]">
                Course Progress
              </span>
              <div>
                <div className="font-sans font-bold text-[24px] text-[#0C0C0C] mb-[8px]">
                  85 % <span className="font-sans font-normal text-[16px] leading-normal tracking-[0px] text-[#1C1C1C]">of completed</span>
                </div>
                <div className="w-full bg-[#F0F1F3] h-[6px] rounded-full overflow-hidden">
                  <div className="bg-[#9AD84A] h-full rounded-full w-[85%]" />
                </div>
              </div>
            </div>

            {/* Stat 2: Milestone */}
            <div className="flex flex-col justify-between pr-[10px] border-r-0 lg:border-r-[0.5px] border-[#B9BEC7]">
              <span className="font-sans font-normal text-[14px] leading-normal tracking-[0px] text-[#737373] mb-[8px]">
                Milestone
              </span>
              <div>
                <div className="font-sans font-bold text-[24px] text-[#0C0C0C]">
                  2 of 7
                </div>
                <span className="font-sans font-normal text-[15px] leading-normal tracking-[0px] text-[#0C0C0C]">
                  In progress
                </span>
              </div>
            </div>

            {/* Stat 3: Total Lessons */}
            <div className="flex flex-col justify-between pr-[10px] border-r-0 lg:border-r-[0.5px] border-[#B9BEC7]">
              <span className="font-sans font-normal text-[14px] leading-normal tracking-[0px] text-[#737373] mb-[8px]">
                Total Lessons
              </span>
              <div>
                <div className="font-sans font-bold text-[24px] text-[#0C0C0C]">
                  20
                </div>
                <span className="font-sans font-normal text-[15px] leading-normal tracking-[0px] text-[#0C0C0C]">
                  13 / 20 Completed
                </span>
              </div>
            </div>

            {/* Stat 4: Total Labs */}
            <div className="flex flex-col justify-between">
              <span className="font-sans font-normal text-[14px] leading-normal tracking-[0px] text-[#737373] mb-[8px]">
                Total Labs
              </span>
              <div>
                <div className="font-sans font-bold text-[24px] text-[#0C0C0C]">
                  5
                </div>
                <span className="font-sans font-normal text-[15px] leading-normal tracking-[0px] text-[#0C0C0C]">
                  3 / 5 Completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gray Bar Sub-Tabs Navigation */}
        <div className="bg-[#F0F1F3] border-y-[0.5px] border-[#B9BEC7] px-[28px] md:px-[32px] flex items-center gap-[32px] overflow-x-auto no-scrollbar">
          {["Course Info", "Course Outline", "Assessments", "Resource", "Certificate"].map(
            (tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`py-[14px] font-sans text-[14px] font-medium transition-all relative whitespace-nowrap cursor-pointer ${
                    isActive ? "text-[#0C0C0C] font-semibold" : "text-[#737373] hover:text-black"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0C0C0C]" />
                  )}
                </button>
              );
            }
          )}
        </div>

        {/* Tab Body Section */}
        {activeTab === "Course Info" ? (
          <div className="p-[28px] md:p-[32px] flex flex-col gap-[28px] bg-white">
            {/* About this course */}
            <section className="flex flex-col gap-[10px]">
              <h2 className="font-sans font-bold text-[16px] text-[#0C0C0C]">
                About this course
              </h2>
              <p className="font-sans font-normal text-[16px] leading-[25px] tracking-[0px] text-[#737373]">
                The Cyber Security course provided a comprehensive understanding of protecting computer
                systems, networks, and digital information from cyber threats and unauthorized access.
                The course covered fundamental and advanced concepts, including network security,
                ethical hacking, vulnerability assessment, penetration testing, cryptography, incident
                response, and cloud security. Practical sessions and hands-on labs helped develop
                real-world problem-solving skills using industry-standard tools and techniques.
              </p>
            </section>

            {/* Skill you will gain */}
            <section className="flex flex-col gap-[12px]">
              <h2 className="font-sans font-bold text-[16px] text-[#0C0C0C]">
                Skill you will gain
              </h2>
              <div className="flex flex-wrap gap-[10px]">
                {skillsList.map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#F0F1F3] text-[#000000] font-sans text-[16px] font-medium leading-normal tracking-[0px] px-[16px] py-[8px] rounded-[10px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Syllabus Section */}
            <section className="flex flex-col gap-[16px]">
              <h2 className="font-sans font-bold text-[16px] text-[#0C0C0C]">
                Syllabus
              </h2>

              <div className="flex flex-col gap-[12px] w-full">
                {milestonesData.map((milestone) => {
                  const isExpanded = expandedMilestone === milestone.id;
                  return (
                    <div
                      key={milestone.id}
                      className="border-[0.5px] border-[#B9BEC7] rounded-[12px] bg-[#F0F1F3] overflow-hidden transition-all duration-200"
                    >
                      {/* Accordion Header */}
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedMilestone(isExpanded ? null : milestone.id)
                        }
                        className="w-full flex items-center justify-between px-[18px] py-[14px] text-left cursor-pointer bg-[#F0F1F3] hover:bg-[#E4E5E8] transition-colors"
                      >
                        <div className="flex items-center gap-[10px]">
                          <img
                            src={Icons.folder}
                            alt="Folder"
                            className="w-[18px] h-[18px]"
                          />
                          <span className="font-sans font-medium text-[15px] text-[#000000]">
                            {milestone.title}
                          </span>
                        </div>
                        <img
                          src={Icons.arrow1Black}
                          alt="Toggle"
                          className={`w-[16px] h-[16px] opacity-70 transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Accordion Body */}
                      {isExpanded && (
                        <div className="px-[24px] pb-[28px] pt-[20px] bg-white border-t-[0.5px] border-[#B9BEC7] flex flex-col gap-[20px]">
                          {/* Overview */}
                          <div>
                            <h3 className="font-sans font-bold text-[14px] text-[#0C0C0C] mb-[8px]">
                              Overview
                            </h3>
                            <p className="font-sans font-normal text-[16px] leading-[25px] tracking-[0px] text-[#737373] mb-[12px]">
                              {milestone.overviewParagraph1}
                            </p>
                            <p className="font-sans font-normal text-[16px] leading-[25px] tracking-[0px] text-[#737373]">
                              {milestone.overviewParagraph2}
                            </p>
                          </div>

                          {/* Key Objectives */}
                          <div>
                            <h3 className="font-sans font-bold text-[14px] text-[#0C0C0C] mb-[6px]">
                              Key Objectives
                            </h3>
                            <p className="font-sans font-normal text-[16px] leading-[25px] tracking-[0px] text-[#737373] mb-[10px]">
                              By the end of this milestone, students should be able to :
                            </p>
                            <ul className="flex flex-col gap-[8px] pl-[4px]">
                              {milestone.objectives.map((obj, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-[10px] font-sans font-normal text-[16px] leading-[25px] tracking-[0px] text-[#737373]"
                                >
                                  <span className="w-[6px] h-[6px] rounded-full bg-[#9AD84A] shrink-0 mt-[9px]" />
                                  <span>{obj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        ) : (
          <div className="w-full py-[40px] bg-white flex items-center justify-center text-[#737373] font-medium text-[14px]">
            Content for {activeTab} will be available soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
