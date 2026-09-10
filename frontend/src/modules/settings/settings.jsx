import React, { useState, useRef, useEffect, useMemo } from "react";
import { PhoneInput, defaultCountries, parseCountry } from "react-international-phone";
import "react-international-phone/style.css";
import Flags from "country-flag-icons/react/3x2";
import { Icons } from "../../assets/icons/icons.js";

// Generate full list of all world countries dynamically matching create-profile.jsx
const ALL_COUNTRIES = defaultCountries.map((c) => {
  const parsed = parseCountry(c);
  return {
    label: parsed.name,
    code: parsed.iso2.toUpperCase(),
    flagCode: parsed.iso2.toUpperCase(),
    dialCode: `+${parsed.dialCode}`,
  };
});

// Helper SVG Icons for specific section headers
const GraduationCapIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2.5L1.66663 7.08333L10 11.6667L18.3333 7.08333L10 2.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.16663 8.45837V12.9167C4.16663 12.9167 6.25 15 10 15C13.75 15 15.8333 12.9167 15.8333 12.9167V8.45837" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.3333 7.08337V13.3334" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TargetSkillIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.25" />
    <circle cx="10" cy="10" r="4.167" stroke="currentColor" strokeWidth="1.25" />
    <circle cx="10" cy="10" r="1.25" fill="currentColor" />
  </svg>
);

const RibbonCertIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.25" />
    <path d="M7.5 11.6667L6.25 17.5L10 15.4167L13.75 17.5L12.5 11.6667" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PencilEditIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.3333 2.00004C11.5959 1.73748 11.952 1.59009 12.3233 1.59009C12.6946 1.59009 13.0507 1.73748 13.3133 2.00004C13.5759 2.2626 13.7233 2.61871 13.7233 2.99004C13.7233 3.36137 13.5759 3.71748 13.3133 3.98004L4.98 12.3134L1.66663 13.3334L2.68663 10.02L11.3333 2.00004Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlusIconSvg = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3.33337V12.6667M3.33337 8H12.6667" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ToggleSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
      checked ? "bg-[#9AD84A]" : "bg-gray-300"
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("My Profile");

  // Refs for Date picker, photo upload, and country dropdown outside click
  const dateInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const countryRef = useRef(null);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");

  const [selectedCountry, setSelectedCountry] = useState(
    ALL_COUNTRIES.find((c) => c.code === "IN") || ALL_COUNTRIES[0]
  );

  // Form state for Personal Information
  const [formData, setFormData] = useState({
    name: "Saravanan",
    email: "727723eucy051@skcet.ac.in",
    phone: "",
    dob: "",
    gender: "",
    streetAddress: "",
    city: "",
    state: "",
  });

  // API Backend Simulation State for Profile Data
  const mockProfileData = useMemo(() => ({
    aboutMe: "Passionate about cyber security and eager to learn new skills. Interested in ethical hacking ,network security and building real- world project.",
    education: [
      {
        school: "SRI KRISHNA COLLEGE OF ENGINEERING AND TECHNOLOGY",
        degree: "Bachelor of Engineering (BEng),",
        field: "Computer Science · 2023 - 2027",
        isCurrent: true,
      },
    ],
    skills: ["Cyber Security", "Cyber Security", "Cyber Security", "Cyber Security"],
    certifications: [],
    links: [
      {
        platform: "LinkedIn",
        handle: "/saravanan7598",
        url: "https://linkedin.com/in/saravanan7598",
        type: "linkedin",
      },
      {
        platform: "Github",
        handle: "/saravanan1819",
        url: "https://github.com/saravanan1819",
        type: "github",
      },
    ],
  }), []);

  const [hasProfileData, setHasProfileData] = useState(true);

  // Form states initialized with mock profile data
  const [aboutMeText, setAboutMeText] = useState(mockProfileData.aboutMe);
  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);

  const [educationList, setEducationList] = useState(mockProfileData.education);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [eduInput, setEduInput] = useState({ degree: "", school: "", field: "", year: "" });

  const [skillsList, setSkillsList] = useState(mockProfileData.skills);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const [certificationsList, setCertificationsList] = useState(mockProfileData.certifications);
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [certInput, setCertInput] = useState({ title: "", issuer: "", year: "" });

  const [linksList, setLinksList] = useState(mockProfileData.links);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [linkInput, setLinkInput] = useState({ label: "", url: "" });

  const handleToggleProfileData = (enableData) => {
    setHasProfileData(enableData);
    if (enableData) {
      setAboutMeText(mockProfileData.aboutMe);
      setEducationList(mockProfileData.education);
      setSkillsList(mockProfileData.skills);
      setCertificationsList(mockProfileData.certifications);
      setLinksList(mockProfileData.links);
    } else {
      setAboutMeText("");
      setEducationList([]);
      setSkillsList([]);
      setCertificationsList([]);
      setLinksList([]);
    }
  };

  // Password Visibility States
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Account / Security / Customize / Notifications form states
  const [accountState, setAccountState] = useState({ language: "English (US)", timezone: "Asia/Kolkata (GMT+5:30)" });
  const [securityState, setSecurityState] = useState({ currentPassword: "", newPassword: "", confirmPassword: "", twoFactor: false });
  const [customizeState, setCustomizeState] = useState({ theme: "light", compactMode: false });

  // Notifications Channels & Preferences matching Frame 33874 (3).jpg
  const [notificationChannels, setNotificationChannels] = useState({
    inApp: true,
    email: true,
    sms: false,
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    liveSessionReminders: true,
    liveSessionChanges: true,
    assignmentReminders: true,
    quizReminders: true,
    assessmentReminders: true,
    courseAnnouncements: true,
    courseUpdates: true,
    assessmentResults: true,
    assignmentFeedback: true,
    labResults: true,
    certificateAvailable: true,
    newLogin: true,
    passwordChanged: true,
  });

  // Filtered Countries List for Search
  const filteredCountries = useMemo(() => {
    if (!countrySearchQuery.trim()) return ALL_COUNTRIES;
    const q = countrySearchQuery.toLowerCase();
    return ALL_COUNTRIES.filter(
      (c) => c.label.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [countrySearchQuery]);

  // Close country dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const tabs = [
    { id: "My Profile", label: "My Profile", icon: Icons.myProfile },
    { id: "Account", label: "Account", icon: Icons.accountSetting },
    { id: "Security", label: "Security", icon: Icons.security },
    { id: "Customize", label: "Customize", icon: Icons.dashboardSquareEdit },
    { id: "Notifications", label: "Notifications", icon: Icons.notificationBell },
  ];

  return (
    <div className="w-full max-w-full mx-auto px-1 sm:px-2 md:px-3 pb-16 font-sans text-[#111827] bg-white tracking-normal" style={{ letterSpacing: "0px" }}>
      {/* Hidden file input for avatar photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Header Subtitle */}
      <div className="mb-4">
        <p className="text-[16px] text-[#000000] font-medium leading-relaxed tracking-normal">
          Manage your account, preferences, and learning experience.
        </p>
      </div>

      {/* Top Tab Bar Navigation */}
      <div className="mb-8 overflow-x-auto no-scrollbar">
        <div className="inline-flex items-center space-x-6 min-w-max border-b border-[#B9BEC7] pr-5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 border-b-2 font-medium text-[14px] transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-[#9AD84A] text-[#111827]"
                    : "border-transparent text-[#6B7280] hover:text-[#111827] hover:border-gray-300"
                }`}
              >
                {IconComponent && (
                  <img
                    src={IconComponent}
                    alt={tab.label}
                    className="w-5 h-5"
                  />
                )}
                <span className="tracking-normal" style={{ letterSpacing: "0px" }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT 1: MY PROFILE */}
      {activeTab === "My Profile" && (
        <div className="space-y-6 w-full">
          {/* User Profile Header Banner */}
          <div className="flex items-center space-x-4 py-2">
            {/* Avatar Circle Container matching create-profile.jsx */}
            <div className="relative w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] shrink-0">
              <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden" style={{ borderRadius: "9999px" }}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile Preview" className="w-full h-full object-cover rounded-full" style={{ borderRadius: "9999px" }} />
                ) : (
                  <img src={Icons.avatarProfile} alt="Profile Avatar" className="w-full h-full object-cover rounded-full" style={{ borderRadius: "9999px" }} />
                )}
              </div>
              
              {/* Plus Badge Overlay Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] rounded-full bg-[#9AD84A] hover:bg-[#8EC63F] text-white flex items-center justify-center shadow-xs border-2 border-white cursor-pointer transition-transform hover:scale-105"
                title="Upload Photo"
              >
                <span className="text-[14px] font-medium leading-none">+</span>
              </button>
            </div>

            {/* Name, Bsoft ID & Email */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                <h1 className="text-[20px] sm:text-[22px] font-semibold text-[#111827] tracking-normal">
                  Saravanan S
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-[5px] text-[12px] font-medium bg-[#F3F4F6] text-[#374151] border border-[#B9BEC7]">
                  Bsoft ID : BS204RTW
                </span>
              </div>
              <p className="text-[14px] text-[#6B7280] mt-0.5 font-normal tracking-normal">
                727723eucy051@skcet.ac.in
              </p>
            </div>
          </div>

          {/* 1. Personal Information Card */}
          <div className="border border-[#B9BEC7] rounded-[16px] bg-white shadow-xs relative z-20">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#B9BEC7] bg-white rounded-t-[16px]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-[#B9BEC7] bg-white flex items-center justify-center text-gray-700">
                  {Icons.user ? (
                    <img src={Icons.user} alt="Personal Information" className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">👤</span>
                  )}
                </div>
                <h2 className="text-[16px] font-medium text-[#111827] tracking-normal">
                  Personal Information
                </h2>
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-full border border-[#9AD84A] bg-[#F4FCE3] flex items-center justify-center text-[#9AD84A] hover:bg-[#E2F5BE] hover:border-[#8EC63F] hover:scale-105 transition-all shadow-xs cursor-pointer group"
                title="Edit Personal Information"
              >
                <img src={Icons.pen} alt="Edit" className="w-4 h-4 transition-transform group-hover:scale-110" />
              </button>
            </div>

            {/* Body Form Grid matching design layout */}
            <div className="p-6 space-y-5">
              {/* Row 1: Name & Email Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* Name */}
                <div>
                  <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Saravanan"
                    className="w-full px-4 py-2.5 rounded-[12px] border border-[#B9BEC7] text-[#111827] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-[#F0F1F3] focus:bg-white transition-colors h-[46px] tracking-normal"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="727723eucy051@skcet.ac.in"
                    className="w-full px-4 py-2.5 rounded-[12px] border border-[#B9BEC7] text-[#111827] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-[#F0F1F3] focus:bg-white transition-colors h-[46px] tracking-normal"
                  />
                </div>
              </div>

              {/* Row 2: Phone Number, Date of Birth, and Gender (3 Columns on one line) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                {/* Phone Number with Synced Country Flag & Code */}
                <div>
                  <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                    Phone Number
                  </label>
                  <div className="flex items-center rounded-[12px] border border-[#B9BEC7] bg-[#F0F1F3] h-[46px] overflow-hidden focus-within:border-[#9AD84A] focus-within:bg-white transition-colors relative">
                    <div className="flex items-center gap-2 h-full border-r border-[#B9BEC7] px-3 bg-transparent shrink-0 select-none">
                      {Flags[selectedCountry.flagCode] && (
                        React.createElement(Flags[selectedCountry.flagCode], { className: "w-5 h-3.5 rounded-[2px] shadow-xs object-cover" })
                      )}
                      <span className="font-medium text-[14px] text-[#111827] tracking-normal">{selectedCountry.dialCode}</span>
                    </div>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full px-3 h-full text-[#111827] placeholder:text-[#9CA3AF] text-[14px] focus:outline-none bg-transparent tracking-normal"
                    />
                  </div>
                </div>

                {/* Date of Birth Picker */}
                <div>
                  <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                    Date of Birth
                  </label>
                  <div 
                    onClick={handleCalendarClick}
                    className="relative flex items-center cursor-pointer h-[46px]"
                  >
                    <input
                      ref={dateInputRef}
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      placeholder="yyyy-mm-dd"
                      className="w-full px-4 py-2.5 pr-10 rounded-[12px] border border-[#B9BEC7] text-[#111827] placeholder:text-[#9CA3AF] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-[#F0F1F3] focus:bg-white cursor-pointer transition-colors h-[46px] tracking-normal [&::-webkit-calendar-picker-indicator]:hidden"
                    />
                    <img
                      src={Icons.calendarDropdown}
                      alt="Calendar"
                      className="w-5 h-5 absolute right-3.5 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Gender Dropdown */}
                <div>
                  <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full appearance-none px-4 py-2.5 rounded-[12px] border border-[#B9BEC7] text-[#111827] text-[14px] bg-[#F0F1F3] focus:bg-white focus:outline-none focus:border-[#9AD84A] transition-colors h-[46px] tracking-normal pr-10 cursor-pointer"
                    >
                      <option value="">No select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Country & Street Address (2 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* Custom Searchable Country Dropdown */}
                <div>
                  <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                    Country
                  </label>
                  <div className="relative z-30" ref={countryRef}>
                    <button
                      type="button"
                      onClick={() => setIsCountryOpen((prev) => !prev)}
                      className="w-full px-4 py-2.5 rounded-[12px] border border-[#B9BEC7] text-[#111827] text-[14px] bg-[#F0F1F3] flex items-center justify-between hover:border-gray-400 focus:outline-none focus:border-[#9AD84A] transition-colors cursor-pointer h-[46px] tracking-normal"
                    >
                      <span className="flex items-center gap-2 font-normal text-[#111827] tracking-normal truncate">
                        {Flags[selectedCountry.flagCode] && (
                          React.createElement(Flags[selectedCountry.flagCode], { className: "w-5 h-3.5 rounded-[2px] shadow-xs object-cover shrink-0" })
                        )}
                        <span className="truncate">{selectedCountry.label}</span>
                      </span>
                      <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${isCountryOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Country Dropdown List Menu */}
                    {isCountryOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#B9BEC7] rounded-xl shadow-xl z-50 py-2 max-h-[260px] flex flex-col animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 pb-2 border-b border-[#F3F4F6]">
                          <input
                            type="text"
                            value={countrySearchQuery}
                            onChange={(e) => setCountrySearchQuery(e.target.value)}
                            placeholder="Search country..."
                            className="w-full px-2.5 py-1.5 text-[13px] border border-[#B9BEC7] rounded-lg focus:outline-none focus:border-[#9AD84A] bg-[#F9FAFB]"
                            autoFocus
                          />
                        </div>
                        <div className="overflow-y-auto no-scrollbar max-h-[200px] py-1">
                          {filteredCountries.length === 0 ? (
                            <div className="px-4 py-2 text-[13px] text-[#9CA3AF] text-center">No countries found</div>
                          ) : (
                            filteredCountries.map((option, idx) => {
                              const OptionFlag = Flags[option.flagCode];
                              return (
                                <button
                                  key={`${option.code}-${idx}`}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(option);
                                    setIsCountryOpen(false);
                                    setCountrySearchQuery("");
                                  }}
                                  className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-[13.5px] hover:bg-[#F9FAFB] transition-colors cursor-pointer tracking-normal ${
                                    selectedCountry.code === option.code ? "bg-[#F3F4F6] font-semibold text-[#111827]" : "text-gray-700"
                                  }`}
                                >
                                  <span className="flex items-center gap-2.5 truncate pr-2">
                                    {OptionFlag ? (
                                      <OptionFlag className="w-4.5 h-3 rounded-[2px] shadow-xs object-cover shrink-0" />
                                    ) : (
                                      <span className="w-4.5 h-3 bg-gray-200 rounded-[2px] shrink-0" />
                                    )}
                                    <span className="truncate">{option.label}</span>
                                  </span>
                                  {selectedCountry.code === option.code && (
                                    <span className="text-[#9AD84A] font-bold text-[13px] shrink-0">✓</span>
                                  )}
                                </button>
                              );
                            })
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    placeholder="Enter street address"
                    className="w-full px-4 py-2.5 rounded-[12px] border border-[#B9BEC7] text-[#111827] placeholder:text-[#9CA3AF] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-[#F0F1F3] focus:bg-white transition-colors h-[46px] tracking-normal"
                  />
                </div>
              </div>

              {/* Row 4: City & State (2 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* City */}
                <div>
                  <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter City"
                    className="w-full px-4 py-2.5 rounded-[12px] border border-[#B9BEC7] text-[#111827] placeholder:text-[#9CA3AF] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-[#F0F1F3] focus:bg-white transition-colors h-[46px] tracking-normal"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter State"
                    className="w-full px-4 py-2.5 rounded-[12px] border border-[#B9BEC7] text-[#111827] placeholder:text-[#9CA3AF] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-[#F0F1F3] focus:bg-white transition-colors h-[46px] tracking-normal"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Data State Switcher (API Backend Simulation) */}
          <div className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#B9BEC7] rounded-[12px] flex flex-wrap items-center justify-between gap-2 my-2">
            <span className="font-sans font-medium text-[13px] text-[#374151]">
              Profile Data State Switcher (API Backend Simulation):
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggleProfileData(true)}
                className={`px-3 py-1 rounded-[6px] font-sans text-[12px] font-medium transition-colors cursor-pointer ${
                  hasProfileData ? "bg-[#9AD84A] text-white" : "bg-white border border-[#B9BEC7] text-[#4B5563]"
                }`}
              >
                With Data
              </button>
              <button
                type="button"
                onClick={() => handleToggleProfileData(false)}
                className={`px-3 py-1 rounded-[6px] font-sans text-[12px] font-medium transition-colors cursor-pointer ${
                  !hasProfileData ? "bg-[#9AD84A] text-white" : "bg-white border border-[#B9BEC7] text-[#4B5563]"
                }`}
              >
                Empty Profile
              </button>
            </div>
          </div>

          {/* 2. About me Card */}
          <div className="border border-[#B9BEC7] rounded-[16px] bg-white shadow-xs overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#B9BEC7]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-[#B9BEC7] bg-white flex items-center justify-center text-gray-700">
                  {Icons.emoji ? (
                    <img src={Icons.emoji} alt="About me" className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">😊</span>
                  )}
                </div>
                <h2 className="text-[16px] font-medium text-[#111827] tracking-normal">About me</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingAboutMe(!isEditingAboutMe)}
                className="w-8 h-8 rounded-full border border-[#9AD84A] bg-[#F4FCE3] flex items-center justify-center text-[#9AD84A] hover:bg-[#E2F5BE] hover:border-[#8EC63F] hover:scale-105 transition-all shadow-xs cursor-pointer"
                title="Add About me"
              >
                <PlusIconSvg className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {isEditingAboutMe ? (
                <div className="space-y-4 max-w-lg mx-auto text-left">
                  <textarea
                    rows={4}
                    value={aboutMeText}
                    onChange={(e) => setAboutMeText(e.target.value)}
                    placeholder="Write a brief bio about your learning goals and interests..."
                    className="w-full p-3 bg-white border border-[#B9BEC7] rounded-[12px] text-sm text-[#111827] focus:outline-none focus:border-[#9AD84A]"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingAboutMe(false)}
                      className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingAboutMe(false)}
                      className="px-4 py-2 text-xs font-medium text-white bg-[#9AD84A] hover:bg-[#8EC63F] rounded-lg cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : aboutMeText ? (
                <p className="text-[14px] text-[#111827] leading-relaxed font-normal">
                  {aboutMeText}
                </p>
              ) : (
                <div className="text-center py-4">
                  <p className="text-[16px] text-[#000000] max-w-md mx-auto leading-relaxed mb-3 font-medium tracking-normal" style={{ letterSpacing: "0px" }}>
                    Share your interests learning goals and what you are passionate about.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsEditingAboutMe(true)}
                    className="text-[16px] font-medium text-[#9AD84A] hover:text-[#8EC63F] transition-colors cursor-pointer tracking-normal"
                    style={{ letterSpacing: "0px" }}
                  >
                    Add About me
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 3. Education Card */}
          <div className="border border-[#B9BEC7] rounded-[16px] bg-white shadow-xs overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#B9BEC7]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-[#B9BEC7] bg-white flex items-center justify-center text-gray-700">
                  <img src={Icons.settingsStudent} alt="Education" className="w-5 h-5" />
                </div>
                <h2 className="text-[16px] font-medium text-[#111827] tracking-normal">Education</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingEducation(!isAddingEducation)}
                className="w-8 h-8 rounded-full border border-[#9AD84A] bg-[#F4FCE3] flex items-center justify-center text-[#9AD84A] hover:bg-[#E2F5BE] hover:border-[#8EC63F] hover:scale-105 transition-all shadow-xs cursor-pointer"
                title="Add Education"
              >
                <PlusIconSvg className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {isAddingEducation ? (
                <div className="space-y-4 max-w-md mx-auto text-left bg-gray-50 p-4 rounded-[12px] border border-[#B9BEC7]">
                  <div>
                    <label className="block text-xs font-medium text-[#111827] mb-1">Degree / Course</label>
                    <input
                      type="text"
                      placeholder="e.g. Bachelor of Engineering (BEng),"
                      value={eduInput.degree}
                      onChange={(e) => setEduInput({ ...eduInput, degree: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#B9BEC7] rounded-lg text-sm focus:outline-none focus:border-[#9AD84A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#111827] mb-1">School / Institution</label>
                    <input
                      type="text"
                      placeholder="e.g. SRI KRISHNA COLLEGE OF ENGINEERING AND TECHNOLOGY"
                      value={eduInput.school}
                      onChange={(e) => setEduInput({ ...eduInput, school: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#B9BEC7] rounded-lg text-sm focus:outline-none focus:border-[#9AD84A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#111827] mb-1">Field / Dates</label>
                    <input
                      type="text"
                      placeholder="e.g. Computer Science · 2023 - 2027"
                      value={eduInput.field || ""}
                      onChange={(e) => setEduInput({ ...eduInput, field: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#B9BEC7] rounded-lg text-sm focus:outline-none focus:border-[#9AD84A]"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingEducation(false)}
                      className="px-3 py-1.5 text-xs text-gray-600 bg-gray-200 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (eduInput.school || eduInput.degree) {
                          setEducationList([...educationList, { ...eduInput, isCurrent: true }]);
                          setEduInput({ degree: "", school: "", field: "", year: "" });
                          setIsAddingEducation(false);
                        }
                      }}
                      className="px-3 py-1.5 text-xs text-white bg-[#9AD84A] hover:bg-[#8EC63F] rounded-lg cursor-pointer"
                    >
                      Save Education
                    </button>
                  </div>
                </div>
              ) : educationList.length > 0 ? (
                <div className="space-y-4 text-left">
                  {educationList.map((edu, idx) => (
                    <div key={idx} className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2.5">
                          <h3 className="text-[15px] font-semibold text-[#111827] tracking-normal uppercase" style={{ letterSpacing: "0px" }}>
                            {edu.school}
                          </h3>
                          {edu.isCurrent && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-[5px] text-[11px] font-medium bg-[#9AD84A] text-white">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-[14px] text-[#374151] font-normal">{edu.degree}</p>
                        <p className="text-[13px] text-[#6B7280] font-normal">{edu.field}</p>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full border border-[#9AD84A] bg-[#F4FCE3] flex items-center justify-center text-[#9AD84A] hover:bg-[#E2F5BE] hover:border-[#8EC63F] hover:scale-105 transition-all shadow-xs cursor-pointer"
                          title="Edit Education"
                        >
                          <img src={Icons.pen} alt="Edit" className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEducationList(educationList.filter((_, i) => i !== idx))}
                          className="w-8 h-8 rounded-full border border-[#9AD84A] bg-[#F4FCE3] flex items-center justify-center text-[#9AD84A] hover:bg-[#E2F5BE] hover:border-[#8EC63F] hover:scale-105 transition-all shadow-xs cursor-pointer"
                          title="Delete Education"
                        >
                          <svg className="w-3.5 h-3.5 text-[#9AD84A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-[16px] text-[#000000] max-w-md mx-auto leading-relaxed mb-3 font-medium tracking-normal" style={{ letterSpacing: "0px" }}>
                    Add your educational background to showcase your learning journey.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsAddingEducation(true)}
                    className="text-[16px] font-medium text-[#9AD84A] hover:text-[#8EC63F] transition-colors cursor-pointer tracking-normal"
                    style={{ letterSpacing: "0px" }}
                  >
                    Add education
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 4. Skills Card */}
          <div className="border border-[#B9BEC7] rounded-[16px] bg-white shadow-xs overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#B9BEC7]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-[#B9BEC7] bg-white flex items-center justify-center text-gray-700">
                  <img src={Icons.settingsSkills} alt="Skills" className="w-5 h-5" />
                </div>
                <h2 className="text-[16px] font-medium text-[#111827] tracking-normal">SKill</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingSkills(!isEditingSkills)}
                className="w-8 h-8 rounded-full border border-[#9AD84A] bg-[#F4FCE3] flex items-center justify-center text-[#9AD84A] hover:bg-[#E2F5BE] hover:border-[#8EC63F] hover:scale-105 transition-all shadow-xs cursor-pointer group"
                title="Edit Skills"
              >
                <img src={Icons.pen} alt="Edit" className="w-4 h-4 transition-transform group-hover:scale-110" />
              </button>
            </div>

            <div className="p-6">
              {isEditingSkills ? (
                <div className="space-y-4 max-w-md mx-auto text-left">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter skill (e.g. Cyber Security)"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      className="flex-1 p-2.5 bg-white border border-[#B9BEC7] rounded-[12px] text-sm focus:outline-none focus:border-[#9AD84A]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (skillInput.trim()) {
                          setSkillsList([...skillsList, skillInput.trim()]);
                          setSkillInput("");
                        }
                      }}
                      className="px-4 py-2.5 text-xs text-white bg-[#9AD84A] hover:bg-[#8EC63F] rounded-[12px] font-medium cursor-pointer"
                    >
                      Add
                    </button>
                  </div>

                  {skillsList.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {skillsList.map((skill, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1 bg-[#F4FCE3] text-[#4D7C0F] border border-lime-200 rounded-full text-xs font-medium">
                          {skill}
                          <button
                            type="button"
                            onClick={() => setSkillsList(skillsList.filter((_, index) => index !== i))}
                            className="ml-1.5 text-lime-700 hover:text-red-500 cursor-pointer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingSkills(false)}
                      className="px-4 py-2 text-xs font-medium text-white bg-[#9AD84A] hover:bg-[#8EC63F] rounded-lg cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : skillsList.length > 0 ? (
                <div className="flex flex-wrap gap-3 text-left">
                  {skillsList.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-4 py-2 bg-[#F0F1F3] text-[#111827] border border-[#B9BEC7] rounded-[8px] text-[14px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-[16px] text-[#000000] max-w-md mx-auto leading-relaxed mb-3 font-medium tracking-normal" style={{ letterSpacing: "0px" }}>
                    Add the skills you're learning or have experience with.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsEditingSkills(true)}
                    className="text-[16px] font-medium text-[#9AD84A] hover:text-[#8EC63F] transition-colors cursor-pointer tracking-normal"
                    style={{ letterSpacing: "0px" }}
                  >
                    Add Skill
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 5. Certifications Card */}
          <div className="border border-[#B9BEC7] rounded-[16px] bg-white shadow-xs overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#B9BEC7]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-[#B9BEC7] bg-white flex items-center justify-center text-gray-700">
                  <img src={Icons.settingsCertificate} alt="Certifications" className="w-5 h-5" />
                </div>
                <h2 className="text-[16px] font-medium text-[#111827] tracking-normal">Certifications</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingCert(!isAddingCert)}
                className="w-8 h-8 rounded-full border border-[#9AD84A] bg-[#F4FCE3] flex items-center justify-center text-[#9AD84A] hover:bg-[#E2F5BE] hover:border-[#8EC63F] hover:scale-105 transition-all shadow-xs cursor-pointer"
                title="Add Certification"
              >
                <PlusIconSvg className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {isAddingCert ? (
                <div className="space-y-4 max-w-md mx-auto text-left bg-gray-50 p-4 rounded-[12px] border border-[#B9BEC7]">
                  <div>
                    <label className="block text-xs font-medium text-[#111827] mb-1">Certification Name</label>
                    <input
                      type="text"
                      placeholder="e.g. AWS Certified Solutions Architect"
                      value={certInput.title}
                      onChange={(e) => setCertInput({ ...certInput, title: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#B9BEC7] rounded-lg text-sm focus:outline-none focus:border-[#9AD84A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#111827] mb-1">Issuing Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Amazon Web Services"
                      value={certInput.issuer}
                      onChange={(e) => setCertInput({ ...certInput, issuer: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#B9BEC7] rounded-lg text-sm focus:outline-none focus:border-[#9AD84A]"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingCert(false)}
                      className="px-3 py-1.5 text-xs text-gray-600 bg-gray-200 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (certInput.title) {
                          setCertificationsList([...certificationsList, certInput]);
                          setCertInput({ title: "", issuer: "", year: "" });
                          setIsAddingCert(false);
                        }
                      }}
                      className="px-3 py-1.5 text-xs text-white bg-[#9AD84A] hover:bg-[#8EC63F] rounded-lg cursor-pointer"
                    >
                      Save Certification
                    </button>
                  </div>
                </div>
              ) : certificationsList.length > 0 ? (
                <div className="space-y-3 text-left max-w-xl mx-auto">
                  {certificationsList.map((cert, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-[#B9BEC7] flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-sm text-[#111827]">{cert.title}</h4>
                        <p className="text-xs text-[#6B7280]">{cert.issuer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-[16px] text-[#000000] max-w-md mx-auto leading-relaxed mb-3 font-medium tracking-normal" style={{ letterSpacing: "0px" }}>
                    Showcase your professional certifications and achievements.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsAddingCert(true)}
                    className="text-[16px] font-medium text-[#9AD84A] hover:text-[#8EC63F] transition-colors cursor-pointer tracking-normal"
                    style={{ letterSpacing: "0px" }}
                  >
                    Add certification
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 6. Professional Links Card */}
          <div className="border border-[#B9BEC7] rounded-[16px] bg-white shadow-xs overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#B9BEC7]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-[#B9BEC7] bg-white flex items-center justify-center text-gray-700">
                  <img src={Icons.settingsLinks} alt="Professional Links" className="w-5 h-5" />
                </div>
                <h2 className="text-[16px] font-medium text-[#111827] tracking-normal">Professional Links</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingLink(!isAddingLink)}
                className="w-8 h-8 rounded-full border border-[#9AD84A] bg-[#F4FCE3] flex items-center justify-center text-[#9AD84A] hover:bg-[#E2F5BE] hover:border-[#8EC63F] hover:scale-105 transition-all shadow-xs cursor-pointer"
                title="Add Links"
              >
                <PlusIconSvg className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {isAddingLink ? (
                <div className="space-y-4 max-w-md mx-auto text-left bg-gray-50 p-4 rounded-[12px] border border-[#B9BEC7]">
                  <div>
                    <label className="block text-xs font-medium text-[#111827] mb-1">Platform / Label</label>
                    <input
                      type="text"
                      placeholder="e.g. GitHub, LinkedIn"
                      value={linkInput.label}
                      onChange={(e) => setLinkInput({ ...linkInput, label: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#B9BEC7] rounded-lg text-sm focus:outline-none focus:border-[#9AD84A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#111827] mb-1">Handle / URL</label>
                    <input
                      type="text"
                      placeholder="e.g. /saravanan1819"
                      value={linkInput.url}
                      onChange={(e) => setLinkInput({ ...linkInput, url: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#B9BEC7] rounded-lg text-sm focus:outline-none focus:border-[#9AD84A]"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingLink(false)}
                      className="px-3 py-1.5 text-xs text-gray-600 bg-gray-200 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (linkInput.url) {
                          setLinksList([
                            ...linksList,
                            {
                              platform: linkInput.label || "Link",
                              handle: linkInput.url.startsWith("/") ? linkInput.url : `/${linkInput.url}`,
                              url: linkInput.url,
                              type: (linkInput.label || "").toLowerCase().includes("linkedin") ? "linkedin" : "github",
                            },
                          ]);
                          setLinkInput({ label: "", url: "" });
                          setIsAddingLink(false);
                        }
                      }}
                      className="px-3 py-1.5 text-xs text-white bg-[#9AD84A] hover:bg-[#8EC63F] rounded-lg cursor-pointer"
                    >
                      Save Link
                    </button>
                  </div>
                </div>
              ) : linksList.length > 0 ? (
                <div className="space-y-4 text-left">
                  {linksList.map((link, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {link.type === "linkedin" || (link.platform && link.platform.toLowerCase().includes("linkedin")) ? (
                          <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="#0A66C2">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 shrink-0 text-[#111827]" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                          </svg>
                        )}
                        <div className="flex items-center space-x-2">
                          <span className="text-[15px] font-semibold text-[#111827]">{link.platform}</span>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[14px] text-[#6B7280] underline hover:text-[#111827] transition-colors"
                          >
                            {link.handle}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full border border-[#9AD84A] bg-[#F4FCE3] flex items-center justify-center text-[#9AD84A] hover:bg-[#E2F5BE] hover:border-[#8EC63F] hover:scale-105 transition-all shadow-xs cursor-pointer"
                          title="Edit Link"
                        >
                          <img src={Icons.pen} alt="Edit" className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setLinksList(linksList.filter((_, i) => i !== idx))}
                          className="w-8 h-8 rounded-full border border-[#9AD84A] bg-[#F4FCE3] flex items-center justify-center text-[#9AD84A] hover:bg-[#E2F5BE] hover:border-[#8EC63F] hover:scale-105 transition-all shadow-xs cursor-pointer"
                          title="Delete Link"
                        >
                          <svg className="w-3.5 h-3.5 text-[#9AD84A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-[16px] text-[#000000] max-w-md mx-auto leading-relaxed mb-3 font-medium tracking-normal" style={{ letterSpacing: "0px" }}>
                    Connect your LinkedIn, Github,portfoliom or other profiles
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsAddingLink(true)}
                    className="text-[16px] font-medium text-[#9AD84A] hover:text-[#8EC63F] transition-colors cursor-pointer tracking-normal"
                    style={{ letterSpacing: "0px" }}
                  >
                    Add Links
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: ACCOUNT */}
      {activeTab === "Account" && (
        <div className="space-y-6 w-full">
          {/* 1. Account Information Section */}
          <div>
            <h2 className="text-[18px] font-semibold text-[#111827] mb-3 tracking-normal">
              Account information
            </h2>
            <div className="border border-[#B9BEC7] rounded-[16px] bg-white divide-y divide-[#B9BEC7] overflow-hidden shadow-xs">
              {/* Name Row */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-3 text-[#111827]">
                  <img src={Icons.user} alt="Name" className="w-5 h-5" />
                  <span className="text-[14px] font-medium text-[#111827]">Name</span>
                </div>
                <span className="text-[16px] font-medium text-[#000000] tracking-normal" style={{ letterSpacing: "0px" }}>Saravanan S</span>
              </div>

              {/* Username Row */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-3 text-[#111827]">
                  <img src={Icons.username} alt="Username" className="w-5 h-5" />
                  <span className="text-[14px] font-medium text-[#111827]">Username</span>
                </div>
                <span className="text-[16px] font-medium text-[#000000] tracking-normal" style={{ letterSpacing: "0px" }}>Bsoft-stu-11</span>
              </div>

              {/* Email Row */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-3 text-[#111827]">
                  <img src={Icons.mail} alt="Email" className="w-5 h-5" />
                  <span className="text-[14px] font-medium text-[#111827]">Email</span>
                </div>
                <span className="text-[16px] font-medium text-[#000000] tracking-normal" style={{ letterSpacing: "0px" }}>727723eucy051@skcet.ac.in</span>
              </div>

              {/* Account Status Row */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-3 text-[#111827]">
                  <img src={Icons.userStatus} alt="Account Status" className="w-5 h-5" />
                  <span className="text-[14px] font-medium text-[#111827]">Account Status</span>
                </div>
                <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-[#9AD84A] text-white shadow-xs">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* 2. Active Sessions Section */}
          <div className="pt-2">
            <h2 className="text-[18px] font-semibold text-[#111827] mb-1 tracking-normal">
              Active Sessions
            </h2>
            <p className="text-[16px] text-[#737373] font-normal leading-relaxed mb-4 tracking-normal" style={{ letterSpacing: "0px" }}>
              If your account is signed in on multiple devices, you can view those sessions and log out from here.
            </p>

            <div className="border border-[#B9BEC7] rounded-[16px] bg-white divide-y divide-[#B9BEC7] overflow-hidden shadow-xs">
              {/* Device 1: Windows - Chrome (This device) */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full border border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
                    <img src={Icons.windows} alt="Windows" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-medium text-[#111827]">Windows - Chrome</h3>
                    <p className="text-[14px] text-[#737373] font-normal tracking-normal" style={{ letterSpacing: "0px" }}>Coimbatore, India · 31 August, 11:25 PM</p>
                  </div>
                </div>
                <span className="text-[14px] font-normal text-[#16A34A] tracking-normal" style={{ letterSpacing: "0px" }}>This device</span>
              </div>

              {/* Device 2: Windows - Chrome (Log out) */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full border border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
                    <img src={Icons.windows} alt="Windows" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-medium text-[#111827]">Windows - Chrome</h3>
                    <p className="text-[14px] text-[#737373] font-normal tracking-normal" style={{ letterSpacing: "0px" }}>Coimbatore, India · 31 August, 11:25 PM</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-4 py-1 rounded-full border border-[#DC2626] text-[#DC2626] hover:bg-red-50 text-[14px] font-normal transition-colors cursor-pointer tracking-normal"
                  style={{ letterSpacing: "0px" }}
                >
                  Log out
                </button>
              </div>

              {/* Device 3: Linux - Edge (Log out) */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full border border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
                    <img src={Icons.linux} alt="Linux" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-medium text-[#111827]">Linux - Edge</h3>
                    <p className="text-[14px] text-[#737373] font-normal tracking-normal" style={{ letterSpacing: "0px" }}>Coimbatore, India · 31 August, 11:25 PM</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-4 py-1 rounded-full border border-[#DC2626] text-[#DC2626] hover:bg-red-50 text-[14px] font-normal transition-colors cursor-pointer tracking-normal"
                  style={{ letterSpacing: "0px" }}
                >
                  Log out
                </button>
              </div>

              {/* Bottom Row: Sign out of all other devices */}
              <div className="flex items-center justify-between px-6 py-4 bg-white">
                <span className="text-[14px] font-medium text-[#DC2626] tracking-normal" style={{ letterSpacing: "0px" }}>
                  Sign out of all other devices
                </span>
                <button
                  type="button"
                  className="px-5 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-full text-[14px] font-medium transition-colors cursor-pointer shadow-xs tracking-normal"
                  style={{ letterSpacing: "0px" }}
                >
                  Sign Out All
                </button>
              </div>
            </div>
          </div>

          {/* 3. Need Help? Card */}
          <div className="border border-[#B9BEC7] rounded-[16px] bg-white p-5 flex items-center justify-between shadow-xs mt-6">
            <div className="flex items-center space-x-3">
              <img src={Icons.help} alt="Help" className="w-5 h-5" />
              <span className="text-[14px] font-medium text-[#111827] tracking-normal" style={{ letterSpacing: "0px" }}>Need Help?</span>
            </div>
            <a
              href="#support"
              onClick={(e) => e.preventDefault()}
              className="text-[14px] font-medium text-[#0070F3] underline cursor-pointer tracking-normal"
              style={{ letterSpacing: "0px" }}
            >
              Contact Support
            </a>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: SECURITY */}
      {activeTab === "Security" && (
        <div className="space-y-6 w-full">
          <div>
            <h2 className="text-[18px] font-semibold text-[#111827] mb-1 tracking-normal">
              Password
            </h2>
            <p className="text-[14px] text-[#6B7280] font-normal leading-relaxed mb-4 tracking-normal">
              Change your password whenever you need to keep your account secure.
            </p>

            <div className="border border-[#B9BEC7] rounded-[16px] bg-white p-6 shadow-xs space-y-6">
              <p className="text-[14px] text-[#111827] font-normal leading-relaxed max-w-xl tracking-normal" style={{ letterSpacing: "0px" }}>
                Your password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g., !, @, #, $, %).
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                {/* Current Password */}
                <div>
                  <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal" style={{ letterSpacing: "0px" }}>
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter your Current password"
                      value={securityState.currentPassword}
                      onChange={(e) => setSecurityState({ ...securityState, currentPassword: e.target.value })}
                      className="w-full px-4 py-2.5 pr-10 rounded-[12px] border border-[#B9BEC7] text-[#111827] placeholder:text-[#9CA3AF] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-[#F0F1F3] focus:bg-white transition-colors h-[46px] tracking-normal"
                      style={{ letterSpacing: "0px" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#111827] cursor-pointer"
                    >
                      {showCurrentPassword ? (
                        <img src={Icons.eye} alt="Show" className="w-4 h-4" />
                      ) : (
                        <img src={Icons.eyeOff} alt="Hide" className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal" style={{ letterSpacing: "0px" }}>
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter your New password"
                      value={securityState.newPassword}
                      onChange={(e) => setSecurityState({ ...securityState, newPassword: e.target.value })}
                      className="w-full px-4 py-2.5 pr-10 rounded-[12px] border border-[#B9BEC7] text-[#111827] placeholder:text-[#9CA3AF] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-[#F0F1F3] focus:bg-white transition-colors h-[46px] tracking-normal"
                      style={{ letterSpacing: "0px" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#111827] cursor-pointer"
                    >
                      {showNewPassword ? (
                        <img src={Icons.eye} alt="Show" className="w-4 h-4" />
                      ) : (
                        <img src={Icons.eyeOff} alt="Hide" className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal" style={{ letterSpacing: "0px" }}>
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your New password"
                      value={securityState.confirmPassword}
                      onChange={(e) => setSecurityState({ ...securityState, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2.5 pr-10 rounded-[12px] border border-[#B9BEC7] text-[#111827] placeholder:text-[#9CA3AF] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-[#F0F1F3] focus:bg-white transition-colors h-[46px] tracking-normal"
                      style={{ letterSpacing: "0px" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#111827] cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <img src={Icons.eye} alt="Show" className="w-4 h-4" />
                      ) : (
                        <img src={Icons.eyeOff} alt="Hide" className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-end space-x-6 pt-4">
                  <a
                    href="#forgot"
                    onClick={(e) => e.preventDefault()}
                    className="text-[14px] font-medium text-[#111827] underline cursor-pointer tracking-normal"
                    style={{ letterSpacing: "0px" }}
                  >
                    Forgot your Password?
                  </a>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#9AD84A] hover:bg-[#8EC63F] text-white rounded-full text-[14px] font-medium transition-colors cursor-pointer shadow-xs tracking-normal"
                    style={{ letterSpacing: "0px" }}
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Need Help? Card */}
          <div className="border border-[#B9BEC7] rounded-[16px] bg-white p-5 flex items-center justify-between shadow-xs mt-6">
            <div className="flex items-center space-x-3">
              <img src={Icons.help} alt="Help" className="w-5 h-5" />
              <span className="text-[14px] font-medium text-[#111827] tracking-normal" style={{ letterSpacing: "0px" }}>Need Help?</span>
            </div>
            <a
              href="#support"
              onClick={(e) => e.preventDefault()}
              className="text-[14px] font-medium text-[#0070F3] underline cursor-pointer tracking-normal"
              style={{ letterSpacing: "0px" }}
            >
              Contact Support
            </a>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: CUSTOMIZE */}
      {activeTab === "Customize" && (
        <div className="space-y-6 w-full">
          <div className="border border-[#B9BEC7] rounded-[16px] bg-white shadow-xs p-6 space-y-6">
            <h2 className="text-[16px] font-medium text-[#000000] border-b pb-4 border-[#B9BEC7] tracking-normal" style={{ letterSpacing: "0px" }}>
              Appearance & Layout Settings
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-[16px] font-medium text-[#000000] mb-3 tracking-normal" style={{ letterSpacing: "0px" }}>
                  Interface Theme
                </label>
                <div className="grid grid-cols-3 gap-3 max-w-md">
                  <button
                    type="button"
                    onClick={() => setCustomizeState({ ...customizeState, theme: "light" })}
                    className={`p-3 text-[16px] font-medium rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition-colors ${
                      customizeState.theme === "light" ? "border-[#9AD84A] bg-[#F4FCE3] text-[#000000]" : "border-[#B9BEC7] bg-white text-[#000000]"
                    }`}
                    style={{ letterSpacing: "0px" }}
                  >
                    <span>☀️ Light</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomizeState({ ...customizeState, theme: "dark" })}
                    className={`p-3 text-[16px] font-medium rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition-colors ${
                      customizeState.theme === "dark" ? "border-[#9AD84A] bg-gray-900 text-white" : "border-[#B9BEC7] bg-white text-[#000000]"
                    }`}
                    style={{ letterSpacing: "0px" }}
                  >
                    <span>🌙 Dark</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomizeState({ ...customizeState, theme: "system" })}
                    className={`p-3 text-[16px] font-medium rounded-xl border flex flex-col items-center gap-2 cursor-pointer transition-colors ${
                      customizeState.theme === "system" ? "border-[#9AD84A] bg-[#F4FCE3] text-[#000000]" : "border-[#B9BEC7] bg-white text-[#000000]"
                    }`}
                    style={{ letterSpacing: "0px" }}
                  >
                    <span>💻 System</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[#B9BEC7] flex items-center justify-between">
                <div>
                  <h3 className="text-[16px] font-medium text-[#000000] tracking-normal" style={{ letterSpacing: "0px" }}>Compact Dashboard View</h3>
                  <p className="text-[16px] font-medium text-[#000000] tracking-normal mt-0.5" style={{ letterSpacing: "0px" }}>Reduce spacing and padding across cards.</p>
                </div>
                <ToggleSwitch
                  checked={customizeState.compactMode}
                  onChange={(val) => setCustomizeState({ ...customizeState, compactMode: val })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: NOTIFICATIONS */}
      {activeTab === "Notifications" && (
        <div className="space-y-6 w-full">
          <div>
            <h2 className="text-[18px] font-semibold text-[#111827] mb-1 tracking-normal">
              Notifications
            </h2>
            <p className="text-[16px] text-[#737373] font-normal leading-relaxed mb-4 tracking-normal" style={{ letterSpacing: "0px" }}>
              Manage how you receive important updates about your courses, learning activities, and account.
            </p>

            {/* 1. Notification Channels Card */}
            <div className="border border-[#B9BEC7] rounded-[16px] bg-white divide-y divide-[#B9BEC7] overflow-hidden shadow-xs mb-6">
              {/* In-app */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full border border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
                    <img src={Icons.inApp} alt="In-app" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-medium text-[#111827]">In-app</h3>
                    <p className="text-[14px] font-normal text-[#737373] tracking-normal" style={{ letterSpacing: "0px" }}>Receive notifications in your BSOFT learning portal.</p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={notificationChannels.inApp}
                  onChange={(val) => setNotificationChannels({ ...notificationChannels, inApp: val })}
                />
              </div>

              {/* Email */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full border border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
                    <img src={Icons.mail} alt="Email" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-medium text-[#111827]">Email</h3>
                    <p className="text-[14px] font-normal text-[#737373] tracking-normal" style={{ letterSpacing: "0px" }}>
                      Receive notifications at your registered email address. <strong className="font-medium text-[#111827]">student@email.com</strong>
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={notificationChannels.email}
                  onChange={(val) => setNotificationChannels({ ...notificationChannels, email: val })}
                />
              </div>

              {/* SMS */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full border border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
                    <img src={Icons.smsCode} alt="SMS" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-medium text-[#111827]">SMS</h3>
                    <p className="text-[14px] font-normal text-[#737373] tracking-normal" style={{ letterSpacing: "0px" }}>
                      Receive important notifications by SMS. No phone number ( <a href="#phone" className="text-[#0070F3] underline">Add phone number</a> )
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={notificationChannels.sms}
                  onChange={(val) => setNotificationChannels({ ...notificationChannels, sms: val })}
                />
              </div>
            </div>

            {/* 2. Notification Categories Card */}
            <div className="border border-[#B9BEC7] rounded-[16px] bg-white divide-y divide-[#B9BEC7] overflow-hidden shadow-xs">
              {/* Category 1: Learning & Schedule */}
              <div className="py-6 space-y-4">
                <div className="px-6 text-[16px] font-medium text-[#737373] tracking-normal" style={{ letterSpacing: "0px" }}>
                  Learning & Schedule
                </div>
                <div className="space-y-3.5">
                  {[
                    { id: "liveSessionReminders", label: "Live Session Reminders" },
                    { id: "liveSessionChanges", label: "Live Session Changes" },
                    { id: "assignmentReminders", label: "Assignment Reminders" },
                    { id: "quizReminders", label: "Quiz Reminders" },
                    { id: "assessmentReminders", label: "Assessment Reminders" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between px-6">
                      <span className="text-[16px] font-normal text-[#000000] tracking-normal" style={{ letterSpacing: "0px" }}>{item.label}</span>
                      <ToggleSwitch
                        checked={notificationPrefs[item.id]}
                        onChange={(val) => setNotificationPrefs({ ...notificationPrefs, [item.id]: val })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2: Course Updates */}
              <div className="py-6 space-y-4">
                <div className="px-6 text-[16px] font-medium text-[#737373] tracking-normal" style={{ letterSpacing: "0px" }}>
                  Course Updates
                </div>
                <div className="space-y-3.5">
                  {[
                    { id: "courseAnnouncements", label: "Course Announcements" },
                    { id: "courseUpdates", label: "Course Updates" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between px-6">
                      <span className="text-[16px] font-normal text-[#000000] tracking-normal" style={{ letterSpacing: "0px" }}>{item.label}</span>
                      <ToggleSwitch
                        checked={notificationPrefs[item.id]}
                        onChange={(val) => setNotificationPrefs({ ...notificationPrefs, [item.id]: val })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 3: Results & Feedback */}
              <div className="py-6 space-y-4">
                <div className="px-6 text-[16px] font-medium text-[#737373] tracking-normal" style={{ letterSpacing: "0px" }}>
                  Results & Feedback
                </div>
                <div className="space-y-3.5">
                  {[
                    { id: "assessmentResults", label: "Assessment Results" },
                    { id: "assignmentFeedback", label: "Assignment Feedback" },
                    { id: "labResults", label: "Lab Results" },
                    { id: "certificateAvailable", label: "Certificate Available" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between px-6">
                      <span className="text-[16px] font-normal text-[#000000] tracking-normal" style={{ letterSpacing: "0px" }}>{item.label}</span>
                      <ToggleSwitch
                        checked={notificationPrefs[item.id]}
                        onChange={(val) => setNotificationPrefs({ ...notificationPrefs, [item.id]: val })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 4: Account & Security */}
              <div className="py-6 space-y-4">
                <div className="px-6 text-[16px] font-medium text-[#737373] tracking-normal" style={{ letterSpacing: "0px" }}>
                  Account & Security
                </div>
                <div className="space-y-3.5">
                  {[
                    { id: "newLogin", label: "New Login" },
                    { id: "passwordChanged", label: "Password Changed" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between px-6">
                      <span className="text-[16px] font-normal text-[#000000] tracking-normal" style={{ letterSpacing: "0px" }}>{item.label}</span>
                      <ToggleSwitch
                        checked={notificationPrefs[item.id]}
                        onChange={(val) => setNotificationPrefs({ ...notificationPrefs, [item.id]: val })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
