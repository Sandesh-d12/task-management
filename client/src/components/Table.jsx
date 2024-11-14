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
import { useNavigate, useLocation } from "react-router-dom";
import GlobalFilter from "./input/GlobalFilter";
import ColumnFilter from "./ColumnFilter";
import Checkbox from "./input/Checkbox";
import Trash from "./icons/Trash";
import { useDeleteTask } from "../api/hooks/useTask";
import Up from "./icons/Up";
import Down from "./icons/Down";
import { convertTimeToDate } from "../utils";
import { useUpdateTasksState } from "../api/hooks/useTask";
import Eye from "./icons/Eye";

function Table({ d, variant="all" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleUpdateTasksState } = useUpdateTasksState();

  const { handleDeleteTask } = useDeleteTask();
  const [open, setOpen] = useState(null);
  const [id, setId] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10) - 1;
  const handleDelete = () => {
    setOpen(false);
    handleDeleteTask({ id });
  };

  const COLUMNS = [
    {
      Header: "Title",
      accessor: "title",
      disableFilters: true,
    },
    {
      Header: "Current State",
      accessor: "taskState",
    },
    {
      Header: "Priority",
      accessor: "priority",
    },
    {
      Header: "assignee",
      accessor: "assignee",
    },
    {
      Header: "Issue Type",
      accessor: "issueType",
    },
    {
      Header: "CreatedAt",
      accessor: "createdAt",
      Cell: ({ row }) => convertTimeToDate(row.values.createdAt),
    },
    {
      Header: "Actions",
      disableSortBy: true,
      Cell: ({ row }) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          <button
            onClick={() => {
              setOpen(true);
              setId(row?.original?.id);
            }}
          >
            <Trash />
          </button>
          <button  onClick={() => navigate(`/update-task/${row?.original?.id}`)}><Eye /></button>
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

  const tableInstance = useTable(
    {
      columns,
      data,
      // defaultColumn,
      initialState: { pageIndex: initialPage },
      manualPagination: false,
      pageCount: Math.ceil(data.length / 10),
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
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            disableSortBy: true,
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
  const selectedTasksId = selectedFlatRows?.map((row) => {
    return row?.original?.id;
  });
const handleUpdateTaskState = () => {
handleUpdateTasksState({id:selectedTasksId, taskState:"done"})
}

  return (
    <div style={{ maxWidth: "1328px", width: "100%", display:"flex", flexDirection:"column", gap:"1rem" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        {selectedFlatRows.length > 0 &&(
          <>
          <button
            onClick={() => {
              setOpen(true);
              setId(row?.original?.id);
            }}
          >
            <Trash />
          </button>
      
          </>
        )}
           {selectedFlatRows.length > 0 && variant==="pending" && <button onClick={handleUpdateTaskState}>update state</button> }
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col, index) => (
                <th key={index} {...col.getHeaderProps()}>
                  {col.render("Header")}
                  {!col.disableSortBy && (
                    <button
                      onClick={col.getSortByToggleProps().onClick}
                      className="ml-2 bg-white text-white rounded overflow-hidden"
                      title={`Sort by ${col.render("Header")}`}
                    >
                      <div
                        style={{
                          color: "#000",
                          display: "flex",
                          gap: "0px",
                          padding: "4px",
                          alignItems: "center",
                          justifyContent: "center",
                          maxWidth: "60px",
                        }}
                      >
                        <span style={{ fontWeight: "300", fontSize: "0.9rem" }}>
                          Sort
                        </span>

                        <Up color={col.isSortedDesc ? "#0D4CBE" : "#000"} />
                        <Down
                          color={
                            col.isSorted && !col.isSortedDesc
                              ? "#0D4CBE"
                              : "#000"
                          }
                        />
                      </div>
                    </button>
                  )}
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
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedRows: selectedFlatRows.map((row) => row.original),
            },

            null,
            2
          )}
        </code>
      </pre> */}
    </div>
  );
}

export default Table;
