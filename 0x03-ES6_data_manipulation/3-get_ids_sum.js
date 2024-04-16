export default function getStudentIdsSum(students) {
  return students.reduce((carry, student) => (student.id + carry), 0);
}
