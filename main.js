var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(req, res){
    var _url = req.url;
    var query_date = new URL('http://localhost:3000' + _url).searchParams;

    var title = query_date.get('id');

    console.log('==============================')
    console.log('before : '+title)

    if(title == null){
        title = 'Welcome'
    };

    if(_url == '/favicon.ico'){
        return res.writeHead(404);
    }

    res.writeHead(200);

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
    <p>The World Wide Web (abbreviated WWW or the Web) is an information space where documents and other web resources
        are identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the
        Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web
        browser computer program in 1990 while employed at CERN in Switzerland.[2][3] The Web browser was released
        outside of CERN in 1991, first to other research institutions starting in January 1991 and to the general public
        on the Internet in August 1991.
    </p>
</body>

</html>
`

    console.log('after : '+title)
    res.end(template);
})

app.listen(3000); 