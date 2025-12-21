import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as XLSX from 'xlsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function exportToExcel(data: Record<string, unknown>[], filename: string = 'export.xlsx', sheetName: string = 'Data') {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, filename);
}

export function exportToExcelAdvanced(
  data: Record<string, unknown>[],
  filename: string = 'export.xlsx',
  options: {
    sheetName?: string;
    customHeaders?: Record<string, string>;
  } = {}
) {
  const { sheetName = 'Data', customHeaders } = options;

  let processedData: Record<string, unknown>[] = data;

  if (customHeaders) {
    processedData = data.map(item => {
      const newItem: Record<string, unknown> = {};
      Object.keys(item).forEach(key => {
        newItem[customHeaders[key] || key] = item[key];
      });
      return newItem;
    });
  }

  const worksheet = XLSX.utils.json_to_sheet(processedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, filename);
}
