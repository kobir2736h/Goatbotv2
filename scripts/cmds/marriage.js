const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
    config: {
        name: "marriage",
        aliases: ["bihe"],
        version: "1.0",
        author: "AceGun",
        countDown: 5,
        role: 0,
        shortDescription: "get a wife",
        longDescription: "",
        category: "fun",
        guide: "{pn}"
    },



    onStart: async function ({ message, event, args }) {
        const mention = Object.keys(event.mentions);
      if(mention.length == 0) return message.reply("Please mention someone");
else if(mention.length == 1){
const one = event.senderID, two = mention[0];
                bal(one, two).then(ptth => { message.reply({ body: "「 Love you Babe🥰❤ 」", attachment: fs.createReadStream(ptth) }) })
} else{
 const one = mention[1], two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "「 Love you Babe🥰❤ 」" , attachment: fs.createReadStream(ptth) }) })
}
    }


};

async function bal(one, two) {

    let avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avone.circle()
    let avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avtwo.circle()
    let pth = "abcd.png"
    let img = await jimp.read("https://i.imgur.com/qyn1vO1.jpg")

    img.resize(432, 280).composite(avone.resize(60, 60), 189, 15).composite(avtwo.resize(60, 60), 122, 25);

    await img.writeAsync(pth)
    return pth
      }