"use client";
import React, { useState } from "react";
import {
  Eye,
  Pencil,
  RefreshCw,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import type { TableConfig, TableRow } from "@/config/listingConfig";
import Image from "next/image";
import Select from "../ui/Select";
import Button from "../ui/Button";

interface DynamicTableProps {
  config: TableConfig;
}

const DynamicTable = ({ config }: DynamicTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openActionId, setOpenActionId] = useState<string | null>(null);

  const pageSize = Math.max(1, config.pageSize);
  const totalPages = Math.max(1, Math.ceil(config.rows.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const visibleRows = config.rows.slice(startIndex, startIndex + pageSize);

  // Column widths follow the Figma layout.
  const columnWidths: Record<string, string> = {
    name: "24%",
    status: "12%",
    site: "8%",
    category: "9%",
    criticality: "9%",
    expiryDate: "12%",
    renewal: "7%",
    owner: "11%",
    actions: "8%",
  };

  const toggleRow = (id: string) => {
    setSelectedRows((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  };

  const toggleAllRows = () => {
    const ids = visibleRows.map((row) => row.id);
    const allSelected =
      ids.length > 0 && ids.every((id) => selectedRows.includes(id));

    setSelectedRows((previous) =>
      allSelected
        ? previous.filter((id) => !ids.includes(id))
        : [...new Set([...previous, ...ids])],
    );
  };

  // Parse "01 Nov 2025" without relying on browser-specific date parsing.
  const getDaysRemaining = (value: unknown): number | null => {
    if (!value) return null;

    const parsed = String(value).match(
      /^(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})$/,
    );
    if (!parsed) return null;

    const months: Record<string, number> = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    };

    const month = months[parsed[2].slice(0, 3).toLowerCase()];
    if (month === undefined) return null;

    const expiry = Date.UTC(Number(parsed[3]), month, Number(parsed[1]));
    const today = new Date();
    const todayUTC = Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    return Math.round((expiry - todayUTC) / 86400000);
  };

  const renderBadge = (value: string) => {
    const styles: Record<string, string> = {
      Closed: "bg-slate-100 text-slate-600",
      "Nearing Expiry": "bg-amber-100 text-amber-700",
      Expired: "bg-red-100 text-red-700",
      Valid: "bg-emerald-100 text-emerald-700",
      Renewal: "bg-cyan-100 text-cyan-700",
      Low: "bg-emerald-100 text-emerald-700",
      Medium: "bg-amber-100 text-amber-700",
      High: "bg-orange-100 text-orange-700",
      Critical: "bg-red-100 text-red-700",
    };

    const dots: Record<string, string> = {
      Closed: "bg-slate-400",
      "Nearing Expiry": "bg-amber-500",
      Expired: "bg-red-500",
      Valid: "bg-emerald-500",
      Renewal: "bg-cyan-500",
      Low: "bg-emerald-500",
      Medium: "bg-amber-500",
      High: "bg-orange-500",
      Critical: "bg-red-500",
    };

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-medium leading-none whitespace-nowrap ${
          styles[value] ?? "bg-slate-100 text-slate-600"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${dots[value] ?? "bg-slate-400"}`}
        />
        {value || "—"}
      </span>
    );
  };

  const renderName = (row: TableRow) => (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        <Image
          src={row.img}
          alt="img"
          height={100}
          width={100}
          className="p-2"
        />
      </div>

      <div className="min-w-0">
        <p className="text-[12px] font-semibold leading-4 text-slate-800">
          {row.name || "—"}
        </p>
        <p className="mt-1 text-[10px] leading-3 text-slate-400">
          COM-{String(row.id).padStart(3, "0")}-PLM-019 · Annual
        </p>
      </div>
    </div>
  );

  const renderExpiry = (row: TableRow) => {
    const date = String(row.expiryDate ?? "");
    const days = getDaysRemaining(row.expiryDate);

    return (
      <div className="whitespace-nowrap">
        <p
          className={`text-[11px] font-medium ${days !== null && days < 0 ? "text-red-500" : "text-slate-600"}`}
        >
          {date || "—"}
        </p>

        {days !== null && (
          <p
            className={`mt-1 text-[10px] ${days < 0 ? "text-red-500" : "text-orange-600"}`}
          >
            {days < 0
              ? `${Math.abs(days)}d overdue`
              : days === 0
                ? "Expires today"
                : `${days}d remaining`}
          </p>
        )}
      </div>
    );
  };

  const renderOwner = (row: TableRow) => {
    const owner = String(row.owner ?? "");
    const initials = owner.slice(0, 2).toUpperCase();

    return (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[9px] font-semibold text-indigo-600">
          {initials || "—"}
        </span>
        <span className="text-[11px] text-slate-700">{owner || "—"}</span>
      </div>
    );
  };

  const renderActions = (row: TableRow) => (
    <div className="relative flex items-center justify-end gap-1">
      {[Eye, Pencil, RefreshCw].map((Icon, index) => (
        <button
          key={index}
          type="button"
          title={["View", "Edit", "Renew"][index]}
          aria-label={`${["View", "Edit", "Renew"][index]} ${row.name}`}
          onClick={() => console.log(["view", "edit", "renew"][index], row)}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#E4E3ED]  transition text-[#153AC7] cursor-pointer"
        >
          <Icon size={14} strokeWidth={1.7} />
        </button>
      ))}

      <button
        type="button"
        aria-label={`More actions for ${row.name}`}
        aria-expanded={openActionId === row.id}
        onClick={() => setOpenActionId(openActionId === row.id ? null : row.id)}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
      >
        <MoreVertical size={15} className="text-[#153AC7] cursor-pointer" />
      </button>

      {openActionId === row.id && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpenActionId(null)}
            className="fixed inset-0 z-20 cursor-default"
          />

          <div className="absolute right-0 top-8 z-30 w-40 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            {config.actions.map((action) => (
              <button
                key={action.action}
                type="button"
                onClick={() => {
                  console.log(action.action, row);
                  setOpenActionId(null);
                }}
                className={`block w-full px-3 py-2 text-left text-[11px] hover:bg-slate-50 ${
                  ["delete", "close"].includes(action.action)
                    ? "text-red-500"
                    : "text-slate-700"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );

  const renderCell = (row: TableRow, columnId: string, type?: string) => {
    switch (type) {
      case "badge":
        return renderBadge(String(row[columnId] ?? ""));
      case "owner":
        return renderOwner(row);
      case "actions":
        return renderActions(row);
      case "date":
        return renderExpiry(row);
      case "text":
      default:
        return columnId === "name" ? (
          renderName(row)
        ) : (
          <span className="text-[11px] text-slate-600">
            {String(row[columnId] ?? "—")}
          </span>
        );
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
    setOpenActionId(null);
  };

  return (
    <>
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="inline-flex w-fit items-center rounded-xl bg-[#eef1f9] p-1">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-[13px] font-medium text-slate-800 shadow-[0_2px_6px_rgba(0,0,0,0.06)] transition-all sm:px-5"
            >
              <span>Active</span>
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0d46cc] px-1 text-[10px] font-bold text-white">
                {config.rows.length}
              </span>
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-transparent px-3 py-2 text-[13px] font-medium text-slate-600 transition-all hover:text-slate-900 sm:px-5"
            >
              <span>Drafts</span>
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0d46cc] px-1 text-[10px] font-bold text-white">
                {config.rows.length}
              </span>
            </button>
          </div>

          <p className="flex flex-wrap items-center text-[13px] font-semibold text-gray-400">
            <span className="mr-2 text-black">{config.rows.length}</span>
            compliances <span className="mx-2">·</span> All statuses
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
          <label className="shrink-0 text-[12.5px] font-bold text-[#64748B]">
            Sort by
          </label>

          {config.options && (
            <Select
              options={config.options}
              className="min-w-0 flex-1 rounded-xl border border-[#E8EAED] bg-white p-2 sm:min-w-[150px] sm:flex-none"
            />
          )}

          <Button
            label="Export CSV"
            icon={Download}
            className="shrink-0 whitespace-nowrap rounded-lg border border-[#E8EAED] bg-white px-3 py-2.5 text-xs font-bold text-[#64748B] transition-colors sm:px-4"
          />
        </div>
      </div>

      <div className="w-full min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
        <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain 2xl:overflow-x-hidden">
          <table className="w-full min-w-[1100px] table-fixed border-collapse text-left 2xl:min-w-0">
            <colgroup>
              <col style={{ width: "42px" }} />

              {config.columns.map((column) => {
                const id = column.id.toLowerCase();

                const fixedWidths: Record<string, string> = {
                  name: "190px",
                  status: "105px",
                  site: "80px",
                  category: "95px",
                  criticality: "100px",
                  expiryDate: "115px",
                  renewal: "85px",
                  owner: "100px",
                  action: "140px",
                  actions: "140px",
                };

                return (
                  <col
                    key={column.id}
                    style={{
                      width:
                        fixedWidths[column.id] ??
                        fixedWidths[id] ??
                        columnWidths[column.id] ??
                        "100px",
                    }}
                  />
                );
              })}
            </colgroup>

            {/* Table Header */}
            <thead>
              <tr className="h-[52px] border-b border-slate-200 bg-slate-50 sm:h-[60px]">
                <th className="px-3">
                  <input
                    type="checkbox"
                    checked={
                      visibleRows.length > 0 &&
                      visibleRows.every((row) => selectedRows.includes(row.id))
                    }
                    onChange={toggleAllRows}
                    aria-label="Select all visible rows"
                    className="h-3.5 w-3.5 cursor-pointer accent-indigo-600"
                  />
                </th>

                {config.columns.map((column) => (
                  <th
                    key={column.id}
                    className={`overflow-hidden px-2 text-[10px] font-bold tracking-wide ${
                      column.id.toLowerCase() === "name"
                        ? "text-indigo-600"
                        : "text-slate-500"
                    }`}
                  >
                    <span className="whitespace-nowrap">{column.label}</span>

                    {column.id.toLowerCase() === "name" && (
                      <span className="ml-1 text-indigo-600">↑</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {visibleRows.map((row) => (
                <tr
                  key={row.id}
                  className="h-[62px] transition-colors hover:bg-slate-50/60 sm:h-[71px]"
                >
                  <td className="px-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleRow(row.id)}
                      aria-label={`Select ${row.name}`}
                      className="h-3.5 w-3.5 cursor-pointer accent-indigo-600"
                    />
                  </td>

                  {config.columns.map((column) => {
                    const id = column.id.toLowerCase();
                    const isActionColumn = id === "action" || id === "actions";

                    return (
                      <td
                        key={column.id}
                        className={`px-2 py-2 align-middle ${
                          isActionColumn
                            ? "overflow-visible"
                            : "overflow-hidden"
                        }`}
                      >
                        <div
                          className={
                            isActionColumn
                              ? "flex min-w-max items-center justify-start gap-1.5"
                              : "min-w-0"
                          }
                        >
                          {renderCell(row, column.id, column.type)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {visibleRows.length === 0 && (
                <tr>
                  <td
                    colSpan={config.columns.length + 1}
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No compliance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 px-3 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-4">
          <p className="text-[11px] leading-5 text-slate-500">
            Showing {visibleRows.length > 0 ? startIndex + 1 : 0}–
            {Math.min(startIndex + visibleRows.length, config.rows.length)} of{" "}
            {config.rows.length}
            {selectedRows.length > 0 && ` · ${selectedRows.length} selected`}
          </p>

          <div className="flex max-w-full items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              aria-label="Previous page"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`h-8 min-w-8 shrink-0 rounded-lg px-2 text-[11px] ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              aria-label="Next page"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicTable;
