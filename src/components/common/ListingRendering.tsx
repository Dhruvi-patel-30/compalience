"use client";
import React, { useState } from "react";
import { complianceConfig } from "@/config/listingConfig";
import Select from "../ui/Select";
import Button from "../ui/Button";
import Input from "../ui/Input";
import DynamicTable from "@/components/compalienceListing/DynamicTable";

const DynamicRendering = () => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [showAdvancedFilters, setShowAdvancedFilters] =
    useState<boolean>(false);

  const complianceListing = complianceConfig.find(
    (item) => item.name === "ComplianceListing",
  );
  const advancedFiltersConfig = complianceConfig.find(
    (item) => item.name === "advanced_filters",
  );

  const handleClearFilters = () => {
    setFormValues({});
  };

  const handleInputChange = (id: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  if (!complianceListing?.data) {
    return (
      <div className="p-5 text-sm text-gray-500">Configuration loading...</div>
    );
  }

  const renderAdvancedFilters = () => {
    if (!showAdvancedFilters || !advancedFiltersConfig?.data) return null;

    return (
      <div className="mx-4 rounded-xl border border-[#E8EBF0] bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-4">
          {advancedFiltersConfig.data
            .filter((item: any) => item.type === "dropdown")
            .map((item: any) => (
              <div key={item.id} className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-wider text-[#64748B]">
                  {item.label}
                </label>
                <Select
                  value={formValues[item.id] || ""}
                  options={item.options || []}
                  onChange={(value) => handleInputChange(item.id, value)}
                  className="w-full rounded-lg border border-[#DDE2EA] bg-white px-3 py-2 text-xs text-[#1E293B] outline-none focus:border-[#153AC7]"
                />
              </div>
            ))}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#F1F3F7] pt-4">
          {advancedFiltersConfig.data
            .filter((item: any) => item.type === "button")
            .map((item: any) => {
              if (item.action === "close") return null;
              const isApply = item.action === "apply";
              return (
                <Button
                  key={item.id}
                  label={item.label || ""}
                  icon={item.icon}
                  onClick={
                    isApply
                      ? () => setShowAdvancedFilters(false)
                      : handleClearFilters
                  }
                  className={`rounded-lg px-5 py-2 text-xs font-semibold transition-all ${
                    isApply
                      ? "bg-[#153AC7] text-white hover:bg-[#102da1]"
                      : "border border-[#E8EAED] hover:bg-[#F8FAFC]"
                  }`}
                />
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-full w-full flex-col gap-4 bg-[#F5F6FA] pb-6">
      {complianceListing.data.map((section: any) => {
        // haedwe
        if (section.name === "header") {
          const titleField = section.data.find(
            (item: any) => item.type === "title",
          );
          const dropdownFields = section.data.filter(
            (item: any) => item.type === "dropdown",
          );

          return (
            <div
              key={section.name}
              className="flex flex-col gap-4 border-b border-[#E8EBF0] bg-white px-5 py-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <h1 className="text-[18px] font-semibold tracking-[-0.3px] text-[#1E293B]">
                  {titleField?.heading1}
                </h1>
                <p className="mt-1 text-xs font-medium text-[#64748B]">
                  {titleField?.heading2}
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 md:w-auto">
                {dropdownFields.map((item: any) => (
                  <div key={item.id} className="min-w-0 md:w-[125px]">
                    <Select
                      value={formValues[item.id] || ""}
                      options={item.options || []}
                      onChange={(value) => handleInputChange(item.id, value)}
                      className="w-full rounded-lg border border-[#DDE2EA] bg-white px-3 py-2.5 text-xs text-[#64748B] outline-none focus:border-[#153AC7]"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // filter bar
        if (section.name === "filter_bar") {
          return (
            <React.Fragment key={section.name}>
              <div className="mx-4 rounded-xl border border-[#E8EBF0] bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                  {section.data.map((item: any) => (
                    <div
                      key={item.id}
                      className={
                        item.type === "text"
                          ? "min-w-[220px] flex-[2_1_250px]"
                          : item.type === "date"
                            ? "w-full sm:w-[145px] sm:flex-none"
                            : item.type === "dropdown"
                              ? "w-full sm:w-[145px] sm:flex-none"
                              : "shrink-0"
                      }
                    >
                      {["text", "date"].includes(item.type) && (
                        <Input
                          type={item.type}
                          placeholder={item.placeholder}
                          value={formValues[item.id] || ""}
                          onChange={(value) =>
                            handleInputChange(item.id, value)
                          }
                          className={`w-full rounded-lg border border-[#DDE2EA] px-3 py-2.5 text-xs text-[#475569] outline-none focus:border-[#153AC7] ${
                            item.type === "text" ? "bg-[#F7F8FA]" : "bg-white"
                          }`}
                        />
                      )}

                      {item.type === "dropdown" && (
                        <Select
                          value={formValues[item.id] || ""}
                          options={item.options || []}
                          onChange={(value) =>
                            handleInputChange(item.id, value)
                          }
                          className="w-full rounded-lg border border-[#DDE2EA] bg-white px-3 py-2.5 text-xs text-[#64748B] outline-none focus:border-[#153AC7]"
                        />
                      )}

                      {item.type === "button" && (
                        <Button
                          label={item.label || ""}
                          icon={item.icon}
                          onClick={() =>
                            setShowAdvancedFilters(!showAdvancedFilters)
                          }
                          className="whitespace-nowrap rounded-lg border border-[#153AC7] bg-white px-4 py-2.5 text-xs font-medium text-[#153AC7] transition-colors"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {renderAdvancedFilters()}
            </React.Fragment>
          );
        }

        if (section.name === "metrics_cards") {
          return (
            <div
              key={section.name}
              className="mx-3 grid grid-cols-2 gap-3 pb-2 sm:mx-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-6 "
            >
              {section.data.map((card: any) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.id}
                    className={`flex min-w-0 cursor-pointer flex-col justify-between rounded-xl border-l-4 p-3 shadow-sm transition-all sm:p-4 ${
                      card.active ? "border-2" : "border-y border-r"
                    }`}
                    style={{
                      borderLeftColor: card.color,
                      borderTopColor: card.active ? card.color : "#E8EAED",
                      borderRightColor: card.active ? card.color : "#E8EAED",
                      borderBottomColor: card.active ? card.color : "#E8EAED",
                      backgroundColor: card.active ? card.activeBg : "#ffffff",
                    }}
                  >
                    <div className="flex items-baseline">
                      <span className="text-2xl font-extrabold tracking-tight text-[#1E293B] sm:text-3xl">
                        {card.value}
                      </span>
                    </div>

                    <div className="mt-3 flex min-w-0 items-center gap-2">
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg sm:h-8 sm:w-8"
                        style={{
                          backgroundColor: `${card.color}15`,
                          color: card.color,
                        }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1 select-none">
                        <p className="text-[12px] font-bold leading-tight text-[#475569] sm:text-[13px]">
                          {card.heading1}
                        </p>

                        <p className="mt-0.5 truncate text-[11px] font-medium text-[#94A3B8]">
                          {card.heading2}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        return null;
      })}
      {complianceListing.table && (
        <div className=" mx-4">
          <DynamicTable config={complianceListing.table} />
        </div>
      )}
    </div>
  );
};

export default DynamicRendering;
