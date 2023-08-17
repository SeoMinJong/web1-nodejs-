const express = require('express');
const router = express.Router();

const topic_func = require('../lib/topic_func.js');

router.get('/create',function(req,res){
    topic_func.create_func(req, res);
});

router.post('/create_process', function(req, res){
    topic_func.create_process_func(req,res);
});

router.post('/delete_process', function(req, res){    
    topic_func.delete_process_func(req,res);
});

router.get('/update/:pageId', function(req, res){
    topic_func.update_func(req,res);
})

router.post('/update_process', function(req, res){
    topic_func.update_process_func(req,res);
})


router.get('/:pageId', function(req, res, next){
    topic_func.topic_func(req, res);
});

module.exports = router;