import React from "react";
import { Mail, Clock, Calendar, User } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  statusType: string;
  statusText: string;
  countdownText: string;
  dateText: string;
  recipientsCountText: string;
  emails: string[];
}

interface ThemeConfig {
  border: string;
  dotColor: string;
  badge: string;
}

interface RenewalRemindersConfig {
  id: string;
  title: string;
  description: string;
  themes: Record<string, ThemeConfig>;
  notifications: Notification[];
}

interface Props {
  config: RenewalRemindersConfig;
}

export default function RenewalReminders({ config }: Props) {
  if (!config) return null;

  return (
    <div className="bg-white  max-w-2xl mx-auto space-y-4">
      {config.notifications?.map((notif) => {
        const currentTheme =
          config.themes[notif.statusType] || config.themes["sent"];

        const isInlineLayout = notif.emails.length > 2;

        return (
          <div
            key={notif.id}
            className={`p-3 rounded-xl border transition-all bg-white  border-gray-200`}
          >
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${currentTheme.dotColor}`}
                />
                <h3 className="text-[14px] font-semibold text-[#1e293b]">
                  {notif.title}
                </h3>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium ${currentTheme.badge}`}
              >
                {notif.statusText}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4 text-[12px] text-[#64748b]">
              <div className="flex items-center gap-1.5 bg-[#f1f5f9] px-2.5 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5 text-[#94a3b8]" />
                <span className="font-medium text-[#475569]">
                  {notif.countdownText}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#f1f5f9] px-2.5 py-1 rounded-md">
                <Calendar className="w-3.5 h-3 text-[#94a3b8]" />
                <span className="font-medium text-[#475569]">
                  {notif.dateText}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#f1f5f9] px-2.5 py-1 rounded-md">
                <User className="w-3.5 h-3 text-[#94a3b8]" />
                <span className="font-medium text-[#475569]">
                  {notif.recipientsCountText}
                </span>
              </div>
            </div>

            <div className="bg-[#f8fafc] rounded-lg p-1 border border-[#f1f5f9]">
              <div
                className={`text-[13px] text-[#475569] font-medium ${
                  isInlineLayout
                    ? "flex flex-wrap items-center gap-x-2 gap-y-1"
                    : "flex flex-col gap-2"
                }`}
              >
                {notif.emails.map((email, idx) => (
                  <div key={email} className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3 text-[#94a3b8] shrink-0" />
                    <span className="break-all text-[#475569]">
                      {email}
                      {isInlineLayout && idx < notif.emails.length - 1 && (
                        <span className="text-[#cbd5e1] ml-2 font-normal">
                          •
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
