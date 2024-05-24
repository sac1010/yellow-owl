import { Request, Response } from 'express';
import Student from '../models/student';

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  const { name, email, phone, enrollment, date } = req.body;
  const student = new Student({ name, email, phone, enrollment, date });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone, enrollment, date } = req.body;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.name = name || student.name;
    student.email = email || student.email;
    student.phone = phone || student.phone;
    student.enrollment = enrollment || student.enrollment;
    student.date = date || student.date;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await Student.deleteOne({ _id: id });
      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
