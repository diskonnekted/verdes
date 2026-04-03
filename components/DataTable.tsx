'use client';

interface DataTableProps {
  columns: Array<{
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
  }>;
  data: any[];
  onRowClick?: (row: any) => void;
}

export default function DataTable({ columns, data, onRowClick }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#0f172a]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-3 py-2.5 text-left text-[#60a5fa] font-semibold border-b-2 border-[#334155]"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              className="border-b border-[#1e293b] hover:bg-[#0f172a40] cursor-pointer"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-3 py-2.5 text-gray-300">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          Tidak ada data
        </div>
      )}
    </div>
  );
}
