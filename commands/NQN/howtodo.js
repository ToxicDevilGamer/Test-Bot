const discord = require("discord.js");

module.exports = {
  name: "nqn",
  category: "nqn",
  description: "How To Use Nqn /Free Nitro Emoji Features",
  run: async (client, message, args) => {

    let embed1 = new discord.MessageEmbed()
    .setTitle(`Type the image`)
    .setColor("RANDOM")
    .setImage("https://raw.githubusercontent.com/Crypto195/NQN_Remake/main/before.PNG")
    .setfooter(Powered By Reflex Development)
    .setTimestamp(message.timestamp = Date.now())

    message.channel.send(embed1);

     let embed2 = new discord.MessageEmbed()
    .setTitle(`Send and Hurray!`)
    .setColor("RANDOM")
    .setImage("https://raw.githubusercontent.com/Crypto195/NQN_Remake/main/after.PNG")
    .setfooter(Powered By Reflex Development)
    .setTimestamp(message.timestamp = Date.now())

    message.channel.send(embed2)


  }
}
