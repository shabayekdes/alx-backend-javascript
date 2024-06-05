// Write a message to the console, asking the user for their name
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Set up an event listener for the 'readable' event on the process.stdin stream
process.stdin.on('readable', () => {
  // Read the available data from the stream
  const chunk = process.stdin.read();

  // Check if the chunk is not null or undefined
  if (chunk) {
    // Write a response to the console, including the user's input
    process.stdout.write(`Your name is: ${chunk}`);
  }
});

// Set up an event listener for the 'end' event on the process.stdin stream
process.stdin.on('end', () => {
  // Write a farewell message to the console
  process.stdout.write('This important software is now closing\n');
});
