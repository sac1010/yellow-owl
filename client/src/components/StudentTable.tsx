import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Student = {
  id: number;
  name: string;
  email: string;
  phone: number;
  enrollment: number;
  date: string;
};

const defaultData: Student[] = [
  {
    id: 1224,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: 1224567890,
    enrollment: 101,
    date: "2023-01-01",
  },
  {
    id: 12244,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: 9876543210,
    enrollment: 102,
    date: "2023-01-02",
  },
  {
    id: 122443,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: 5555555555,
    enrollment: 103,
    date: "2023-01-03",
  },
];

const columnHelper = createColumnHelper<Student>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => (
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-gray-300 rounded-full hidden md:block"></div>
        <div>{info.getValue()}</div>
      </div>
    ),
    header: () => "Name",
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    header: () => "Email",
  }),
  columnHelper.accessor("phone", {
    cell: (info) => info.getValue(),
    header: () => "Phone",
  }),
  columnHelper.accessor("enrollment", {
    cell: (info) => info.getValue(),
    header: () => "Enrollment Number",
  }),
  columnHelper.accessor("date", {
    cell: (info) => info.getValue(),
    header: () => "Date Of Admission",
  }),
  columnHelper.accessor("id", {
    cell: (info) => (
      <div className="flex gap-4">
        <button>
          <img src="/edit.svg" className="h-3 w-3" alt="edit" />
        </button>
        <button>
          <img src="/trash.svg" alt="delete" className="h-3 w-3" />
        </button>
      </div>
    ),
    header: () => "",
  }),
];

function StudentTable() {
  const [data, _setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 w-full bg-white rounded-md shadow-md">
      <table className="w-full text-left">
        <thead className="border-b rounded-md border-gray-300 h-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className={`font-semibold text-sm text-gray-600 ${
                    header.column.id === "phone" || header.column.id === "enrollment" || header.column.id === "date"
                      ? "hidden md:table-cell"
                      : ""
                  }`}
                  key={header.id}
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
          {table.getRowModel().rows.map((row) => (
            <tr className="h-12" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className={`text-sm ${
                    cell.column.id === "phone" || cell.column.id === "enrollment" || cell.column.id === "date"
                      ? "hidden md:table-cell"
                      : ""
                  }`}
                  key={cell.id}
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

export default StudentTable;
