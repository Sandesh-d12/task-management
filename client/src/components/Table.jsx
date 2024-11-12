import React, { useState, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { convertTimeToDate } from "../utils";
import { useDeleteTask } from "../api/hooks/useTask";
import ConfirmModal from "./modal/Modal";
import Trash from "./icons/Trash";
import Pencil from "./icons/Pencil";


const columnHelper = createColumnHelper();

export function DataTable({ tableData }) {
  const navigate = useNavigate();
  const { handleDeleteTask } = useDeleteTask();
  const [open, setOpen] = useState(null);
  const [id, setId] = useState("");
  const handleDelete = () => {
    setOpen(false)
    handleDeleteTask({ id });
  };

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
    columnHelper.accessor("actions", {
      header: () => "Actions",
      cell: ({ row }) => (
        <div style={{ display: "flex", justifyContent: "center", gap:"3rem" }}>
          <button
            onClick={() => {
              setOpen(true);
              setId(row?.original?.id);
            }}
          >
      <Trash />
          </button>
          <button onClick={() => navigate(`update-task/${row?.original?.id}`)}>
          <Pencil />
          </button>
        </div>
      ),
    }),
  ];

  const data = React.useMemo(() => {
    return tableData || [];
  }, [tableData]);
  console.log(data);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
                  style={{ width: "150px" }}
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
              className={
                index % 2 === 0
                  ? "bg-gray-100 cursor-pointer z-0"
                  : "bg-white cursor-pointer z-0"
              }
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
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <ConfirmModal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Confirm Delete"
          message="Are you sure you want to delete this task?"
          onConfirm={handleDelete}
        />
      </table>
    </div>
  );
}
