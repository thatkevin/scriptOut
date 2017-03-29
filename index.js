
var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});

    var script = require('./script.json');


    var spawn = require('child_process').spawn,
    proc = spawn(script.script, (script.args ? script.args : []));

    proc.stdout.on('data', function (data) {
        response.write('stdout: ' + data.toString());
    });

    proc.stderr.on('data', function (data) {
        response.write('stderr: ' + data.toString());
        response.end('end');
    });

    proc.on('close', function(code) {
        response.write('closed with code 2' + code);
        response.end('end');
    });
}).listen(8080);

console.log('Server started');
