
const {
  MessageEmbed, 
  MessageActionRow, 
  MessageButton, 
  MessageSelectMenu,
  Collection
} = require("discord.js")

const client  = require("../../index")
let emo = require("../../emojis")

const ee = require("../../json/config.json")

let command = require("../../models/customcmd")

client.on('messageCreate', async message => {

  if(!message.content.startsWith("ee.SETTINGS.PREFIX || client.config.SETTINGS.PREFIX")) return;

  if(message.author.bot) return;

  let MessageArray = message.content.split(' ');

  let cmd = MessageArray[0].slice(1)

  let data;
  try {
  data = await command.findOne({
    commandName: cmd,
    guildID: message.guild.id
  })
  if(!data) return;
  if(data) return message.channel.send({content: data.commandResponse})
  } catch (e) {
    console.error(e)
  }
})