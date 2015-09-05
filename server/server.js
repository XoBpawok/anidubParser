var http = require('http');
var Parser = require('./parser.js');

var pages = [];

console.log('server was started');

for (var i = 0; i < 2; i++) {
  pages.push(i + 1);
}

// create a server
http.createServer(function(req, res) {
  console.log('request received');

  if (req.url === '/') {
    var parser = new Parser();
    parser.processPages(pages).then(function() {
      res.writeHead(200, {'Content-Type': 'text/plain','charset': 'utf8'});
      res.write(JSON.stringify(parser.parsedData));
      res.end();
    });
  };
}).listen(8888);