var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body){

    return `
    <!doctype html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <link rel="icon" href="data:,">
        <title>WEB1 - ${title}</title>
    </head>
    
    <body>
        <h1><a href="/">WEB</a></h1>
        ${list}

    ${body}
    </body>
    
    </html>
    `
};

function templateList(filelist) {
    _list = '<ul>';
    var i = 0;

    while (filelist.length > i){
        _list += `\n<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        i += 1;
    };
    _list += '</ul>'

    return _list
}

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

            fs.readdir('./data', function(err, filelist){
                var title = 'Welcome';
                var description = 'Hellom, Node.js';

                // 유동적인 파일 
                var _list = templateList(filelist);
                var template = templateHTML(title, _list, `<h2>${title}</h2><p>${description}</p>`);
                
                res.writeHead(200);
                res.end(template);
            })
            
        } else {
            fs.readdir('./data', function(err, filelist){
                // 유동적인 파일 목록 리스트
                _list = templateList(filelist);
                
                fs.readFile(`data/${query_date.id}`, 'utf-8', function (err, description) {
                    var title = query_date.id;
                    var template = templateHTML(title, _list, `<h2>${title}</h2><p>${description}</p>`)
                    res.writeHead(200);
                    res.end(template);
                })
            });
        }
    } else {
        res.writeHead(404);
        res.end('Not Found!')
    }

})



app.listen(3000); 