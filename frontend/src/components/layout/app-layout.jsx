import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import ProfileSidebar from "./profile-sidebar";
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
                <button className="w-10 h-10 rounded-full bg-white border border-[#B9BEC7] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:opacity-85 transition-opacity">
                  <img src={Icons.notification || "/notification-bell-ping.svg"} alt="Notifications" className="w-[20px] h-[20px]" />
                </button>

                {/* Vertical Separator */}
                <div className="hidden sm:block w-[0.8px] h-[30px] bg-[rgba(218,218,218,0.8)]" />

                {/* Profile Avatar */}
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="relative w-10 h-10 rounded-full border border-[#B9BEC7] bg-white p-[2px] flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#9AD84A] transition-all"
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#9AD84A] flex items-center justify-center">
                    <img 
                      src={Icons.profile || "/hero.png"} 
                      alt="Profile" 
                      className="min-w-[34px] min-h-[26px] object-cover translate-y-[1px]" 
                    />
                  </div>
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
      <ProfileSidebar isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

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