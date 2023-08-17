const db = require('../lib/mysql.js');
const template_f = require('../lib/template.js');

exports.create_func = function(req, res){
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
};

exports.create_process_func = function(req, res){
    var post = req.body;
    db.query(`INSERT INTO topic (title, description, created, author_id) VALUES (?, ?, NOW(), ?)`,[post.title, post.description, 1],
        function(err, result){
            if(err){
                throw err
            }
            res.writeHead(302, {Location: `/topic/${result.insertId}`});
            res.end('success');
    });
};

exports.delete_process_func = function(req, res){
    var post = req.body;
    var id = post.id;
    db.query(`DELETE FROM topic WHERE id=?`,[id],
        function(err, result){
            if(err){
                throw err
            }
            res.writeHead(302, {Location: `/`})
            res.end();
    });
};

exports.update_func = function(req, res){
    var id = req.params.pageId;
    // 유동적인 파일 목록 리스트
    db.query(`SELECT * FROM topic`, function(err, topics){
        db.query(`SELECT * FROM topic WHERE id='${id}'`, function(err, target_topic){
            var title = target_topic[0].title;
            var _list = template_f.list(topics);
            var template = template_f.html(title, _list, 
                `
                <form action="/topic/update_process" method="post">
                <input type="hidden" name="id" value="${id}">
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
};

exports.update_process_func = function(req, res){
    var post = req.body;
    var id = post.id;
    var title = post.title;
    var description = post.description;

    db.query(`UPDATE topic SET title=?, description=? WHERE id=?`,[title, description, id], function(err, result){
        if(err){
            throw err
        }
    })
    res.writeHead(302, {Location: `/topic/${id}`});
    res.end();
}

exports.topic_func = function(req, res){
    const id = req.params.pageId;
    db.query('SELECT * FROM topic', function(err, topics){
        if(err){
            throw err
        }
        db.query(`SELECT * FROM topic WHERE id=?`,[id], function(err2, target_topic){
            if(err2){
                throw err2
            }

            var title = target_topic[0].title;
            var _list = template_f.list(topics);

            var template = template_f.html(title, _list, 
                `<h2>${title}</h2><p>${target_topic[0].description}</p>`, 
                `<a href="/topic/create">create</a>
                <a href="/topic/update/${id}">update</a>  
                <form action="delete_process" method="post">
                    <input  type="hidden" name="id" value="${id}">
                    <input type="submit" value="delete">
                </form>`);
                
            res.send(template);
        });
    })
}