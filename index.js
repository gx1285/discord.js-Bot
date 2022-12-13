const express = require("express");
const discord = require("discord.js");
const app = express();
const client = new discord.Client({
  partials: Object.values(discord.Partials),
  intents: Object.values(discord.IntentsBitField.Flags),
});
const prefix = process.env.prefix;
const activity = process.env.activity;
const token = process.env.DISCORD_BOT_TOKEN;
try {
  app.get("/", (req, res) => {
    res.send("Botがオンラインです！");
  });

  app.listen(3000, () => {});

  client.on("ready", (message) => {
    console.log("Botが起動したよ～");
    client.user.setActivity(activity, { type: discord.ActivityType.Playing });
  });

  client.on("messageCreate", async (message) => {
    if (message.author.id == client.user.id || message.author.bot) return;
    if (message.mentions.has(client.user)) {
      await message.reply("呼んだ?");
    }
    if (!message.content.startsWith(prefix)) return; //ボットのプレフィックスからメッセージが始まっているか確認
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === "help") {
      //コマンド名
      await message.channel.send({
        embeds: [
          {
            title: "ヘルプ",
            description:
              "全てのコマンドの初めに`" + prefix + "`をつける必要があります。",
            fields: [
              {
                name: "ヘルプ",
                value: "`help`",
              },
            ],
          },
        ],
      });
    }
  });
  if (token == undefined) {
    console.log("DISCORD_BOT_TOKENが設定されていません。");
    process.exit(0);
  }

  client.login(token);
} catch (e) {
  console.log(`エラーが発生しました。\nエラー\n${e}`);
}
