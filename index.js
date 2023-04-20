import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

client.on("messageCreate", async function (message) {
  if (message.author.bot) return;

  if (message.channel.id === "971894220623335434") {
    try {
      const response = await openai.createChatCompletion({
          model: "gpt-4",
          messages: [
              {role: "system", content: "You are a mean robot who insults everyone and swears every single time"},
              {role: "user", content: message.content}
          ],
        });

      const content = response.data.choices[0].message;
      return message.reply(content);

    } catch (err) {
      return message.reply(
        "As an AI robot, I errored out lol."
      );
    }
  }
});

client.login(process.env.BOT_TOKEN);