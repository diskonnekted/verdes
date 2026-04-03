'use client';

interface DataTableProps {
  columns: Array<{
    key: string;
    label: string;
    width?: string;
    render?: (value: any, row: any) => React.ReactNode;
  }>;
  data: any[];
  onRowClick?: (row: any) => void;
}

export default function DataTable({ columns, data, onRowClick }: DataTableProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.82rem',
      }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  background: '#0f172a',
                  padding: '10px 12px',
                  textAlign: 'left',
                  color: '#60a5fa',
                  fontWeight: 600,
                  borderBottom: '2px solid #334155',
                  width: col.width,
                }}
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
              style={{
                cursor: onRowClick ? 'pointer' : 'default',
              }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    padding: '9px 12px',
                    borderBottom: '1px solid #1e293b',
                    verticalAlign: 'top',
                    color: '#e2e8f0',
                  }}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          color: '#64748b',
          fontSize: '0.82rem',
          background: '#0f172a',
          border: '1px dashed #334155',
          borderRadius: '8px',
          marginTop: '12px',
        }}>
          Tidak ada data
        </div>
      )}
    </div>
  );
}
