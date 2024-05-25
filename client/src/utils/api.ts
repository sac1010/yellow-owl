import axios from 'axios';


// const BASE_URL =  process.env.REACT_APP_API_BASE_URL ;
const BASE_URL =  "https://yellow-owl.onrender.com/" ;



const api = axios.create({
  baseURL: BASE_URL,
});

const apiFunctions = {
  getStudents: async () => {
    try {
      const response = await api.get('api/students');
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  addStudent: async (studentData:any) => {
    try {
      const response = await api.post('api/students', studentData);
      console.log(response.status, "status")
      console.log(response, "response")
      return response.data;
    } catch (error) {
      console.log('Error adding student:', error);
      throw error;
    }
  },

  updateStudent: async (studentId:number, updatedData:any) => {
    try {
      const response = await api.put(`api/students/${studentId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating student with ID ${studentId}:`, error);
      throw error;
    }
  },

  deleteStudent: async (studentId:number) => {
    try {
      const response = await api.delete(`api/students/${studentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting student with ID ${studentId}:`, error);
      throw error;
    }
  },
};

export default apiFunctions;
