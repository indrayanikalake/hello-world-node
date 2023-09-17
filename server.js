// Import the HTTP module
const http = require('http');

// Define the port you want to run the server on
const port = 4000;

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the response header
  res.setHeader('Content-Type', 'text/plain');

  // Log your name to the console
  console.log('Your Name: John Doe');

  // Send a response to the browser
  res.end('Your Name: John Doe\n');
});

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
