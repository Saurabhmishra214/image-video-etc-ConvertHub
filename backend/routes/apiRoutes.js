const express = require('express');
const router = express.Router();
const youtubeController = require('../controllers/youtubeController');

router.post('/info', youtubeController.getVideoInfo);
router.post('/download', youtubeController.downloadVideo);

router.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

module.exports = router;
