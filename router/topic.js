const sanitizeHtml = require('sanitize-html');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');

const template_f = require('../lib/template.js');
const db = require('../lib/mysql.js')

router.get('/create',function(req,res){
    db.query('SELECT * FROM topic', function(err, topics){
        if(err){
            throw err
        }
        var title = 'WEB - CREATE';

        // 유동적인 파일 
        var _list = template_f.list(topics);
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
    });
});

router.post('/create_process', function(req, res){
    var post = req.body;
    db.query(`INSERT INTO topic (title, description, created, author_id) VALUES (?, ?, NOW(), ?)`,[post.title, post.description, 1],
        function(err, result){
            if(err){
                throw err
            }
    });
    
    res.writeHead(302, {Location: `/topic/${post.title}`});
    res.end('success');    
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
        db.query(`SELECT * FROM topic WHERE id='${filteredID}'`, function(err, target_topic){
            var title = target_topic[0].title;
            var _list = template_f.list(topics);
            var template = template_f.html(title, _list, 
                `
                <form action="/topic/update_process" method="post">
                <input type="hidden" name="id" value="${filteredID}">
                <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                <p>
                    <textarea name="description" placeholder="description">${target_topic[0].description}</textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
                </form>`, 
                `<a href="/topic/create">create</a>  <a href="/topic/update/${title}">update</a>`);
            res.send(template);
        })
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
    console.log("id :",id)
    console.log("title :",title)
    console.log("description :",description)

    db.query(`UPDATE topic SET title=?, description=? WHERE id=?`,[title, description, id], function(err, result){
        if(err){
            throw err
        }
    })
    res.writeHead(302, {Location: `/topic/${id}`});
    res.end();

})


router.get('/:pageId', function(req, res, next){
    const filteredID = req.params.pageId;
    db.query('SELECT * FROM topic', function(err, topics){
        if(err){
            throw err
        }
        db.query(`SELECT * FROM topic WHERE id=?`,[filteredID], function(err2, target_topic){
            if(err2){
                throw err2
            }

            var title = target_topic[0].title;
            var _list = template_f.list(topics);

            var template = template_f.html(title, _list, 
                `<h2>${title}</h2><p>${target_topic[0].description}</p>`, 
                `<a href="/topic/create">create</a>
                <a href="/topic/update/${filteredID}">update</a>  
                <form action="delete_process" method="post">
                    <input  type="hidden" name="id" value="${title}">
                    <input type="submit" value="delete">
                </form>`);
                
            res.send(template);
        });
    })
});

module.exports = router;