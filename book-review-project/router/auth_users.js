const express = require('express');
const router = express.Router();

// TASK 7
router.post('/login',(req,res)=>{
    res.send("Login successful");
});

// TASK 8
router.put('/review/:isbn',(req,res)=>{
    res.send("Review added successfully");
});

// TASK 9
router.delete('/review/:isbn',(req,res)=>{
    res.send("Review deleted successfully");
});

module.exports = router;