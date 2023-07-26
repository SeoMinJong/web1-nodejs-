module.exports = {
    html:function(title, list, body, control){

        return `
        <!doctype html>
        <html>
        
        <head>
            <meta charset="utf-8">
            <link rel="icon" href="data:,">
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
    list:function(filelist) {
        _list = '<ul>';
        var i = 0;
    
        while (filelist.length > i){
            _list += `\n<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i += 1;
        };
        _list += '</ul>'
    
        return _list
    }
}

