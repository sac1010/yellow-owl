import { useEffect, useState } from "react";
import "./App.css";
import AddStudent from "./components/AddStudent";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import StudentTable, { Student } from "./components/StudentTable";
import api from "./utils/api";
import Loader from "./components/Loader";

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      setLoading(true);
      const data = await api.getStudents();
      setStudentsData(data);
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const filteredStudents = studentsData.filter(
    (student: Student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.enrollment.toString().includes(search)
  );

  return (
    <div className="w-full grid grid-cols-12">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="md:col-span-10 col-span-12">
        <Navbar />
        <div className="px-5">
          <div className="flex justify-between items-center py-8">
            <div className="md:text-3xl text-md font-semibold px text-gray-600">
              Students
            </div>
            <div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="md:w-[250px] w-[170px] px-4 border border-gray-300 h-10"
                placeholder="Search..."
                type="text"
              />
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#22C55E] ml-3 md:px-3 px-2 py-2 rounded text-white"
              >
                Add <span className="hidden md:inline">New Student</span>
              </button>
            </div>
          </div>
          <StudentTable updateData={getData} studentsData={filteredStudents} />
        </div>
      </div>
      <Modal onClose={() => setIsAddModalOpen(false)} isOpen={isAddModalOpen}>
        <AddStudent
          updateData={getData}
          onClose={() => setIsAddModalOpen(false)}
        />
      </Modal>
      {loading && <Loader />}
    </div>
  );
}

export default App;
