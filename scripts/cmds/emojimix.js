const axios = require("axios");

module.exports = {
	config: {
		name: "emojimix",
		aliases: ["mix"],
		version: "1.4",
		author: "Raj",
		countDown: 5,
		role: 0,
		description: {
			vi: "Mix 2 emoji lại với nhau",
			en: "Mix 2 emoji together"
		},
		guide: {
			vi: "{pn} 🤣🥰 (không có khoảng trắng)",
			en: "{pn} 🤣🥰 (no space between emojis)"
		},
		category: "fun"
	},

	langs: {
		vi: {
			error: "Rất tiếc, emoji %1 và %2 không mix được",
			success: "Emoji %1 và %2 mix được %3 ảnh"
		},
		en: {
			error: "Sorry, emoji %1 and %2 can't mix",
			success: "Emoji %1 and %2 mix %3 images"
		}
	},

	onStart: async function ({ message, args, getLang }) {
		if (!args[0]) return message.SyntaxError();

		// Join all args into one string
		const input = args.join("");

		// Extract emojis from the input
		const matched = Array.from(input.matchAll(/([\uD800-\uDBFF][\uDC00-\uDFFF]|\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu)).map(m => m[0]);

		if (matched.length < 2)
			return message.reply("❌ Please provide two emojis together (e.g., 🙂🥵)");

		const emoji1 = matched[0];
		const emoji2 = matched[1];
		const readStream = [];

		const generate1 = await generateEmojimix(emoji1, emoji2);
		const generate2 = await generateEmojimix(emoji2, emoji1);

		if (generate1) readStream.push(generate1);
		if (generate2) readStream.push(generate2);

		if (readStream.length === 0)
			return message.reply(getLang("error", emoji1, emoji2));

		message.reply({
			body: getLang("success", emoji1, emoji2, readStream.length),
			attachment: readStream
		});
	}
};

async function generateEmojimix(emoji1, emoji2) {
	try {
		const { data: response } = await axios.get("https://nobita-emojimix.onrender.com/emojimix", {
			params: { emoji1, emoji2 },
			responseType: "stream"
		});
		response.path = `emojimix_${Date.now()}.png`;
		return response;
	} catch {
		return null;
	}
}