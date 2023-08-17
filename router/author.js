const express = require('express');
const router = express.Router();

const author_func = require('../lib/author_func.js');

router.get('/',function(req,res){
    author_func.author_func(req, res);
});


module.exports = router;