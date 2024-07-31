const Discord = require('discord.js')

module.exports = {
  name: "remove",
  description: "Check bot's ping.",
  aliases: ["eremove","er"],
  category: "nqn",
	cooldown: 10,
  toggleOff: false,
	botPerms: "MANAGE_EMOJIS",
	userPerms: "MANAGE_EMOJIS",
  run: async (client, message, args) => {
if (!args[0]) return message.channel.send("emote is a required argument that is missing.");
let emo = args[0].match(/(?<=<?a?:?\w{2,32}:)\d{17,19}(?=>?)/gi)[0]
if (!emo) return message.channel.send("emote is a required argument that is missing.")
if (message.guild.emojis.cache.get(emo)) {
  emo = message.guild.emojis.cache.get(emo)
} else {
  return message.channel.send(":x: | Emoji not found")
}
if (!emo.name || !emo.id) return message.channel.send("Invalid emote argument");
console.log(emo)
   try {
     emo.delete()
     message.channel.send("**The Emoji has been removed**")
   } catch (err) {
     message.channel.send(":x: | **An Error occured**")
   }
  }
}
