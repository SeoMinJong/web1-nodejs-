const db = require('../lib/mysql.js');
const template_f = require('../lib/template.js');

exports.author_func = function(req, res){
    db.query('SELECT * FROM topic', function(err, topcis){
        db.query('SELECT * FROM author', function(err, authors){
            if(err){
                throw err
            }

            var title = 'WEB - author';
        
            // 유동적인 파일 
            var _list = template_f.list(topcis);
            var template = template_f.html(title, _list, 
                `
                <form action="/author/create_process" method="post">
                    <p>
                        <input type="text" name="name" placeholder="name">
                    </p>
                    <p>
                        <textarea name="profile"></textarea>
                    </p>
                    <input type="submit">
                </form>
                `,
                `
                    ${template_f.author_list(authors)}
                    <style>
                        table{
                            border-collapse: collapse;
                        }
                        td{
                            border: 1px solid black;
                        }
                    </style>
                `);
        
            res.send(template);
        })
    });
};

exports.author_create_func = function(req, res){
    var post = req.body;
    db.query(`INSERT INTO author (name, profile) VALUES (?, ?)`,[post.name, post.profile],
        function(err, result){
            if(err){
                throw err
            }
            res.writeHead(302, {Location: `/author`});
            res.end('success');
    });
}

exports.author_update_func = function(req, res){
    var id = req.params.authorId;
    // 유동적인 파일 목록 리스트
    db.query(`SELECT * FROM topic`, function(err, topics){
        db.query(`SELECT * FROM author WHERE id='${id}'`, function(err, target_author){
            var name = target_author[0].name;
            var _list = template_f.list(topics);
            var template = template_f.html(name, _list, 
                `
                <form action="/author/update_process" method="post">
                <input type="hidden" name="id" value="${id}">
                <p><input type="text" name="name" placeholder="name" value="${name}"></p>
                <p>
                    <textarea name="profile" placeholder="profile">${target_author[0].profile}</textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
                </form>`, 
                `<a href="/author/create">create</a>  <a href="/author/update/${name}">update</a>`);
            res.send(template);
        })
    });
};

exports.author_update_process_func = function(req, res){
    var post = req.body;
    var id = post.id;
    var name = post.name;
    var profile = post.profile;

    db.query(`UPDATE author SET name=?, profile=? WHERE id=?`,[name, profile, id], function(err, results){
        if(err){
            throw err
        }
    })
    res.writeHead(302, {Location: '/author'});
    res.end();
}

exports.author_delete_process_func = function(req, res){
    var id = req.params.authorId;
    db.query(`SELECT topic.id, topic.title, topic.description, topic.id, topic.author_id, author.name FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE author_id = ?;`,
        [id], function(err, topics){
            var results_id = topics.map(function(results){
                return `${results.id}`;
                
            })
            results_id = results_id.join(",");

            db.query(`DELETE FROM topic WHERE author_id=?`,[id], function(err, results){
                if(err){    
                    throw err
                }
            })

            db.query(`DELETE FROM author WHERE id=?`,[id], function(err, results){
                if(err){
                    throw err
                }
        })
    })
        
        
        
        console.log('DELETE AUTHOR')
        // console.log(typeof(results))
        // for (i=0; results.length>i; i++){
        //     console.log(`${i}번째차례`)
        //     console.log(results[i].id)
        // }
        // db.query(`DELETE FROM topic WHERE id=? `, [id], function(err, result){
        //     if(err){
        //         throw err
        //     }
        //     r
        // })

    // db.query(`DELETE FROM author WHERE id=? `, [id], function(err, result){
    //     if(err){
    //         throw err
    //     }
    // })

    // db.query(`DELETE FROM topic WHERE id=?`,[id],
    //     function(err, result){
    //         if(err){
    //             throw err
    //         }
    //         res.writeHead(302, {Location: `/`})
    //         res.end();
    // });
    
    res.writeHead(302, {Location: '/author'});
    res.end();

}