var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (req, res) {
    var _url = req.url;
    var query_date = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    // title만 사용해서 본문 내용을 추가했던 방법
    // if(title == null){
    //     title = 'Welcome'
    // };
    console.log(query_date.id)

    if (pathname === '/') {
        if (query_date.id === undefined) {
            fs.readFile(`data/${query_date.id}`, 'utf-8', function (err, description) {
                var title = 'Welcome';
                var description = 'Hellom, Node.js';
                var template = `
            <!doctype html>
            <html>
            
            <head>
                <meta charset="utf-8">
                <link rel="icon" href="data:,">
                <title>WEB1 - ${title}</title>
            </head>
            
            <body>
                <h1><a href="/">WEB</a></h1>
                <ol>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=JavaScript">JavaScript</a></li>
                </ol>
                <h2>${title}</h2>
                <p>
                    ${description}
                </p>
            </body>
            
            </html>
            `
                res.writeHead(200);
                res.end(template);
            })
        } else {
            fs.readFile(`data/${query_date.id}`, 'utf-8', function (err, description) {
                var title = query_date.id;
                var template = `
            <!doctype html>
            <html>
            
            <head>
                <meta charset="utf-8">
                <link rel="icon" href="data:,">
                <title>WEB1 - ${title}</title>
            </head>
            
            <body>
                <h1><a href="/">WEB</a></h1>
                <ol>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=JavaScript">JavaScript</a></li>
                </ol>
                <h2>${title}</h2>
                <p>
                    ${description}
                </p>
            </body>
            
            </html>
            `
                res.writeHead(200);
                res.end(template);
            })
        }

    } else {
        res.writeHead(404);
        res.end('Not Found!')
    }

})



app.listen(3000); 