import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icons } from "../../assets/icons/icons.js";

const BulletIcon = () => (
  <svg
    className="w-[18px] h-[18px] text-[#4B5563] shrink-0 mt-[3px]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="6" cy="12" r="2.5" strokeWidth="1.8" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8.5 12H19" />
  </svg>
);

const DEFAULT_LAB_STEPS = [
  {
    id: 1,
    taskTitle: "Task 1",
    title: "Connect to the Server",
    subtitle: "Connect to the Server",
    question: "Which port is used for standard SSH connection on this server?",
    correctAnswer: "22",
    instructions: "Establish a secure SSH connection to the target Linux server using your provided credentials.",
    commandHint: "ssh user@lms-server",
    expectedOutput: "Welcome to BLearnLMS Lab Environment",
    hint: "Standard SSH runs on port 22.",
  },
  {
    id: 2,
    taskTitle: "Task 2",
    title: "Identify Current Directory",
    subtitle: "Identify Current Directory",
    question: "What is the current working directory of the user?",
    correctAnswer: "/home/user",
    instructions: "Print your current working directory using 'pwd' and inspect file structure.",
    commandHint: "pwd",
    expectedOutput: "/home/user",
    hint: "Use 'pwd' command to show the current working directory.",
  },
  {
    id: 3,
    taskTitle: "Task 3",
    title: "Inspect running services",
    subtitle: "Inspect running services",
    question: "What web server service is listening on port 80?",
    correctAnswer: "nginx",
    instructions: "Check active network connections and listening TCP/UDP ports using netstat.",
    commandHint: "sudo netstat -tulpn | grep LISTEN",
    expectedOutput: "tcp6 0 0 :::80 :::* LISTEN 1420/nginx",
    hint: "Look for port 80 in netstat output to identify the web server.",
  },
  {
    id: 4,
    taskTitle: "Task 4",
    title: "Secure SSH Configuration",
    subtitle: "Secure SSH Configuration",
    question: "What setting in /etc/ssh/sshd_config disables root login?",
    correctAnswer: "PermitRootLogin no",
    instructions: "Harden /etc/ssh/sshd_config by turning off root login and enforcing public key authentication.",
    commandHint: "cat /etc/ssh/sshd_config | grep PermitRootLogin",
    expectedOutput: "PermitRootLogin no",
    hint: "Set PermitRootLogin no in sshd_config file.",
  },
  {
    id: 5,
    taskTitle: "Task 5",
    title: "Configure firewall",
    subtitle: "Configure firewall",
    question: "What command is used to enable the Uncomplicated Firewall (UFW)?",
    correctAnswer: "sudo ufw enable",
    instructions: "Enable UFW firewall and apply default deny rule for incoming traffic.",
    commandHint: "sudo ufw enable",
    expectedOutput: "Firewall is active and enabled on system startup",
    hint: "Use 'sudo ufw enable' to turn on the firewall.",
  },
];

const LAB_TASKS_DATA = {
  "guided-lab-1-w1-1": {
    title: "Secure Your First Linux Server",
    subtitle: "Milestone 1 • Week 1 • Guided Lab 1",
    durationMinutes: 60,
    xpPoints: 100,
    type: "Guided Lab",
    description: "In this hands-on lab, you will configure essential firewall rules, secure SSH authentication, and analyze server logs to mitigate unauthorized access.",
    steps: DEFAULT_LAB_STEPS,
  },
  default: {
    title: "Linux System Hardening & Defense",
    subtitle: "Milestone 2 • Hands-on Lab Workspace",
    durationMinutes: 60,
    xpPoints: 100,
    type: "Guided Lab",
    description: "Practice key Linux security concepts including firewall management, SSH hardening, user permissions, and security log monitoring.",
    steps: DEFAULT_LAB_STEPS,
  },
};

