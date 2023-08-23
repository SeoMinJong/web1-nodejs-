module.exports = {
    html:function(title, list, body, control){

        return `
        <!doctype html>
        <html>
        
        <head>
            <meta charset="utf-8">
            <title>WEB1 - ${title}</title>
        </head>
        
        <body>
            <h1><a href="/">WEB</a></h1>
            <a href="/author">author</a>
            ${list}
            ${control}
            
        ${body}
        </body>
        
        </html>
        `
    },
    list:function(topics) {
        _list = '<ul>';
        var i = 0;
    
        while (topics.length > i){
            _list += `\n<li><a href="/topic/${topics[i].id}">${topics[i].title}</a></li>`
            i += 1;
        };
        _list += '</ul>'
        
        return _list
    },
    author_list:function(authors){
        var author_body = '<table>\n';
        for (var i=0; i<authors.length; i++){
            author_body += `<tr>
            <td>${authors[i].name}</td>
            <td>${authors[i].profile}</td>
            <td><a href="/author/update/${authors[i].id}">update</a></td>
            <td><a href="/author/delete/${authors[i].id}">delete</a></td>
            </tr>`
        }
        author_body += '</table>'

        return author_body
    }
}

