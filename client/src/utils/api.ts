import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
});

const apiFunctions = {
  getStudents: async () => {
    try {
      const response = await api.get('/students');
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  addStudent: async (studentData:any) => {
    try {
      const response = await api.post('/students', studentData);
      return response.data;
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  },

  updateStudent: async (studentId:number, updatedData:any) => {
    try {
      const response = await api.put(`/students/${studentId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating student with ID ${studentId}:`, error);
      throw error;
    }
  },

  deleteStudent: async (studentId:number) => {
    try {
      const response = await api.delete(`/students/${studentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting student with ID ${studentId}:`, error);
      throw error;
    }
  },
};

export default apiFunctions;
