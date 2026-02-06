const ytdl = require('@distube/ytdl-core');
const sanitizeFilename = require('../utils/sanitizeFilename');

const agent = ytdl.createAgent();

exports.getVideoInfo = async (req, res) => {
    try {
        const { videoId } = req.body;

        if (!videoId) {
            return res.status(400).json({
                success: false,
                error: 'Video ID required hai'
            });
        }

        const url = `https://www.youtube.com/watch?v=${videoId}`;

        if (!ytdl.validateURL(url)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid YouTube URL'
            });
        }

        const info = await ytdl.getInfo(url, { agent });

        res.json({
            success: true,
            data: {
                title: info.videoDetails.title,
                author: info.videoDetails.author.name,
                lengthSeconds: info.videoDetails.lengthSeconds,
                thumbnail: info.videoDetails.thumbnails.at(-1).url,
                viewCount: info.videoDetails.viewCount
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.downloadVideo = async (req, res) => {
    try {
        const { videoId, format } = req.body;

        const url = `https://www.youtube.com/watch?v=${videoId}`;

        const info = await ytdl.getInfo(url, { agent });
        const title = sanitizeFilename(info.videoDetails.title);

        let options = { agent };
        let filename = `${title}.mp4`;

        if (format === 'audio') {
            options.filter = 'audioonly';
            filename = `${title}.mp3`;
        }

        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        ytdl(url, options).pipe(res);

    } catch (error) {
        res.status(500).json({ success: false, error: 'Download failed' });
    }
};
