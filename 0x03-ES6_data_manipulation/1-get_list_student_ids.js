export default function getListStudentsIds(array) {
  if (Array.isArray(array)) {
    return array.map((obj) => obj.id);
  }
  return [];
}