export const CourseLabWorkspacePage = () => {
  const navigate = useNavigate();
  const { labId, sessionId } = useParams();

  // Load Lab Configuration
  const currentLabKey = labId && LAB_TASKS_DATA[labId] ? labId : "default";
  const labConfig = LAB_TASKS_DATA[currentLabKey] || LAB_TASKS_DATA.default;

  // Left Panel Navigation State
  const [leftTab, setLeftTab] = useState("question"); // 'question' | 'tasks'
  const [completedSteps, setCompletedSteps] = useState([1, 2]); // 2 completed steps (Task 1 & 2 completed, Task 3 in progress)
  const [activeStepIndex, setActiveStepIndex] = useState(2); // Task 3 active / in progress

  // Modals & Theme state
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showEndLabModal, setShowEndLabModal] = useState(false);
  const [confirmKillInput, setConfirmKillInput] = useState("");
  const [activeRightTab, setActiveRightTab] = useState("terminal1"); // 'terminal1' | 'terminal2' | 'browser'
  const [terminalTheme, setTerminalTheme] = useState("dark"); // 'dark' | 'light'
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);

  // Question Answer Form State
  const [userAnswerInput, setUserAnswerInput] = useState("");
  const [answerFeedback, setAnswerFeedback] = useState(null); // { type: 'success'|'error', text: '' }

  // Timer State (60 Minutes default)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(labConfig.durationMinutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Dynamic Progress Calculation
  const totalTasksCount = labConfig.steps.length;
  const completedTasksCount = completedSteps.length;
  const progressPct = Math.round((completedTasksCount / totalTasksCount) * 100);

  // Terminal Interactive State
  const terminalContainerRef = useRef(null);
  const terminalInputRef = useRef(null);
  const [commandInput, setCommandInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    { text: "Welcome to BLearnLMS Lab Environment", type: "welcome" },
    { text: "This Linux server is for educational purposes only.\nAll actions are monitored and logged.", type: "notice" },
    { text: "Last login: Mon May 19 09:12:33 2025 from 10.0.2.15", type: "sys" },
    { type: "prompt", command: "pwd", output: "/home/user" },
    {
      type: "prompt",
      command: "ls -la",
      output: `total 32
drwxr-xr-x 4 user user 4096 May 19 09:10 .
drwxr-xr-x 3 root root 4096 May 19 09:08 ..
-rw------- 1 user user  220 May 19 09:10 .bash_history
-rw-r--r-- 1 user user  377 May 19 09:08 .bash_logout
-rw-r--r-- 1 user user 3526 May 19 09:08 .bashrc
drwx------ 2 user user 4096 May 19 09:08 .cache
drwx------ 3 user user 4096 May 19 09:09 .config
drwxr-xr-x 2 user user 4096 May 19 09:09 documents
drwxr-xr-x 2 user user 4096 May 19 09:09 scripts
-rw-r--r-- 1 user user  807 May 19 09:08 .profile`,
    },
  ]);

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = commandInput.trim();
    if (!cmd) return;

    let output = "";
    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === "clear") {
      setTerminalHistory([]);
      setCommandInput("");
      return;
    } else if (lowerCmd === "help") {
      output = `Available Lab Commands:\n - pwd : Show current working directory\n - ls -la : List all directory contents\n - ssh user@lms-server : Connect to server\n - netstat -tulpn : List active network listening ports\n - cat /etc/ssh/sshd_config : Inspect SSH config\n - clear : Clear terminal screen`;
    } else if (lowerCmd === "pwd") {
      output = `/home/user`;
      if (!completedSteps.includes(1)) setCompletedSteps((prev) => [...prev, 1]);
    } else if (lowerCmd.includes("ls")) {
      output = `total 32\ndrwxr-xr-x 4 user user 4096 May 19 09:10 .\ndrwxr-xr-x 3 root root 4096 May 19 09:08 ..\n-rw------- 1 user user  220 May 19 09:10 .bash_history\n-rw-r--r-- 1 user user  377 May 19 09:08 .bash_logout\n-rw-r--r-- 1 user user 3526 May 19 09:08 .bashrc\ndrwx------ 2 user user 4096 May 19 09:08 .cache\ndrwx------ 3 user user 4096 May 19 09:09 .config\ndrwxr-xr-x 2 user user 4096 May 19 09:09 documents\ndrwxr-xr-x 2 user user 4096 May 19 09:09 scripts\n-rw-r--r-- 1 user user  807 May 19 09:08 .profile`;
    } else if (lowerCmd.includes("netstat") || lowerCmd.includes("ss")) {
      output = `Active Internet connections (only servers)\nProto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name\ntcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1042/sshd\ntcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN      1189/mysqld\ntcp6       0      0 :::80                   :::*                    LISTEN      1420/nginx`;
      if (!completedSteps.includes(3)) setCompletedSteps((prev) => [...prev, 3]);
    } else if (lowerCmd.includes("sshd_config")) {
      output = `# SSH Server Configuration\nPort 22\nPermitRootLogin no\nPasswordAuthentication no`;
      if (!completedSteps.includes(4)) setCompletedSteps((prev) => [...prev, 4]);
    } else if (lowerCmd.includes("ufw")) {
      output = `Status: active\nLogging: on (low)\nDefault: deny (incoming), allow (outgoing)\nTo                         Action      From\n--                         ------      ----\n22/tcp                     ALLOW IN    Anywhere`;
      if (!completedSteps.includes(5)) setCompletedSteps((prev) => [...prev, 5]);
    } else {
      output = `user@lms-server: command not found: ${cmd}. Type 'help' to list commands.`;
    }

    setTerminalHistory((prev) => [
      ...prev,
      { type: "prompt", command: cmd, output },
    ]);
    setCommandInput("");
  };

  const copyToTerminal = (text) => {
    setCommandInput(text);
    terminalInputRef.current?.focus();
  };

  const handleExitLab = () => {
    if (sessionId) {
      navigate(`/courses/session/${sessionId}`);
    } else {
      navigate(-1);
    }
  };

  const activeTask = labConfig.steps[activeStepIndex] || labConfig.steps[0];

  const handleCheckAnswer = () => {
    if (!userAnswerInput.trim()) {
      setAnswerFeedback({ type: "error", text: "Please enter your answer before checking." });
      return;
    }

    const normUser = userAnswerInput.trim().toLowerCase();
    const normCorrect = activeTask.correctAnswer.toLowerCase();

    if (normUser === normCorrect || normUser.includes(normCorrect)) {
      setAnswerFeedback({ type: "success", text: "✔ Correct answer! XP awarded." });
      if (!completedSteps.includes(activeTask.id)) {
        setCompletedSteps((prev) => [...prev, activeTask.id]);
      }
    } else {
      setAnswerFeedback({ type: "error", text: `Incorrect answer. Try again or check the hint.` });
    }
  };

  const handlePrevTask = () => {
    setAnswerFeedback(null);
    setUserAnswerInput("");
    setActiveStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextTask = () => {
    setAnswerFeedback(null);
    setUserAnswerInput("");
    setActiveStepIndex((prev) => Math.min(labConfig.steps.length - 1, prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F0F1F3] font-sans text-black flex flex-col h-screen overflow-hidden">
      {/* 1. Top Header Bar (Matched to User Spec Image) */}
      <header className="bg-[#F0F1F3] px-[24px] md:px-[28px] pt-[14px] pb-[10px] shrink-0">
        <div className="max-w-[1550px] w-full mx-auto flex items-center justify-between gap-[16px]">
          {/* Left Title & Student Metadata */}
          <div className="flex items-center gap-[14px]">
            <h1 className="font-sans font-medium text-[18px] text-[#111827] tracking-tight">
              {labConfig.title}
            </h1>
            
            <span className="text-[#9CA3AF] font-light">|</span>

            <span className="font-sans font-normal text-[18px] text-[#000000]">
              Saravanan
            </span>

            <span className="text-[#9CA3AF] font-light">|</span>

            <span className="font-sans font-normal text-[18px] text-[#000000]">
              727723eucy051
            </span>
          </div>

          {/* Right Timer Pill & End Lab Button */}
          <div className="flex items-center gap-[14px]">
            {/* Timer Badge */}
            <div className="flex items-center gap-[6px] bg-white border-[0.5px] border-[#B9BEC7] px-[16px] py-[6px] rounded-[10px]">
              <img src={Icons.clockFading} alt="Timer" className="w-[16px] h-[16px] object-contain" />
              <span className="font-['Inter'] font-normal text-[16px] text-[#000000]">
                {formatTimer(timeLeftSeconds)}
              </span>
              <span className="font-sans font-normal text-[16px] text-[#737373]">remaining</span>
            </div>

            {/* End Lab Button */}
            <button
              type="button"
              onClick={() => setShowEndLabModal(true)}
              className="bg-white hover:bg-gray-50 border-[0.5px] border-[#B9BEC7] text-[#111827] font-sans font-medium text-[16px] px-[20px] py-[7px] rounded-[10px] transition-colors cursor-pointer"
            >
              End Lab
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Body (Split View) */}
      <main className="flex-1 px-[24px] md:px-[28px] py-[14px] max-w-[1550px] w-full mx-auto flex flex-col lg:flex-row gap-[16px] items-stretch min-h-0 overflow-hidden">
        
        {/* LEFT PANEL: Matched to Left (1).png */}
        <aside className="w-full lg:w-[420px] shrink-0 bg-white rounded-[24px] overflow-hidden flex flex-col h-full border-[0.5px] border-[#B9BEC7] p-[20px] md:p-[24px]">
          
          {/* Header Title: Lab Tasks */}
          <h2 className="font-sans font-semibold text-[20px] text-[#000000] mb-[16px] tracking-tight">
            Lab Tasks
          </h2>

          {/* Question / Tasks Pill Switcher Tab Bar */}
          <div className="bg-[#F0F1F3] rounded-[16px] p-[4px] flex items-center mb-[24px] shrink-0">
            <button
              type="button"
              onClick={() => setLeftTab("question")}
              className={`flex-1 py-[8px] px-[12px] rounded-[12px] font-sans text-[15px] transition-all cursor-pointer flex items-center justify-center gap-[8px] ${
                leftTab === "question"
                  ? "bg-white text-[#000000] font-medium"
                  : "text-[#4B5563] font-normal hover:text-[#000000]"
              }`}
            >
              <img src={Icons.circleQuestionMark || Icons.questionBlack} alt="Question" className="w-[18px] h-[18px] object-contain" />
              <span>Question</span>
            </button>

            <button
              type="button"
              onClick={() => setLeftTab("tasks")}
              className={`flex-1 py-[8px] px-[12px] rounded-[12px] font-sans text-[15px] transition-all cursor-pointer flex items-center justify-center gap-[8px] ${
                leftTab === "tasks"
                  ? "bg-white text-[#000000] font-medium"
                  : "text-[#4B5563] font-normal hover:text-[#000000]"
              }`}
            >
              <img src={Icons.tasks} alt="Tasks" className="w-[18px] h-[18px] object-contain" />
              <span>Tasks</span>
            </button>
          </div>

          {/* TAB 1: QUESTION TAB */}
          {leftTab === "question" ? (
            <div className="flex-1 overflow-y-auto no-scrollbar pr-[6px] flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[8px]">
                <h3 className="font-sans font-normal text-[20px] text-[#000000]">
                  Scenario
                </h3>
                <p className="font-sans font-normal text-[16px] text-[#737373] leading-[26px]">
                  A Linux server used by multiple teams (SOC analysts and penetration testers) has been deployed in the organization.
                </p>
              </div>

              <div className="flex flex-col gap-[10px]">
                <h4 className="font-sans font-normal text-[20px] text-[#000000]">
                  Each user has :
                </h4>
                <ul className="flex flex-col gap-[10px]">
                  <li className="flex items-start gap-[10px] text-[#737373] font-normal text-[16px] leading-[26px]">
                    <BulletIcon />
                    <span>Separate home directories</span>
                  </li>
                  <li className="flex items-start gap-[10px] text-[#737373] font-normal text-[16px] leading-[26px]">
                    <BulletIcon />
                    <span>Specific ownership and group assignments</span>
                  </li>
                  <li className="flex items-start gap-[10px] text-[#737373] font-normal text-[16px] leading-[26px]">
                    <BulletIcon />
                    <span>Controlled access permissions.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-[10px]">
                <h4 className="font-sans font-normal text-[20px] text-[#000000]">
                  Improper understanding of :
                </h4>
                <ul className="flex flex-col gap-[10px]">
                  <li className="flex items-start gap-[10px] text-[#737373] font-normal text-[16px] leading-[26px]">
                    <BulletIcon />
                    <span>UIDs (User IDs)</span>
                  </li>
                  <li className="flex items-start gap-[10px] text-[#737373] font-normal text-[16px] leading-[26px]">
                    <BulletIcon />
                    <span>File ownership</span>
                  </li>
                  <li className="flex items-start gap-[10px] text-[#737373] font-normal text-[16px] leading-[26px]">
                    <BulletIcon />
                    <span>Linux permissions (rwx)</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-[10px]">
                <h4 className="font-sans font-normal text-[20px] text-[#000000]">
                  can lead to :
                </h4>
                <ul className="flex flex-col gap-[10px]">
                  <li className="flex items-start gap-[10px] text-[#737373] font-normal text-[16px] leading-[26px]">
                    <BulletIcon />
                    <span>Unauthorized access</span>
                  </li>
                  <li className="flex items-start gap-[10px] text-[#737373] font-normal text-[16px] leading-[26px]">
                    <BulletIcon />
                    <span>Privilege misuse</span>
                  </li>
                  <li className="flex items-start gap-[10px] text-[#737373] font-normal text-[16px] leading-[26px]">
                    <BulletIcon />
                    <span>Data leakage</span>
                  </li>
                </ul>
              </div>

              <p className="font-sans font-normal text-[16px] text-[#737373] leading-[26px]">
                As a Junior Security Engineer, your task is to analyze the system and understand how Linux access control works.
              </p>

              <div className="flex flex-col gap-[10px]">
                <h4 className="font-sans font-normal text-[20px] text-[#000000]">
                  Your objectives are to :
                </h4>
                <ul className="flex flex-col gap-[10px]">
                  <li className="flex items-start gap-[10px] text-[#737373] font-normal text-[16px] leading-[26px]">
                    <BulletIcon />
                    <span>Identify users and groups</span>
                  </li>
                  <li className="flex items-start gap-[10px] text-[#737373] font-normal text-[16px] leading-[26px]">
                    <BulletIcon />
                    <span>Analyze ownership and permissions</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            /* TAB 2: TASKS TAB (Matched Pixel-Perfect to Spec Image) */
            <div className="flex-1 overflow-y-auto no-scrollbar pr-[4px] flex flex-col gap-[18px]">
              {/* Progress Header & Bar */}
              <div className="flex flex-col gap-[10px] mb-[4px]">
                <div className="flex items-center justify-between font-sans text-[16px] text-[#111827]">
                  <span className="font-normal">{completedTasksCount} of {totalTasksCount} completed</span>
                  <span className="font-semibold">{progressPct} %</span>
                </div>
                
                <div className="w-full h-[10px] bg-[#F0F1F3] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progressPct}%`,
                      background: "linear-gradient(90deg, #D7FFA3 0%, #9AD84A 100%)",
                    }}
                  />
                </div>
              </div>

              {/* Timeline Stepper List */}
              <div className="relative flex flex-col gap-[16px]">
                {labConfig.steps.map((step, idx) => {
                  const isCompleted = completedSteps.includes(step.id);
                  const isInProgress = !isCompleted && activeStepIndex === idx;
                  const isNotStarted = !isCompleted && !isInProgress;

                  return (
                    <div key={step.id} className="relative flex items-start gap-[14px]">
                      {/* Vertical Connecting Line */}
                      {idx < labConfig.steps.length - 1 && (
                        <div
                          className={`absolute left-[12px] top-[33px] h-[calc(100%+16px)] w-[2px] z-0 ${
                            isCompleted ? "bg-[#9AD84A]" : "bg-[#E5E7EB]"
                          }`}
                        />
                      )}

                      {/* Stepper Dot Icon */}
                      <div className="relative z-10 shrink-0 mt-[20px]">
                        {isCompleted ? (
                          <div className="w-[26px] h-[26px] rounded-full bg-[#9AD84A] flex items-center justify-center text-white">
                            <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : isInProgress ? (
                          <div className="w-[26px] h-[26px] rounded-full bg-[#9AD84A]" />
                        ) : (
                          <div className="w-[26px] h-[26px] rounded-full bg-white border border-[#D1D5DB] flex items-center justify-center text-[#6B7280]">
                            <img src={Icons.lockOutlineGray || Icons.lockOutline} alt="Locked" className="w-[13px] h-[13px] object-contain opacity-75" />
                          </div>
                        )}
                      </div>

                      {/* Task Card Box */}
                      <div
                        onClick={() => setActiveStepIndex(idx)}
                        className={`flex-1 bg-white border-[0.5px] rounded-[18px] p-[14px] md:p-[16px] flex flex-col gap-[4px] transition-all cursor-pointer ${
                          activeStepIndex === idx
                            ? "border-[#9AD84A]"
                            : "border-[#B9BEC7] hover:border-[#9AD84A]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-sans font-normal text-[18px] text-[#111827]">
                            {step.taskTitle || `Task ${step.id}`}
                          </h3>

                          {isCompleted && (
                            <span className="bg-[#DCFCE7] text-[#000000] font-sans font-normal text-[12px] px-[12px] py-[3px] rounded-full">
                              Complete
                            </span>
                          )}
                          {isInProgress && (
                            <span className="bg-[#FFEDD5] text-[#000000] font-sans font-normal text-[12px] px-[12px] py-[3px] rounded-full">
                              In Progress
                            </span>
                          )}
                          {isNotStarted && (
                            <span className="bg-[#F0F1F3] text-[#000000] font-sans font-normal text-[12px] px-[12px] py-[3px] rounded-full">
                              Not started
                            </span>
                          )}
                        </div>

                        <p className="font-sans font-normal text-[16px] text-[#737373]">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        {/* RIGHT PANEL: Vertical Scrollable Section for Terminal & Task Question Form */}
        <section className="flex-1 flex flex-col gap-[12px] h-full overflow-y-auto no-scrollbar pb-[16px]">
          
          {/* TOP CONTAINER: Terminal Console View */}
          <div className="bg-white rounded-[24px] border-[0.5px] border-[#B9BEC7] p-[14px] md:p-[16px] flex flex-col shrink-0 min-h-[400px] h-[480px] overflow-hidden">
            
            {/* Top Toolbar Row */}
            <div className="flex items-center justify-between gap-[16px] mb-[8px] shrink-0">
              {/* Left Window Tabs */}
              <div className="flex items-center gap-[8px]">
                <button
                  type="button"
                  onClick={() => setActiveRightTab("terminal1")}
                  className={`px-[14px] py-[6px] rounded-[10px] font-sans text-[12px] font-normal transition-colors cursor-pointer flex items-center gap-[6px] ${
                    activeRightTab === "terminal1"
                      ? "bg-[#F0F1F3] text-[#111827] border border-[#E5E7EB]"
                      : "text-[#6B7280] hover:text-[#111827]"
                  }`}
                >
                  <img src={Icons.terminalSimple || Icons.terminal} alt="Terminal" className="w-[16px] h-[16px] object-contain" />
                  <span>Terminal 1</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRightTab("terminal2")}
                  className={`px-[14px] py-[6px] rounded-[10px] font-sans text-[12px] font-normal transition-colors cursor-pointer flex items-center gap-[6px] ${
                    activeRightTab === "terminal2"
                      ? "bg-[#F0F1F3] text-[#111827] border border-[#E5E7EB]"
                      : "text-[#6B7280] hover:text-[#111827]"
                  }`}
                >
                  <img src={Icons.terminalSimple || Icons.terminal} alt="Terminal" className="w-[16px] h-[16px] object-contain" />
                  <span>Terminal 2</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRightTab("browser")}
                  className={`px-[14px] py-[6px] rounded-[10px] font-sans text-[12px] font-normal transition-colors cursor-pointer flex items-center gap-[6px] ${
                    activeRightTab === "browser"
                      ? "bg-[#F0F1F3] text-[#111827] border border-[#E5E7EB]"
                      : "text-[#6B7280] hover:text-[#111827]"
                  }`}
                >
                  <img src={Icons.chrome} alt="Browser" className="w-[16px] h-[16px] object-contain" />
                  <span>Web Browser</span>
                </button>
              </div>

              {/* Right Controls Group */}
              <div className="flex items-center gap-[10px]">
                {/* Zoom In Button */}
                <button
                  type="button"
                  className="p-[6px] hover:bg-gray-100 rounded-[8px] transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <img src={Icons.zoomIn} alt="Zoom In" className="w-[18px] h-[18px] object-contain" />
                </button>

                {/* Zoom Out Button */}
                <button
                  type="button"
                  className="p-[6px] hover:bg-gray-100 rounded-[8px] transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <img src={Icons.zoomOut} alt="Zoom Out" className="w-[18px] h-[18px] object-contain" />
                </button>

                {/* Expand / Fullscreen Button */}
                <button
                  type="button"
                  className="p-[6px] hover:bg-gray-100 rounded-[8px] transition-colors cursor-pointer"
                  title="Expand"
                >
                  <img src={Icons.expand} alt="Expand" className="w-[18px] h-[18px] object-contain" />
                </button>

                {/* Theme Selector Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowThemeDropdown((prev) => !prev)}
                    className="border-[0.5px] border-[#B9BEC7] bg-white hover:bg-gray-50 text-[#111827] font-sans font-medium text-[13px] px-[12px] py-[5px] rounded-[8px] flex items-center gap-[6px] cursor-pointer"
                  >
                    <span>Theme</span>
                    <svg className="w-[12px] h-[12px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showThemeDropdown && (
                    <div className="absolute right-0 top-[32px] bg-white border border-[#E5E7EB] rounded-[10px] shadow-lg py-[4px] z-50 min-w-[110px]">
                      <button
                        type="button"
                        onClick={() => {
                          setTerminalTheme("dark");
                          setShowThemeDropdown(false);
                        }}
                        className={`w-full text-left px-[12px] py-[6px] text-[13px] hover:bg-gray-100 cursor-pointer ${
                          terminalTheme === "dark" ? "font-semibold text-[#9AD84A]" : "text-[#111827]"
                        }`}
                      >
                        Dark Theme
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTerminalTheme("light");
                          setShowThemeDropdown(false);
                        }}
                        className={`w-full text-left px-[12px] py-[6px] text-[13px] hover:bg-gray-100 cursor-pointer ${
                          terminalTheme === "light" ? "font-semibold text-[#9AD84A]" : "text-[#111827]"
                        }`}
                      >
                        Light Theme
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sub-header Connection Status & Refresh Row */}
            <div className="-mx-[14px] md:-mx-[16px] px-[14px] md:px-[16px] flex items-center justify-between gap-[16px] mb-[10px] pb-[10px] border-b-[0.5px] border-[#B9BEC7] shrink-0">
              <div className="flex items-center gap-[6px] font-sans text-[14px]">
                <span className="text-[#6B7280]">Online :</span>
                <span className="text-[#10B981] font-semibold">Connected</span>
              </div>

              <button
                type="button"
                onClick={() => setTerminalHistory([])}
                className="border-[0.5px] border-[#B9BEC7] bg-white hover:bg-gray-50 text-[#111827] font-sans font-medium text-[13px] px-[14px] py-[5px] rounded-[10px] flex items-center gap-[6px] cursor-pointer transition-colors"
              >
                <img src={Icons.refresh} alt="Refresh" className="w-[14px] h-[14px] object-contain" />
                <span>Refresh</span>
              </button>
            </div>

            {/* Terminal Screen Console (Maximum Height & Fill) */}
            <div
              ref={terminalContainerRef}
              className={`flex-1 min-h-[360px] rounded-[16px] p-[18px] md:p-[20px] font-mono text-[13px] leading-[1.6] overflow-y-auto no-scrollbar flex flex-col justify-start transition-colors ${
                terminalTheme === "dark"
                  ? "bg-[#0C0F12] text-[#E2E8F0]"
                  : "bg-[#F8FAFC] text-[#0F172A]"
              }`}
            >
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="mb-[6px] whitespace-pre-wrap">
                  {item.type === "welcome" ? (
                    <span className="text-[#22C55E] font-semibold">{item.text}</span>
                  ) : item.type === "notice" ? (
                    <span className="text-[#94A3B8]">{item.text}</span>
                  ) : item.type === "sys" ? (
                    <span className="text-[#38BDF8]">{item.text}</span>
                  ) : (
                    <div>
                      <div className="flex items-center gap-[8px]">
                        <span className="text-[#22C55E] font-semibold">user@lms-server:~$</span>
                        <span className="font-semibold text-white">{item.command}</span>
                      </div>
                      {item.output && (
                        <div className="text-[#CBD5E1] mt-[2px] font-mono">
                          {item.output.split('\n').map((line, lIdx) => {
                            if (line.includes('documents') || line.includes('scripts') || line.includes('.cache') || line.includes('.config')) {
                              const parts = line.split(/(\s+)/);
                              return (
                                <div key={lIdx}>
                                  {parts.map((p, pIdx) => {
                                    if (p === 'documents' || p === 'scripts' || p === '.cache' || p === '.config') {
                                      return <span key={pIdx} className="text-[#60A5FA] font-semibold">{p}</span>;
                                    }
                                    return p;
                                  })}
                                </div>
                              );
                            }
                            return <div key={lIdx}>{line}</div>;
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Interactive Terminal Input Form */}
              <form onSubmit={handleCommandSubmit} className="flex items-center gap-[8px] mt-[4px]">
                <span className="text-[#22C55E] font-mono font-semibold shrink-0">user@lms-server:~$</span>
                <input
                  ref={terminalInputRef}
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  className="flex-1 bg-transparent text-white font-mono text-[13px] focus:outline-none placeholder:text-[#475569]"
                  autoFocus
                />
                <span className="w-[8px] h-[16px] bg-[#22C55E] animate-pulse shrink-0" />
              </form>
            </div>
          </div>

          {/* DIVIDER LINE WITH TRIPLE DOTS */}
          <div className="flex items-center justify-center relative my-[-2px] z-10 shrink-0">
            <span className="font-mono text-[#9CA3AF] text-[18px] tracking-widest leading-none bg-[#F0F1F3] px-[8px]">
              •••
            </span>
          </div>

          {/* BOTTOM CONTAINER: Task Question & Answer Form Matched to right11.png */}
          <div className="bg-white rounded-[24px] border-[0.5px] border-[#B9BEC7] p-[16px] md:p-[20px] flex flex-col gap-[12px] shrink-0">
            
            {/* Row 1: Target Icon + Current Task + Question Counter */}
            <div className="flex items-center justify-between gap-[16px] mb-[12px]">
              {/* Left Target Icon + Current Task */}
              <div className="flex items-center gap-[10px]">
                <img src={Icons.challenges} alt="Current Task Target Icon" className="w-[22px] h-[22px] object-contain" />
                <span className="font-sans font-medium text-[16px] text-[#111827]">
                  Current Task
                </span>
              </div>

              {/* Center Task Title */}
              <span className="font-sans font-semibold text-[16px] text-[#111827]">
                {activeTask.taskTitle || `Task ${activeTask.id}`} : {activeTask.subtitle}
              </span>

              {/* Right Question Counter */}
              <span className="font-sans font-medium text-[15px] text-[#111827]">
                Question {activeStepIndex + 1} of {labConfig.steps.length}
              </span>
            </div>

            {/* Row 2: Question Section */}
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-center gap-[8px]">
                <img src={Icons.questionBlack} alt="Question" className="w-[20px] h-[20px] object-contain" />
                <h4 className="font-sans font-medium text-[16px] text-[#111827]">
                  Question {activeStepIndex + 1}
                </h4>
              </div>

              {/* Question Text Card */}
              <div className="bg-[#F0F1F3] rounded-[16px] p-[20px] min-h-[70px] flex items-center">
                <p className="font-sans font-light text-[18px] text-[#111827] leading-[1.5]">
                  {activeTask.question}
                </p>
              </div>
            </div>

            {/* Row 3: Answer Form */}
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-center gap-[8px]">
                <img src={Icons.answerBlack} alt="Write answer" className="w-[18px] h-[18px] object-contain" />
                <h4 className="font-sans font-semibold text-[16px] text-[#111827]">
                  Write the answer
                </h4>
              </div>

              {/* Input Field + Check Answer Button + Hint Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[12px]">
                <input
                  type="text"
                  value={userAnswerInput}
                  onChange={(e) => setUserAnswerInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCheckAnswer()}
                  placeholder="_ _ _ _ _ _ _ _ _ _ _ _"
                  className="flex-1 bg-[#F0F1F3] border-0 rounded-[14px] px-[18px] py-[12px] font-mono text-[15px] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#9AD84A]"
                />

                <button
                  type="button"
                  onClick={handleCheckAnswer}
                  className="bg-[#9AD84A] hover:bg-[#8bc93e] text-white font-sans font-normal text-[16px] px-[24px] py-[12px] rounded-[14px] transition-colors cursor-pointer"
                >
                  Check answer
                </button>

                <button
                  type="button"
                  onClick={() => setShowHintModal(true)}
                  className="border border-[#F97316] text-[#F97316] hover:bg-[#FFF7ED] font-sans font-medium text-[15px] px-[20px] py-[12px] rounded-[14px] transition-colors cursor-pointer flex items-center justify-center gap-[6px]"
                >
                  <img src={Icons.idea} alt="Hint" className="w-[18px] h-[18px] object-contain" />
                  <span>Hint</span>
                </button>
              </div>

              {/* Feedback Message */}
              {answerFeedback && (
                <div
                  className={`mt-[4px] font-sans font-medium text-[14px] px-[12px] py-[6px] rounded-[8px] ${
                    answerFeedback.type === "success"
                      ? "bg-[#DCFCE7] text-[#15803D]"
                      : "bg-[#FEE2E2] text-[#B91C1C]"
                  }`}
                >
                  {answerFeedback.text}
                </div>
              )}
            </div>

            {/* Row 4: Previous & Next Buttons */}
            <div className="flex items-center justify-between pt-[4px]">
              <button
                type="button"
                disabled={activeStepIndex === 0}
                onClick={handlePrevTask}
                className={`border-[0.5px] border-[#B9BEC7] font-sans font-medium text-[15px] px-[22px] py-[10px] rounded-[12px] transition-colors flex items-center gap-[8px] ${
                  activeStepIndex === 0
                    ? "opacity-50 cursor-not-allowed bg-gray-50 text-gray-400"
                    : "bg-white hover:bg-gray-50 text-[#111827] cursor-pointer"
                }`}
              >
                <img src={Icons.previous} alt="Previous" className="w-[8px] h-[12px] object-contain" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                disabled={activeStepIndex === labConfig.steps.length - 1}
                onClick={handleNextTask}
                className={`border-[0.5px] border-[#B9BEC7] font-sans font-medium text-[15px] px-[22px] py-[10px] rounded-[12px] transition-colors flex items-center gap-[8px] ${
                  activeStepIndex === labConfig.steps.length - 1
                    ? "opacity-50 cursor-not-allowed bg-gray-50 text-gray-400"
                    : "bg-white hover:bg-gray-50 text-[#111827] cursor-pointer"
                }`}
              >
                <span>Next</span>
                <img src={Icons.next} alt="Next" className="w-[8px] h-[12px] object-contain" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* HINT MODAL */}
      {showHintModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[20px]">
          <div className="bg-white rounded-[20px] max-w-[480px] w-full p-[24px] flex flex-col gap-[16px] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-[12px]">
              <div className="flex items-center gap-[8px] text-[#F97316]">
                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="font-sans font-semibold text-[18px] text-[#111827]">
                  Task Hint
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHintModal(false)}
                className="text-[#6B7280] hover:text-[#111827] p-[4px] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="font-sans text-[15px] text-[#374151] leading-[1.6]">
              {activeTask.hint}
            </p>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-[12px] rounded-[10px] flex items-center justify-between">
              <code className="font-mono text-[13px] text-[#0F172A]">{activeTask.commandHint}</code>
              <button
                type="button"
                onClick={() => {
                  copyToTerminal(activeTask.commandHint);
                  setShowHintModal(false);
                }}
                className="bg-[#9AD84A] text-white font-sans font-medium text-[12px] px-[10px] py-[4px] rounded-[6px] cursor-pointer"
              >
                Paste Command
              </button>
            </div>

            <div className="flex justify-end pt-[8px]">
              <button
                type="button"
                onClick={() => setShowHintModal(false)}
                className="bg-[#111827] text-white font-sans font-medium text-[14px] px-[18px] py-[8px] rounded-[10px] cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INSTRUCTIONS MODAL */}
      {showInstructionsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[20px]">
          <div className="bg-white rounded-[20px] max-w-[650px] w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-[20px] border-b border-[#E5E7EB] flex items-center justify-between">
              <h3 className="font-sans font-semibold text-[18px] text-[#000000]">
                Lab Environment Rules & Guidelines
              </h3>
              <button
                type="button"
                onClick={() => setShowInstructionsModal(false)}
                className="text-[#6B7280] hover:text-[#111827] p-[4px] cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-[24px] overflow-y-auto flex flex-col gap-[16px] font-sans text-[14px] text-[#374151] leading-[1.6]">
              <p>Welcome to the <strong>{labConfig.title}</strong> interactive workspace!</p>
              <ul className="list-disc pl-[20px] flex flex-col gap-[8px]">
                <li>Complete all required tasks step-by-step using the interactive terminal on the right.</li>
                <li>You can click <em>"Paste to Terminal"</em> on any task step to auto-populate the recommended command.</li>
                <li>Your progress is tracked automatically as you execute server commands.</li>
                <li>Once finished, click <strong>"Submit Lab"</strong> to claim your {labConfig.xpPoints} XP.</li>
              </ul>
            </div>
            <div className="p-[16px] border-t border-[#E5E7EB] bg-gray-50 flex justify-end">
              <button
                type="button"
                onClick={() => setShowInstructionsModal(false)}
                className="bg-[#9AD84A] hover:bg-[#8bc93e] text-white font-sans font-semibold text-[14px] px-[20px] py-[8px] rounded-[10px] cursor-pointer"
              >
                Got it, let's begin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMIT LAB CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-[20px]">
          <div className="bg-white rounded-[24px] max-w-[500px] w-full p-[28px] flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-[64px] h-[64px] rounded-full bg-[#E6F4D7] flex items-center justify-center mb-[16px]">
              <img src={Icons.goldenStar} alt="XP" className="w-[36px] h-[36px]" />
            </div>

            <h3 className="font-sans font-semibold text-[22px] text-[#000000] mb-[8px]">
              Submit Hands-on Lab?
            </h3>
            <p className="font-sans text-[14px] text-[#6B7280] mb-[24px]">
              You have completed <strong>{completedTasksCount} of {totalTasksCount}</strong> tasks ({progressPct}%). Submitting will record your grade and award <strong>{labConfig.xpPoints} XP</strong>.
            </p>

            <div className="flex items-center gap-[12px] w-full">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#374151] font-sans font-medium text-[15px] py-[10px] rounded-[12px] cursor-pointer transition-colors"
              >
                Continue Lab
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitModal(false);
                  setTimeout(() => {
                    handleExitLab();
                  }, 800);
                }}
                className="flex-1 bg-[#9AD84A] hover:bg-[#8bc93e] text-white font-sans font-semibold text-[15px] py-[10px] rounded-[12px] cursor-pointer transition-colors shadow-xs"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* END LAB CONFIRMATION MODAL (Matched Pixel-Perfect to Frame 33857.png) */}
      {showEndLabModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[20px]">
          <div className="bg-white rounded-[10px] max-w-[760px] w-full p-[24px] md:p-[28px] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between -mx-[24px] md:-mx-[28px] px-[24px] md:px-[28px] pb-[16px] mb-[20px] border-b border-[#E5E7EB]">
              <h3 className="font-sans font-semibold text-[20px] text-[#000000]">
                End Lab
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowEndLabModal(false);
                  setConfirmKillInput("");
                }}
                className="text-[#6B7280] hover:text-[#111827] text-[18px] p-[4px] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Description Text */}
            <p className="font-sans font-normal text-[18px] text-[#0F0F0F] leading-[1.5] mb-[20px]">
              Your lab environment will be terminated. Any unsaved work inside the terminal will be permanently lost.
            </p>

            {/* 4-Column Stats Card Box */}
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[16px] grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB] mb-[16px] overflow-hidden">
              {/* Stat 1: Completed Task */}
              <div className="flex flex-col gap-[10px] py-[20px] px-[16px] md:px-[20px]">
                <span className="font-sans font-normal text-[16px] text-[#000000]">
                  Completed Task
                </span>
                <span className="font-sans font-medium text-[25px] text-[#000000]">
                  {completedTasksCount} / {totalTasksCount}
                </span>
              </div>

              {/* Stat 2: Percentage */}
              <div className="flex flex-col gap-[10px] py-[20px] px-[16px] md:px-[20px]">
                <span className="font-sans font-normal text-[16px] text-[#000000]">
                  Percentage
                </span>
                <span className="font-sans font-medium text-[25px] text-[#000000]">
                  {progressPct} %
                </span>
              </div>

              {/* Stat 3: Time Taken */}
              <div className="flex flex-col gap-[10px] py-[20px] px-[16px] md:px-[20px]">
                <span className="font-sans font-normal text-[16px] text-[#000000]">
                  Time Taken
                </span>
                <span className="font-sans font-medium text-[25px] text-[#000000]">
                  10m 23s
                </span>
              </div>

              {/* Stat 4: XP Earned */}
              <div className="flex flex-col gap-[10px] py-[20px] px-[16px] md:px-[20px]">
                <span className="font-sans font-normal text-[16px] text-[#000000]">
                  XP Earned
                </span>
                <span className="font-sans font-medium text-[25px] text-[#000000]">
                  +{completedTasksCount * 20} XP
                </span>
              </div>
            </div>

            {/* Warning Message Line */}
            <div className="flex items-center gap-[8px] mb-[20px]">
              <div className="w-[16px] h-[16px] rounded-full bg-[#FF383C] text-white font-sans font-bold text-[10px] flex items-center justify-center shrink-0">
                i
              </div>
              <span className="font-sans font-light text-[14px] text-[#FF383C]">
                Any unsaved work in the lab environment will be lost.
              </span>
            </div>

            {/* Confirmation Command Prompt */}
            <div className="flex flex-col gap-[10px] mb-[24px]">
              <p className="font-sans font-normal text-[18px] text-[#000000]">
                To confirm mission termination, type: <span className="font-mono font-normal text-[18px] text-[#000000]">" kill "</span>
              </p>

              {/* Terminal Box */}
              <div className="border border-[#E5E7EB] rounded-[14px] overflow-hidden">
                {/* Header Bar */}
                <div className="bg-[#F3F4F6] px-[14px] py-[8px] flex items-center justify-between border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-[6px]">
                    <span className="w-[18px] h-[18px] bg-[#111827] text-white rounded-[4px] font-mono text-[11px] flex items-center justify-center font-bold">
                      &gt;_
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConfirmKillInput("kill")}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    title="Copy command to terminal"
                  >
                    <img src={Icons.copy} alt="Copy" className="w-[16px] h-[16px] object-contain" />
                  </button>
                </div>

                {/* Input Body */}
                <div className="bg-white p-[14px] flex items-center gap-[6px] font-mono font-normal text-[16px]">
                  <span className="text-[#374151] font-normal text-[16px]">username@b-soft: ~ $</span>
                  <input
                    type="text"
                    value={confirmKillInput}
                    onChange={(e) => setConfirmKillInput(e.target.value)}
                    placeholder="kill"
                    className="flex-1 border-0 bg-transparent text-[#111827] focus:outline-none font-mono font-normal text-[16px]"
                    autoFocus
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer Buttons */}
            <div className="flex items-center justify-end gap-[16px] mt-[48px] md:mt-[60px]">
              <button
                type="button"
                onClick={() => {
                  setShowEndLabModal(false);
                  setConfirmKillInput("");
                }}
                className="bg-white hover:bg-gray-50 border border-[#D0D3D9] text-[#111827] font-sans font-medium text-[15px] px-[24px] py-[8px] rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirmKillInput.trim().toLowerCase() === "kill") {
                    setShowEndLabModal(false);
                    handleExitLab();
                  }
                }}
                disabled={confirmKillInput.trim().toLowerCase() !== "kill"}
                className={`font-sans font-medium text-[15px] px-[24px] py-[8px] rounded-full transition-all cursor-pointer ${
                  confirmKillInput.trim().toLowerCase() === "kill"
                    ? "bg-[#9AD84A] hover:bg-[#8bc93e] text-white shadow-xs"
                    : "bg-[#9AD84A]/60 text-white cursor-not-allowed opacity-75"
                }`}
              >
                End Lab
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseLabWorkspacePage;
