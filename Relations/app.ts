import express from "express";
import prisma from "./lib/prisma";

const app = express();

app.use(express.json());

const createTeacher = async () => {
  const teacher = await prisma.teacher.createManyAndReturn({
    data: [
      {
        name: "Ovais Raza",
        email: "ovaisraza@gmail.com",
      },
      {
        name: "Obaid Raza",
        email: "obaid@gmail.com",
      },
    ],
  });

  console.log("Teachers created", teacher);
};

const createClass = async () => {
  const classes = await prisma.class.createManyAndReturn({
    data: [
      {
        name: "Class 1",
        Subject: "Math",
        teacherId: 1,
      },
      {
        name: "Class 2",
        Subject: "Science",
        teacherId: 2,
      },
    ],
  });

  console.log("Classes created", classes);
};

const createStudent = async () => {
  const student = await prisma.student.create({
    data: {
      name: "Student 1",
      email: "student1@gmail.com",
      classes: {
        connect: {
          id: 1,
        },
      },
    },
  });

  console.log("Student created", student);
};

const createStudentAndInMultipleClasses = async () => {
  const student = await prisma.student.create({
    data: {
      name: "Ali",
      email: "ali@student.com",
      classes: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });

  console.log("Student created", student);
};

const getClassWithStudentsAndTeacher = async () => {
  const classWithStudentsAndTeacher = await prisma.class.findUnique({
    where: {
      id: 2,
    },
    include: {
      students: true,
      teacher: true,
    },
  });

  console.log("Class with students and teacher", classWithStudentsAndTeacher);
};

const assignTeacherToClass = async () => {
  const classWithTeacher = await prisma.class.update({
    where: {
      id: 2,
    },
    data: {
      teacher: {
        connect: {
          id: 1,
        },
      },
    },
  });

  console.log("Class with teacher", classWithTeacher);
};

const getAllClasses = async () => {
  const classes = await prisma.class.findMany({
    include: {
      students: true,
      teacher: true,
    },
  });

  console.log("All classes", classes);
};

const addStudentToClass = async () => {
  const student = await prisma.student.update({
    where: {
      id: 1,
    },
    data: {
      classes: {
        connect: {
          id: 2,
        },
      },
    },
  });

  console.log("Student updated", student);
};

const getAllStudents = async () => {
  const students = await prisma.student.findMany({
    include: {
      classes: true,
    },
  });
  console.log("All students", students);
};

getAllStudents();
// addStudentToClass();
// getAllClasses();
// getClassWithStudentsAndTeacher();
// assignTeacherToClass();
// createStudentAndInMultipleClasses();
// createStudent();
// createClass();
// createTeacher();
