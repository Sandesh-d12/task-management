import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {useNavigate } from 'react-router-dom'
import { convertTimeToDate } from "../utils";
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("title", {
    header: () => "Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("content", {
    header: () => "Description",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("priority", {
    header: () => "Priority",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("assignee", {
    header: () => "Assignee",
    cell: (info) => info.getValue(),

  }),
  columnHelper.accessor("estimation", {
    header: () => "Estimation",
    cell: (info) => info.getValue(),

  }),
  columnHelper.accessor("taskState", {
    header: () => "State",
    cell: (info) => info.getValue(),

  }),
  columnHelper.accessor("issueType", {
    header: () => "Issue Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: () => "Created At",
    cell: (info) => convertTimeToDate(info.getValue()),

  }),
];

export function DataTable({ tableData }) {
  const navigate = useNavigate()
  const data = React.useMemo(() => {
    return tableData || [];
  }, [tableData]);
console.log(data)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

 const handleRowClick = (id) => {
  console.log(id)
navigate(`/update-task/${id}`)
 }

  return (
    <div className="p-2">
      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-blue-500 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="p-5 border border-gray-200 font-semibold"
                  key={header.id}
                  style={{ width: "150px" }} // Fixed width for header cells
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              onClick={() => handleRowClick(row?.original?.id)} 
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-5 border border-gray-200 text-center"
                  style={{
                    width: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }} // Fixed width for data cells
                >
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
