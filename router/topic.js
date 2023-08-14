const sanitizeHtml = require('sanitize-html');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');

const template_f = require('../lib/template.js');
const db = require('../lib/mysql.js')

router.get('/create',function(req,res){
    console.log('start create topic')
    var title = 'WEB - CREATE';

    // 유동적인 파일 
    var _list = template_f.list(req.list);
    var template = template_f.html(title, _list, `
    <form action="/topic/create_process" method="post">
    <p><input type="text" name="title" placeholder="title"></p>
    <p>
        <textarea name="description" placeholder="description"></textarea>
    </p>
    <p>
        <input type="submit">
    </p>
    </form>`,
    '');
    
    res.send(template);
})

router.post('/create_process', function(req, res){
    /*
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
            res.writeHead(302, {Location: `/page/${title}`});
            res.end('success');
        })
    });
    */
    var post = req.body;
    var title = post.title;
    var description = post.description;
    
    fs.writeFile(`data/${title}`, description, 'utf-8',
    function(err){
        res.writeHead(302, {Location: `/topic/${title}`});
        res.end('success');
    })
    
});

router.post('/delete_process', function(req, res){
    /*
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
    */
    var post = req.body;
    var id = post.id;
    var filteredID = path.parse(id).base;

    fs.unlink(`data/${filteredID}`, function(err){
        res.writeHead(302, {Location: `/`});
        res.end();
    })
})

router.get('/update/:pageId', function(req, res, next){
    var filteredID = path.parse(req.params.pageId).base;
    // 유동적인 파일 목록 리스트
    db.query(`SELECT * FROM topic`, function(err, topics){
        db.query(`SELECT * FROM topic WHERE id=${filteredID}`, function(err, target_topic){
            var title = target_topic.title;
            var _list = template_f.list(topics);
            var template = template_f.html(title, _list, 
                `
                <form action="/topic/update_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                <p>
                    <textarea name="description" placeholder="description">${target_topic.description}</textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
                </form>`, 
                `<a href="/create">create</a>  <a href="/topic/update/${title}">update</a>`);
            res.send(template);
        })
    });


    fs.readFile(`data/${filteredID}`, 'utf-8', function (err, description) {
        var title = req.params.pageId;
        var _list = template_f.list(req.list);
        var template = template_f.html(title, _list, 
            `
            <form action="/topic/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
                <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
                <input type="submit">
            </p>
            </form>`, 
            `<a href="/create">create</a>  <a href="/topic/update/${title}">update</a>`);

            
        res.send(template);
    });
})

router.post('/update_process', function(req, res){
    /*
    var body='';
    req.on('data', function(data){
        body = body + data;
    });
    req.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;

        console.log()

        fs.rename(`data/${id}`, `data/${title}`, function(err){
            fs.writeFile(`data/${title}`, description, 'utf-8',
            function(err){
                res.writeHead(302, {Location: `/page/${title}`});
                res.end('success');
            })
        })
    })
    */
    var post = req.body;
    var id = post.id;
    var title = post.title;
    var description = post.description;

    console.log()

    fs.rename(`data/${id}`, `data/${title}`, function(err){
        fs.writeFile(`data/${title}`, description, 'utf-8',
        function(err){
            res.writeHead(302, {Location: `/topic/${title}`});
            res.end('success');
        })
    })
})


router.get('/:pageId', function(req, res, next){
    const filteredID = req.params.pageId;
    console.log('filteredID :',filteredID)
    db.query('SELECT * FROM topic', function(err, topics){
        if(err){
            throw err
        }
        console.log('topics :\n',topics);
        db.query(`SELECT * FROM topic WHERE title=?`,[filteredID], function(err2, target_topic){
            if(err2){
                throw err2
            }

            var title = target_topic[0].title;
            var _list = template_f.list(topics);

            var template = template_f.html(title, _list, 
                `<h2>${title}</h2><p>${target_topic[0].description}</p>`, 
                `<a href="/create">create</a>
                <a href="/update?id=${title}">update</a>  
                <form action="delete_process" method="post">
                    <input  type="hidden" name="id" value="${title}">
                    <input type="submit" value="delete">
                </form>`);
                
            res.send(template);
    });
    //     fs.readFile(`data/${filteredID}`, 'utf-8', function (err, description) {
    //         if (err){
    //             next(err);
    //         } else{
    //         var sanitizedTitle = sanitizeHtml(req.params.pageId);
    //         var sanitizedDesscription = sanitizeHtml(description,{
    //             allowedTags:['h1']
    //         });
    //         var _list = template_f.list(req.list);
    //         var template = template_f.html(sanitizedTitle, _list, 
    //             `<h2>${sanitizedTitle}</h2><p>${sanitizedDesscription}</p>`, 
    //             `<a href="/topic/create">create</a>
    //             <a href="/topic/update/${sanitizedTitle}">update</a>  
    //             <form action="/topic/delete_process" method="post">
    //                 <input type="hidden" name="id" value="${sanitizedTitle}">
    //                 <input type="submit" value="delete">
    //             </form>`);
                
    //         res.send(template);
    // }})
    })
});

module.exports = router;