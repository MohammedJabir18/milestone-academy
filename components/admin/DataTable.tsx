"use client";

import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Inbox, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface ColumnDef<T> {
  header: React.ReactNode;
  accessorKey?: keyof T | string; // The raw property name to extract for search/sort
  cell?: (row: T) => React.ReactNode; 
  enableSorting?: boolean;
  className?: string; // e.g. text-right for actions
}

interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: ColumnDef<T>[];
  searchKey?: keyof T | string; // Which key to search on
  searchPlaceholder?: string;
  actionSlot?: React.ReactNode;
  loading?: boolean;
  emptyMessage?: string;
  itemsPerPage?: number;
}

export function DataTable<T>({
  title,
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
  actionSlot,
  loading = false,
  emptyMessage = "No records found.",
  itemsPerPage = 20,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  // Core Processing (Search -> Sort -> Paginate)
  const processedData = useMemo(() => {
    let result = [...data];

    // 1. Search
    if (search && searchKey) {
      const lowerSearch = search.toLowerCase();
      result = result.filter((item) => {
        const val = item[searchKey as keyof T];
        if (typeof val === "string") return val.toLowerCase().includes(lowerSearch);
        return false;
      });
    }

    // 2. Sort
    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key as keyof T];
        const bVal = b[sortConfig.key as keyof T];
        
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, search, searchKey, sortConfig]);

  // 3. Paginate
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const paginatedData = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
      {/* Header Bar */}
      <div className="p-5 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
        <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {searchKey && (
            <div className="relative w-full sm:w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
              <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // Reset page on search
                }}
                className="pl-9 h-9 w-full bg-neutral-50/50"
              />
            </div>
          )}
          {actionSlot}
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto min-h-[300px] relative" data-lenis-prevent="true">
        <Table>
          <TableHeader className="bg-neutral-50/70">
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead
                  key={idx}
                  className={`font-medium ${col.className || ""} ${
                    col.enableSorting && col.accessorKey ? "cursor-pointer hover:bg-neutral-100 transition-colors" : ""
                  }`}
                  onClick={() => col.enableSorting && col.accessorKey && handleSort(col.accessorKey as string)}
                >
                  <div className={`flex items-center gap-1 ${col.className?.includes('text-right') ? 'justify-end' : ''}`}>
                    {col.header}
                    {sortConfig && sortConfig.key === col.accessorKey && (
                      <span className="text-[10px] text-neutral-400">
                        {sortConfig.direction === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-neutral-100">
            {loading ? (
              // Loading Skeleton State
              Array.from({ length: 5 }).map((_, r) => (
                <TableRow key={`skeleton-${r}`}>
                  {columns.map((_, c) => (
                    <TableCell key={`skeleton-${r}-${c}`}>
                      <div className="h-5 bg-neutral-100 rounded-md w-3/4 animate-pulse" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : paginatedData.length > 0 ? (
              // Data Rows
              paginatedData.map((row, rIdx) => (
                <TableRow key={`row-${rIdx}`} className="hover:bg-neutral-50/50 transition-colors">
                  {columns.map((col, cIdx) => (
                    <TableCell key={`col-${rIdx}-${cIdx}`} className={`py-4 ${col.className || ""}`}>
                      {col.cell 
                        ? col.cell(row) 
                        : col.accessorKey 
                          ? String(row[col.accessorKey as keyof T] ?? '—') 
                          : '—'}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Empty State
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-neutral-400 gap-3">
                    <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center">
                      <Inbox size={24} className="text-neutral-300" />
                    </div>
                    <p className="text-sm font-medium">{emptyMessage}</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Pagination */}
      {!loading && totalPages > 1 && (
        <div className="p-4 border-t border-neutral-200 flex items-center justify-between bg-neutral-50/30">
          <p className="text-sm text-neutral-500">
            Showing <span className="font-medium text-neutral-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-medium text-neutral-900">{Math.min(currentPage * itemsPerPage, processedData.length)}</span> of{" "}
            <span className="font-medium text-neutral-900">{processedData.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8"
            >
              <ChevronLeft size={16} className="mr-1" /> Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8"
            >
              Next <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
