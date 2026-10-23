import React from "react";
import { Trash, Download } from "lucide-react";
import Image from "next/image";

interface DynamicField {
  id: string | number;
  image: string;
  labels: string;
  subtitle: string;
}

const DocumentListLayout = ({ fields }: { fields?: DynamicField[] }) => {
  return (
    <div className="w-full px-4 sm:px-0">
      {fields?.map((field) => (
        <div
          key={field.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-slate-100"
        >
          <div className="flex items-start gap-3 min-w-0">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <Image
                src={`/${field.image}`}
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

          <div className="flex items-center gap-3 self-end sm:self-auto pl-11 sm:pl-0">
            <button
              aria-label="Download document"
              className="text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              <Download
                className="border-[#E8EAED] border rounded p-1.5"
                size={32}
              />
            </button>
            <button
              aria-label="Delete document"
              className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash
                className="border-[#E8EAED] border rounded p-1.5"
                size={32}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentListLayout;
