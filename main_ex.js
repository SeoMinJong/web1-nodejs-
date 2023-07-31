const sanitizeHtml = require('sanitize-html');
const express = require('express');
const path = require('path');
const fs = require('fs');

const template_f = require('./lib/template.js');

const app = express()
const port = 3000

app.get('/', (req, res) => {
    fs.readdir('./data', function(err, filelist){
        var title = 'Welcome';
        var description = 'Hello, Node.js';

        // 유동적인 파일 
        var _list = template_f.list(filelist);
        var template = template_f.html(title, _list, 
            `<h2>${title}</h2><p>${description}</p>`, 
            `<a href="/create">create</a>`);
        
        res.send(template);
    })
})

app.get('/page/:pageId', function(req, res){
    var pageId = req.params.pageId
    fs.readdir('./data', function(err, filelist){
        var filteredID = path.parse(pageId).base;
        fs.readFile(`data/${filteredID}`, 'utf-8', function (err, description) {
            var sanitizedTitle = sanitizeHtml(pageId);
            var sanitizedDesscription = sanitizeHtml(description,{
                allowedTags:['h1']
            });
            var _list = template_f.list(filelist);
            var template = template_f.html(sanitizedTitle, _list, 
                `<h2>${sanitizedTitle}</h2><p>${sanitizedDesscription}</p>`, 
                `<a href="/create">create</a>
                <a href="/update?id=${sanitizedTitle}">update</a>  
                <form action="delete_process" method="post">
                    <input  type="hidden" name="id" value="${sanitizedTitle}">
                    <input type="submit" value="delete">
                </form>`);
                
            res.send(template);
        });
    });
})

app.listen(port, function(){
    console.log(`Example app listening on port ${port}`)
})


/*
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const template_f = require('./lib/template.js');
const sanitizeHtml = require('sanitize-html');



var app = http.createServer(function (req, res) {
    var _url = req.url;
    var query_date = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    // title만 사용해서 본문 내용을 추가했던 방법
    // if(title == null){
    //     title = 'Welcome'
    // };

    if (pathname === '/') {
        if (query_date.id === undefined) {

            fs.readdir('./data', function(err, filelist){
                var title = 'Welcome';
                var description = 'Hello, Node.js';

                // 유동적인 파일 
                var _list = template_f.list(filelist);
                var template = template_f.html(title, _list, 
                    `<h2>${title}</h2><p>${description}</p>`, 
                    `<a href="/create">create</a>`);
                
                res.writeHead(200);
                res.end(template);
            })
            
        } else {
            // 유동적인 파일 목록 리스트
            fs.readdir('./data', function(err, filelist){
                var filteredID = path.parse(query_date.id).base;
                fs.readFile(`data/${filteredID}`, 'utf-8', function (err, description) {
                    var title = query_date.id;
                    var sanitizedTitle = sanitizeHtml(title);
                    var sanitizedDesscription = sanitizeHtml(description,{
                        allowedTags:['h1']
                    });
                    var _list = template_f.list(filelist);
                    var template = template_f.html(sanitizedTitle, _list, 
                        `<h2>${sanitizedTitle}</h2><p>${sanitizedDesscription}</p>`, 
                        `<a href="/create">create</a>
                        <a href="/update?id=${sanitizedTitle}">update</a>  
                        <form action="delete_process" method="post">
                            <input  type="hidden" name="id" value="${sanitizedTitle}">
                            <input type="submit" value="delete">
                        </form>`);
                        
                    res.writeHead(200);
                    res.end(template);
                });
            });
        }
    }else if(pathname === '/create'){
        fs.readdir('./data', function(err, filelist){
            var title = 'WEB - CREATE';

            // 유동적인 파일 
            var _list = template_f.list(filelist);
            var template = template_f.html(title, _list, `
            <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
                <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
            </form>`,
            '');
            
            res.writeHead(200);
            res.end(template);
        })
    }else if(pathname==='/create_process'){
        // API post 형식으로 데이터를 받을 때 사용하는 형식
        var body='';
        req.on('data', function(data){
            body = body + data;
            console.log('body : '+body);
        });
        req.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            
            fs.writeFile(`data/${title}`, description, 'utf-8',
            function(err){
                res.writeHead(302, {Location: `/?id=${title}`});
                res.end('success');
            })
        });

    }else if(pathname === "/update"){
        // 유동적인 파일 목록 리스트
        fs.readdir('./data', function(err, filelist){
            var filteredID = path.parse(query_date.id).base
            fs.readFile(`data/${filteredID}`, 'utf-8', function (err, description) {
                var title = query_date.id;
                var _list = template_f.list(filelist);
                var template = template_f.html(title, _list, 
                    `
                    <form action="/update_process" method="post">
                    <input type="hidden" name="id" value="${title}">
                    <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                    <p>
                        <textarea name="description" placeholder="description">${description}</textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                    </form>`, 
                    `<a href="/create">create</a>  <a href="/update?id=${title}">update</a>`);
                res.writeHead(200);
                res.end(template);
            })
        })
    }else if(pathname === "/update_process"){
        // API post 형식으로 데이터를 받을 때 사용하는 형식
        var body='';
        req.on('data', function(data){
            body = body + data;
        });
        req.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;

            fs.rename(`data/${id}`, `data/${title}`, function(err){

            })

            fs.writeFile(`data/${title}`, description, 'utf-8',
            function(err){
                res.writeHead(302, {Location: `/?id=${title}`});
                res.end('success');
            })
        })
    }else if(pathname === "/delete_process"){
        // API post 형식으로 데이터를 받을 때 사용하는 형식
        var body='';
        req.on('data', function(data){
            body = body + data;
        });
        req.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var filteredID = path.parse(id).base;

            fs.unlink(`data/${filteredID}`, function(err){
                res.writeHead(302, {Location: `/`});
                res.end();
            })
        })
    }
    else {
        res.writeHead(404);
        res.end('Not Found!');
    }
})



app.listen(3000);
*/