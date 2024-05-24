import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import EditStudent from "./EditStudent";
import Modal from "./Modal";
import apiFunctions from "../utils/api";
import moment from "moment";

export type Student = {
  _id: number;
  name: string;
  email: string;
  phone: number;
  enrollment: number;
  date: string;
};

type Props = {
  studentsData: Student[];
  updateData: () => void;
};

const columnHelper = createColumnHelper<Student>();

function StudentTable({ studentsData, updateData }: Props) {
  console.log(studentsData, "dd");

  // const [data, setData] = React.useState<Student[]>(studentsData);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<Student | null>();

  const columns = React.useMemo(
    () => [
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
        cell: (info) => (
          <div>{moment(info.getValue()).utc().format("DD-MMM-YYYY")}</div>
        ),
        header: () => "Date Of Admission",
      }),
      columnHelper.accessor("_id", {
        cell: (info) => (
          <div className="flex gap-4">
            <button
              onClick={() => {
                setIsEditModalOpen(true);
                setSelectedId(info.row.original);
                console.log(info.row.original);
              }}
            >
              <img src="/edit.svg" className="h-3 w-3" alt="edit" />
            </button>
            <button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedId(info.row.original);
              }}
            >
              <img src="/trash.svg" alt="delete" className="h-3 w-3" />
            </button>
          </div>
        ),
        header: () => "",
      }),
    ],
    []
  );

  const table = useReactTable({
    data: studentsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });



  const handleDelete = async () => {
    if (selectedId) {
      try {
        const res = await apiFunctions.deleteStudent(selectedId._id);
        updateData();
        setIsDeleteModalOpen(false);
        setSelectedId(null);
        console.log(res, "student Deleted");
      } catch (e: any) {
        console.log(e.message);
      }
    }
  };

  return (
    <>
      {studentsData.length > 0 && (
        <div className="p-2 w-full bg-white rounded-md shadow-md">
          <table className="w-full text-left">
            <thead className="border-b rounded-md border-gray-300 h-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className={`font-semibold text-sm text-gray-600 ${
                        header.column.id === "phone" ||
                        header.column.id === "enrollment" ||
                        header.column.id === "date"
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
                        cell.column.id === "phone" ||
                        cell.column.id === "enrollment" ||
                        cell.column.id === "date"
                          ? "hidden md:table-cell"
                          : ""
                      }`}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            onClose={() => setIsEditModalOpen(false)}
            isOpen={isEditModalOpen}
          >
            <EditStudent
              updateData={updateData}
              editData={selectedId}
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedId(null);
              }}
            />
          </Modal>
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedId(null);
            }}
          >
            <div className="w-full text-center ">
              Are you sure to delete this student?
              <div className="flex gap-3 justify-center items-center mt-4">
                <button
                  onClick={handleDelete}
                  className=" bg-[#22C55E] text-white rounded py-1 px-8"
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className=" bg-[#C55D22] text-white rounded py-1 px-8"
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}

export default StudentTable;
