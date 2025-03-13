const { getStreamFromURL, shortenURL, randomString } = global.utils;
const axios = require('axios');
const fs = require('fs');
const path = require('path');

function loadAutoLinkStates() {
  try {
    const data = fs.readFileSync("alldl.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

function saveAutoLinkStates(states) {
  fs.writeFileSync("alldl.json", JSON.stringify(states, null, 2));
}

let autoLinkStates = loadAutoLinkStates();
const threadStates = {};

const config = {
  name: 'alldl',
  category: 'Every video downloader',
  author: 'Nyx',
  description: 'chude ke ? Tor abba Nyx'
};

const onStart = async ({ api, event }) => {
  const threadID = event.threadID;
  
  if (!autoLinkStates[threadID]) {
    autoLinkStates[threadID] = 'on';
    saveAutoLinkStates(autoLinkStates);
  }
  
  if (!threadStates[threadID]) {
    threadStates[threadID] = {};
  }
  
  if (event.body.toLowerCase().startsWith('alldl end')) {
    autoLinkStates[threadID] = 'off';
    saveAutoLinkStates(autoLinkStates);
    api.setMessageReaction("✅", event.messageID, () => {}, true);
  } else if (event.body.toLowerCase().startsWith('alldl start')) {
    autoLinkStates[threadID] = 'on';
    saveAutoLinkStates(autoLinkStates);
    api.setMessageReaction("✅", event.messageID, () => {}, true);
  }
};

const onChat = async ({ api, event, args }) => {
  const threadID = event.threadID;
  const body = args.join(' ');
  const urlPatterns = [
    "https://vt.tiktok.com",
    "https://www.tiktok.com/",
    "https://www.facebook.com",
    "https://www.instagram.com/",
    "https://x.com/",
    "https://www.instagram.com/p/",
    "https://pin.it/",
    "https://twitter.com/",
    "https://vm.tiktok.com",
    "https://fb.watch",
    "https://youtu.be/",
    "https://youtube.com/"
  ];
  
  if (autoLinkStates[threadID] === 'off') return;
  
  const matchedPattern = urlPatterns.find(pattern => body.startsWith(pattern));
  if (!matchedPattern) return;
  
  try {
    api.setMessageReaction("⏰", event.messageID, (err) => {}, true);
    
    if (matchedPattern.includes('youtu.be') || matchedPattern.includes('youtube.com')) {
      const dsx = await ytdl(body, api, event);
        await strm(dsx, api, event);
    } else {
      const videoUrl = await alldl(body);
      await strm(videoUrl, api, event);
    }
  } catch (error) {
    api.sendMessage(`Error processing your request: ${error.message}`, event.threadID, event.messageID);
  }
};

async function alldl(inputUrl) {
  const response = await axios.get(`https://mostakim.onrender.com/m/alldl?url=${inputUrl}`);
  return response.data.url;
}

async function strm(url, api, event) {
  const s = await shortenURL(url);
  api.sendMessage({
    body: `Here's Your requested video 📷\nShort URL: ${s}`,
    attachment: await getStreamFromURL(url)
  }, event.threadID, event.messageID);
  api.setMessageReaction("✅", event.messageID, () => {}, true);
}

async function ytdl(url, api, event) {
  try {
    const response = await axios.get(`https://fastapi-nyx-production.up.railway.app/y?url=${encodeURIComponent(url)}&type=mp4`);
    return response.data.url;
  } catch (err) {
    api.sendMessage(`YouTube DL Error: ${err.message}`, event.threadID, event.messageID);
  }
}

module.exports = {
  config,
  onStart ,
 onChat,
};