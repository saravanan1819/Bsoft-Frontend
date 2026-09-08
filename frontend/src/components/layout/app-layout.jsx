import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { Icons } from "../../assets/icons/icons";

import SearchBar from "../shared/search-bar";

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const isOnboardingPage = location.pathname === "/welcome" || location.pathname === "/create-profile";
  
  // Quick utility to format the current path into a page title
  const pageTitle = location.pathname.replace("/", "").replace("-", " ") || "Dashboard";

  return (
    <div className="flex h-screen w-full bg-[#F0F1F3] overflow-hidden">
      {/* Desktop Left Sidebar (hidden on phone/small devices) */}
      <div className="hidden md:block shrink-0">
        <Sidebar forceCollapsed={isProfileOpen} isEmpty={isOnboardingPage} />
      </div>

      {/* Mobile Drawer Sidebar Overlay (only shown on mobile when toggled via hamburger) */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Dark Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          {/* Sliding Drawer Container */}
          <div className="relative w-[260px] h-full bg-[#F0F1F3] z-50 flex flex-col shadow-2xl">
            <Sidebar onClose={() => setIsMobileSidebarOpen(false)} isMobileDrawer isEmpty={isOnboardingPage} />
          </div>
        </div>
      )}

      {/* Main Content Area (Middle Column) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Single Outer Panel Container */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#FAFAFA] border-t-[0.5px] border-l-[0.5px] border-r-[0.5px] border-[#B9BEC7] rounded-t-[24px] overflow-hidden">
          {/* Header / Navbar (hidden on onboarding screens) */}
          {!isOnboardingPage && (
            <header className="h-[60px] md:h-[68px] flex items-center justify-between px-4 md:pl-[30px] md:pr-[34px] border-b-[0.5px] border-[#B9BEC7] bg-[#FAFAFA] shrink-0">
              {/* Page Title & Mobile Hamburger Button */}
              <div className="flex items-center gap-[10px]">
                <button
                  type="button"
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="md:hidden w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-80 border-none bg-transparent"
                >
                  <img src={Icons.menu} alt="Menu" className="w-[22px] h-[22px]" />
                </button>
                <h1 className="font-sans font-medium text-[16px] md:text-[18px] text-black capitalize">
                  {pageTitle}
                </h1>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-[21px]">
                {/* Search Box */}
                <SearchBar />

                {/* Notification Bell */}
                <button className="w-10 h-10 rounded-full bg-white border-[0.4px] border-[#B9BEC7] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:opacity-85 transition-opacity">
                  <img src={Icons.notification || "/notification-bell-ping.svg"} alt="Notifications" className="w-[20px] h-[20px]" />
                </button>

                {/* Vertical Separator */}
                <div className="hidden sm:block w-[0.8px] h-[30px] bg-[rgba(218,218,218,0.8)]" />

                {/* Profile Avatar */}
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="relative w-10 h-10 rounded-full border-[0.4px] border-[#B9BEC7] bg-primary overflow-hidden flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#9AD84A] transition-all"
                >
                  <img 
                    src={Icons.profile || "/hero.png"} 
                    alt="Profile" 
                    className="min-w-[40px] min-h-[31px] object-cover translate-x-[0px] translate-y-[1px]" 
                  />
                </button>
              </div>
            </header>
          )}

          {/* Dynamic Page Content Area */}
          <main className={`flex-1 overflow-y-auto overflow-x-hidden no-scrollbar relative ${
            isOnboardingPage ? "p-0 flex flex-col" : (location.pathname === "/calendar" ? "p-0 no-scrollbar" : "p-4 sm:p-6 md:p-8")
          }`}>
            <Outlet context={{ isProfileOpen }} />
          </main>
        </div>
      </div>

      {/* Profile Sidebar Drawer */}
      <div
        className={`transition-all duration-300 ease-in-out bg-[#FAFAFA] border-t-[0.5px] border-l-[0.5px] border-r-[0.5px] border-[#B9BEC7] rounded-t-[24px] overflow-hidden flex flex-col ${
          isProfileOpen
            ? "w-[300px] sm:w-[360px] opacity-100 ml-[8px]"
            : "w-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Profile Sidebar Header */}
        <div className="h-[68px] flex items-center justify-between px-[24px] border-b-[0.5px] border-[#B9BEC7] bg-[#FAFAFA] shrink-0">
          <h2 className="font-sans font-semibold text-[18px] text-black">Profile</h2>
          <button
            type="button"
            onClick={() => setIsProfileOpen(false)}
            className="flex items-center gap-[6px] px-[12px] py-[6px] rounded-full border-[0.5px] border-[#B9BEC7] bg-white text-[13px] font-sans font-medium text-black hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <span>✕</span>
            <span>Close</span>
          </button>
        </div>

        {/* Profile Sidebar Content Body */}
        <div className="flex-1 overflow-y-auto p-[24px] flex flex-col justify-between gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            {/* User Info Header */}
            <div className="flex items-center gap-[16px] p-[16px] bg-white rounded-[16px] border-[0.5px] border-[#B9BEC7]">
              <div className="w-[50px] h-[50px] rounded-full border border-[#B9BEC7] overflow-hidden shrink-0">
                <img src={Icons.profile || "/hero.png"} alt="Jabez" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-[16px] text-black">Jabez</h3>
                <p className="font-sans text-[13px] text-[#737373]">jabez@bsoft.edu</p>
              </div>
            </div>

            {/* Quick Details / Stats */}
            <div className="flex flex-col gap-[12px]">
              <span className="font-sans text-[12px] uppercase font-semibold text-[#737373]">Account & Activity</span>
              <div className="flex flex-col gap-[8px]">
                <div className="flex justify-between items-center p-[12px] bg-white rounded-[12px] border-[0.5px] border-[#B9BEC7] text-[14px]">
                  <span className="text-[#737373]">Role</span>
                  <span className="font-semibold text-black">Student</span>
                </div>
                <div className="flex justify-between items-center p-[12px] bg-white rounded-[12px] border-[0.5px] border-[#B9BEC7] text-[14px]">
                  <span className="text-[#737373]">Current Rank</span>
                  <span className="font-semibold text-black">Top 5%</span>
                </div>
                <div className="flex justify-between items-center p-[12px] bg-white rounded-[12px] border-[0.5px] border-[#B9BEC7] text-[14px]">
                  <span className="text-[#737373]">Streak</span>
                  <span className="font-semibold text-black">🔥 14 Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Log Out Button */}
          <button
            type="button"
            onClick={() => {
              setIsProfileOpen(false);
              navigate("/login");
            }}
            className="w-full flex items-center justify-center gap-2 p-[12px] bg-[#FFF2F2] hover:bg-[#FFE5E5] text-[#E53E3E] border-[0.5px] border-[#FEB2B2] rounded-[12px] font-sans font-medium text-[14px] transition-colors cursor-pointer"
          >
            <img src={Icons.logout} alt="Log Out" className="w-[18px] h-[18px]" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      {!isOnboardingPage && (
        <aside className="hidden lg:flex w-[62px] h-screen bg-[#F0F1F3] flex-col items-center select-none shrink-0">
          <button className="w-[20px] h-[20px] mt-[22px] cursor-pointer hover:opacity-80">
            <img src={Icons.dashboardEdit} alt="Customize" className="w-[20px] h-[20px]" />
          </button>
         
          <button className="w-[18px] h-[18px] mt-[35px] cursor-pointer hover:opacity-80">
            <img src={Icons.notes} alt="Notes" className="w-[18px] h-[18px]" />
          </button>
          <button className="w-[16px] h-[16px] mt-[47px] cursor-pointer hover:opacity-80">
            <img src={Icons.todo2} alt="Add Tool" className="w-[16px] h-[16px]" />
          </button>
          <button 
            type="button"
            aria-label="Add item"
            className="w-[18px] h-[18px] mt-[35px] cursor-pointer hover:opacity-80 flex items-center justify-center text-black font-medium text-[20px] leading-none"
          >
            <img src={Icons.addTool || "/addtool.svg"} alt="Add" className="w-[16px] h-[16px]" />
          </button>
        </aside>
      )}
    </div>
  );
};

export default AppLayout;