var http = require('http'),
    url = require('url'),
    tache = require('mustache');
    fs = require('fs');

http.createServer(function (request, response) {
    console.log('Request started');
    response.writeHead(200, {'Content-Type': 'text/plain'});

    fs.readFile('./script.json', 'utf8', function(err, data) {
        if (err) {
            console.log('Error reading');
            response.write("Couldn\'t read script");
            response.end();
            return;
        }
        var urlParts = url.parse(request.url, true).query;
        var script = JSON.parse(tache.render(data, urlParts));

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

    });
}).listen(8080);

console.log('Server started');
