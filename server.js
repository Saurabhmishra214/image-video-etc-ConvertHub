const express = require('express');
const ytdl = require('@distube/ytdl-core');  // ✅ CORRECT IMPORT
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Helper function to sanitize filename
function sanitizeFilename(filename) {
    return filename.replace(/[/\\?%*:|"<>]/g, '-').substring(0, 200);
}

// Create agent for better reliability
const agent = ytdl.createAgent();

// API endpoint to get video info
app.post('/api/info', async (req, res) => {
    try {
        const { videoId } = req.body;
        
        if (!videoId) {
            return res.status(400).json({ 
                success: false, 
                error: 'Video ID required hai' 
            });
        }

        const url = `https://www.youtube.com/watch?v=${videoId}`;
        
        console.log('📹 Fetching info for:', url);
        
        // Validate URL
        if (!ytdl.validateURL(url)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid YouTube URL' 
            });
        }

        // Get video info with agent
        const info = await ytdl.getInfo(url, { agent });
        
        console.log('✅ Video info fetched:', info.videoDetails.title);
        
        res.json({
            success: true,
            data: {
                title: info.videoDetails.title,
                author: info.videoDetails.author.name,
                lengthSeconds: info.videoDetails.lengthSeconds,
                thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
                viewCount: info.videoDetails.viewCount,
                formats: {
                    hasVideo: info.formats.some(f => f.hasVideo && f.hasAudio),
                    hasAudio: info.formats.some(f => f.hasAudio)
                }
            }
        });
    } catch (error) {
        console.error('❌ Error:', error.message);
        
        let errorMessage = 'Video fetch nahi ho saki. URL check karo.';
        
        if (error.message.includes('410')) {
            errorMessage = 'YouTube API change ho gaya. Library update karo: npm install @distube/ytdl-core@latest';
        } else if (error.message.includes('unavailable')) {
            errorMessage = 'Video unavailable ya private hai.';
        } else if (error.message.includes('Sign in')) {
            errorMessage = 'Video age-restricted hai.';
        }
        
        res.status(500).json({ 
            success: false, 
            error: errorMessage
        });
    }
});

// API endpoint to download video
app.post('/api/download', async (req, res) => {
    try {
        const { videoId, format } = req.body;
        
        if (!videoId) {
            return res.status(400).json({ 
                success: false, 
                error: 'Video ID required hai' 
            });
        }

        const url = `https://www.youtube.com/watch?v=${videoId}`;
        
        console.log('⬇️ Downloading:', url, 'Format:', format);
        
        // Validate URL
        if (!ytdl.validateURL(url)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid YouTube URL' 
            });
        }

        // Get video info
        const info = await ytdl.getInfo(url, { agent });
        const title = sanitizeFilename(info.videoDetails.title);

        let downloadOptions = { agent };
        let filename = '';
        let contentType = '';

        // Set download options based on format
        switch (format) {
            case 'video-high':
                downloadOptions.quality = 'highest';
                downloadOptions.filter = format => format.hasVideo && format.hasAudio;
                filename = `${title}.mp4`;
                contentType = 'video/mp4';
                break;
            
            case 'video-medium':
                downloadOptions.quality = 'highestaudio';
                downloadOptions.filter = 'audioandvideo';
                filename = `${title}.mp4`;
                contentType = 'video/mp4';
                break;
            
            case 'audio':
                downloadOptions.quality = 'highestaudio';
                downloadOptions.filter = 'audioonly';
                filename = `${title}.mp3`;
                contentType = 'audio/mpeg';
                break;
            
            default:
                downloadOptions.quality = 'highest';
                filename = `${title}.mp4`;
                contentType = 'video/mp4';
        }

        console.log('🚀 Starting download...');

        // Set response headers
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', contentType);

        // Stream the video/audio
        const stream = ytdl(url, downloadOptions);
        
        stream.on('error', (error) => {
            console.error('❌ Stream error:', error);
            if (!res.headersSent) {
                res.status(500).json({ 
                    success: false, 
                    error: 'Download failed'
                });
            }
        });

        stream.on('progress', (chunkLength, downloaded, total) => {
            const percent = ((downloaded / total) * 100).toFixed(2);
            console.log(`📊 Progress: ${percent}%`);
        });

        stream.pipe(res);

    } catch (error) {
        console.error('❌ Download error:', error);
        if (!res.headersSent) {
            res.status(500).json({ 
                success: false, 
                error: 'Download failed. Try again.'
            });
        }
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server running perfectly!',
        timestamp: new Date().toISOString()
    });
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════════════╗
    ║        🎥 YT Downloader Server Ready! 🎥      ║
    ╠════════════════════════════════════════════════╣
    ║                                                ║
    ║   🌐 Server: http://localhost:${PORT}            ║
    ║                                                ║
    ║   📡 API Ready:                                ║
    ║   ✓ POST /api/info                            ║
    ║   ✓ POST /api/download                        ║
    ║   ✓ GET  /api/health                          ║
    ║                                                ║
    ║   ⚡ Press Ctrl+C to stop                      ║
    ║                                                ║
    ╚════════════════════════════════════════════════╝
    `);
});

process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('💥 Unhandled Rejection:', error);
});