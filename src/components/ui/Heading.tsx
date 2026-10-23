import React from "react";
import Button from "./Button";
import { Edit, Plus } from "lucide-react";

interface Section {
  title: string;
  description: string;
  action?: string;
  type?: string;
}

interface HeadingProps {
  section: Section;
  SectionIcon?: React.ComponentType<{ className?: string }>; // Made optional with '?'
}

const Heading: React.FC<HeadingProps> = ({ section, SectionIcon }) => {
  return (
    <div className="mb-3 flex items-start justify-between gap-3 border-b border-slate-100 pb-1">
      <div className="flex min-w-0 gap-3 items-center ">
        {SectionIcon && (
          <div className="shrink-0 rounded-lg bg-[#EEF2FF] p-2 text-[#153AC7]">
            <SectionIcon className="h-5 w-5" />
          </div>
        )}

        <div className="min-w-0">
          <h2 className="text-base font-semibold text-[#1E293B] sm:text-lg lg:text-[14px]">
            {section.title}
          </h2>
          <p className="mt-1 text-xs lg:text-[11.5px] leading-relaxed text-[#64748B]">
            {section.description}
          </p>
        </div>
      </div>

      {section.type === "Edit" && (
        <Button
          className="shrink-0 text-sm font-medium transition border-[#E8EAED] p-2 text-[#1E293B]"
          label={section.action}
          icon={Edit}
        />
      )}
      {section.type === "View Slabs" && (
        <Button
          className="text-[#1E293B] border-[#E8EAED] font-semibold text-[12px] p-2"
          label={section.action}
        />
      )}
      {section.type === "add" && (
        <Button
          className="shrink-0 text-sm font-medium transition bg-[#153AC7] p-2 text-white"
          label={section.action}
          icon={section.icons}
        />
      )}
      {section.type === "alert" && (
        <Button
          className="shrink-0 text-sm font-bold transition text-[#153AC7] p-2 border-0"
          label={section.action}
          icon={section.icons}
        />
      )}
    </div>
  );
};

export default Heading;
