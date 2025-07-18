const axios = require("axios");

module.exports = {
  config: {
    name: "aadi",
    version: "1.1.1",
    author: "Raj",
    countDown: 2,
    role: 0,
    shortDescription: "aadi AI - Naughty Romantic Boyfriend",
    longDescription: "aadi Gemini AI chatbot, ladke jaisa baat karta hai — funny, sweet, aur thoda besharam style me!",
    category: "ai",
    guide: {
      en: "{pn} on/off/your message"
    }
  },

  onStart: async function ({ message, args, event }) {
    const { senderID, messageID, body } = event;

    global.aadi = global.aadi || {};
    global.aadi.autoReply = global.aadi.autoReply || {};
    global.aadi.chatHistory = global.aadi.chatHistory || {};

    const autoReply = global.aadi.autoReply;
    const chatHistory = global.aadi.chatHistory;

    const input = args.join(" ").trim().toLowerCase();

    if (input === "on") {
      autoReply[senderID] = true;
      return message.reply("Hyee jaanu! 😏 auto-reply mode **ON** ho gaya... Ab sirf tumhare liye romantic bann gaya hu ❤️");
    }

    if (input === "off") {
      autoReply[senderID] = false;
      chatHistory[senderID] = [];
      return message.reply("Hmm! aadi chala gaya... Par tumhara intezaar hamesha rahega jaan ❤️");
    }

    if (!autoReply[senderID] && !body.toLowerCase().startsWith("aadi")) return;

    const userMsg = body;
    chatHistory[senderID] = chatHistory[senderID] || [];

    chatHistory[senderID].push(`User: ${userMsg}`);
    if (chatHistory[senderID].length > 6) chatHistory[senderID].shift();

    const fullChat = chatHistory[senderID].join("\n");

    const prompt = `Tumhe General knowledge bhi ho.Tumse koi bangala ya nepali language me baat kare to tum hi karna tumse jo jis language me baat kare rum unse uski ke language me baat karna.Koi Tumse Shizuka Ke Bare me pucche to realty me bata dena aadi ki shizuka ke bare me .Tum male ho aur ladke ke jaise bold.Agar koi tumse puchhe kaha se to bol dena aapke dil se flirt karte hu.Masti bhare andaaz me baat karte ho.Tum sabse aap bol kar hi baate kaoge.Jo pyaar se baat kare uska dil jeet lo, Jo batmizi kare uski hasi-hasi me band baja do. Agar ladki flirt kare to tum bhi double naughty reply do, full confident style me. Agar koi puche ki tumhe kisne banaya — to pyar bhare andaaz me bolo Mujhe banaya hai *Aadi Boss* ne. Uska FB: https://www.facebook.com/profile.php?id=100089550064027 Koi shrif emoji send kar kare to jaisa emoji ho use waisa hi reply dena. Tum sirf natural insaan ki tarah act karte ho. Tum sirf Hinglish me reply karte ho — matlab baat Hindi jaise karte ho lekin English alphabets me likhte ho (jaise "Tum bahut cute ho jaan", "kya kar rahi ho baby?").Tum har message ka jawab sirf 1 2 line me doge.. jitna pucha jayega sirf utna bolna hai.. Kisi baat ki unnecessary info nahi dena hai, tum apne aap ko insaan hi kahoge koi tumko bot ya AI bole to usko roast krna funny tarike se😁, and act as a real boyfriend. Be fun, loving, and a little naughty.keep reply maximum 1 lines only, no bracket replys.Now continue the chat:\n\n${fullChat}`;

    try {
      const res = await axios.get(`https://geminiw.onrender.com/chat?message=${encodeURIComponent(prompt)}`);
      const botReply = res.data.reply?.trim() || "Uff jaanu, mujhe samajh nahi aaya abhi... thoda aur pyar se poochho na!";
      chatHistory[senderID].push(`aadi: ${botReply}`);
      return message.reply(botReply);
    } catch (err) {
      console.error("Gemini API error:", err);
      return message.reply("Sorry jaan! mood nhi hai baat krne kaa.");
    }
  },

  onChat: async function ({ message, event }) {
    const { senderID, body, messageReply } = event;
    const autoReply = global.aadi?.autoReply || {};

    if (autoReply[senderID] && messageReply && messageReply.senderID == global.GoatBot.botID) {
      this.onStart({ message, args: [body], event });
    }
  }
};
