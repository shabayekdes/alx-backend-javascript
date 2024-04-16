export default function updateStudentGradeByCity(students, city, newGrade) {
  return students.map((student) => {
    const { id } = student;
    const foundGrade = newGrade.find((element) => element.studentId === id);
    const studentGrade = foundGrade ? foundGrade.grade : 'N/A';

    return { ...student, grade: studentGrade };
  }).filter((student) => student.location === city);
}
