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
                    ${template_f.author_list(authors)}
                    <style>
                        table{
                            border-collapse: collapse;
                        }
                        td{
                            border: 1px solid black;
                        }
                    </style>
                `,
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
                `);
        
            res.send(template);
        })
    });
};

exports.author_create_func = function(req, res){
    var post = req.body;
    console.log("post.name, post.profile :",post.name, post.profile)
    db.query(`INSERT INTO author (name, profile) VALUES (?, ?)`,[post.name, post.profile],
        function(err, result){
            if(err){
                throw err
            }
            res.writeHead(302, {Location: `/author`});
            res.end('success');
    });
}