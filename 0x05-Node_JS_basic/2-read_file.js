const fs = require('fs');

/**
 * Counts the number of students in each field from a CSV file.
 * 
 * @param {string} dataPath The path to the CSV file.
 */
const countStudents = (dataPath) => {
  // Check if the file exists
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Cannot load the database: ${dataPath}`);
  }
  
  // Check if the file is a file (not a directory)
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error(`Cannot load the database: ${dataPath}`);
  }

  // Read the file content
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  
  // Split the file content into lines
  const fileLines = fileContent.trim().split('\n');
  
  // Get the field names from the first line
  const dbFieldNames = fileLines[0].split(',');
  
  // Get the student property names (excluding the field)
  const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

  // Initialize an object to store student groups
  const studentGroups = {};

  // Iterate over each line (excluding the first line)
  for (const line of fileLines.slice(1)) {
    // Split the line into student records
    const studentRecord = line.split(',');
    
    // Get the student property values (excluding the field)
    const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
    
    // Get the field
    const field = studentRecord[studentRecord.length - 1];
    
    // Check if the field is not already in the student groups
    if (!Object.keys(studentGroups).includes(field)) {
      // Initialize the field in the student groups
      studentGroups[field] = [];
    }
    
    // Create an array of student entries (property names and values)
    const studentEntries = studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]]);
    
    // Add the student entries to the corresponding field in the student groups
    studentGroups[field].push(Object.fromEntries(studentEntries));
  }

  // Calculate the total number of students
  const totalStudents = Object.values(studentGroups).reduce((pre, cur) => (pre || []).length + cur.length);
  
  // Log the total number of students
  console.log(`Number of students: ${totalStudents}`);
  
  // Log the number of students in each field
  for (const [field, group] of Object.entries(studentGroups)) {
    const studentNames = group.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
  }
};

module.exports = countStudents;
