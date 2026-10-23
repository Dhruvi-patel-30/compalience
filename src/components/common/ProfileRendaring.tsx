"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileConfig, complianceConfig } from "@/config/profileConfig";
import ProfileDataHeader from "../ui/ProfileDataHeader";
import { RootState } from "@/redux/store";
import { setActiveComplianceTab } from "@/redux/slices/complienceDetail";
import Heading from "@/components/ui/Heading";
import {
  Check,
  ArrowRight,
  DollarSign,
  Info,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import DocumentListLayout from "@/components/profile/DocumentListLayout";
import ToggleGridLayout from "@/components/profile/ToggleGridLayout";
import TimelineHistoryLayout from "@/components/profile/TimelineHistoryLayout";
import ActivityTimeline from "../profile/ActivityTimeline";
import RenewalHistory from "@/components/profile/RenewalHistory";
import RenewalReminders from "../profile/RenewalReminders";

interface DynamicField {
  id: string;
  label: string;
  value?: unknown;
  type?: string;
  color?: string;
  initials?: string;
  subtitle?: string;
  bgClass?: string;
}

interface ContentItem {
  heading: string;
  value: string;
}

interface CostItem {
  label: string;
  value: string;
  isTotal?: boolean;
}

interface TimelineItem {
  id?: string;
  title: string;
  description?: string;
  date?: string;
  status: string;
}

interface ComplianceSection {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: string;
  content?: ContentItem[];
  fields?: DynamicField[];
}

interface SidebarSection {
  id?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: string;
  costSummary?: CostItem[];
  timeline?: TimelineItem[];
}

interface ApprovalPerson {
  id: string;
  name: string;
  role: string;
  status: string;
  date: string;
  description: string;
  initials: string;
}

interface ApprovalHistoryItem {
  id: string;
  name: string;
  role: string;
  status: string;
  date: string;
  comment: string;
}

interface ApprovalAction {
  label: string;
  value: string;
}

interface ApprovalConfig {
  workflow: ApprovalPerson[];
  history: ApprovalHistoryItem[];
  actionRequired: {
    title: string;
    status: string;
    description: string;
    currentStage: string;
    conditions: string[];
    actions: ApprovalAction[];
  };
}

interface ComplianceTab {
  id: string;
  label: string;
  sections?: ComplianceSection[];
  sidebar?: SidebarSection[];
  data?: {
    name: string;
    meta?: {
      title?: string;
      code?: string;
      category?: string;
      expiryWarning?: string;
      badges?: {
        label: string;
        variant: string;
      }[];
    };
    data?: {
      id: string;
      label: string;
      value: string;
      subtext?: string;
      variant?: string;
    }[];
    approval?: ApprovalConfig;
  }[];
}

const badgeColors: Record<string, string> = {
  red: "border-red-100 bg-red-50 text-red-600",
  blue: "border-blue-100 bg-blue-50 text-[#153AC7]",
  green: "border-green-100 bg-green-50 text-green-700",
  yellow: "border-amber-100 bg-amber-50 text-amber-700",
};

const timelineStatusConfig: Record<
  string,
  { bg: string; text: string; icon: React.ReactNode }
> = {
  completed: {
    bg: "bg-green-50 border-green-200",
    text: "text-green-600",
    icon: <Check size={10} strokeWidth={3} />,
  },
  warning: {
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-600",
    icon: <Info size={10} strokeWidth={3} />,
  },
  upcoming: {
    bg: "bg-blue-50 border-blue-200",
    text: "text-[#153AC7]",
    icon: <RotateCcw size={10} />,
  },
  pending: {
    bg: "bg-slate-50 border-slate-200",
    text: "text-slate-400",
    icon: <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />,
  },
  expiry: {
    bg: "bg-orange-50 border-orange-200",
    text: "text-orange-500",
    icon: <ArrowRight size={10} strokeWidth={3} />,
  },
};

const summaryColors: Record<string, string> = {
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-red-200 bg-red-50 text-red-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
  neutral: "border-slate-200 bg-slate-50 text-slate-600",
};

const displayValue = (value: unknown): React.ReactNode => {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  if (Array.isArray(value)) {
    return value.map(String).join(", ");
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }
  return "—";
};

/*Main section  */
const ProfileRendering = () => {
  const dispatch = useDispatch();
  const [selectedAction, setSelectedAction] = useState("");
  const [remarks, setRemarks] = useState("");

  const activeTabId = useSelector(
    (state: RootState) => state.detail.activeComplianceTab,
  );

  const tabs = complianceConfig as unknown as ComplianceTab[];
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  console.log("activeTab", activeTab);

  const profileData = ProfileConfig.find((item) => item.name === "profileData");

  if (!activeTab) {
    return (
      <div className="p-4 text-sm text-slate-500">No compliance tab found.</div>
    );
  }

  const hasSidebar = Boolean(activeTab.sidebar?.length || activeTab.approval);
  const hasSections = Boolean(activeTab.sections?.length);
  const hasData = Boolean(activeTab.data?.length);
  const hasApproval = Boolean(activeTab.approval);

  return (
    <div className="flex min-h-full w-full min-w-0 flex-col bg-[#F8F9FC] pb-8">
      <ProfileDataHeader profileData={profileData} />

      <div className="w-full min-w-0 border-b border-slate-200 bg-white">
        <div className="flex min-w-0 gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* list */}
          {tabs.map((tab) => {
            const isActive = activeTab.id === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => dispatch(setActiveComplianceTab(tab.id))}
                aria-pressed={isActive}
                className={`cursor-pointer relative flex shrink-0 items-center gap-2 whitespace-nowrap px-4 py-3.5 text-[13.5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? "font-semibold text-[#153AC7] after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-full after:bg-[#153AC7]"
                    : "font-medium text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`bg-[#F5F6FA] rounded-full w-5 ${isActive ? "text-[#153AC7]" : "text-[#64748B]"}`}
                >
                  1
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Layout */}
      <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <div
            className={`min-w-0 space-y-5 ${
              hasSidebar ? "lg:col-span-2" : "lg:col-span-3"
            }`}
          >
            {hasSections &&
              activeTab.sections?.map((section) => {
                const SectionIcon = section.icon;

                return (
                  <section
                    key={section.id}
                    className="min-w-0 overflow-hidden rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <Heading section={section} SectionIcon={SectionIcon} />
                    {section.content && (
                      <div className="mt-4 space-y-4 border-t border-slate-50 pt-4">
                        {section.content.map((item, index) => (
                          <div key={index} className="space-y-1">
                            <h4 className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                              {item.heading}
                            </h4>

                            <p className="break-words text-[13px] leading-relaxed text-slate-600">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {section.displayLayout === "document-list-layout" && (
                      <DocumentListLayout fields={section.fields} />
                    )}

                    {section.displayLayout === "toggle-grid-layout" && (
                      <ToggleGridLayout fields={section.fields} />
                    )}

                    {section.displayLayout === "timeline-history-layout" && (
                      <TimelineHistoryLayout fields={section.fields} />
                    )}

                    {section.historyItems &&
                      section.historyItems.length > 0 && (
                        <div className="mt-5 space-y-5 ">
                          {section.historyItems.map((item) => {
                            const isWarning = item.variant === "warning";

                            return (
                              <div
                                key={item.id}
                                className={`relative overflow-hidden rounded-xl p-5 `}
                              >
                                <div
                                  className={`absolute bottom-0 left-0 top-0 w-1 rounded-l-xl ${
                                    isWarning ? "bg-[#D97706]" : "bg-[#16A34A]"
                                  }`}
                                />

                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <h3 className="text-[14px] font-semibold text-[#1E293B]">
                                    {item.title} <span className="">—</span>{" "}
                                    <span className="">{item.status}</span>
                                  </h3>
                                  <span
                                    className={`rounded-xl px-2 py-1 text-[11px] font-semibold tracking-wide ${
                                      isWarning
                                        ? "bg-[#FEF3C7] text-[#F97316] "
                                        : "bg-[#DCFCE7] text-[#16A34A] "
                                    }`}
                                  >
                                    {item.status}
                                  </span>
                                </div>

                                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12px] text-slate-500">
                                  {item.startedDate && (
                                    <p>
                                      Started:{" "}
                                      <span className="font-semibold text-slate-700">
                                        {item.startedDate}
                                      </span>
                                    </p>
                                  )}
                                  {item.targetDate && (
                                    <p>
                                      Target:{" "}
                                      <span className="font-semibold text-slate-700">
                                        {item.targetDate}
                                      </span>
                                    </p>
                                  )}
                                  {item.completedDate && (
                                    <p>
                                      Completed:{" "}
                                      <span className="font-semibold text-slate-700">
                                        {item.completedDate}
                                      </span>
                                    </p>
                                  )}
                                  {item.duration && (
                                    <p>
                                      Duration:{" "}
                                      <span className="font-semibold text-slate-700">
                                        {item.duration}
                                      </span>
                                    </p>
                                  )}
                                  <p>
                                    Handler:{" "}
                                    <span className="font-semibold text-slate-700">
                                      {item.handler}
                                    </span>
                                  </p>
                                </div>

                                {item.stages && item.stages.length > 0 && (
                                  <div className="mt-4 space-y-3">
                                    <p className="text-[11px] font-medium tracking-wide text-slate-400">
                                      Renewal progress · Stage{" "}
                                      {item.currentStage} of {item.totalStages}
                                    </p>

                                    <div className="relative h-1.5 w-full rounded-full bg-slate-100">
                                      <div
                                        className="h-full rounded-full bg-amber-500"
                                        style={{
                                          width: `${((item.currentStage || 1) / (item.totalStages || 4)) * 100}%`,
                                        }}
                                      />
                                    </div>

                                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-4">
                                      {item.stages.map((stage) => {
                                        const isCompleted =
                                          stage.status === "completed";
                                        const isActive =
                                          stage.status === "active";

                                        return (
                                          <div
                                            key={stage.id}
                                            className={`flex flex-col justify-center rounded-lg border p-3 transition-colors ${
                                              isCompleted
                                                ? "border-green-100 bg-[#DCFCE7] text-[#16A34A]"
                                                : isActive
                                                  ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#153AC7] shadow-sm"
                                                  : "border-slate-100 bg-slate-50/50 text-slate-400"
                                            }`}
                                          >
                                            <div className="flex items-center gap-1.5">
                                              {isCompleted && (
                                                <span className="flex h-3.5 w-3.5 items-center justify-center text-[12px] font-bold text-[#16A34A]">
                                                  ✓
                                                </span>
                                              )}
                                              {isActive && (
                                                <span className="text-[11px] font-bold text-[#153AC7] mr-0.5">
                                                  ➔
                                                </span>
                                              )}
                                              <span className="text-[12px] font-semibold">
                                                {stage.label}
                                              </span>
                                            </div>

                                            {stage.date ? (
                                              <span className="mt-1 text-[11px] text-[#64748B] font-medium opacity-80">
                                                {stage.date}
                                              </span>
                                            ) : stage.subtext ? (
                                              <span className="mt-1 text-[#64748B] text-[11px] font-medium opacity-70">
                                                {stage.subtext}
                                              </span>
                                            ) : null}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                                {!item.stages && (
                                  <div className="mt-4 h-1.5 w-full rounded-full bg-green-500" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                    {section.logs && (
                      <ActivityTimeline logsConfig={section.logs} />
                    )}
                    {/* Fields */}
                    {section.fields && (
                      <div className="mt-4 grid min-w-0 grid-cols-1 gap-x-4 border-t border-slate-50 pt-3 sm:grid-cols-2 xl:grid-cols-3">
                        {section.fields.map((field) => {
                          const isUserProfile = field.type === "user-profile";
                          const isMultiBadge = field.type === "multi-badge";
                          const isBadge = field.type === "badge";
                          const isLink = field.type === "link";

                          return (
                            <div
                              key={field.id}
                              className="min-w-0 space-y-1.5 border-b border-slate-50 py-3"
                            >
                              <label className="block text-[10.5px] font-medium tracking-wide text-slate-400">
                                {field.label}
                              </label>

                              {/* User Profile */}
                              {isUserProfile && (
                                <div className="flex min-w-0 items-center gap-2">
                                  <div
                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                                      field.bgClass ??
                                      "border-blue-100 bg-blue-50 text-blue-600"
                                    }`}
                                  >
                                    {field.initials}
                                  </div>

                                  <div className="flex min-w-0 flex-col">
                                    <span className="truncate text-[12.5px] font-semibold text-slate-800">
                                      {displayValue(field.value)}
                                    </span>

                                    {field.subtitle && (
                                      <span className="text-[11px] font-medium text-slate-400">
                                        {field.subtitle}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Multiple Badges */}
                              {isMultiBadge && (
                                <div className="flex flex-wrap gap-1.5">
                                  {Array.isArray(field.value) &&
                                    field.value.map((value, index) => (
                                      <span
                                        key={`${field.id}-${index}`}
                                        className="inline-flex rounded border border-blue-100 bg-blue-50/60 px-2 py-0.5 text-[11px] font-medium text-[#153AC7]"
                                      >
                                        {String(value)}
                                      </span>
                                    ))}
                                </div>
                              )}

                              {/* Single Badge */}
                              {isBadge && (
                                <span
                                  className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-medium ${
                                    badgeColors[field.color ?? ""] ??
                                    "border-slate-200 bg-slate-50 text-slate-600"
                                  }`}
                                >
                                  {field.color === "red" && (
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                                  )}

                                  {displayValue(field.value)}
                                </span>
                              )}

                              {/* Link */}
                              {isLink && (
                                <a
                                  href={`#${field.id}`}
                                  className="block break-all text-[13px] font-medium text-[#153AC7] hover:underline"
                                >
                                  {displayValue(field.value)}
                                </a>
                              )}

                              {/* Normal Value */}
                              {!isUserProfile &&
                                !isMultiBadge &&
                                !isBadge &&
                                !isLink && (
                                  <span
                                    className={`block break-words text-[13px] font-semibold ${
                                      field.color
                                        ? (badgeColors[field.color] ??
                                          "text-slate-800")
                                        : "text-slate-800"
                                    }`}
                                  >
                                    {displayValue(field.value)}
                                  </span>
                                )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Linked Assets */}
                    {section.assets && (
                      <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[700px] text-left">
                          <thead className="bg-[#F5F6FA]">
                            <tr>
                              {[
                                "ASSET",
                                "TYPE",
                                "LOCATION",
                                "ID",
                                "STATUS",
                              ].map((heading) => (
                                <th
                                  key={heading}
                                  className="px-3 py-3 text-[11px] font-semibold text-slate-500"
                                >
                                  {heading}
                                </th>
                              ))}
                            </tr>
                          </thead>

                          <tbody>
                            {section.assets.map((asset) => (
                              <tr
                                key={asset.id}
                                className="border-t border-slate-200"
                              >
                                <td className="px-3 py-3">
                                  <p className="text-[13px] font-bold text-[#1E293B]">
                                    {asset.name}
                                  </p>
                                  {asset.subtitle && (
                                    <p className="mt-0.5 text-[11px] text-[#64748B]">
                                      {asset.subtitle}
                                    </p>
                                  )}
                                </td>

                                <td className="px-3 py-3 text-[13px] text-[#1E293B]">
                                  {asset.type}
                                </td>

                                <td className="px-3 py-3 text-[13px] text-[#1E293B]">
                                  {asset.location}
                                </td>

                                <td className="px-3 py-3 font-mono text-xs text-[#64748B]">
                                  {asset.id}
                                </td>

                                <td className="px-3 py-3">
                                  <span
                                    className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium ${
                                      asset.status === "Active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-amber-100 text-amber-700"
                                    }`}
                                  >
                                    {asset.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {/* Linked Locations */}
                    {section.locations && (
                      <div className="mt-4   pt-1">
                        <div className="flex flex-wrap gap-2">
                          {section.locations.map((location) => (
                            <div
                              key={location.id}
                              className="inline-flex items-center gap-2 rounded-lg bg-[#EEF2FF] px-3 py-2 text-xs text-[#153AC7]"
                            >
                              {location.icon && <span>{location.icon}</span>}

                              <span className="font-semibold">
                                {location.name}
                              </span>

                              <span className="font-medium">
                                {location.type}
                              </span>
                            </div>
                          ))}
                        </div>

                        {section.coverage && (
                          <p className="mt-4 text-[12px] leading-5 text-slate-500">
                            {section.coverage}
                          </p>
                        )}
                      </div>
                    )}
                  </section>
                );
              })}

            {/* Approval */}
            {hasApproval && activeTab.approval && (
              <div className="w-full space-y-5 bg-slate-50/50 ">
                <section className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
                  <div className="mb-6 flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        <span className="text-slate-700 text-xs">🕒</span>
                        Approval Workflow
                      </h2>
                      <p className="mt-0.5 text-xs text-slate-400 font-medium">
                        Renewal 2026 · Stage 2 of 3 active
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 border border-amber-200 shadow-sm">
                      Awaiting Stage 2
                    </span>
                  </div>
                  {/* Dynamic Vertical Timeline Chain */}
                  <div className="relative border-l border-slate-200 ml-3.5 pl-6 space-y-6">
                    {activeTab.approval.workflow.map((person, index) => {
                      const isApproved = person.status === "approved";
                      const isPending = person.status === "pending";
                      const isUpcoming = person.status === "upcoming";

                      return (
                        <div key={person.id} className="relative">
                          <div
                            className={`absolute -left-[35px] top-0 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ring-4 ring-white transition-colors ${
                              isApproved
                                ? "bg-[#16A34A] text-white"
                                : isPending
                                  ? "bg-[#153AC7] text-white"
                                  : "bg-white border border-slate-300 text-slate-400"
                            }`}
                          >
                            {isApproved ? "✓" : index + 1}
                          </div>

                          <div className="flex flex-col gap-0.5">
                            <p
                              className={`text-xs font-bold ${isUpcoming ? "text-slate-500" : "text-slate-800"}`}
                            >
                              {person.role}
                            </p>
                            <p className="text-[11px] text-slate-400 font-medium">
                              {person.name}
                            </p>

                            <div className="mt-1 flex items-center flex-wrap gap-2">
                              <span
                                className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                                  isApproved
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : isPending
                                      ? "bg-amber-50 text-amber-600 "
                                      : "bg-slate-50 text-slate-400 border-slate-200"
                                }`}
                              >
                                {isPending && "⏳ "}
                                {isApproved && "✓ "}
                                {isPending
                                  ? "Awaiting Review"
                                  : isApproved
                                    ? "Approved"
                                    : "Not started"}
                              </span>

                              <span className="text-[10px] text-slate-400 font-medium">
                                {isApproved
                                  ? `15 Jan 2025 · 10:24 AM`
                                  : isPending
                                    ? "Assigned 20 Dec 2025"
                                    : ""}
                              </span>
                            </div>

                            {isApproved && (
                              <p className="mt-1.5 text-[11px] font-medium text-slate-500 italic">
                                "All documents verified and in order."
                              </p>
                            )}
                            {isPending && (
                              <p className="mt-1 text-[11px] text-slate-400 font-medium">
                                Pending since 5 days — renewal documents
                                submitted
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="rounded-xl border border-slate-100 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 p-4">
                    <h2 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="text-slate-700 text-xs">📋</span>
                      Approval History
                    </h2>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                      {activeTab.approval.history.length} actions
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 px-4">
                    {activeTab.approval.history.map((item, index) => {
                      const isApprovedStatus =
                        item.status.toLowerCase() === "approved";
                      const matchWorkflow = activeTab.approval.workflow.find(
                        (w) => w.name === item.name,
                      );
                      const blockInitials = matchWorkflow
                        ? matchWorkflow.initials
                        : item.name.substring(0, 2).toUpperCase();

                      return (
                        <div
                          key={item.id || index}
                          className="py-4 first:pt-4 last:pb-4"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                                isApprovedStatus
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-amber-50 text-amber-600"
                              }`}
                            >
                              {blockInitials}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className="text-xs font-bold text-slate-800">
                                    {item.name}
                                  </p>
                                  <p className="text-[11px] font-medium text-slate-400">
                                    {isApprovedStatus
                                      ? `Approved — ${item.role}`
                                      : `Returned — ${item.role}`}
                                  </p>
                                </div>
                                <div className="text-right text-[10px] font-medium text-slate-400">
                                  <p>
                                    {isApprovedStatus
                                      ? "15 Jan 2025"
                                      : "18 Jan 2025"}
                                  </p>
                                  <p>
                                    {isApprovedStatus ? "10:24 AM" : "2:10 PM"}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-1">
                                <span
                                  className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold border ${
                                    isApprovedStatus
                                      ? "bg-green-50 text-green-600 border-green-100"
                                      : "bg-red-50 text-red-500 border-red-100"
                                  }`}
                                >
                                  {isApprovedStatus ? "Approved" : "Returned"}
                                </span>
                              </div>

                              <div className="mt-2.5 rounded-lg bg-slate-50/70 p-3 border border-slate-100/80">
                                <p className="text-[11px] font-medium leading-relaxed text-slate-500">
                                  {isApprovedStatus
                                    ? `"All documents verified and in order. Fire NOC certificate matches site plan."`
                                    : `"Please reattach the updated inspection report from Nov 2025. Previous one was from 2024."`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            )}

            {/* Approvals */}
            {hasData &&
              !hasSections &&
              activeTab.data?.map((block, blockIndex) => (
                <section
                  key={`${block.name}-${blockIndex}`}
                  className="min-w-0 overflow-hidden rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"
                >
                  {block.meta && (
                    <div className="border-b border-slate-100 pb-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="break-words text-lg font-bold text-slate-900">
                            {block.meta.title ?? block.name}
                          </h2>

                          {block.meta.code && (
                            <p className="mt-1 text-xs text-slate-500">
                              {block.meta.code}
                            </p>
                          )}

                          {block.meta.category && (
                            <p className="mt-1 text-xs text-slate-500">
                              {block.meta.category}
                            </p>
                          )}
                        </div>
                      </div>

                      {block.meta.expiryWarning && (
                        <p className="mt-3 rounded-md border border-amber-100 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                          {block.meta.expiryWarning}
                        </p>
                      )}

                      {block.meta.badges && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {block.meta.badges.map((badge, index) => (
                            <span
                              key={`${badge.label}-${index}`}
                              className={`rounded border px-2 py-1 text-[11px] font-medium ${
                                summaryColors[badge.variant] ??
                                "border-slate-200 bg-slate-50 text-slate-600"
                              }`}
                            >
                              {badge.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Summary Data Grid */}
                  {block.data && (
                    <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 xl:grid-cols-3">
                      {block.data.map((item) => (
                        <div
                          key={item.id}
                          className="min-w-0 rounded-lg border border-slate-100 p-3"
                        >
                          <p className="text-[10.5px] font-bold tracking-wide text-slate-400">
                            {item.label}
                          </p>

                          <p
                            className={`mt-2 break-words text-sm font-semibold ${
                              item.variant
                                ? (summaryColors[item.variant]?.split(" ")[2] ??
                                  "text-slate-800")
                                : "text-slate-800"
                            }`}
                          >
                            {item.value}
                          </p>

                          {item.subtext && (
                            <p className="mt-1 text-[11px] text-slate-400">
                              {item.subtext}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
          </div>

          {hasSidebar && (
            <aside className="min-w-0 space-y-5 lg:sticky lg:top-6">
              {activeTab.sidebar?.map((sideSection, sectionIndex) => {
                const SideSectionIcon =
                  sideSection.icon ??
                  (sideSection.id === "costSummary" ? DollarSign : undefined);
                console.log("sideSection", sideSection);

                return (
                  <section
                    key={
                      sideSection.id ?? `${sideSection.title}-${sectionIndex}`
                    }
                    className="min-w-0 overflow-hidden rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"
                  >
                    {/*  Heading */}
                    {sideSection.title && (
                      <Heading
                        section={sideSection}
                        SectionIcon={SideSectionIcon}
                      />
                    )}
                    {sideSection?.config && (
                      <RenewalHistory config={sideSection?.config} />
                    )}

                    {sideSection.notifications && (
                      <RenewalReminders config={sideSection} />
                    )}
                    {/* Cost Summary */}
                    {sideSection.costSummary?.map((cost, index) => (
                      <div
                        key={`${cost.label}-${index}`}
                        className={`flex items-start justify-between gap-3 py-2 ${
                          cost.isTotal
                            ? "mt-2 border-t border-slate-100 pt-3 text-sm font-bold"
                            : "text-xs text-slate-500"
                        }`}
                      >
                        <span className="min-w-0 break-words">
                          {cost.label}
                        </span>

                        <span
                          className={`shrink-0 text-right ${
                            cost.isTotal
                              ? "text-base text-[#153AC7]"
                              : "font-semibold text-slate-700"
                          }`}
                        >
                          {cost.value}
                        </span>
                      </div>
                    ))}

                    {/* Timeline */}
                    {sideSection.timeline && (
                      <div className="ml-2 space-y-5 border-l border-slate-200 pl-6">
                        {sideSection.timeline.map((item, index) => {
                          const status =
                            timelineStatusConfig[item.status] ??
                            timelineStatusConfig.pending;

                          return (
                            <div
                              key={item.id ?? `${item.title}-${index}`}
                              className="relative min-w-0"
                            >
                              <span
                                className={`absolute -left-[33px] top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border shadow-sm ${status.bg} ${status.text}`}
                              >
                                {status.icon}
                              </span>

                              <div className="flex min-w-0 flex-wrap items-start justify-between gap-1">
                                <h4 className="min-w-0 break-words text-xs font-semibold text-slate-800">
                                  {item.title}
                                </h4>

                                {item.date && (
                                  <span className="shrink-0 text-[10px] text-slate-400">
                                    {item.date}
                                  </span>
                                )}
                              </div>

                              {item.description && (
                                <p className="mt-1 break-words text-[11px] leading-5 text-slate-500">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>
                );
              })}

              {/* Approval sidebar */}
              {activeTab.approval?.actionRequired && (
                <section className="w-full max-w-[500px] rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
                  {/* Header Section */}
                  <div className="flex items-start gap-1.5 pb-3">
                    <span className="text-amber-500 text-xs mt-0.5">🔔</span>
                    <div>
                      <h2 className="text-sm font-bold text-blue-900">
                        {activeTab.approval.actionRequired.title}
                      </h2>
                      <p className="text-[11px] text-indigo-400 font-medium mt-0.5">
                        {activeTab.approval.actionRequired.currentStage} —{" "}
                        {activeTab.approval.actionRequired.stageDescription ||
                          "Compliance Manager Sign-off"}
                      </p>
                    </div>
                  </div>

                  {activeTab.approval.actionRequired.alertText && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-800">
                      <span className="text-xs">⚠️</span>
                      <p className="font-semibold">
                        {activeTab.approval.actionRequired.alertText}
                      </p>
                    </div>
                  )}

                  {activeTab.approval.actionRequired.documents &&
                    activeTab.approval.actionRequired.documents.length > 0 && (
                      <div className="mt-4">
                        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                          Submitted for Review
                        </p>
                        <div className="mt-2 space-y-2">
                          {activeTab.approval.actionRequired.documents.map(
                            (doc) => (
                              <div
                                key={doc.id || doc.name}
                                className="flex items-center justify-between rounded-lg bg-slate-50 p-2 border border-slate-100"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-slate-400 text-xs shrink-0">
                                    📄
                                  </span>
                                  <span className="truncate text-xs font-semibold text-slate-700">
                                    {doc.name}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleViewDocument(doc)}
                                  className="text-xs font-semibold text-slate-700 hover:bg-slate-100 px-3 py-1 bg-white border border-slate-200 rounded shadow-sm"
                                >
                                  View
                                </button>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                  <div className="mt-4">
                    <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                      Remarks (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="Add your review comments, conditions, or clarifications..."
                      className="w-full rounded-lg border border-slate-200 p-3 text-xs text-slate-700 placeholder-slate-400 outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 transition-shadow"
                    />
                  </div>

                  {/* Primary Buttons Loop */}
                  <div className="mt-4 space-y-2">
                    {activeTab.approval.actionRequired.actions.map((action) => {
                      const isApprove = action.value === "approve";
                      const isReject = action.value === "reject";
                      const isRevision = action.value === "revision";

                      return (
                        <button
                          key={action.value}
                          type="button"
                          onClick={() => setSelectedAction(action.value)}
                          className={`w-full rounded-lg py-2 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 
              ${selectedAction === action.value ? "ring-2 ring-indigo-400" : ""} 
              ${
                isApprove
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : isRevision
                    ? "border border-amber-200 bg-white text-amber-600 hover:bg-amber-50"
                    : isReject
                      ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                      : "border border-slate-200 bg-white text-slate-700"
              }`}
                        >
                          {isApprove && <span>✓</span>}
                          {isRevision && <span>↶</span>}
                          {isReject && <span>✕</span>}
                          {action.label}
                        </button>
                      );
                    })}
                  </div>

                  {activeTab.approval.actionRequired.otherActions &&
                    activeTab.approval.actionRequired.otherActions.length >
                      0 && (
                      <div className="mt-5 border-t border-slate-100 pt-3">
                        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                          Other Actions
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {activeTab.approval.actionRequired.otherActions.map(
                            (other) => (
                              <button
                                key={other.value}
                                type="button"
                                onClick={() => handleOtherAction(other.value)}
                                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-sm"
                              >
                                {other.icon} {other.label}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                </section>
              )}
            </aside>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfileRendering;
