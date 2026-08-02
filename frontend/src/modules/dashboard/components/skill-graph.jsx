import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Icons } from "../../../assets/icons/icons.js";


const LINE_SERIES = [
  { dataKey: "frontend", name: "Frontend", color: "#FF8A34" },
  { dataKey: "backend", name: "Backend", color: "#B175FF" },
  { dataKey: "cybersecurity", name: "Cyber Security", color: "#3B72F6" },
  { dataKey: "aws", name: "AWS", color: "#22C55E" },
];


const PERIOD_TABS = [
  { id: "all-time", label: "All Time" },
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
];

// Custom inner label renderer for Recharts Donut Pie slices
const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#FFFFFF"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="11"
      fontWeight="600"
      fontFamily="sans-serif"
    >
      {`${value}%`}
    </text>
  );
};

// Custom Tooltip component for Recharts LineChart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-[10px] shadow-md font-sans">
        <p className="text-[12px] font-semibold text-black mb-[4px]">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-[6px] text-[12px]">
            <span
              className="w-[8px] h-[8px] rounded-full inline-block"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[#404040]">{entry.name}:</span>
            <span className="font-semibold text-black">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};


export const SkillGraphCard = ({ data = {}, onRefresh }) => {
  const [activePeriod, setActivePeriod] = useState(PERIOD_TABS[0].id);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await onRefresh?.(activePeriod);
    } finally {
      setIsRefreshing(false);
    }
  };


  const activeDataset = data[activePeriod] ?? {};
  const {
    lineData = [],
    pieData = [],
    overallPercent = 0,
    indicatorBars = [],
  } = activeDataset;

  return (
    <div className="w-full bg-white border-[0.5px] border-[#B9BEC7] rounded-[24px] p-[24px] box-border flex flex-col gap-[20px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="w-[36px] h-[36px] rounded-full border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center shrink-0">
            <img src={Icons.learningConsistency} alt="Skill Graph" className="w-[18px] h-[18px]" />
          </div>
          <h3 className="font-sans font-semibold text-[16px] text-black flex items-center gap-[6px]">
            Skill Growth
            <img
              src={Icons.alertCircle}
              alt="Info"
              className="w-[15px] h-[15px] cursor-help opacity-70"
            />
          </h3>
        </div>

        {/* Refresh + Toggle Switch */}
        <div className="flex items-center gap-[10px]">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            aria-label="Refresh skill graph"
            className="w-[32px] h-[32px] rounded-full border-[0.5px] border-[#B9BEC7] bg-white flex items-center justify-center shrink-0 hover:bg-[#F4F4F5] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#404040"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isRefreshing ? "animate-spin" : ""}
            >
              <path d="M21 12a9 9 0 1 1-2.64-6.36" />
              <path d="M21 3v6h-6" />
            </svg>
          </button>

          <div className="bg-[#F4F4F5] p-[3px] rounded-full flex items-center">
            {PERIOD_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePeriod(tab.id)}
                className={`px-[16px] py-[4px] text-[12px] font-medium rounded-full transition-all duration-200 ${
                  activePeriod === tab.id
                    ? "bg-white text-black shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                    : "text-[#71717A] hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Display */}
      <div className="flex items-center gap-[12px] mt-[-4px]">
        <span className="font-sans font-bold text-[32px] text-black leading-none">
          {overallPercent} %
        </span>
        <div className="flex items-center gap-[4px] h-[28px]">
          {indicatorBars.map((color, idx) => (
            <div
              key={idx}
              className="w-[4px] h-[28px] rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="flex flex-col lg:flex-row items-stretch gap-[20px] w-full">
        {/* Recharts Line Graph Section */}
        <div className="flex-1 relative min-h-[240px] flex flex-col justify-between">
          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={true}
                  horizontal={true}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 13, fill: "#0D0D0D", fontFamily: "sans-serif" }}
                  dy={8}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 13, fill: "#0D0D0D", fontFamily: "sans-serif" }}
                />
                <Tooltip content={<CustomTooltip />} />

                {LINE_SERIES.map((series) => (
                  <Line
                    key={series.dataKey}
                    type="linear"
                    dataKey={series.dataKey}
                    name={series.name}
                    stroke={series.color}
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: series.color }}
                    connectNulls={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Embedded Recharts Donut Pie Chart Card */}
        <div className="w-full lg:w-[220px] bg-[#FAFAFA] border-[0.5px] border-[#D1D5DB] rounded-[20px] p-[20px] flex items-center justify-center shrink-0 min-h-[200px]">
          <div className="w-[150px] h-[150px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={58}
                  paddingAngle={4}
                  cornerRadius={6}
                  startAngle={90}
                  endAngle={-270}
                  label={renderPieLabel}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-center gap-[24px] pt-[8px]">
        {pieData.map((item) => (
          <div key={item.name} className="flex items-center gap-[8px]">
            <div
              className="w-[12px] h-[12px] rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-sans text-[14px] text-[#404040] font-normal">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillGraphCard;