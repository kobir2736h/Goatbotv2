module.exports = {
  config: {
    name: "ocr",
    aliases: [],
    version: "1.0",
    author: "Mostakim",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Extract text from image using OCR",
    },
    longDescription: {
      en: "Extract text from an image using the x-noobs OCR API.",
    },
    category: "utility",
    guide: {
      en: "{pn} [image URL or reply to image]",
    },
  },

  onStart: async function ({ api, event, args }) {
    const axios = require("axios");

    let imageUrl = args[0];

    // If user replied to an image
    if (!imageUrl && event.messageReply && event.messageReply.attachments.length > 0) {
      const attachment = event.messageReply.attachments[0];
      if (attachment.type === "photo") {
        imageUrl = attachment.url;
      }
    }

    if (!imageUrl) {
      return api.sendMessage("❌ Please provide an image URL or reply to an image.", event.threadID, event.messageID);
    }

    const apiUrl = `https://www.x-noobs-apis.42web.io/ocr?url=${encodeURIComponent(imageUrl)}`;

    try {
      const res = await axios.get(apiUrl);
      const data = res.data;

      if (data.ParsedResults && data.ParsedResults[0].ParsedText) {
        const parsedText = data.ParsedResults[0].ParsedText.trim();
        if (parsedText) {
          return api.sendMessage(`📄 OCR Result:\n\n${parsedText}`, event.threadID, event.messageID);
        } else {
          return api.sendMessage("❌ No text found in the image.", event.threadID, event.messageID);
        }
      } else {
        return api.sendMessage("❌ Could not extract text from the image.", event.threadID, event.messageID);
      }
    } catch (err) {
      return api.sendMessage("❌ Error while processing OCR request.", event.threadID, event.messageID);
    }
  },
};