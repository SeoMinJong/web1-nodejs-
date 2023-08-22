const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');

const template_f = require('./lib/template.js');
const topicRouter = require('./router/topic.js');
const authorRouter = require('./router/author.js');

const db = require('./lib/mysql.js')

const app = express()
const port = 3000

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression())

app.use('/topic', topicRouter);
app.use('/author', authorRouter);

app.get('/', (req, res) => {
    db.query('SELECT * FROM topic', function(err, topics){
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var _list = template_f.list(topics);
        var template = template_f.html(title, _list, 
            `<h2>${title}</h2><p>${description}</p>
            <img src='/img/hello.jpg' style='width:30%; display:block; margin-top:3px;'>`, 
            `<a href="/topic/create">create</a>`);
        res.send(template);
    });
})

app.use(function(err, req, res, next) {
    console.log(err)
    res.status(404).send('Sorry cant find that!');
});

app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).send('Something broke!');
});

app.listen(port, function(){
    console.log(`Example app listening on port ${port}`)
})