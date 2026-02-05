const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/youtube', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/components/youtube/index.html'));
});

module.exports = router;
