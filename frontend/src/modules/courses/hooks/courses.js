import { useState } from "react";

const INITIAL_COURSES = [
  {
    id: "cyber-security-fundamentals",
    title: "Cyber Security Fundamentals",
    description: "Master the Core Concepts of cybersecurity and ethical hacking from scratch.",
    level: "Beginner",
    status: "In Progress",
    currentMilestone: 2,
    totalMilestones: 5,
    completedLessons: 17,
    totalLessons: 50,
    completedLabs: 45,
    totalLabs: 200,
    about:
      "The Cyber Security course provided a comprehensive understanding of protecting computer systems, networks, and digital information from cyber threats and unauthorized access. The course covered fundamental and advanced concepts, including network security, ethical hacking, vulnerability assessment, penetration testing, cryptography, incident response, and cloud security. Practical sessions and hands-on labs helped develop real-world problem-solving skills using industry-standard tools and techniques.",
    skills: [
      "Linux",
      "Networking",
      "Web Security",
      "Nmap",
      "Burp Suite",
      "OWASP",
      "Incident Response"
    ],
    tabs: ["Course Info", "Course Outline", "Assessments", "Resource", "Certificate"],
    milestones: [
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
    ]
  }
];

export const useCourses = (initialCourseId) => {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [activeCourseId, setActiveCourseId] = useState(
    initialCourseId || INITIAL_COURSES[0]?.id
  );

  const formattedCourses = courses.map((c) => {
    const progressPercentage = 85;

    return {
      ...c,
      progressPercentage
    };
  });

  const activeCourse =
    formattedCourses.find((c) => c.id === activeCourseId) || formattedCourses[0];

  return {
    courses: formattedCourses,
    activeCourse,
    course: activeCourse,
    setActiveCourseId,
    setCourses
  };
};

export default useCourses;
