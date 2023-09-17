const http = require('http');
const fs = require('fs');

const port = 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('message.txt', 'utf-8', (error, data) => {
      if (error) {
        console.error(error);
        res.statusCode = 500; // Internal Server Error
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
        return;
      }

      console.log(data);
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<body><title>Home Page</title></body>');
      res.write(
        `<body><h1>${data}</h1><form method="POST" action="/message">
          <input name="message" type="text" />
          <button type="submit">Submit</button>
        </form></body>`
      );
      res.write('</html>');
      res.end();
    });

    return;
  }

  if (req.url === '/message' && req.method === 'POST') {
    const body = [];
    req.on('data', (chunkOfData) => {
      body.push(chunkOfData);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = decodeURIComponent(parsedBody.replace(/\+/g, ' ')).replace('message=', '');

      fs.writeFile('message.txt', message, (error) => {
        if (error) {
          console.error(error);
          res.statusCode = 500; // Internal Server Error
          res.setHeader('Content-Type', 'text/plain');
          res.end('Internal Server Error');
          return;
        }

        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
      });
    });
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
