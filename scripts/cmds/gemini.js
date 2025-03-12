const axios = require("axios");

module.exports = {
  config: {
    name: "gemini",
    version: "1.0",
    author: "Mostakim",
    countDown: 5,
    role: 0,
    category: "google"
  },
  onStart: ({}) => {},

  onChat: async function({ api, event, args, commandName }) {
    const text = args.join(" ");
    if (text.startsWith("g")) {
      try {
        const response = await axios.get(`https://mostakim-api.onrender.com/gemini?q=${encodeURIComponent(text)}`);

        if (response.data) {
          const textContent = response.data.content;
          const ans = `${textContent}`;
          api.sendMessage({
            body: ans,
          }, event.threadID, (err, info) => {
            if (err) {
              console.error("Reply error:", err.message);
            } else {
              global.GoatBot.onReply.set(info.messageID, {
                commandName,
                messageID: info.messageID,
                author: event.senderID
              });
            }
          });
        }

      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  },

  onReply: async function({ api, event, Reply, args }) {
    let { author, commandName } = Reply;
    const gif = args.join(' ');
    if (gif.startsWith("Gemini")) {
      try {
        const response = await axios.get(`https://mostakim-api.onrender.com/gemini?q=${encodeURIComponent(gif)}`);

        if (response.data) {
          const textContent = response.data.content;
          const wh = `${textContent}`;
          api.sendMessage({
            body: wh,
          }, event.threadID, (err, info) => {
            if (err) {
              console.error("Reply error:", err.message);
            } else {
              global.GoatBot.onReply.set(info.messageID, {
                commandName,
                messageID: info.messageID,
                author: event.senderID
              });
            }
          });
        }

      } catch (error) {
        console.error("error:", error.message);
      }
    }
  }
};
