import React from "react";
import Image from "next/image";

interface DynamicField {
  id: string | number;
  image: string;
  labels: string;
  subtitle: string;
}
const TimelineHistoryLayout = ({ fields }: { fields?: DynamicField[] }) => {
  if (!fields || fields.length === 0) return null;
  return (
    <div className="w-full px-4 sm:px-0">
      {fields?.map((field) => (
        <div
          key={field.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-slate-100"
        >
          <div className="flex items-start gap-3 min-w-0">
            <div
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500"
              style={{ backgroundColor: field.bgColor }}
            >
              <Image
                src={`/images/sent.png`}
                alt={field.labels || "document icon"}
                height={100}
                width={100}
                className="p-2 object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-slate-800 truncate">
                {field.labels}
              </p>
              <p className="text-[11.5px] text-slate-400 mt-0.5 break-words">
                {field.subtitle}
              </p>
            </div>
          </div>

          <div className="text-[#64748B] text-[12px]">{field.expiryDate}</div>
        </div>
      ))}
    </div>
  );
};

export default TimelineHistoryLayout;
