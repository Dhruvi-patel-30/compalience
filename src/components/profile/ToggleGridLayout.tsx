import React from "react";
import Image from "next/image";

interface DynamicField {
  id: string | number;
  image: string;
  labels: string;
  subtitle: string;
  color: string;
}
const ToggleGridLayout = ({ fields }: { fields?: DynamicField[] }) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4  pt-2">
      {fields.map((field) => {
        return (
          <div
            key={field.id}
            className="flex items-start justify-between rounded-xl border border-slate-200 p-4 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.01)]"
          >
            <div className="flex gap-3 items-center">
              <div
                className={` p-2 rounded`}
                style={{ backgroundColor: field.color }}
              >
                <Image
                  src={`/${field.image}`}
                  alt="img"
                  height={15}
                  width={15}
                />
              </div>
              <div>
                <p className="text-[13.5px] font-semibold text-slate-800">
                  {field.labels}
                </p>
                <p className="text-[11.5px] text-slate-400 mt-0.5">
                  {field.subtitle}
                </p>
              </div>
            </div>
            <div className="ml-4 shrink-0">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  defaultChecked={!!field.values}
                  className="peer sr-only"
                />
                <div className="peer h-5 w-9 rounded-full bg-slate-200 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#153AC7] peer-checked:after:translate-x-full" />
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ToggleGridLayout;
