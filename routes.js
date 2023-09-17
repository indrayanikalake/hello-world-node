const fs = require('fs');

const requestHandler = (req,res)=>{
    if (req.url === '/') {
        fs.readFile('message.txt', 'utf-8', (error, data) => {
            if (error) {
                console.log(error);
            }
            console.log(data);
            res.setHeader('Content-Type', 'text/html'); // Set Content-Type header
            res.write('<html>');
            res.write('<header><title>Home page</title></header>');
            res.write(`<body><h1>${data}</h1><form method="POST" action="/message"><input name="message" type="text" /> <button type="submit">submit</button></form></body>`);
            res.write('</html>');
            res.end();
        });
    }

    if (req.url === '/message' && req.method === 'POST') {
        const body = [];
        req.on('data', (chunkOfData) => {
            body.push(chunkOfData);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();

            const message = decodeURIComponent(parsedBody.replace(/\+/g, ' ')).replace('message=', '');

            fs.writeFileSync('message.txt', message);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        });
    }
}

module.exports = requestHandler