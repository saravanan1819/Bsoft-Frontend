import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneInput, defaultCountries, parseCountry } from "react-international-phone";
import "react-international-phone/style.css";
import Flags from "country-flag-icons/react/3x2";
import { Icons } from "../../assets/icons/icons.js";

// Generate full list of all 240+ world countries dynamically
const ALL_COUNTRIES = defaultCountries.map((c) => {
  const parsed = parseCountry(c);
  return {
    label: parsed.name,
    code: parsed.iso2.toUpperCase(),
    flagCode: parsed.iso2.toUpperCase(),
    dialCode: `+${parsed.dialCode}`,
  };
});

export const CreateProfilePage = () => {
  const navigate = useNavigate();
  const dateInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const countryRef = useRef(null);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");

  const [selectedCountry, setSelectedCountry] = useState(
    ALL_COUNTRIES.find((c) => c.code === "IN") || ALL_COUNTRIES[0]
  );

  const [formData, setFormData] = useState({
    name: "Saravanan",
    email: "727723eucy051@skcet.ac.in",
    phone: "",
    dob: "",
    streetAddress: "",
    city: "",
    state: "",
  });

  // Filtered Countries List for Search
  const filteredCountries = useMemo(() => {
    if (!countrySearchQuery.trim()) return ALL_COUNTRIES;
    const q = countrySearchQuery.toLowerCase();
    return ALL_COUNTRIES.filter(
      (c) => c.label.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [countrySearchQuery]);

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
    <div className="flex flex-col min-h-screen h-full w-full p-6 sm:p-8 md:p-10 lg:p-12 bg-white font-sans justify-between overflow-hidden max-w-[1240px] mx-auto">
      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="w-full flex flex-col gap-6">
        {/* Header Section */}
        <div>
          <h1 className="text-[24px] sm:text-[26px] font-medium text-[#000000] mb-1 tracking-normal">
            Create Your Profile
          </h1>
          <p className="text-[14px] text-[#6B7280] font-normal leading-relaxed tracking-normal">
            Set up your profile so your learning experience feels personal. You can update your profile anytime from Settings.
          </p>
        </div>

        {/* Main Content: Left Avatar & Right Form Grid */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 pt-4 items-start">
          {/* Left Avatar Column */}
          <div className="flex flex-col items-center gap-4 shrink-0 mx-auto md:mx-0 pt-1">
            <div className="relative w-[120px] h-[120px]">
              {/* Avatar Circle Container */}
              <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden" style={{ borderRadius: "9999px" }}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile Preview" className="w-full h-full object-cover rounded-full" style={{ borderRadius: "9999px" }} />
                ) : (
                  <img src={Icons.avatarProfile} alt="Profile Avatar" className="w-full h-full object-cover rounded-full" style={{ borderRadius: "9999px" }} />
                )}
              </div>
              
              {/* Plus Badge Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-[30px] h-[30px] rounded-full bg-[#9AD84A] hover:bg-[#8EC63F] text-white flex items-center justify-center shadow-xs border-2 border-white cursor-pointer transition-transform hover:scale-105 z-10"
                title="Upload Photo"
              >
                <span className="text-[16px] font-medium leading-none">+</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#B9BEC7] bg-white text-[13px] font-normal text-[#374151] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className="text-[14px] font-normal">+</span>
              <span>Upload photo</span>
            </button>
          </div>

          {/* Right Form Fields Column */}
          <div className="flex-1 w-full flex flex-col gap-6">
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.35fr] gap-6">
              <div>
                <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Saravanan"
                  className="w-full px-4 py-2.5 rounded-[12px] border border-[#B9BEC7] text-[#111827] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-white transition-colors h-[46px] tracking-normal"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="727723eucy051@skcet.ac.in"
                  className="w-full px-4 py-2.5 rounded-[12px] border border-[#B9BEC7] text-[#111827] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-white transition-colors h-[46px] tracking-normal"
                />
              </div>
            </div>

            {/* Row 2: Phone Number & Date of Birth */}
            <div className="grid grid-cols-1 md:grid-cols-[1.85fr_1fr] gap-6">
              <div>
                <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                  Phone Number *
                </label>
                <div className="flex items-center rounded-[12px] border border-[#B9BEC7] bg-white h-[46px] overflow-hidden focus-within:border-[#9AD84A] transition-colors relative">
                  {/* Phone Country Code Display (Synced to selected country) */}
                  <div className="flex items-center gap-2 h-full border-r border-[#B9BEC7] px-3.5 bg-white shrink-0 select-none">
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
                    className="w-full px-4 h-full text-[#111827] placeholder:text-[#9CA3AF] text-[14px] focus:outline-none bg-transparent tracking-normal"
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
                    className="w-full px-4 py-2.5 pr-10 rounded-[12px] border border-[#B9BEC7] text-[#111827] placeholder:text-[#9CA3AF] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-white cursor-pointer transition-colors h-[46px] tracking-normal [&::-webkit-calendar-picker-indicator]:hidden"
                  />
                  <img
                    src={Icons.calendarDropdown}
                    alt="Calendar"
                    className="w-5 h-5 absolute right-3.5 pointer-events-none opacity-80"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Country & Street Address */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2.2fr] gap-6">
              {/* Custom Country Dropdown */}
              <div>
                <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                  Country *
                </label>
                <div className="relative" ref={countryRef}>
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen((prev) => !prev)}
                    className="w-full px-4 py-2.5 rounded-[12px] border border-[#B9BEC7] text-[#111827] text-[14px] bg-white flex items-center justify-between hover:border-gray-400 focus:outline-none focus:border-[#9AD84A] transition-colors cursor-pointer h-[46px] tracking-normal"
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
                      {/* Search Input */}
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

              <div>
                <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  placeholder="Enter street address"
                  className="w-full px-4 py-2.5 rounded-[12px] border border-[#B9BEC7] text-[#111827] placeholder:text-[#9CA3AF] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-white transition-colors h-[46px] tracking-normal"
                />
              </div>
            </div>

            {/* Row 4: City & State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter City"
                  className="w-full px-4 py-2.5 rounded-[12px] border border-[#B9BEC7] text-[#111827] placeholder:text-[#9CA3AF] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-white transition-colors h-[46px] tracking-normal"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#111827] mb-2 tracking-normal">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter State"
                  className="w-full px-4 py-2.5 rounded-[12px] border border-[#B9BEC7] text-[#111827] placeholder:text-[#9CA3AF] text-[14px] focus:outline-none focus:border-[#9AD84A] bg-white transition-colors h-[46px] tracking-normal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="w-full flex items-center justify-between pt-4 pb-0 mt-auto">
        <button
          type="button"
          onClick={handleBack}
          className="px-6 py-2 rounded-full border border-[#B9BEC7] bg-white text-[14px] font-medium text-[#374151] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Back
        </button>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handleFinish}
            className="text-[14px] font-medium text-[#374151] hover:text-black cursor-pointer bg-transparent border-none"
          >
            Skip for now
          </button>

          <button
            type="button"
            onClick={handleFinish}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#9AD84A] hover:bg-[#8EC63F] text-white font-medium text-[14px] rounded-full transition-all duration-200 shadow-xs cursor-pointer active:scale-[0.98]"
          >
            <span>Continue</span>
            <span className="text-[15px]">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProfilePage;
