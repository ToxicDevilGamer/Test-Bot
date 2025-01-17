const Discord = require('discord.js')
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "add emoji",
  description: "Add Emoji To Server.",
  aliases: ["eadd"],
  category: "nqn",
  cooldown: 10,
  toggleOff: false,
  nsfwOnly: false,
  maintenance: false,
	botPerms: "MANAGE_EMOJIS",
	userPerms: "MANAGE_EMOJIS",
  run: async (client, message, args) => {
let isUrl = require("is-url");
let type = "";
let name = "";
let emote = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
if (emote) {
  emote = emote[0];
  type = "emoji";
  name = args.join(" ").replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi, "").trim().split(" ")[0];
} else  {
  emote = `${args.find(arg => isUrl(arg))}`
  name = args.find(arg => arg != emote);
  type = "url";
}
let emoji = { name: "" };
      let Link;
      if (type == "emoji") {
        emoji = Discord.Util.parseEmoji(emote);
      Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
       emoji.animated ? "gif" : "png"
}`
} else { 
  if (!name) return message.channel.send("Please provide a name!");
  Link = message.attachments.first() ? message.attachments.first().url : emote;  }
            message.guild.emojis.create(
                `${Link}`,
                `${`${name || emoji.name}`}`
            ).then(em => message.channel.send(em.toString() + " added!")).catch(error => {
              message.channel.send(":x: | an Error occured")
                console.log(error)
})
}
}
