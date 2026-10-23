import React from "react";

interface ThemeConfig {
  color: string;
  bg: string;
}

const STATUS_STYLES: Record<string, ThemeConfig> = {
  created: { color: "#4F46E5", bg: "#EEF2FF" },
  docs: { color: "#C2410C", bg: "#FFF7ED" },
  approved: { color: "#16A34A", bg: "#DCFCE7" },
  returned: { color: "#DC2626", bg: "#FEE2E2" },
  alert: { color: "#D97706", bg: "#FEF3C7" },
  edited: { color: "#4F46E5", bg: "#E0E7FF" },
  renewal: { color: "#0891B2", bg: "#CFFAFE" },
};

const DEFAULT_THEME: ThemeConfig = {
  color: "#64748B",
  bg: "#F1F5F9",
};

export interface ActivityLogItem {
  id?: string;
  user?: string;
  action: string;
  target?: string;
  timestamp: string;
  status?: {
    text: string;
    type: string;
  };
}

interface ActivityTimelineProps {
  logsConfig: ActivityLogItem[];
}

export default function ActivityTimeline({
  logsConfig,
}: ActivityTimelineProps) {
  if (!logsConfig || !Array.isArray(logsConfig) || logsConfig.length === 0) {
    return (
      <div className="text-sm text-slate-400 p-6 text-center bg-white rounded-xl border border-slate-100">
        No timeline activity logs available.
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl">
      <div className="flex flex-col">
        {logsConfig.map((item, index) => {
          const statusKey = item.status?.type?.toLowerCase() || "";
          const theme = STATUS_STYLES[statusKey] || DEFAULT_THEME;

          const isLastItem = index === logsConfig.length - 1;

          return (
            <div key={item.id || index} className="flex">
              <div className="flex flex-col items-center shrink-0 w-8">
                <div className="relative z-10 flex items-center justify-center h-5 w-5 mt-1">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: theme.color }}
                  />
                </div>

                {!isLastItem && (
                  <div className="w-[1.5px] bg-slate-100 flex-grow my-1 min-h-[40px]" />
                )}
              </div>

              <div className="flex flex-1 items-start justify-start pb-7 pl-2 min-w-0 gap-4">
                <div className="flex flex-col min-w-0 mt-0.5">
                  <p className="text-[13.5px] text-slate-700 leading-normal font-medium break-words">
                    {item.user && item.user.trim() !== "" && (
                      <span className="font-semibold text-slate-900">
                        {item.user}{" "}
                      </span>
                    )}
                    {item.action}
                    {item.target && item.target.trim() !== "" && (
                      <span className="font-semibold text-slate-900">
                        {" "}
                        {item.target}
                      </span>
                    )}
                  </p>

                  <span className="text-[11px] text-[#64748B] mt-1 font-normal tracking-wide">
                    {item.timestamp}
                  </span>
                </div>

                <span
                  className="text-[12px] px-2 py-0.5 rounded-2xl font-bold shrink-0 tracking-wide select-none h-fit mt-0.5"
                  style={{ color: theme.color, backgroundColor: theme.bg }}
                >
                  {item.status?.text || "Update"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
