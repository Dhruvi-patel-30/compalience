"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ArrowLeft, RefreshCw, Edit, TriangleAlert } from "lucide-react";

import Button from "./Button";
import Select from "./Select";
import { setComplianceFalse } from "@/redux/slices/displaySlice";

interface ProfileOption {
  label: string;
  value: string;
}

interface ProfileField {
  id: string;
  type: string;
  heading1?: string;
  heading2?: string;
  options?: ProfileOption[];
}

interface ProfileBadge {
  label: string;
  variant?: "warning" | "danger" | "info" | "default";
}

interface SummaryMeta {
  code?: string;
  category?: string;
  title?: string;
  expiryWarning?: string;
  badges?: ProfileBadge[];
}

interface SummaryMetric {
  id: string;
  label: string;
  value: string | number;
  subtext?: string;
  variant?: string;
}

interface ProfileSection {
  name: string;
  data: ProfileField[] | SummaryMetric[];
  meta?: SummaryMeta;
}

interface ProfileData {
  data?: ProfileSection[];
}

interface ProfileDataHeaderProps {
  profileData?: ProfileData;
}

const ProfileDataHeader = ({ profileData }: ProfileDataHeaderProps) => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const handleInputChange = (id: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const getBadgeColor = (variant?: ProfileBadge["variant"]) => {
    switch (variant) {
      case "warning":
        return "bg-amber-100 text-amber-700";
      case "danger":
        return "bg-red-100 text-red-600";
      case "info":
        return "bg-sky-100 text-sky-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      {profileData?.data?.map((section) => {
        if (section.name === "header") {
          const fields = section.data as ProfileField[];

          const titleField = fields.find((item) => item.type === "title");

          const dropdownFields = fields.filter(
            (item) => item.type === "dropdown",
          );

          return (
            <div
              key={section.name}
              className="flex w-full min-w-0 flex-col gap-4 border-b border-[#E8EBF0] bg-white px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-6"
            >
              <div className="flex min-w-0 items-start gap-3">
                <Button
                  icon={ArrowLeft}
                  onClick={() => dispatch(setComplianceFalse())}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#E8EAED] bg-white p-0 transition hover:bg-gray-50"
                />

                {titleField && (
                  <div className="min-w-0 flex-1">
                    <h1 className="break-words text-base font-semibold tracking-tight text-[#1E293B] sm:text-lg">
                      {titleField.heading1}
                    </h1>

                    {titleField.heading2 && (
                      <p className="mt-1 break-words text-xs font-medium leading-5 text-[#64748B] sm:text-sm">
                        {titleField.heading2}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {dropdownFields.length > 0 && (
                <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto lg:flex-1 lg:grid-cols-none lg:flex lg:flex-wrap lg:justify-end xl:flex-nowrap">
                  {dropdownFields.map((item) => (
                    <div
                      key={item.id}
                      className="w-full min-w-0 lg:max-w-[180px] lg:flex-1 xl:w-[150px] xl:flex-none"
                    >
                      <Select
                        value={formValues[item.id] || ""}
                        options={item.options || []}
                        onChange={(value) => handleInputChange(item.id, value)}
                        className="w-full min-w-0 rounded-lg border border-[#DDE2EA] bg-white px-3 py-2.5 text-xs text-[#64748B] outline-none transition focus:border-[#153AC7]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }

        if (section.name === "summaryBanner") {
          const meta = section.meta;
          const gridMetrics = section.data as SummaryMetric[];

          return (
            <div
              key={section.name}
              className="w-full min-w-0 border-b border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5 lg:p-6"
            >
              <div className="flex flex-col gap-4 border-b border-[#F1F5F9] pb-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF7ED] text-xl sm:h-12 sm:w-12">
                    <img src="/images/fire.png" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#64748B]">
                      {meta?.code && <span>{meta.code}</span>}

                      {meta?.code && meta?.category && (
                        <span className="text-[#CBD5E1]">•</span>
                      )}

                      {meta?.category && <span>{meta.category}</span>}
                    </div>

                    <h2 className="mt-1 break-words text-base font-bold text-[#0F172A] sm:text-lg">
                      {meta?.title}
                    </h2>

                    {meta?.badges && meta.badges.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {meta.badges.map((badge, index) => (
                          <span
                            key={`${badge.label}-${index}`}
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getBadgeColor(
                              badge.variant,
                            )}`}
                          >
                            {badge.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:flex-col lg:items-end lg:self-auto">
                  <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                    <button
                      type="button"
                      className="inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#DDE2EA] bg-white px-3 py-2 text-xs font-semibold text-[#344054] transition hover:bg-gray-50 sm:flex-none"
                    >
                      <RefreshCw className="h-3.5 w-3.5 shrink-0" />
                      Initiate Renewal
                    </button>

                    <button
                      type="button"
                      className="inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-[#153AC7] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#112F9F] sm:flex-none"
                    >
                      <Edit className="h-3.5 w-3.5 shrink-0" />
                      Edit
                    </button>
                  </div>

                  {meta?.expiryWarning && (
                    <div className="flex max-w-full items-start gap-1.5 rounded-lg bg-[#FEF3C7] px-3 py-2 text-xs font-medium text-[#B45309]">
                      <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D97706]" />
                      <span className="break-words">{meta.expiryWarning}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 md:grid-cols-5 md:gap-x-0">
                {gridMetrics.map((metric, index) => {
                  const isWarning = metric.variant === "warning";

                  return (
                    <div
                      key={metric.id}
                      className={`flex min-w-0 flex-col gap-1 ${
                        index % 2 !== 0
                          ? "border-l border-[#E2E8F0] pl-3 sm:pl-4 md:border-l-0"
                          : ""
                      } ${
                        index > 0
                          ? "md:border-l md:border-[#E2E8F0] md:pl-4 lg:pl-6"
                          : ""
                      }`}
                    >
                      <span className="break-words text-[10px] font-bold tracking-wider text-[#94A3B8] sm:text-xs">
                        {metric.label}
                      </span>

                      <span
                        className={`break-words text-sm font-bold sm:text-base ${
                          isWarning ? "text-[#D97706]" : "text-[#1E293B]"
                        }`}
                      >
                        {metric.value}
                      </span>

                      {metric.subtext && (
                        <span className="break-words text-xs font-medium text-[#64748B]">
                          {metric.subtext}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        return null;
      })}
    </>
  );
};

export default ProfileDataHeader;
