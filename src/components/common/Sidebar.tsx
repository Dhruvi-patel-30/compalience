"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Settings, CircleHelp, LucideIcon } from "lucide-react";
import { complianceConfig } from "@/config/listingConfig";

interface IconItem {
  src: string;
  alt: string;
}

interface NavItem {
  label: string;
  icon: LucideIcon;
  active: boolean;
}

interface MenuSection {
  title: string;
  items: NavItem[];
}

interface ConfigData {
  name: string;
  icons?: IconItem[];
  menuSections: MenuSection[];
}

const Sidebar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const configData = complianceConfig.find(
    (data) => data.name === "sidebar",
  ) as ConfigData | undefined;

  // console.log("configData:", configData);

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-12 items-center gap-3 border-b bg-white px-4 md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open sidebar"
          className="text-gray-600"
        >
          <Menu size={20} />
        </button>
        <Image
          src="/images/Frame.png"
          alt="logo"
          height={24}
          width={24}
          className="h-6 w-6 object-contain"
        />
        <Image
          src="/images/Punctualiti.png"
          alt="brand"
          height={20}
          width={80}
          className="object-contain"
          style={{ width: "auto", height: "auto" }}
        />
      </header>

      {mobileOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[220px] border-r border-gray-200 bg-white transition-transform duration-200 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex w-[48px] shrink-0 flex-col items-center border-r border-gray-100 bg-white pt-3 pb-14">
          <div className="mb-2 flex h-8 w-8 items-center justify-center">
            <Image
              src="/images/Frame.png"
              alt="logo"
              height={30}
              width={30}
              className="h-[40px] w-[40px] object-contain"
            />
          </div>

          <div className="flex flex-1 flex-col items-center gap-2 overflow-y-auto w-full px-1">
            {configData?.icons?.map((item, index) => {
              const isActiveIcon = index === 4;
              return (
                <div
                  key={index}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    isActiveIcon
                      ? "border border-purple-600 bg-purple-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={20}
                    height={20}
                    className="h-[25px] w-[25px] object-contain"
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-auto flex flex-col items-center gap-4 w-full">
            <Settings
              size={16}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            />
            <CircleHelp
              size={16}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col bg-white pb-14">
          <div className="flex h-14 shrink-0 items-center justify-between px-3">
            <Image
              alt="Punctualiti"
              src="/images/Punctualiti.png"
              height={22}
              width={90}
              className="h-[22px] object-contain"
              style={{ width: "auto", height: "auto" }}
            />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close sidebar"
              className="text-gray-500 hover:text-gray-700 md:hidden"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-1">
            {configData?.menuSections.map((section) => (
              <div key={section.title} className="mb-4">
                <p className="mb-1.5 px-2 text-[12px] font-bold tracking-wider text-[#9797B4] uppercase">
                  {section.title}
                </p>
                <div className="space-y-[3px]">
                  {section.items.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={index}
                        onClick={() => setMobileOpen(false)}
                        className={`flex min-h-[28px] items-center gap-2.5 rounded-md px-2 text-[12px] transition-all text-[#686687]   cursor-pointer ${
                          item.active
                            ? "bg-[#153AC7] text-white hover:bg-[#0425a8]"
                            : ""
                        }`}
                      >
                        <IconComponent size={16} className="shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex h-13 items-center border-t border-gray-200 bg-white">
          <div className="relative flex w-[48px] shrink-0 items-center justify-center border-r border-gray-100 h-full">
            <div className="relative h-7 w-7 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
              <Image
                src="/images/Frame2.png"
                className="object-cover"
                alt="user avatar"
                fill
                sizes="28px"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1 pl-3 pr-2">
            <p className="truncate text-[11px] font-semibold text-[#233244] leading-tight">
              Nayanish Damania
            </p>
            <p className="truncate text-[9px] text-[#233244] mt-0.5 leading-none">
              nayanish@vouch.digital
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
