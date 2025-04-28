const axios = require('axios');
const fs = require('fs');
const path = require('path');
const ytSearch = require('yt-search');
const https = require('https');

function deleteAfterTimeout(filePath, timeout = 5000) {
  setTimeout(() => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (!err) {
          console.log(`✅ Deleted file: ${filePath}`);
        } else {
          console.error(`❌ Error deleting file: ${err.message}`);
        }
      });
    }
  }, timeout);
}

module.exports = {
  config: {
    name: 'video',
    author: 'Arun',
    usePrefix: false,
    category: 'YouTube Video Downloader'
  },
  onStart: async ({ event, api, args, message }) => {
    try {
      const query = args.join(' ');
      if (!query) return message.reply('⚠️ Video ka naam to likho na! 😒');

      api.setMessageReaction("⏳", event.messageID, () => {}, true);

      const searchResults = await ytSearch(query);
      if (!searchResults || !searchResults.videos.length) {
        throw new Error('Kuch nahi mila! Video ka naam sahi likho. 😑');
      }

      const selectedVideo = searchResults.videos[0];
      const videoUrl = `https://www.youtube.com/watch?v=${selectedVideo.videoId}`;
      const safeTitle = selectedVideo.title.replace(/[^a-zA-Z0-9]/g, "_");
      const downloadDir = path.join(__dirname, "cache");
      if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
      }

      const apiUrl = `https://arun-music.onrender.com/download?url=${encodeURIComponent(videoUrl)}&type=video`;
      const apiResponse = await axios.get(apiUrl);

      if (!apiResponse.data.file_url) {
        throw new Error('Download fail ho gaya. 😭');
      }

      const downloadUrl = apiResponse.data.file_url.replace("http:", "https:");
      const videoPath = path.join(downloadDir, `${safeTitle}.mp4`);

      const writer = fs.createWriteStream(videoPath);
      const videoResponse = await axios({
        url: downloadUrl,
        method: 'GET',
        responseType: 'stream'
      });

      videoResponse.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      api.setMessageReaction("✅", event.messageID, () => {}, true);

      await message.reply({
        body: `🎥 Here is your video: ${selectedVideo.title}`,
        attachment: fs.createReadStream(videoPath)
      });

      deleteAfterTimeout(videoPath, 5000);

    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
      message.reply(`❌ Error: ${error.message} 😢`);
    }
  }
};