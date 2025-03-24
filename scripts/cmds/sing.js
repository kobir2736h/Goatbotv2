const axios = require("axios");
const fs = require("fs");
const path = require("path");
const ytSearch = require("yt-search");

module.exports = {
  config: {
    name: "music",
    aliases: ["play", "song"],
    version: "2.0.0",
    author: "Samrat",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Download YouTube song from keyword search and link",
    },
    longDescription: {
      en: "Download YouTube song or video using a search keyword or link.",
    },
    category: "media",
    guide: {
      en: "{pn} [song name] [audio/video]",
    },
  },

  onStart: async function ({ message, args }) {
    let songName, type;

    if (
      args.length > 1 &&
      (args[args.length - 1] === "audio" || args[args.length - 1] === "video")
    ) {
      type = args.pop();
      songName = args.join(" ");
    } else {
      songName = args.join(" ");
      type = "audio";
    }

    const processingMessage = await message.reply(
      "✅ Processing your request. Please wait..."
    );

    try {
      // YouTube search
      const searchResults = await ytSearch(songName);
      if (!searchResults || !searchResults.videos.length) {
        throw new Error("No results found for your search query.");
      }

      const topResult = searchResults.videos[0];
      const videoId = topResult.videoId;

      // Construct API URL
      const apiKey = "priyansh-here";
      const apiUrl = `https://priyansh-ai.onrender.com/youtube?id=${videoId}&type=${type}&apikey=${apiKey}`;

      // Fetch download URL
      const downloadResponse = await axios.get(apiUrl);
      const downloadUrl = downloadResponse.data.downloadUrl;

      const response = await axios({
        url: downloadUrl,
        method: "GET",
        responseType: "arraybuffer",
      });

      if (!response.data) {
        throw new Error("Failed to fetch the song.");
      }

      const filename = `${topResult.title}.${type === "audio" ? "mp3" : "mp4"}`;
      const downloadPath = path.join(__dirname, filename);

      // Save the file
      fs.writeFileSync(downloadPath, response.data);

      await message.reply({
        body: `🎶 Title: ${topResult.title}\n\nHere is your ${
          type === "audio" ? "audio" : "video"
        } 🎧:`,
        attachment: fs.createReadStream(downloadPath),
      });

      // Delete file after sending
      fs.unlinkSync(downloadPath);
      message.unsend(processingMessage.messageID);
    } catch (error) {
      console.error(`Failed to download and send song: ${error.message}`);
      message.reply(`❌ Failed to download song: ${error.message}`);
    }
  },
};