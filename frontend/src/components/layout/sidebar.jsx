import React from "react";
import { NavLink } from "react-router-dom";
import { Icons } from "../../assets/icons/icons.js";
import { sidebarMenu } from "../../config/sidebar.js"; 

export const Sidebar = ({ forceCollapsed, onClose, isMobileDrawer, isEmpty }) => {
  const [internalCollapsed, setInternalCollapsed] = React.useState(false);
  const isCollapsed = !isMobileDrawer && (forceCollapsed !== undefined ? (forceCollapsed || internalCollapsed) : internalCollapsed);

  // Separate menu groups according to the sidebar configuration
  const menuGroup = sidebarMenu.find((g) => g.title === "Menu");
  const quickAccessGroup = sidebarMenu.find((g) => g.title === "Quick access");
  const bottomGroup = sidebarMenu.find((g) => g.title === "Bottom");

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className={`${isMobileDrawer ? "w-full px-[18px]" : (isCollapsed ? "w-[72px] px-[12px]" : "w-[240px] px-[18px]")} h-screen bg-[#F0F1F3] flex flex-col pt-[14px] select-none box-border shrink-0 transition-all duration-300`}>
      {/* Header-Logo */}
      <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} h-[36px] shrink-0 mb-[24px]`}>
        {!isCollapsed && <img src={Icons.logo} alt="BSOFT" className="w-[102px] h-[36px] object-contain" />}
        {isMobileDrawer ? (
          <button 
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center cursor-pointer text-gray-700 hover:text-black text-[20px] font-sans border-none bg-transparent"
          >
            ✕
          </button>
        ) : (
          <button 
            type="button"
            onClick={() => setInternalCollapsed((prev) => !prev)}
            className="w-6 h-6 flex items-center justify-center cursor-pointer hover:opacity-80 outline-none border-none bg-transparent"
          >
            <img src={Icons.menu} alt="Menu" className="w-[24px] h-[24px]" />
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className="flex-1" />
      ) : (
        /* Whole Scrollable Sidebar Container */
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-[28px] pb-[36px]">
        {/* Mode switcher (Learn) */}
        <button className={`${isCollapsed ? "w-[48px] justify-center p-0 mx-auto" : "w-full px-[16px] justify-between"} h-[40px] shrink-0 bg-secondary text-white rounded-[10px] flex items-center hover:opacity-90 mt-[20px] cursor-pointer outline-none border-none transition-all duration-300`}>
          <div className="flex items-center gap-[10px]">
            <img src={Icons.learn} alt="Learn" className="w-[20px] h-[20px] invert brightness-0" />
            {!isCollapsed && <span className="font-sans font-normal text-[16px] leading-[18px]">Learn</span>}
          </div>
          {!isCollapsed && <img src={Icons.arrow1} alt="Drop" className="w-[20px] h-[20px] object-contain invert brightness-0 opacity-70" />}
        </button>

        {/* Menu Section */}
        {menuGroup && (
          <div className="flex flex-col shrink-0">
            {!isCollapsed && (
              <h3 className="font-sans font-normal text-[14px] leading-[17px] text-[#898989] mb-[12px] px-[16px]">
                {menuGroup.title}
              </h3>
            )}
            <div className={`flex flex-col gap-[10px] ${isCollapsed ? "items-center" : "w-full"}`}>
              {menuGroup.items.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `relative ${isCollapsed ? "w-[48px] justify-center px-0" : "w-full px-[16px]"} h-[40px] shrink-0 flex items-center gap-[11px] rounded-[10px] transition-all duration-200 ${
                      isActive
                        ? "bg-active-bg shadow-active font-normal text-[#000000]"
                        : "bg-transparent font-light text-[#898989] hover:bg-gray-50 hover:text-[#000000]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <img
                        src={isActive && item.activeIcon ? item.activeIcon : item.icon}
                        alt={item.label}
                        className={`w-[20px] h-[20px] shrink-0 transition-opacity duration-200 ${
                          isActive ? "opacity-100" : "opacity-60"
                        }`}
                      />
                      {!isCollapsed && <span className="font-sans text-[16px] leading-[19px] whitespace-nowrap">{item.label}</span>}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {/* Quick Access Section */}
        {quickAccessGroup && (
          <div className="flex flex-col shrink-0">
            {!isCollapsed && (
              <h3 className="font-sans font-normal text-[14px] leading-[17px] text-[#898989] mb-[12px] px-[16px]">
                {quickAccessGroup.title}
              </h3>
            )}
            <div className={`flex flex-col gap-[10px] ${isCollapsed ? "items-center" : "w-full"}`}>
              {quickAccessGroup.items.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `relative ${isCollapsed ? "w-[48px] justify-center px-0" : "w-full px-[16px]"} h-[40px] shrink-0 flex items-center gap-[11px] rounded-[10px] transition-all duration-200 ${
                      isActive
                        ? "bg-active-bg shadow-active font-normal text-[#000000]"
                        : "bg-transparent font-light text-[#898989] hover:bg-gray-50 hover:text-[#000000]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    item.id === "ai-mentor" ? (
                      // Custom layout for AI Mentor to match Figma's icon size and badge
                      <>
                        <img
                          src={isActive && item.activeIcon ? item.activeIcon : item.icon}
                          alt={item.label}
                          className={`w-[23px] h-[23px] shrink-0 transition-opacity duration-200 ${
                            isActive ? "opacity-100" : "opacity-60"
                          }`}
                        />
                        {!isCollapsed && <span className="font-sans text-[16px] leading-[19px] ml-[-3px] whitespace-nowrap">{item.label}</span>}
                        {!isCollapsed && (
                          <div className="absolute right-[14px] top-[12.5px] w-[36px] h-[15px] bg-primary rounded-[10px] flex items-center justify-center">
                            <span className="font-sans font-normal text-[10px] text-white leading-none">New</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <img
                          src={isActive && item.activeIcon ? item.activeIcon : item.icon}
                          alt={item.label}
                          className={`w-[20px] h-[20px] shrink-0 transition-opacity duration-200 ${
                            isActive ? "opacity-100" : "opacity-60"
                          }`}
                        />
                        {!isCollapsed && <span className="font-sans text-[16px] leading-[19px] whitespace-nowrap">{item.label}</span>}
                      </>
                    )
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {/* Separator and Bottom Section (Inside scroll view) */}
        {bottomGroup && (
          <div className="flex flex-col pt-[8px] shrink-0">
            <div className="h-[0.5px] bg-gray-300 mb-[24px] mx-[16px]" />
            <div className={`flex flex-col gap-[10px] ${isCollapsed ? "items-center" : "w-full"}`}>
              {bottomGroup.items.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `relative ${isCollapsed ? "w-[48px] justify-center px-0" : "w-full px-[16px]"} h-[40px] shrink-0 flex items-center gap-[11px] rounded-[10px] transition-all duration-200 ${
                      isActive
                        ? "bg-active-bg shadow-active font-normal text-[#000000]"
                        : "bg-transparent font-light text-[#898989] hover:bg-gray-50 hover:text-[#000000]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <img
                        src={isActive && item.activeIcon ? item.activeIcon : item.icon}
                        alt={item.label}
                        className={`w-[20px] h-[20px] shrink-0 transition-opacity duration-200 ${
                          isActive ? "opacity-100" : "opacity-60"
                        }`}
                      />
                      {!isCollapsed && <span className="font-sans text-[16px] leading-[19px] whitespace-nowrap">{item.label}</span>}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
      )}
    </aside>
  );
};

export default Sidebar;