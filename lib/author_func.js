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
                '<a href="/author/create">create</a>');
        
            res.send(template);
        })
    });
};