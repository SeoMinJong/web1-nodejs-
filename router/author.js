const express = require('express');
const router = express.Router();

const author_func = require('../lib/author_func.js');

router.get('/',function(req,res){
    author_func.author_func(req, res);
});

router.post('/create_process',function(req,res){
    author_func.author_create_func(req, res);
});

router.get('/update/:authorId',function(req,res){
    author_func.author_update_func(req, res);
});

router.post('/update_process',function(req,res){
    author_func.author_update_process_func(req, res);
})

router.get('/delete/:authorId', function(req, res){
    author_func.author_delete_process_func(req, res);
})

module.exports = router;