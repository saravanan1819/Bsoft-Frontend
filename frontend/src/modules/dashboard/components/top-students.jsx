import React from "react";
import { Icons } from "../../../assets/icons/icons.js";

const topStudentsData = [
  { rank: 1, name: "Aakash", xp: "6590 XP", avatarBg: "bg-[#84CC16]" },
  { rank: 2, name: "Jabez", xp: "6590 XP", avatarBg: "bg-[#8B5CF6]" },
  { rank: 3, name: "Aslam", xp: "6590 XP", avatarBg: "bg-[#0EA5E9]" },
  { rank: 4, name: "Manishwar", xp: "6590 XP", avatarBg: "bg-[#EF4444]" },
  { rank: 5, name: "Sabarish", xp: "6590 XP", avatarBg: "bg-[#F59E0B]" },
  { rank: 6, name: "Sudhershan", xp: "6590 XP", avatarBg: "bg-[#06B6D4]" },
  { rank: 7, name: "Saravanan ( You )", xp: "6590 XP", avatarBg: "bg-[#78350F]", isUser: true },
];

export const TopStudentsCard = () => {
  return (
    <div className="w-full h-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[20px] p-[20px] box-border flex flex-col justify-between gap-[18px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
            <img src={Icons.userGroup || Icons.students} alt="Students" className="w-[16px] h-[16px]" />
          </div>
          <h3 className="font-sans font-semibold text-[15px] text-black flex items-center gap-[5px]">
            Top Students
            <img src={Icons.alertCircle} alt="Info" className="w-[14px] h-[14px] cursor-help opacity-70" />
          </h3>
        </div>

        <button className="flex items-center gap-[4px] px-[14px] py-[5px] border border-[#B9BEC7] rounded-full text-[13px] font-sans font-medium text-black hover:bg-gray-50 cursor-pointer">
          See All <span className="text-[11px] ml-[2px]">›</span>
        </button>
      </div>

      {/* Table Container Card */}
      <div className="w-full bg-[#F0F1F3] border-[0.5px] border-[#E5E7EB] rounded-[18px] p-[1px] overflow-hidden box-border">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[460px]">
            <thead>
              <tr className="text-[#0C0C0C] text-[12px] font-sans font-medium tracking-normal">
                <th className="py-[12px] px-[16px] w-[110px] relative font-medium text-[#0C0C0C]">
                  <div className="flex items-center justify-between">
                    <span>Rank</span>
                    <span className="h-[12px] w-[1px] bg-[#D1D5DB]" />
                  </div>
                </th>
                <th className="py-[12px] px-[16px] relative font-medium text-[#0C0C0C]">
                  <div className="flex items-center justify-between">
                    <span>Name</span>
                    <span className="h-[12px] w-[1px] bg-[#D1D5DB]" />
                  </div>
                </th>
                <th className="py-[12px] px-[16px] w-[140px] font-medium text-[#0C0C0C]">XP Point</th>
                <th className="py-[12px] pr-[16px] w-[36px]"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E5E7EB]">
              {topStudentsData.map((student) => (
                <tr
                  key={student.rank}
                  className={student.isUser ? "bg-[#F0FDF4]" : "bg-white"}
                >
                  {/* Rank Column */}
                  <td className="py-[10px] pl-[20px] pr-[10px]">
                    {student.rank === 1 && (
                      <img src={Icons.firstPlace} alt="1st" className="w-[23px] h-[23px]" />
                    )}
                    {student.rank === 2 && (
                      <img src={Icons.secondPlace} alt="2nd" className="w-[23px] h-[23px]" />
                    )}
                    {student.rank === 3 && (
                      <img src={Icons.thirdPlace} alt="3rd" className="w-[23px] h-[23px]" />
                    )}
                    {student.rank > 3 && (
                      <span className="font-sans font-medium text-[13px] text-black pl-[6px]">
                        {student.rank}
                      </span>
                    )}
                  </td>

                  {/* Name Column */}
                  <td className="py-[10px] px-[10px]">
                    <div className="flex items-center gap-[9px]">
                      <div className={`w-[26px] h-[26px] rounded-full border border-[#B9BEC7] overflow-hidden flex items-center justify-center shrink-0 ${student.avatarBg}`}>
                        <img 
                          src={Icons.profile || "/hero.png"} 
                          alt={student.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <span className="font-sans font-medium text-[13px] text-black">
                        {student.name}
                      </span>
                    </div>
                  </td>

                  {/* XP Point Column */}
                  <td className="py-[10px] px-[14px] font-sans font-medium text-[13px] text-black">
                    {student.xp}
                  </td>

                  {/* View Eye Icon */}
                  <td className="py-[10px] pr-[16px] text-right">
                    <button className="w-[24px] h-[24px] rounded-full border border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] hover:text-black hover:border-gray-400 cursor-pointer bg-white transition-colors">
                      <img src={Icons.view} alt="View" className="w-[13px] h-[13px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopStudentsCard;
