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
    }
}

