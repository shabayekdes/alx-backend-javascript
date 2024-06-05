const fs = require('fs'); // Import the fs module for file operations

const { promisify } = require('util'); // Import the promisify function from the util module

const readFileAsync = promisify(fs.readFile); // Convert fs.readFile to a promise-based function

/**
 * Counts the number of students in each field from a CSV file.
 * @param {string} dataPath The path to the CSV file.
 */
const countStudents = async (dataPath) => {
  try {
    /**
     * Read the CSV file asynchronously using the promisified fs.readFile function
     * The 'utf-8' encoding is used to read the file as a string
     */
    const data = await readFileAsync(dataPath, 'utf-8');

    /**
     * Split the file content into lines
     */
    const fileLines = data.trim().split('\n');

    /**
     * Initialize an object to store student groups
     */
    const studentGroups = {};

    /**
     * Iterate over each student record in the CSV file
     */
    for (const line of fileLines.slice(1)) {
      /**
       * Split the student record into individual fields
       */
      const studentRecord = line.split(',');

      /**
       * Get the field (last element of the student record)
       */
      const field = studentRecord.pop();

      /**
       * Check if the field is not already in the student groups
       */
      if (!studentGroups[field]) {
        /**
         * Initialize the field in the student groups
         */
        studentGroups[field] = [];
      }

      /**
       * Create an array of student entries (property names and values)
       */
      const studentEntries = studentRecord.map((value, idx) => [
        fileLines[0].split(',')[idx],
        value,
      ]);

      /**
       * Add the student entries to the corresponding field in the student groups
       */
      studentGroups[field].push(Object.fromEntries(studentEntries));
    }

    /**
     * Calculate the total number of students
     */
    const totalStudents = Object.values(studentGroups).reduce(
      (pre, cur) => pre + cur.length,
      0,
    );

    /**
     * Log the total number of students
     */
    console.log(`Number of students: ${totalStudents}`);

    /**
     * Log the number of students in each field
     */
    for (const [field, group] of Object.entries(studentGroups)) {
      const studentNames = group.map((student) => student.firstname).join(', ');
      console.log(
        `Number of students in ${field}: ${group.length}. List: ${studentNames}`,
      );
    }
  } catch (error) {
    /**
     * Catch and log any errors that occur during the execution of the code
     */
    console.error('Cannot load the database:', error);
  }
};

module.exports = countStudents;
