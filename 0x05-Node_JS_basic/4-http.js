const http = require('http'); // Import the http module

const PORT = 1245; // Define the port number
const HOST = 'localhost'; // Define the host
const app = http.createServer(); // Create an HTTP server

/**
 * Handle incoming requests
 */
app.on('request', (req, res) => {
  const responseText = 'Hello Holberton School!'; // Initialize the response text

  /**
   * Set the response headers and write the response
   */
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', responseText.length);
  res.statusCode = 200;
  res.write(Buffer.from(responseText));
  res.end(); // Close the response
});

/**
 * Start the server and listen on the specified port and host
 */
app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app; // Export the app
