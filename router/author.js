const express = require('express');
const router = express.Router();

const author_func = require('../lib/author_func.js');

router.get('/',function(req,res){
    author_func.author_func(req, res);
});

router.post('/create_process',function(req,res){
    author_func.author_create_func(req, res);
});

// router.post('/',)


module.exports = router;