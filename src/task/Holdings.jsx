import React from "react";
import styled from "styled-components";

import {
  useTable,
  usePagination,
  useSortBy,
  useColumnOrder,
  useBlockLayout,
  useResizeColumns,
} from "react-table";

export default function Holdings({ holdings }) {
  const data = React.useMemo(() => holdings, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Ticker",
        accessor: "ticker",
      },
      {
        Header: "Asset Class",
        accessor: "asset_class",
      },

      {
        Header: "Average Price",
        accessor: "avg_price",
        Cell: ({ value }) => {
          if (!parseInt(value)) {
            return "Not Available";
          } else {
            return parseInt(value);
          }
        },
      },
      {
        Header: "Market Price",
        accessor: "market_price",
        Cell: ({ value }) => {
          if (!parseInt(value)) {
            return "Not Available";
          } else {
            return parseInt(value);
          }
        },
      },
      {
        Header: "PC",
        accessor: "latest_chg_pct",
      },
      {
        Header: "MV in Base CCY",
        accessor: "market_value_ccy",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    setColumnOrder,
  } = useTable(
    { columns, data },
    useSortBy,
    usePagination,
    useColumnOrder,
    useBlockLayout,
    useResizeColumns
  );

  const changeOrder = () => {
    let arr = [
      "name",
      "ticker",
      "asset_class",
      "market-price",
      "market_value_ccy",
      "latest_chg_pct",
    ];
    setColumnOrder(arr);
  };

  const Styles = styled.div`
    .resizer {
      display: inline-block;
      background: white;
      border: 3px dashed white;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(50%);
      z-index: 1;
      ${""}
      touch-action:none;

      &.isResizing {
        background: red;
      }
    }
  `;

  return (
    <Styles>
      <div className="container">
        <button className="btn btn-primary mb-2" onClick={() => changeOrder()}>
          Recorder
        </button>
        <table
          {...getTableProps()}
          className="table container"
          style={{ width: "100%" }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="bg-dark border-0 text-white  w-25"
                  >
                    {column.render("Header")}
                    <div
                      {...column.getResizerProps()}
                      className={
                        `resizer ${column.isResizing ? "isResizing" : ""}` +
                        "bg-blue-700"
                      }
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <button className="btn-md btn-primary" onClick={() => previousPage()}>
            Previous
          </button>
          <button
            className="btn-md btn-primary ml-2"
            onClick={() => nextPage()}
          >
            Next
          </button>
        </table>
      </div>
    </Styles>
  );
}
