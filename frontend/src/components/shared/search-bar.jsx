import React from "react";
import { Icons } from "../../assets/icons/icons";

export const SearchBar = ({ 
  placeholder = "Search", 
  value, 
  onChange, 
  onKeyDown,
  shortcutText = "Ctrl + k",
  className = ""
}) => {
  return (
    <>
      {/* Mobile Icon Button */}
      <button className="md:hidden w-10 h-10 rounded-full bg-white border-[0.4px] border-[#B9BEC7] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:opacity-85 transition-opacity">
        <img 
          src={Icons.search || "/search-icon.svg"} 
          alt="Search" 
          className="w-[20px] h-[20px]" 
        />
      </button>

      {/* Desktop Search Input */}
      <div className={`hidden md:flex relative w-[280px] h-[40px] items-center bg-white border-[0.5px] border-gray-500 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.08)] rounded-[50px] ${className}`}>
        <img 
          src={Icons.search || "/search-icon.svg"} 
          alt="Search" 
          className="absolute left-[9px] w-[25px] h-[25px]" 
        />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="w-full h-full pl-[42px] pr-[55px] bg-transparent text-[16px] font-light text-[#292929] placeholder-[#292929] outline-none rounded-[50px] border-none"
        />
        {shortcutText && (
          <div className="absolute right-[10px] w-[37px] h-[19px] border-[0.5px] border-[#B9BEC7] rounded-[50px] flex items-center justify-center bg-white pointer-events-none">
            <span className="font-sans font-light text-[7.5px] text-black">
              {shortcutText}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
