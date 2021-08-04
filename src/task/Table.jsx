import React from "react";
import { useTable, usePagination } from "react-table";

export default function Table({ transactions }) {
  const data = React.useMemo(() => transactions, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Ticket Ref",
        accessor: "ticketref",
      },
      {
        Header: "Trade",
        accessor: "traded_on", // accessor is the "key" in the data
      },
      {
        Header: "CCY",
        accessor: "currency",
      },
      {
        Header: "QTY",
        accessor: "quantity",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable({ columns, data }, usePagination);

  return (
    <div className="container mt-4">
      {console.log(transactions)}
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="bg-dark border-0 text-white"
                >
                  {column.render("Header")}
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
      </table>
    </div>
  );
}
