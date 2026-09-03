export const CYBER_SECURITY_COURSE_DATA = {
  id: "course-cyber-security",
  title: "Cyber Security Fundamentals",
  assessmentStatus: "not-passed",
  isAssessmentLocked: false,
  totalMilestones: 5,
  totalWeeks: 25,
  totalSections: 50,
  totalGuidedLabs: 100,
  totalUnguidedLabs: 100,
  totalIndividualLabs: 200,
  milestones: [
    {
      id: "m1",
      number: 1,
      title: "Cyber Security Foundations",
      status: "completed",
      weeks: [
        {
          id: "w1-1",
          number: 1,
          title: "Introduction to Cyber Security",
          status: "completed",
          sections: [
            {
              id: "s1-1-1",
              number: 1,
              title: "Introduction to Cyber Security",
              lecture: {
                title: "Study Notes — Introduction to Cyber Security",
                id: "pdf-notes-w1-1-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Cyber Security Fundamentals",
                id: "live-session-w1-1-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w1-1-s1-l1", title: "Lab 1 — Identify Common Cyber Threats", iconKey: "squareTerminal" },
                { id: "gl-w1-1-s1-l2", title: "Lab 2 — Cybersecurity Attack Scenario Analysis", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w1-1-s1-l1", title: "Lab 1 — Threat Identification Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w1-1-s1-l2", title: "Lab 2 — Security Awareness Assessment", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s1-1-2",
              number: 2,
              title: "Cyber Threat Landscape",
              lecture: {
                title: "Study Notes — Cyber Threats and Attack Types",
                id: "pdf-notes-w1-1-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Understanding the Modern Threat Landscape",
                id: "live-session-w1-1-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w1-1-s2-l1", title: "Lab 1 — Classify Cyber Attacks", iconKey: "squareTerminal" },
                { id: "gl-w1-1-s2-l2", title: "Lab 2 — Analyze a Simulated Attack Scenario", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w1-1-s2-l1", title: "Lab 1 — Threat Classification Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w1-1-s2-l2", title: "Lab 2 — Attack Scenario Investigation", iconKey: "squareTerminal" }
              ]
            }
          ],
          recallQuiz: {
            id: "recall-quiz-w1-1",
            title: "Recall Quiz",
            status: "locked",
            questionsCount: 10,
            duration: "15 min",
            xp: 50
          }
        },
        {
          id: "w1-2",
          number: 2,
          title: "Security Principles & Fundamentals",
          status: "completed",
          sections: [
            {
              id: "s1-2-1",
              number: 1,
              title: "CIA Triad & Security Principles",
              lecture: {
                title: "Study Notes — Confidentiality, Integrity & Availability",
                id: "pdf-notes-w1-2-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Core Security Principles",
                id: "live-session-w1-2-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w1-2-s1-l1", title: "Lab 1 — CIA Triad Scenario Analysis", iconKey: "squareTerminal" },
                { id: "gl-w1-2-s1-l2", title: "Lab 2 — Identify Security Violations", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w1-2-s1-l1", title: "Lab 1 — CIA Security Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w1-2-s1-l2", title: "Lab 2 — Security Principle Assessment", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s1-2-2",
              number: 2,
              title: "Authentication & Authorization",
              lecture: {
                title: "Study Notes — Authentication and Authorization",
                id: "pdf-notes-w1-2-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Identity & Access Fundamentals",
                id: "live-session-w1-2-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w1-2-s2-l1", title: "Lab 1 — User Authentication Configuration", iconKey: "squareTerminal" },
                { id: "gl-w1-2-s2-l2", title: "Lab 2 — Role-Based Access Control", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w1-2-s2-l1", title: "Lab 1 — Authentication Security Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w1-2-s2-l2", title: "Lab 2 — Access Control Analysis", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w1-3",
          number: 3,
          title: "Security Policies & Risk Management",
          status: "completed",
          sections: [
            {
              id: "s1-3-1",
              number: 1,
              title: "Cybersecurity Policies",
              lecture: {
                title: "Study Notes — Information Security Policies",
                id: "pdf-notes-w1-3-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Building Effective Security Policies",
                id: "live-session-w1-3-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w1-3-s1-l1", title: "Lab 1 — Create a Basic Security Policy", iconKey: "squareTerminal" },
                { id: "gl-w1-3-s1-l2", title: "Lab 2 — Analyze Policy Violations", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w1-3-s1-l1", title: "Lab 1 — Security Policy Review", iconKey: "squareTerminal" },
                { id: "ugl-w1-3-s1-l2", title: "Lab 2 — Policy Compliance Challenge", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s1-3-2",
              number: 2,
              title: "Risk Assessment",
              lecture: {
                title: "Study Notes — Cybersecurity Risk Management",
                id: "pdf-notes-w1-3-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Identifying and Assessing Security Risks",
                id: "live-session-w1-3-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w1-3-s2-l1", title: "Lab 1 — Identify Security Risks", iconKey: "squareTerminal" },
                { id: "gl-w1-3-s2-l2", title: "Lab 2 — Build a Risk Assessment Matrix", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w1-3-s2-l1", title: "Lab 1 — Risk Classification Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w1-3-s2-l2", title: "Lab 2 — Security Risk Assessment", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w1-4",
          number: 4,
          title: "Linux Fundamentals for Security",
          status: "completed",
          sections: [
            {
              id: "s1-4-1",
              number: 1,
              title: "Linux Fundamentals",
              lecture: {
                title: "Study Notes — Linux Fundamentals",
                id: "pdf-notes-w1-4-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Linux Environment for Cybersecurity",
                id: "live-session-w1-4-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w1-4-s1-l1", title: "Lab 1 — Linux File and Directory Operations", iconKey: "squareTerminal" },
                { id: "gl-w1-4-s1-l2", title: "Lab 2 — Linux User Management", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w1-4-s1-l1", title: "Lab 1 — Linux Command Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w1-4-s1-l2", title: "Lab 2 — Linux Administration Challenge", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s1-4-2",
              number: 2,
              title: "Linux Permissions & Security",
              lecture: {
                title: "Study Notes — Linux Permissions and Ownership",
                id: "pdf-notes-w1-4-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Linux Security Fundamentals",
                id: "live-session-w1-4-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w1-4-s2-l1", title: "Lab 1 — Configure File Permissions", iconKey: "squareTerminal" },
                { id: "gl-w1-4-s2-l2", title: "Lab 2 — Configure User and Group Permissions", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w1-4-s2-l1", title: "Lab 1 — Permission Analysis Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w1-4-s2-l2", title: "Lab 2 — Linux Security Configuration", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w1-5",
          number: 5,
          title: "Security Tools & Cybersecurity Environment",
          status: "completed",
          sections: [
            {
              id: "s1-5-1",
              number: 1,
              title: "Cybersecurity Tools",
              lecture: {
                title: "Study Notes — Introduction to Security Tools",
                id: "pdf-notes-w1-5-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Cybersecurity Toolkit",
                id: "live-session-w1-5-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w1-5-s1-l1", title: "Lab 1 — Explore Security Tools", iconKey: "squareTerminal" },
                { id: "gl-w1-5-s1-l2", title: "Lab 2 — Perform Basic Security Investigation", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w1-5-s1-l1", title: "Lab 1 — Security Tool Identification", iconKey: "squareTerminal" },
                { id: "ugl-w1-5-s1-l2", title: "Lab 2 — Security Tool Investigation", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s1-5-2",
              number: 2,
              title: "Cybersecurity Lab Environment",
              lecture: {
                title: "Study Notes — Cybersecurity Lab Environment",
                id: "pdf-notes-w1-5-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Working Safely in a Security Lab",
                id: "live-session-w1-5-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w1-5-s2-l1", title: "Lab 1 — Launch a Security Lab Environment", iconKey: "squareTerminal" },
                { id: "gl-w1-5-s2-l2", title: "Lab 2 — Explore Attacker and Target Machines", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w1-5-s2-l1", title: "Lab 1 — Lab Environment Investigation", iconKey: "squareTerminal" },
                { id: "ugl-w1-5-s2-l2", title: "Lab 2 — Security Environment Challenge", iconKey: "squareTerminal" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "m2",
      number: 2,
      title: "Networking & System Security",
      status: "in-progress",
      weeks: [
        {
          id: "w2-1",
          number: 1,
          title: "Networking Fundamentals",
          status: "in-progress",
          sections: [
            {
              id: "s2-1-1",
              number: 1,
              title: "Networking Basics",
              lecture: {
                title: "Study Notes — Networking Fundamentals",
                id: "pdf-notes-w2-1-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "How Computer Networks Work",
                id: "live-session-w2-1-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w2-1-s1-l1", title: "Lab 1 — Configure Network Interfaces", iconKey: "squareTerminal" },
                { id: "gl-w2-1-s1-l2", title: "Lab 2 — Test Network Connectivity", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w2-1-s1-l1", title: "Lab 1 — Network Configuration Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w2-1-s1-l2", title: "Lab 2 — Network Troubleshooting", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s2-1-2",
              number: 2,
              title: "IP Addressing & Subnetting",
              lecture: {
                title: "Study Notes — IP Addressing and Subnetting",
                id: "pdf-notes-w2-1-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "IPv4, Subnets and Network Communication",
                id: "live-session-w2-1-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w2-1-s2-l1", title: "Lab 1 — IPv4 Addressing Exercise", iconKey: "squareTerminal" },
                { id: "gl-w2-1-s2-l2", title: "Lab 2 — Subnet Calculation", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w2-1-s2-l1", title: "Lab 1 — Subnetting Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w2-1-s2-l2", title: "Lab 2 — Network Address Analysis", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w2-2",
          number: 2,
          title: "Network Protocols",
          status: "in-progress",
          sections: [
            {
              id: "s2-2-1",
              number: 1,
              title: "TCP/IP Protocols",
              lecture: {
                title: "Study Notes — TCP/IP Model",
                id: "pdf-notes-w2-2-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "TCP/IP Communication",
                id: "live-session-w2-2-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w2-2-s1-l1", title: "Lab 1 — Analyze TCP Connections", iconKey: "squareTerminal" },
                { id: "gl-w2-2-s1-l2", title: "Lab 2 — Explore Network Services", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w2-2-s1-l1", title: "Lab 1 — TCP/IP Investigation", iconKey: "squareTerminal" },
                { id: "ugl-w2-2-s1-l2", title: "Lab 2 — Protocol Analysis Challenge", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s2-2-2",
              number: 2,
              title: "DNS, HTTP & HTTPS",
              lecture: {
                title: "Study Notes — Application Layer Protocols",
                id: "pdf-notes-w2-2-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "DNS, HTTP and HTTPS",
                id: "live-session-w2-2-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w2-2-s2-l1", title: "Lab 1 — Analyze DNS Requests", iconKey: "squareTerminal" },
                { id: "gl-w2-2-s2-l2", title: "Lab 2 — Inspect HTTP/HTTPS Traffic", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w2-2-s2-l1", title: "Lab 1 — DNS Investigation", iconKey: "squareTerminal" },
                { id: "ugl-w2-2-s2-l2", title: "Lab 2 — Web Traffic Analysis", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w2-3",
          number: 3,
          title: "Network Security",
          status: "locked",
          sections: [
            {
              id: "s2-3-1",
              number: 1,
              title: "Firewalls",
              lecture: {
                title: "Study Notes — Firewall Fundamentals",
                id: "pdf-notes-w2-3-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Network Firewall Security",
                id: "live-session-w2-3-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w2-3-s1-l1", title: "Lab 1 — Configure Firewall Rules", iconKey: "squareTerminal" },
                { id: "gl-w2-3-s1-l2", title: "Lab 2 — Test Firewall Policies", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w2-3-s1-l1", title: "Lab 1 — Firewall Configuration Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w2-3-s1-l2", title: "Lab 2 — Firewall Troubleshooting", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s2-3-2",
              number: 2,
              title: "Network Monitoring",
              lecture: {
                title: "Study Notes — Network Monitoring",
                id: "pdf-notes-w2-3-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Monitoring Network Traffic",
                id: "live-session-w2-3-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w2-3-s2-l1", title: "Lab 1 — Capture Network Traffic", iconKey: "squareTerminal" },
                { id: "gl-w2-3-s2-l2", title: "Lab 2 — Analyze Network Packets", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w2-3-s2-l1", title: "Lab 1 — Network Traffic Investigation", iconKey: "squareTerminal" },
                { id: "ugl-w2-3-s2-l2", title: "Lab 2 — Suspicious Traffic Detection", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w2-4",
          number: 4,
          title: "Operating System Security",
          status: "locked",
          sections: [
            {
              id: "s2-4-1",
              number: 1,
              title: "Windows Security",
              lecture: {
                title: "Study Notes — Windows Security Fundamentals",
                id: "pdf-notes-w2-4-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Windows System Security",
                id: "live-session-w2-4-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w2-4-s1-l1", title: "Lab 1 — Windows User and Permission Management", iconKey: "squareTerminal" },
                { id: "gl-w2-4-s1-l2", title: "Lab 2 — Windows Security Configuration", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w2-4-s1-l1", title: "Lab 1 — Windows Security Investigation", iconKey: "squareTerminal" },
                { id: "ugl-w2-4-s1-l2", title: "Lab 2 — Windows Hardening Challenge", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s2-4-2",
              number: 2,
              title: "Linux System Security",
              lecture: {
                title: "Study Notes — Linux System Security",
                id: "pdf-notes-w2-4-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Linux Security and Hardening",
                id: "live-session-w2-4-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w2-4-s2-l1", title: "Lab 1 — Linux Security Configuration", iconKey: "squareTerminal" },
                { id: "gl-w2-4-s2-l2", title: "Lab 2 — Linux System Hardening", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w2-4-s2-l1", title: "Lab 1 — Linux Security Investigation", iconKey: "squareTerminal" },
                { id: "ugl-w2-4-s2-l2", title: "Lab 2 — Linux Hardening Challenge", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w2-5",
          number: 5,
          title: "System Hardening & Monitoring",
          status: "locked",
          sections: [
            {
              id: "s2-5-1",
              number: 1,
              title: "System Hardening",
              lecture: {
                title: "Study Notes — System Hardening",
                id: "pdf-notes-w2-5-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Securing Operating Systems",
                id: "live-session-w2-5-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w2-5-s1-l1", title: "Lab 1 — Harden a Linux System", iconKey: "squareTerminal" },
                { id: "gl-w2-5-s1-l2", title: "Lab 2 — Perform a Security Configuration Audit", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w2-5-s1-l1", title: "Lab 1 — System Hardening Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w2-5-s1-l2", title: "Lab 2 — Configuration Audit Challenge", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s2-5-2",
              number: 2,
              title: "Logs & Security Monitoring",
              lecture: {
                title: "Study Notes — Security Logs and Monitoring",
                id: "pdf-notes-w2-5-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Log Analysis Fundamentals",
                id: "live-session-w2-5-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w2-5-s2-l1", title: "Lab 1 — Analyze System Logs", iconKey: "squareTerminal" },
                { id: "gl-w2-5-s2-l2", title: "Lab 2 — Detect Suspicious Events", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w2-5-s2-l1", title: "Lab 1 — Log Investigation Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w2-5-s2-l2", title: "Lab 2 — Security Event Analysis", iconKey: "squareTerminal" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "m3",
      number: 3,
      title: "Ethical Hacking & Vulnerability Assessment",
      status: "locked",
      weeks: [
        {
          id: "w3-1",
          number: 1,
          title: "Reconnaissance",
          status: "locked",
          sections: [
            {
              id: "s3-1-1",
              number: 1,
              title: "Passive Reconnaissance",
              lecture: {
                title: "Study Notes — Passive Reconnaissance",
                id: "pdf-notes-w3-1-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Information Gathering",
                id: "live-session-w3-1-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w3-1-s1-l1", title: "Lab 1 — Collect Public Information from a Controlled Target", iconKey: "squareTerminal" },
                { id: "gl-w3-1-s1-l2", title: "Lab 2 — Organize Reconnaissance Findings", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w3-1-s1-l1", title: "Lab 1 — Reconnaissance Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w3-1-s1-l2", title: "Lab 2 — Target Information Analysis", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s3-1-2",
              number: 2,
              title: "Active Reconnaissance",
              lecture: {
                title: "Study Notes — Active Reconnaissance",
                id: "pdf-notes-w3-1-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Network Discovery",
                id: "live-session-w3-1-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w3-1-s2-l1", title: "Lab 1 — Discover Hosts in a Lab Network", iconKey: "squareTerminal" },
                { id: "gl-w3-1-s2-l2", title: "Lab 2 — Identify Running Services", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w3-1-s2-l1", title: "Lab 1 — Network Discovery Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w3-1-s2-l2", title: "Lab 2 — Service Enumeration Challenge", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w3-2",
          number: 2,
          title: "Network Scanning & Enumeration",
          status: "locked",
          sections: [
            {
              id: "s3-2-1",
              number: 1,
              title: "Port Scanning",
              lecture: {
                title: "Study Notes — Port Scanning Fundamentals",
                id: "pdf-notes-w3-2-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Network Scanning",
                id: "live-session-w3-2-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w3-2-s1-l1", title: "Lab 1 — Perform Controlled Port Scanning", iconKey: "squareTerminal" },
                { id: "gl-w3-2-s1-l2", title: "Lab 2 — Analyze Scan Results", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w3-2-s1-l1", title: "Lab 1 — Port Scanning Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w3-2-s1-l2", title: "Lab 2 — Network Discovery Challenge", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s3-2-2",
              number: 2,
              title: "Service Enumeration",
              lecture: {
                title: "Study Notes — Service Enumeration",
                id: "pdf-notes-w3-2-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Identifying Network Services",
                id: "live-session-w3-2-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w3-2-s2-l1", title: "Lab 1 — Identify Services on a Lab Target", iconKey: "squareTerminal" },
                { id: "gl-w3-2-s2-l2", title: "Lab 2 — Analyze Service Information", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w3-2-s2-l1", title: "Lab 1 — Service Enumeration Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w3-2-s2-l2", title: "Lab 2 — Target Analysis Challenge", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w3-3",
          number: 3,
          title: "Vulnerability Assessment",
          status: "locked",
          sections: [
            {
              id: "s3-3-1",
              number: 1,
              title: "Vulnerability Identification",
              lecture: {
                title: "Study Notes — Vulnerability Assessment Fundamentals",
                id: "pdf-notes-w3-3-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Identifying Security Vulnerabilities",
                id: "live-session-w3-3-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w3-3-s1-l1", title: "Lab 1 — Scan a Controlled Lab Target", iconKey: "squareTerminal" },
                { id: "gl-w3-3-s1-l2", title: "Lab 2 — Analyze Vulnerability Results", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w3-3-s1-l1", title: "Lab 1 — Vulnerability Assessment Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w3-3-s1-l2", title: "Lab 2 — Vulnerability Classification", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s3-3-2",
              number: 2,
              title: "Vulnerability Prioritization",
              lecture: {
                title: "Study Notes — Vulnerability Severity & Risk",
                id: "pdf-notes-w3-3-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Prioritizing Security Vulnerabilities",
                id: "live-session-w3-3-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w3-3-s2-l1", title: "Lab 1 — Classify Vulnerability Severity", iconKey: "squareTerminal" },
                { id: "gl-w3-3-s2-l2", title: "Lab 2 — Build a Vulnerability Report", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w3-3-s2-l1", title: "Lab 1 — Vulnerability Prioritization Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w3-3-s2-l2", title: "Lab 2 — Security Risk Analysis", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w3-4",
          number: 4,
          title: "Ethical Hacking Fundamentals",
          status: "locked",
          sections: [
            {
              id: "s3-4-1",
              number: 1,
              title: "Ethical Hacking Methodology",
              lecture: {
                title: "Study Notes — Ethical Hacking Methodology",
                id: "pdf-notes-w3-4-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Penetration Testing Lifecycle",
                id: "live-session-w3-4-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w3-4-s1-l1", title: "Lab 1 — Follow a Controlled Security Testing Workflow", iconKey: "squareTerminal" },
                { id: "gl-w3-4-s1-l2", title: "Lab 2 — Document Security Findings", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w3-4-s1-l1", title: "Lab 1 — Ethical Hacking Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w3-4-s1-l2", title: "Lab 2 — Security Assessment Exercise", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s3-4-2",
              number: 2,
              title: "Exploitation Fundamentals",
              lecture: {
                title: "Study Notes — Exploitation Fundamentals",
                id: "pdf-notes-w3-4-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Understanding Controlled Exploitation",
                id: "live-session-w3-4-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w3-4-s2-l1", title: "Lab 1 — Exploit a Deliberately Vulnerable Lab", iconKey: "squareTerminal" },
                { id: "gl-w3-4-s2-l2", title: "Lab 2 — Analyze Exploitation Results", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w3-4-s2-l1", title: "Lab 1 — Controlled Exploitation Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w3-4-s2-l2", title: "Lab 2 — Vulnerability-to-Exploit Analysis", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w3-5",
          number: 5,
          title: "Capture The Flag",
          status: "locked",
          sections: [
            {
              id: "s3-5-1",
              number: 1,
              title: "CTF Fundamentals",
              lecture: {
                title: "Study Notes — Capture The Flag Fundamentals",
                id: "pdf-notes-w3-5-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "CTF Methodology",
                id: "live-session-w3-5-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w3-5-s1-l1", title: "Lab 1 — Beginner CTF Challenge", iconKey: "squareTerminal" },
                { id: "gl-w3-5-s1-l2", title: "Lab 2 — Multi-Step CTF Challenge", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w3-5-s1-l1", title: "Lab 1 — Independent CTF Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w3-5-s1-l2", title: "Lab 2 — Flag Discovery Challenge", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s3-5-2",
              number: 2,
              title: "Security Investigation",
              lecture: {
                title: "Study Notes — Security Investigation Methodology",
                id: "pdf-notes-w3-5-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Solving Realistic Security Challenges",
                id: "live-session-w3-5-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w3-5-s2-l1", title: "Lab 1 — Investigate a Simulated Security Incident", iconKey: "squareTerminal" },
                { id: "gl-w3-5-s2-l2", title: "Lab 2 — Identify the Attack Path", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w3-5-s2-l1", title: "Lab 1 — Security Investigation Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w3-5-s2-l2", title: "Lab 2 — End-to-End CTF Investigation", iconKey: "squareTerminal" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "m4",
      number: 4,
      title: "Web Security & Application Defense",
      status: "locked",
      weeks: [
        {
          id: "w4-1",
          number: 1,
          title: "Web Security Fundamentals",
          status: "locked",
          sections: [
            {
              id: "s4-1-1",
              number: 1,
              title: "Web Application Architecture",
              lecture: {
                title: "Study Notes — Web Application Architecture",
                id: "pdf-notes-w4-1-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "How Web Applications Work",
                id: "live-session-w4-1-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w4-1-s1-l1", title: "Lab 1 — Explore Client-Server Communication", iconKey: "squareTerminal" },
                { id: "gl-w4-1-s1-l2", title: "Lab 2 — Analyze HTTP Requests", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w4-1-s1-l1", title: "Lab 1 — Web Architecture Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w4-1-s1-l2", title: "Lab 2 — HTTP Investigation", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s4-1-2",
              number: 2,
              title: "Web Security Fundamentals",
              lecture: {
                title: "Study Notes — Web Application Security",
                id: "pdf-notes-w4-1-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Common Web Security Risks",
                id: "live-session-w4-1-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w4-1-s2-l1", title: "Lab 1 — Identify Web Security Issues", iconKey: "squareTerminal" },
                { id: "gl-w4-1-s2-l2", title: "Lab 2 — Analyze a Vulnerable Web Application", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w4-1-s2-l1", title: "Lab 1 — Web Security Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w4-1-s2-l2", title: "Lab 2 — Application Security Assessment", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w4-2",
          number: 2,
          title: "Input Validation & Injection",
          status: "locked",
          sections: [
            {
              id: "s4-2-1",
              number: 1,
              title: "Input Validation",
              lecture: {
                title: "Study Notes — Secure Input Validation",
                id: "pdf-notes-w4-2-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Handling Untrusted Input",
                id: "live-session-w4-2-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w4-2-s1-l1", title: "Lab 1 — Implement Input Validation", iconKey: "squareTerminal" },
                { id: "gl-w4-2-s1-l2", title: "Lab 2 — Test Validation Rules", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w4-2-s1-l1", title: "Lab 1 — Input Validation Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w4-2-s1-l2", title: "Lab 2 — Secure Input Assessment", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s4-2-2",
              number: 2,
              title: "SQL Injection",
              lecture: {
                title: "Study Notes — SQL Injection Fundamentals",
                id: "pdf-notes-w4-2-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Understanding SQL Injection",
                id: "live-session-w4-2-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w4-2-s2-l1", title: "Lab 1 — Identify SQL Injection in a Controlled Lab", iconKey: "squareTerminal" },
                { id: "gl-w4-2-s2-l2", title: "Lab 2 — Apply Parameterized Queries", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w4-2-s2-l1", title: "Lab 1 — SQL Injection Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w4-2-s2-l2", title: "Lab 2 — SQL Injection Mitigation Challenge", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w4-3",
          number: 3,
          title: "Cross-Site Scripting & Browser Security",
          status: "locked",
          sections: [
            {
              id: "s4-3-1",
              number: 1,
              title: "Cross-Site Scripting",
              lecture: {
                title: "Study Notes — XSS Fundamentals",
                id: "pdf-notes-w4-3-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Cross-Site Scripting",
                id: "live-session-w4-3-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w4-3-s1-l1", title: "Lab 1 — Identify XSS in a Controlled Application", iconKey: "squareTerminal" },
                { id: "gl-w4-3-s1-l2", title: "Lab 2 — Apply XSS Mitigation", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w4-3-s1-l1", title: "Lab 1 — XSS Detection Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w4-3-s1-l2", title: "Lab 2 — XSS Mitigation Challenge", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s4-3-2",
              number: 2,
              title: "Browser Security",
              lecture: {
                title: "Study Notes — Browser Security Fundamentals",
                id: "pdf-notes-w4-3-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Client-Side Security",
                id: "live-session-w4-3-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w4-3-s2-l1", title: "Lab 1 — Analyze Browser Security Controls", iconKey: "squareTerminal" },
                { id: "gl-w4-3-s2-l2", title: "Lab 2 — Configure Security Headers", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w4-3-s2-l1", title: "Lab 1 — Browser Security Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w4-3-s2-l2", title: "Lab 2 — Security Header Assessment", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w4-4",
          number: 4,
          title: "Authentication & API Security",
          status: "locked",
          sections: [
            {
              id: "s4-4-1",
              number: 1,
              title: "Web Authentication",
              lecture: {
                title: "Study Notes — Secure Web Authentication",
                id: "pdf-notes-w4-4-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Authentication Security",
                id: "live-session-w4-4-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w4-4-s1-l1", title: "Lab 1 — Implement Secure Login", iconKey: "squareTerminal" },
                { id: "gl-w4-4-s1-l2", title: "Lab 2 — Test Authentication Controls", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w4-4-s1-l1", title: "Lab 1 — Authentication Security Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w4-4-s1-l2", title: "Lab 2 — Login Security Assessment", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s4-4-2",
              number: 2,
              title: "API Security",
              lecture: {
                title: "Study Notes — API Security Fundamentals",
                id: "pdf-notes-w4-4-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Securing REST APIs",
                id: "live-session-w4-4-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w4-4-s2-l1", title: "Lab 1 — Test API Authentication", iconKey: "squareTerminal" },
                { id: "gl-w4-4-s2-l2", title: "Lab 2 — Implement API Authorization", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w4-4-s2-l1", title: "Lab 1 — API Security Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w4-4-s2-l2", title: "Lab 2 — API Vulnerability Assessment", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w4-5",
          number: 5,
          title: "Secure Application Development",
          status: "locked",
          sections: [
            {
              id: "s4-5-1",
              number: 1,
              title: "Secure Coding",
              lecture: {
                title: "Study Notes — Secure Coding Principles",
                id: "pdf-notes-w4-5-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Secure Application Development",
                id: "live-session-w4-5-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w4-5-s1-l1", title: "Lab 1 — Identify Insecure Code", iconKey: "squareTerminal" },
                { id: "gl-w4-5-s1-l2", title: "Lab 2 — Fix Security Vulnerabilities", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w4-5-s1-l1", title: "Lab 1 — Secure Coding Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w4-5-s1-l2", title: "Lab 2 — Code Security Review", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s4-5-2",
              number: 2,
              title: "Web Application Security Assessment",
              lecture: {
                title: "Study Notes — Web Security Assessment",
                id: "pdf-notes-w4-5-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Application Security Testing",
                id: "live-session-w4-5-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w4-5-s2-l1", title: "Lab 1 — Perform a Controlled Web Security Assessment", iconKey: "squareTerminal" },
                { id: "gl-w4-5-s2-l2", title: "Lab 2 — Document Security Findings", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w4-5-s2-l1", title: "Lab 1 — Web Security Assessment Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w4-5-s2-l2", title: "Lab 2 — Final Application Security Review", iconKey: "squareTerminal" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "m5",
      number: 5,
      title: "Security Operations & Real World Defense",
      status: "locked",
      weeks: [
        {
          id: "w5-1",
          number: 1,
          title: "Security Operations Center",
          status: "locked",
          sections: [
            {
              id: "s5-1-1",
              number: 1,
              title: "SOC Fundamentals",
              lecture: {
                title: "Study Notes — Security Operations Center",
                id: "pdf-notes-w5-1-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Introduction to SOC Operations",
                id: "live-session-w5-1-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w5-1-s1-l1", title: "Lab 1 — Investigate a Security Alert", iconKey: "squareTerminal" },
                { id: "gl-w5-1-s1-l2", title: "Lab 2 — Analyze Security Events", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w5-1-s1-l1", title: "Lab 1 — SOC Investigation Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w5-1-s1-l2", title: "Lab 2 — Security Alert Analysis", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s5-1-2",
              number: 2,
              title: "Threat Detection",
              lecture: {
                title: "Study Notes — Threat Detection Fundamentals",
                id: "pdf-notes-w5-1-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Detecting Suspicious Activity",
                id: "live-session-w5-1-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w5-1-s2-l1", title: "Lab 1 — Detect Suspicious Network Activity", iconKey: "squareTerminal" },
                { id: "gl-w5-1-s2-l2", title: "Lab 2 — Analyze Security Alerts", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w5-1-s2-l1", title: "Lab 1 — Threat Detection Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w5-1-s2-l2", title: "Lab 2 — Security Investigation Challenge", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w5-2",
          number: 2,
          title: "Incident Response",
          status: "locked",
          sections: [
            {
              id: "s5-2-1",
              number: 1,
              title: "Incident Response Fundamentals",
              lecture: {
                title: "Study Notes — Incident Response Lifecycle",
                id: "pdf-notes-w5-2-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Security Incident Response",
                id: "live-session-w5-2-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w5-2-s1-l1", title: "Lab 1 — Follow an Incident Response Workflow", iconKey: "squareTerminal" },
                { id: "gl-w5-2-s1-l2", title: "Lab 2 — Investigate a Simulated Incident", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w5-2-s1-l1", title: "Lab 1 — Incident Response Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w5-2-s1-l2", title: "Lab 2 — Incident Investigation", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s5-2-2",
              number: 2,
              title: "Incident Documentation",
              lecture: {
                title: "Study Notes — Incident Documentation",
                id: "pdf-notes-w5-2-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Creating an Incident Report",
                id: "live-session-w5-2-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w5-2-s2-l1", title: "Lab 1 — Build an Incident Timeline", iconKey: "squareTerminal" },
                { id: "gl-w5-2-s2-l2", title: "Lab 2 — Create an Incident Report", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w5-2-s2-l1", title: "Lab 1 — Incident Reporting Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w5-2-s2-l2", title: "Lab 2 — Security Incident Documentation", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w5-3",
          number: 3,
          title: "Digital Forensics",
          status: "locked",
          sections: [
            {
              id: "s5-3-1",
              number: 1,
              title: "Digital Forensics Fundamentals",
              lecture: {
                title: "Study Notes — Digital Forensics Fundamentals",
                id: "pdf-notes-w5-3-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Digital Evidence & Investigation",
                id: "live-session-w5-3-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w5-3-s1-l1", title: "Lab 1 — Collect Digital Evidence", iconKey: "squareTerminal" },
                { id: "gl-w5-3-s1-l2", title: "Lab 2 — Analyze Forensic Artifacts", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w5-3-s1-l1", title: "Lab 1 — Forensic Investigation Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w5-3-s1-l2", title: "Lab 2 — Evidence Analysis", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s5-3-2",
              number: 2,
              title: "File & Memory Analysis",
              lecture: {
                title: "Study Notes — File System & Memory Analysis",
                id: "pdf-notes-w5-3-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Forensic Analysis Techniques",
                id: "live-session-w5-3-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w5-3-s2-l1", title: "Lab 1 — Analyze File System Artifacts", iconKey: "squareTerminal" },
                { id: "gl-w5-3-s2-l2", title: "Lab 2 — Perform Basic Memory Analysis", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w5-3-s2-l1", title: "Lab 1 — Forensic Analysis Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w5-3-s2-l2", title: "Lab 2 — Memory Investigation Challenge", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w5-4",
          number: 4,
          title: "Cloud Security",
          status: "locked",
          sections: [
            {
              id: "s5-4-1",
              number: 1,
              title: "Cloud Security Fundamentals",
              lecture: {
                title: "Study Notes — Cloud Security Fundamentals",
                id: "pdf-notes-w5-4-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Securing Cloud Environments",
                id: "live-session-w5-4-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w5-4-s1-l1", title: "Lab 1 — Configure Cloud Access Controls", iconKey: "squareTerminal" },
                { id: "gl-w5-4-s1-l2", title: "Lab 2 — Review Cloud Security Configuration", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w5-4-s1-l1", title: "Lab 1 — Cloud Security Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w5-4-s1-l2", title: "Lab 2 — Cloud Configuration Assessment", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s5-4-2",
              number: 2,
              title: "Cloud Threats & Defense",
              lecture: {
                title: "Study Notes — Cloud Threats and Risks",
                id: "pdf-notes-w5-4-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Cloud Security Defense",
                id: "live-session-w5-4-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w5-4-s2-l1", title: "Lab 1 — Identify Cloud Security Risks", iconKey: "squareTerminal" },
                { id: "gl-w5-4-s2-l2", title: "Lab 2 — Apply Cloud Security Controls", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w5-4-s2-l1", title: "Lab 1 — Cloud Security Investigation", iconKey: "squareTerminal" },
                { id: "ugl-w5-4-s2-l2", title: "Lab 2 — Cloud Defense Challenge", iconKey: "squareTerminal" }
              ]
            }
          ]
        },
        {
          id: "w5-5",
          number: 5,
          title: "Real-World Security Assessment",
          status: "locked",
          sections: [
            {
              id: "s5-5-1",
              number: 1,
              title: "End-to-End Security Assessment",
              lecture: {
                title: "Study Notes — Security Assessment Methodology",
                id: "pdf-notes-w5-5-s1",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Real-World Cybersecurity Assessment",
                id: "live-session-w5-5-s1",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w5-5-s1-l1", title: "Lab 1 — Perform an End-to-End Security Assessment", iconKey: "squareTerminal" },
                { id: "gl-w5-5-s1-l2", title: "Lab 2 — Analyze and Document Findings", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w5-5-s1-l1", title: "Lab 1 — Independent Security Assessment", iconKey: "squareTerminal" },
                { id: "ugl-w5-5-s1-l2", title: "Lab 2 — Security Assessment Challenge", iconKey: "squareTerminal" }
              ]
            },
            {
              id: "s5-5-2",
              number: 2,
              title: "Final Cyber Security Challenge",
              lecture: {
                title: "Study Notes — Final Cybersecurity Challenge",
                id: "pdf-notes-w5-5-s2",
                iconKey: "pdf",
              },
              liveSession: {
                title: "Final Security Challenge Briefing",
                id: "live-session-w5-5-s2",
                recordingText: "Recording: available after the live session for students who missed it.",
                iconKey: "zoomSquare",
              },
              guidedLabs: [
                { id: "gl-w5-5-s2-l1", title: "Lab 1 — Guided Cybersecurity Challenge", iconKey: "squareTerminal" },
                { id: "gl-w5-5-s2-l2", title: "Lab 2 — End-to-End Security Investigation", iconKey: "squareTerminal" }
              ],
              unguidedLabs: [
                { id: "ugl-w5-5-s2-l1", title: "Lab 1 — Final Independent Challenge", iconKey: "squareTerminal" },
                { id: "ugl-w5-5-s2-l2", title: "Lab 2 — Cybersecurity Capstone Challenge", iconKey: "squareTerminal" }
              ]
            }
          ]
        }
      ]
    }
  ]
};
