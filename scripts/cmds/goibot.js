const fs = require("fs-extra");

module.exports = {
config: {
    name: "goibot",
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "no-prefix",
    longDescription: "Bot Will Reply You In Engish/Bangla Language",
    category: "no prefix",
    guide: {
      en: "{p}{n}",
    }
  },

 onStart: async function ({  }) { },
  onChat: async function ({ api, event, args, Threads, userData }) {

  var { threadID, messageID, senderID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Kolkata").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;

  var Messages = ["Kya hua bol 😏 " , "Bot Na Bol Oye Gussa aata hai 🙆‍♂️" , "Han bolo kya kaam hai🤨" , "Faltu time nhi hai🤪" , "Itna bot bot mt kr😝" , "Bolo sona 💋🙂 " , "Are chutiya jaldi bol🤨" , "Dont call me penchow🙂" , "Chup rah be 🙈" , "Kyaa ho gyaa chhpri 🙂" , "Are bhai nikal tu🙂" , "Garmi me preshan mt kr plz 🙂" , "Thodi der so jao yrr 🙂" , "Babu dur raha kro plz 🙊" , "Are ja yar naha dho le 🤨
" , "Chup kar be chumtiya 🙈"];

    var rand = Messages[Math.floor(Math.random() * Messages.length)]

        if ((event.body.toLowerCase() == "love you bot") || (event.body.toLowerCase() == "love bot")) {
         return api.sendMessage("Hmm..Love you too baby 💋🙂:))", threadID);
       };

        if ((event.body.toLowerCase() == "good morning") || (event.body.toLowerCase() == "gm")) {
         return api.sendMessage("Hi, good morning have a nice day ❤️🙏", threadID);
       };

       if ((event.body.toLowerCase() == "happy diwali all") || (event.body.toLowerCase() == "Happy diwali")) {
         return api.sendMessage("I wish you and your family a very happy Diwali. 🥰🎉💥", threadID);
       };

       if ((event.body.toLowerCase() == "bsdk") || (event.body.toLowerCase() == "mc")) {
         return api.sendMessage("Oye gaali mat de 🤬🤬", threadID);
       };

       if ((event.body.toLowerCase() == "owner") || (event.body.toLowerCase() == "Admin kon hai")) {
         return api.sendMessage("[𝐎𝐖𝐍𝐄𝐑:☞➸⃝🐼⃝⃞⃟💙🇦𝖆🅳𝐢🎸 ☜ \n░█████╗░\n██╔══██╗\n███████║\n██╔══██║\n██║░░██║\n╚═╝░░╚═╝\n░█████╗░\n██╔══██╗\n███████║\n██╔══██║\n██║░░██║\n╚═╝░░╚═╝\n██████╗░\n██╔══██╗\n██║░░██║\n██║░░██║\n██████╔╝\n╚═════╝░\n  ██╗\n  ██║\n  ██║\n  ██║\n  ██║\n  ╚═╝ \n. 𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐢𝐝 :- www.facebook.com/100089550064027", threadID);
       };

      if ((event.body.toLowerCase() == "new movie") || (event.body.toLowerCase() == "latest movie")) {
         return api.sendMessage("ARTICLE 370 \n https://srv5.pkpics.lol/download/0oTM5QDM4cDOwcTM:,,QORpFM0ZUQFp3N" , threadID);
       };

       if ((event.body.toLowerCase() == "by") || (event.body.toLowerCase() == "bye")) {
         return api.sendMessage("Okay baby,apna khyal rakhna❤", threadID);
       };

       if ((event.body.toLowerCase() == "anyone") || (event.body.toLowerCase() == "any")) {
         return api.sendMessage("Hello dear,I m here ❤", threadID);
       };

       if ((event.body.toLowerCase() == "🙂") || (event.body.toLowerCase() == "🥺")) {
         return api.sendMessage("What happen dear 🙏🙂", threadID);
       };

       if ((event.body.toLowerCase() == "chup") || (event.body.toLowerCase() == "Chup kar")) {
         return api.sendMessage("Ek thppad me nali me fek dunga🙏🙂", threadID);
       };

       if ((event.body.toLowerCase() == "malik se BAKCHODI") || (event.body.toLowerCase() == "baap se bkwas")) {
         return api.sendMessage("Sorry malik maaf kr do glti ho gyi🥺🙏", threadID);
       };

       if ((event.body.toLowerCase() == "❤️") || (event.body.toLowerCase() == "🥰")) {
         return api.sendMessage("😘🙊", threadID);
       };

       if ((event.body.toLowerCase() == "👍") || (event.body.toLowerCase() == "thenga")) {
         return api.sendMessage("Oye thenga mat dikha 🙂🙏", threadID);
       };

       if ((event.body.toLowerCase() == "good night") || (event.body.toLowerCase() == "gn")) {
         return api.sendMessage("Ok aap So jao thak gye ho hawabaazi krke🙏🙂😜", threadID);
       };

       if ((event.body.toLowerCase() == "lol bot")) {
         return api.sendMessage("Achha tum bhot legend bn rahe ho🙂🙏", threadID);
       };

       if ((event.body.toLowerCase() == "fuck you")) {
         return api.sendMessage("Teri Gawnd me fuck 🙂🙏", threadID);
       };

       if ((event.body.toLowerCase() == "Kon bnaya apko")) {
         return api.sendMessage("My creater and edit me only My Owner Aadi Gupta 😍❤️", threadID);
       };

       if ((event.body.toLowerCase() == "gd evng") || (event.body.toLowerCase() == "good evening")) {
         return api.sendMessage("Good evening dear🙂🙏", threadID);
       };

       if ((event.body.toLowerCase() == "😒")) {
         return api.sendMessage("idhar kon hai😏😑:)", threadID);
       };

       if ((event.body.toLowerCase() == "🙄")) {
         return api.sendMessage("uper bhagwan ji hai🙄🙄", threadID);
       };

       if ((event.body.toLowerCase() == "nice")) {
         return api.sendMessage("Oh thx sweetheart 🙊😍", threadID);
       };

       if ((event.body.toLowerCase() == "🙈") || (event.body.toLowerCase() == "🙊")) {
         return api.sendMessage("oye hoye sarma gye kya😜", threadID);
       };

       if ((event.body.toLowerCase() == "sasural") || (event.body.toLowerCase() == "married")) {
         return api.sendMessage("kon married hai kon ja raha hai sasural🤔🙄", threadID);
       };

       if ((event.body.toLowerCase() == "What's the bot swearing") || (event.body.toLowerCase() == "bot cursing")) {
         return api.sendMessage("Damn you, shame on hahaha :>>, still asking", threadID);
       };

       if ((event.body.toLowerCase() == "is the bot sad")) {
         return api.sendMessage("Why can't I be sad because of everyone <3 love you <3", threadID);
       };

       if ((event.body.toLowerCase() == "does the bot love you")) {
         return api.sendMessage("Yes I love you and everyone so much", threadID);
       };

       if ((event.body.toLowerCase() == "bot goes to sleep")) {
         return api.sendMessage("I'm a bot, you're the one who should go to sleep <3", threadID);
       };

       if ((event.body.toLowerCase() == "has the bot eaten yet") || (event.body.toLowerCase() == "bot an comrade")) {
         return api.sendMessage("I'm full when I see you eat <3", threadID);
       };

       if ((event.body.toLowerCase() == "does the bot love me")) {
         return api.sendMessage("Yes <3", threadID);
       };

       if ((event.body.toLowerCase() == "does the bot have a brand") || (event.body.toLowerCase() == "does the bot fall")) {
         return api.sendMessage("Yes <3", threadID);
       };

    if ((event.body.toLowerCase() == "oh bot")) {
     return api.sendMessage("Hurry, I have to serve other boxes :)", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "chup") || (event.body.toLowerCase() == "chup thak")) {
     return api.sendMessage("Amr Mukh, Amr iccha, Amr Mon. Tor ki bal,,,shala abal...ja vaag... 😒🙄", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "khana khaya?") || (event.body.toLowerCase() == "khana kha lo")) {
     return api.sendMessage("Nhi khaunga Aaj vrat hai.💖🥳", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "k") || (event.body.toLowerCase() == "k?")) {
     return api.sendMessage("K na K😕", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "guyz") || (event.body.toLowerCase() == "guys")) {
     return api.sendMessage("Don't Call Me Guys Bcz I AM Yours😊", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "wife") || (event.body.toLowerCase() == "bou")) {
     return api.sendMessage("Yes, My Husband🥰", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "Aadi") || (event.body.toLowerCase() == "adi") || (event.body.toLowerCase() == "Aadi gupta")) {
     return api.sendMessage("Kya hua Boss ko kyu bula rahe ho🙄!🌄", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "bhai") || (event.body.toLowerCase() == "bhaiya") || (event.body.toLowerCase() == "brother")) {
     return api.sendMessage("han ji sis🥺", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "pagal")) {
     return api.sendMessage("pgl tum ho mere pyar me🙂🙏", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "boy")) {
     return api.sendMessage("bbe, I Am here 😑", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "beb") || (event.body.toLowerCase() == "baby")) {
     return api.sendMessage("hm baby😚🖤", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "kiss me")) {
     return api.sendMessage("Lo Baby😚😘😘💋", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "sona")) {
     return api.sendMessage("hmm Babe😚🖤bolo jadu tona", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "fight") || (event.body.toLowerCase() == "fyt")) {
     return api.sendMessage("Sorry, babe i m game lover ✌🏻🕊", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "hi") || (event.body.toLowerCase() == "hii") || (event.body.toLowerCase() == "hy")) {
     return api.sendMessage("Hello, How Are You 😗", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "hello") || (event.body.toLowerCase() == "heloo")) {
     return api.sendMessage("hello jai shree ram 🙏🙂", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "who are you") || (event.body.toLowerCase() == "who r u")) {
     return api.sendMessage("I Am Aadi's, An AI Based Messenger Chatbot.", threadID, messageID);
   };

  if (event.body.indexOf("Bot") == 0 || (event.body.toLowerCase() == "bot") || (event.body.indexOf("বট") == 0)) {
    var msg = {
      body: ` ${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  }
}
};
