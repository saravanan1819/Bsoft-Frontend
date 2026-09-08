import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons/icons.js";

const COUNTRY_OPTIONS = [
  { label: "India", code: "IN", flag: "🇮🇳" },
  { label: "United States", code: "US", flag: "🇺🇸" },
  { label: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { label: "Canada", code: "CA", flag: "🇨🇦" },
  { label: "Australia", code: "AU", flag: "🇦🇺" },
  { label: "Germany", code: "DE", flag: "🇩🇪" },
  { label: "Singapore", code: "SG", flag: "🇸🇬" },
  { label: "United Arab Emirates", code: "AE", flag: "🇦🇪" },
];

const PHONE_PREFIX_OPTIONS = [
  { code: "+91", flag: "🇮🇳", country: "India" },
  { code: "+1", flag: "🇺🇸", country: "USA / Canada" },
  { code: "+44", flag: "🇬🇧", country: "UK" },
  { code: "+61", flag: "🇦🇺", country: "Australia" },
  { code: "+49", flag: "🇩🇪", country: "Germany" },
  { code: "+65", flag: "🇸🇬", country: "Singapore" },
  { code: "+971", flag: "🇦🇪", country: "UAE" },
];

export const CreateProfilePage = () => {
  const navigate = useNavigate();
  const dateInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const countryRef = useRef(null);
  const phonePrefixRef = useRef(null);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isPhonePrefixOpen, setIsPhonePrefixOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_OPTIONS[0]);
  const [selectedPhonePrefix, setSelectedPhonePrefix] = useState(PHONE_PREFIX_OPTIONS[0]);

  const [formData, setFormData] = useState({
    name: "Saravanan",
    email: "727723eucy051@skcet.ac.in",
    phone: "",
    dob: "",
    streetAddress: "",
    city: "",
    state: "",
  });

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setIsCountryOpen(false);
      }
      if (phonePrefixRef.current && !phonePrefixRef.current.contains(event.target)) {
        setIsPhonePrefixOpen(false);
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

  const handleFinish = () => {
    localStorage.setItem("bsoft_has_logged_in", "true");
    navigate("/dashboard");
  };

  const handleBack = () => {
    navigate("/welcome");
  };

  return (
    <div className="flex flex-col min-h-full h-full w-full p-8 sm:p-10 md:p-12 bg-white md:bg-transparent font-sans justify-between overflow-y-auto">
      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="w-full flex flex-col gap-8">
        {/* Header Section */}
        <div>
          <h1 className="text-[26px] sm:text-[28px] font-medium text-[#000000] mb-1.5">
            Create Your Profile
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#737373] font-normal leading-normal">
            Set up your profile so your learning experience feels personal. You can update your profile anytime from Settings.
          </p>
        </div>

        {/* Main Content: Left Avatar & Right Form Grid */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 pt-4 items-start">
          {/* Left Avatar Column */}
          <div className="flex flex-col items-center gap-4 shrink-0 mx-auto md:mx-0">
            <div className="relative w-[130px] h-[130px]">
              {/* Avatar Circle Container */}
              <div className="w-full h-full rounded-full bg-[#E5E7EB] flex items-center justify-center overflow-hidden border border-[#D1D5DB]">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-[80px] h-[80px] text-[#9CA3AF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
              
              {/* Plus Badge Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#9BD94A] hover:bg-[#8EC63F] text-white flex items-center justify-center shadow-md border-2 border-white cursor-pointer transition-transform hover:scale-105 z-10"
                title="Upload Photo"
              >
                <img src={Icons.plus} alt="Upload" className="w-3.5 h-3.5 brightness-0 invert" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#B9BEC7] bg-white text-[13px] font-medium text-[#000000] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <img src={Icons.plus} alt="Plus" className="w-4 h-4" />
              <span>Upload photo</span>
            </button>
          </div>

          {/* Right Form Fields Column */}
          <div className="flex-1 w-full flex flex-col gap-6">
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[15px] font-normal text-[#000000] mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-[#000000] text-[15px] focus:outline-none focus:border-[#9BD94A] bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[15px] font-normal text-[#000000] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-[#000000] text-[15px] focus:outline-none focus:border-[#9BD94A] bg-white transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Phone Number & Date of Birth */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[15px] font-normal text-[#000000] mb-2">
                  Phone Number *
                </label>
                <div className="flex items-center rounded-xl border border-[#D1D5DB] bg-white overflow-visible focus-within:border-[#9BD94A] relative">
                  {/* Phone Country Code Dropdown */}
                  <div className="relative" ref={phonePrefixRef}>
                    <button
                      type="button"
                      onClick={() => setIsPhonePrefixOpen((prev) => !prev)}
                      className="flex items-center gap-1.5 px-3 py-3 bg-[#F9FAFB] border-r border-[#D1D5DB] text-[15px] text-[#000000] shrink-0 select-none hover:bg-gray-100 transition-colors cursor-pointer rounded-l-xl"
                    >
                      <span>{selectedPhonePrefix.flag}</span>
                      <span className="font-medium">{selectedPhonePrefix.code}</span>
                      <svg className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${isPhonePrefixOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Phone Prefix Dropdown Menu */}
                    {isPhonePrefixOpen && (
                      <div className="absolute top-full left-0 mt-1.5 w-[200px] bg-white border border-[#E5E7EB] rounded-xl shadow-xl z-50 py-1.5 max-h-[220px] overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-150">
                        {PHONE_PREFIX_OPTIONS.map((item) => (
                          <button
                            key={item.code}
                            type="button"
                            onClick={() => {
                              setSelectedPhonePrefix(item);
                              setIsPhonePrefixOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-[14px] hover:bg-gray-50 transition-colors cursor-pointer ${
                              selectedPhonePrefix.code === item.code ? "bg-[#F3F4F6] font-semibold text-[#000000]" : "text-gray-700"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{item.flag}</span>
                              <span>{item.country}</span>
                            </span>
                            <span className="text-[#737373] text-[13px]">{item.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 text-[#000000] placeholder:text-[#9CA3AF] text-[15px] focus:outline-none bg-white rounded-r-xl"
                  />
                </div>
              </div>

              {/* Date of Birth Picker */}
              <div>
                <label className="block text-[15px] font-normal text-[#000000] mb-2">
                  Date of Birth
                </label>
                <div 
                  onClick={handleCalendarClick}
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    ref={dateInputRef}
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-[#D1D5DB] text-[#000000] placeholder:text-[#9CA3AF] text-[15px] focus:outline-none focus:border-[#9BD94A] bg-white cursor-pointer transition-colors [&::-webkit-calendar-picker-indicator]:hidden"
                  />
                  <button
                    type="button"
                    onClick={handleCalendarClick}
                    className="absolute right-3.5 p-1 text-gray-500 hover:text-black transition-colors cursor-pointer"
                    title="Open calendar"
                  >
                    <img src={Icons.calendar} alt="Calendar" className="w-5 h-5 opacity-70 hover:opacity-100" />
                  </button>
                </div>
              </div>
            </div>

            {/* Row 3: Country & Street Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Custom Country Dropdown */}
              <div>
                <label className="block text-[15px] font-normal text-[#000000] mb-2">
                  Country *
                </label>
                <div className="relative" ref={countryRef}>
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen((prev) => !prev)}
                    className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-[#000000] text-[15px] bg-white flex items-center justify-between hover:border-gray-400 focus:outline-none focus:border-[#9BD94A] transition-colors cursor-pointer shadow-none"
                  >
                    <span className="flex items-center gap-2">
                      <span>{selectedCountry.flag}</span>
                      <span className="font-normal text-[#000000]">{selectedCountry.label}</span>
                    </span>
                    <svg className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isCountryOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Country Dropdown List Menu */}
                  {isCountryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E5E7EB] rounded-xl shadow-xl z-50 py-1.5 max-h-[240px] overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-150">
                      {COUNTRY_OPTIONS.map((option) => (
                        <button
                          key={option.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(option);
                            setIsCountryOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-[15px] hover:bg-[#F9FAFB] transition-colors cursor-pointer ${
                            selectedCountry.code === option.code ? "bg-[#F3F4F6] font-semibold text-[#000000]" : "text-gray-700"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span>{option.flag}</span>
                            <span>{option.label}</span>
                          </span>
                          {selectedCountry.code === option.code && (
                            <span className="text-[#9BD94A] font-bold text-[14px]">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[15px] font-normal text-[#000000] mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  placeholder="Enter street address"
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-[#000000] placeholder:text-[#9CA3AF] text-[15px] focus:outline-none focus:border-[#9BD94A] bg-white transition-colors"
                />
              </div>
            </div>

            {/* Row 4: City & State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[15px] font-normal text-[#000000] mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter City"
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-[#000000] placeholder:text-[#9CA3AF] text-[15px] focus:outline-none focus:border-[#9BD94A] bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[15px] font-normal text-[#000000] mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter State"
                  className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] text-[#000000] placeholder:text-[#9CA3AF] text-[15px] focus:outline-none focus:border-[#9BD94A] bg-white transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="w-full flex items-center justify-between pt-12 pb-2 mt-auto">
        <button
          type="button"
          onClick={handleBack}
          className="px-6 py-2 rounded-full border border-[#B9BEC7] bg-white text-[14px] font-medium text-[#000000] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Back
        </button>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handleFinish}
            className="text-[14px] font-normal text-[#000000] hover:underline cursor-pointer bg-transparent border-none"
          >
            Skip for now
          </button>

          <button
            type="button"
            onClick={handleFinish}
            className="inline-flex items-center justify-center gap-2 px-7 py-2.5 bg-[#9BD94A] hover:bg-[#8EC63F] text-white font-medium text-[15px] rounded-full transition-all duration-200 shadow-sm cursor-pointer hover:shadow-md active:scale-[0.98]"
          >
            <span>Continue</span>
            <img src={Icons.getStarted} alt="Continue" className="w-[14px] h-[9px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProfilePage;
