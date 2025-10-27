import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  getFilteredRowModel,
  type ColumnFilter,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

type TableProps<T> = {
  data: T[],
  columns: ColumnDef<T, unknown>[],
  columnFilters?: Record<string, unknown> // filtros externos
}

export function Table<T>({ data, columns, columnFilters = {} }: TableProps<T>) {
  const [internalFilters, setInternalFilters] = useState<ColumnFilter[]>([]);

  // Sincronizar filtros externos con estado interno
  useEffect(() => {
    const filtersArray: ColumnFilter[] = Object.entries(columnFilters)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([id, value]) => ({ id, value }));
    setInternalFilters(filtersArray);
  }, [columnFilters]);

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters: internalFilters },
    onColumnFiltersChange: setInternalFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="overflow-x-auto border border-blue-200 rounded-lg overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wider">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="p-3 text-left border-b border-gray-200">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="text-gray-900">
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`hover:bg-gray-50 transition-colors ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-3 py-6 border-b border-gray-200">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
