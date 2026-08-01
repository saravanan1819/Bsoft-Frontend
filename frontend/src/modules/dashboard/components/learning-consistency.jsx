import React from "react";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];


export const formatDuration = (minutes = 0) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs <= 0) return `${mins}m`;
  if (mins === 0) return `${hrs}h`;
  return `${hrs}h ${mins}m`;
};

const formatCellDate = (date) =>
  `${MONTH_LABELS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

const getActivityColorClass = (minutes = 0, dailyGoalMinutes = 120) => {
  switch (true) {
    case minutes <= 0:
      return "bg-[#F2F2F2]"; // no activity
    case minutes < 30:
      return "bg-[#E8F5D8]"; // minimal activity
    case minutes < 60:
      return "bg-[#CFEBA7]"; // 30 min - 1 hr: low activity (yellow)
    case minutes < dailyGoalMinutes:
      return "bg-[#B3E36F]"; // 1 - 2 hr: medium activity (orange)
    case minutes < dailyGoalMinutes * 2:
      return "bg-[#9AD84A]"; // 2 - 4 hr: goal achieved (green)
    default:
      return "bg-[#6FB92A]"; // 4+ hr: goal exceeded (darker green)
  }
};

const toDateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

// Monday-first weekday index (native getDay() is Sunday-first: 0-6)
const getMondayFirstWeekday = (date) => (date.getDay() + 6) % 7;


const buildMonthColumns = (year, monthIndex, activityData, dailyGoalMinutes) => {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDay = new Date(year, monthIndex, 1);
  const leadingBlanks = getMondayFirstWeekday(firstDay);

  const cells = [];
  for (let i = 0; i < leadingBlanks; i++) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, monthIndex, day);
    const key = toDateKey(date);
    cells.push({
      date,
      minutes: activityData[key] ?? 0,
      colorClass: getActivityColorClass(activityData[key] ?? 0, dailyGoalMinutes),
    });
  }

  // Group into weekday columns 
  const columns = [];
  for (let i = 0; i < cells.length; i += 7) {
    columns.push(cells.slice(i, i + 7));
  }
  return columns;
};


export const LearningConsistencyHeatmap = ({
  activityData = {},
  year = new Date().getFullYear(),
  dailyGoalMinutes = 120,
  monthsToShow,
}) => {
  const today = new Date();
  const lastMonthIndex =
    monthsToShow ?? (year === today.getFullYear() ? today.getMonth() : 11);

  const months = Array.from({ length: lastMonthIndex + 1 }, (_, monthIndex) => ({
    name: MONTH_LABELS[monthIndex],
    columns: buildMonthColumns(year, monthIndex, activityData, dailyGoalMinutes),
  }));

  return (
    <div className="w-full overflow-x-auto no-scrollbar mt-[16px] pt-[12px] pb-[20px]">
      <div className="flex gap-[16px] items-start pl-[8px] min-w-max">
        <div className="flex flex-col gap-[5px] h-[128px] justify-between text-[#737373] text-[9px] font-normal font-sans pr-[12px] shrink-0 pt-[2px] box-border">
          {DAY_LABELS.map((day) => (
            <span key={day} className="h-[14px] flex items-center leading-none">
              {day}
            </span>
          ))}
        </div>

        {/* Heatmap Grid learning consistency */}
        <div className="flex gap-[12px] items-start">
        {months.map((month) => (
          <div key={month.name} className="flex flex-col items-center">
            <div className="flex gap-[5px]">
              {month.columns.map((column, colIdx) => (
                <div
                  key={colIdx}
                  className="flex flex-col gap-[5px] h-[128px] w-[14px] justify-start"
                >
                  {column.map((cell, cellIdx) =>
                    cell ? (
                      <div key={cellIdx} className="relative group shrink-0">
                        <div
                          className={`w-[14px] h-[14px] rounded-[1px] border-[0.4px] border-[rgba(218,218,218,0.87)] hover:border-black transition-colors duration-200 ${cell.colorClass}`}
                        />
                        <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-[6px] whitespace-nowrap rounded-[10px] bg-white px-[10px] py-[6px] text-[11px] font-sans font-normal text-black opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20 shadow-md border border-[#EAEAEA]">
                          {formatDuration(cell.minutes)} learned on {formatCellDate(cell.date)}
                        </div>
                      </div>
                    ) : (
                      <div key={cellIdx} className="w-[14px] h-[14px] shrink-0" />
                    )
                  )}
                </div>
              ))}
            </div>
            <span className="font-sans font-normal text-[12px] text-[#424242] mt-[12px] leading-none">
              {month.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default LearningConsistencyHeatmap;