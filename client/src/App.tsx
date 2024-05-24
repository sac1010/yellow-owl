import { useState } from "react";
import "./App.css";
import AddStudent from "./components/AddStudent";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import StudentTable from "./components/StudentTable";


function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
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
              <input className="md:w-[250px] w-[170px] px-4 border border-gray-300 h-10" placeholder="Search..." type="text" />
              <button onClick={()=>setIsAddModalOpen(true)} className="bg-[#22C55E] ml-3 md:px-3 px-2 py-2 rounded text-white">
                Add <span className="hidden md:inline">New Student</span>
              </button>
            </div>
          </div>
          <StudentTable />
        </div>
      </div>
      <Modal onClose={()=>setIsAddModalOpen(false)} isOpen={isAddModalOpen} >
          <AddStudent onClose={()=>setIsAddModalOpen(false)}/>
      </Modal>
    </div>
  );
}

export default App;
