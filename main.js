var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(req, res){
    var _url = req.url;
    var query_date = new URL('http://localhost:3000' + _url).searchParams;

    var title = query_date.get('id');

    if(title == null){
        title = 'Welcome'
    };

    if(_url == '/favicon.ico'){
        return res.writeHead(404);
    }

    res.writeHead(200);
    console.log(title)
    fs.readFile(`data/${title}`, 'utf-8', function(err, description){
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
    res.end(template);
})
    })

    

app.listen(3000); 