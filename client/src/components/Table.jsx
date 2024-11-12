import React, { useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import ConfirmModal from "./modal/Modal";
import { useNavigate } from "react-router-dom";
import "./table.css";
import GlobalFilter from "./input/GlobalFilter";
import ColumnFilter from "./ColumnFilter";
import Checkbox from "./input/Checkbox";
import Trash from "./icons/Trash";
import Pencil from "./icons/Pencil";
import { useDeleteTask } from "../api/hooks/useTask";


function Table({ d }) {
  const navigate = useNavigate();
  const { handleDeleteTask } = useDeleteTask();
  const [open, setOpen] = useState(null);
  const [id, setId] = useState("");
  const handleDelete = () => {
    setOpen(false);
    handleDeleteTask({ id });
  };


  const COLUMNS = [
    // {
    //     Header:"S.N",
    //     // accessor:d.length,
    //     disableFilters: true,
    //     disableSortBy:true,

    // },
    {
      Header: "Title",
      accessor: "title",
      // Filter:ColumnFilter,
      disableFilters: true,
    },
    {
      Header: "Description",
      accessor: "content",
      // Filter:ColumnFilter //use defaultFilters in table componen
    },
    {
      Header: "Priority",
      accessor: "priority",
      // Filter:ColumnFilter
    },
    {
      Header: "assignee",
      accessor: "assignee",
      // Filter:ColumnFilter
    },
    {
      Header: "Issue Type",
      accessor: "issueType",
      // Cell:({})=>{
      //   <Sort />
      // }
      // Filter:ColumnFilter
    },
    {
      Header: "Actions",
      disableSortBy: true,
      Cell: ({ row }) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
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
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => d || [], [d]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  console.log(data);
  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      //   manualPagination: true,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps} />
            ),
            disableSortBy:true,
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    previousPage,
    selectedFlatRows, //it will give selected flat arrow
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <div style={{ maxWidth: "1328px", width: "100%" }}>
      <div style={{ display: "flex", gap: "3rem" }}>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col, index) => (
                <th
                  key={index}
                  {...col.getHeaderProps()}
                >
                  {col.render("Header")}
                 {!col.disableSortBy && <button
                    onClick={col.getSortByToggleProps().onClick}
                    className="ml-2 p-1 bg-blue-500 text-white rounded"
                    title={`Sort by ${col.render("Header")}`}
                  >
                    {col.isSorted ? (
                      col.isSortedDesc ? (
                        <span>&#x25BC; </span>
                      ) : (
                        <span>&#x25B2; </span>
                      )
                    ) : (
                      <span>Sort &#x21C5;</span>
                    )}
                  </button>
}
                </th>
              ))}
          
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  return (
                    <td {...cell.getCellProps()} key={index}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
             
              </tr>
            );
          })}
        </tbody>
      </table>
      <ConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm Delete"
        message="Are you sure you want to delete this task?"
        onConfirm={handleDelete}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "20px",
        }}
      >
        <span>Page </span>
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Prev
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRows: selectedFlatRows.map((row) => row.original),
            },

            null,
            2
          )}
        </code>
      </pre>
    </div>
  );
}

export default Table;
