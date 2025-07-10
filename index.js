/**
 * Goat Bot index.js with fake HTTP server for Render Free plan
 * Author: NTKhang (original) + Express patch by ChatGPT
 */

const { spawn } = require("child_process");
const log = require("./logger/log.js");

// ✅ Fake Express HTTP Server for Render
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// মূল "/" রুট
app.get("/", (req, res) => res.send("✅ Goat Bot is running (via fake server)"));

// fallback route: অন্য path এ রিকুয়েস্ট এও success পাঠাবে
app.use((req, res) => {
  res.status(200).send("✅ Goat Bot is online. Wrong path.");
});

// সার্ভার চালু
app.listen(PORT, () => {
  console.log(`✅ Fake server running on port ${PORT}`);
});

// ✅ Goat Bot start logic
function startProject() {
  const child = spawn("node", ["Goat.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });

  child.on("close", (code) => {
    if (code == 2) {
      log.info("🔁 Restarting Goat Bot...");
      startProject();
    }
  });
}

startProject();