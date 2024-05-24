import React, { useState } from "react";
import { Student } from "./StudentTable";
import apiFunctions from "../utils/api";

type AddStudentFormProps = {
  editData: Student | null | undefined;
  onClose: () => void;
  updateData :()=>void
};

const EditStudent: React.FC<AddStudentFormProps> = ({ onClose, editData, updateData }) => {
  const [name, setName] = useState(editData?.name);
  const [email, setEmail] = useState(editData?.email);
  const [phone, setPhone] = useState(editData?.phone.toString());
  const [enrollment, setEnrollment] = useState(editData?.enrollment.toString());
  const [date, setDate] = useState(editData?.date);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editData) {
      try {
        const res = await apiFunctions.updateStudent(editData?._id, {
          name,
          email,
          phone: Number(phone),
          enrollment: Number(enrollment),
          date,
        });
        console.log("updated", res);
        updateData()
        onClose();
      } catch (e: any) {
        console.log(e.message);
      }
    }
  };

  console.log("rendered");
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* <label className="block text-gray-700">Name</label> */}
          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          {/* <label className="block text-gray-700">Email</label> */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          {/* <label className="block text-gray-700">Phone</label> */}
          <input
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          {/* <label className="block text-gray-700">Enrollment Number</label> */}
          <input
            type="number"
            placeholder="Enroll Number"
            value={enrollment}
            onChange={(e) => setEnrollment(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          {/* <label className="block text-gray-700">Date of Admission</label> */}
          <input
            type="date"
            placeholder="Date of Admission"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="font-semibold px-4 py-2 bg-[#22C55E] text-white rounded w-full"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-[#C55D22] rounded mr-2 w-full mt-4 text-white font-semibold"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
