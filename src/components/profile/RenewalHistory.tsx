"use client";
import React from "react";
import * as Icons from "lucide-react";

const FieldIconResolver = ({ type }) => {
  switch (type) {
    case "start":
      return (
        <Icons.CornerDownRight className="w-3.5 h-3.5 text-slate-400 rotate-180 shrink-0" />
      );
    case "issued":
      return <Icons.Check className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    case "user":
      return <Icons.User className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    case "target":
    case "expires":
    case "expired":
      return (
        <div className="w-3.5 h-3.5 border border-slate-400 rounded-sm bg-white shrink-0" />
      );
    default:
      return null;
  }
};

export default function RenewalHistory({ config }) {
  return (
    <div className={`w-full   space-y-3 bg-transparent`}>
      {config.cycles.map((cycle) => {
        const theme = config[cycle.statusType];

        const DynamicStatusIcon = (Icons[
          theme.iconName as keyof typeof Icons
        ] || Icons.Check) as React.ComponentType<{ className?: string }>;
        const columnCount = cycle.fields.length;

        return (
          <div
            key={cycle.id}
            className={`w-full bg-white rounded-xl border ${theme.border} overflow-hidden`}
          >
            <div
              className={`px-4 py-3 flex items-center justify-between ${theme.headerBg}`}
            >
              <div className="flex items-center space-x-1.5 text-[14.5px]">
                <span className={`font-bold ${theme.titleColor}`}>
                  {cycle.title}
                </span>
                <span className="text-slate-400 font-semibold">•</span>
                <span className="text-slate-500 font-semibold">
                  {cycle.subtitle}
                </span>
              </div>
              <div
                className={`flex items-center space-x-1 text-[11px] px-2 py-0.5 rounded-md tracking-wide ${theme.badge}`}
              >
                <DynamicStatusIcon className={`w-3 h-3 `} />
                <span>{cycle.statusText}</span>
              </div>
            </div>

            <div
              className="grid border-t border-inherit divide-x divide-slate-100 max-md:grid-cols-1 max-md:divide-x-0 max-md:divide-y"
              style={{
                gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
              }}
            >
              {cycle.fields.map((field, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2.5 px-4 py-3 min-w-0"
                >
                  <FieldIconResolver type={field.iconType} />
                  <div className="text-[13px] truncate">
                    <span className="text-slate-400 font-normal mr-1">
                      {field.label}
                    </span>
                    <span className="text-slate-800 font-semibold">
                      {field.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
