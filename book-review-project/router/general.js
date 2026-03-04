const express = require('express');
const router = express.Router();

// TASK 1
router.get('/books', (req,res)=>{
    res.send("Books list");
});

// TASK 6
router.post('/register',(req,res)=>{
    res.send("User registered successfully");
});

module.exports = router;