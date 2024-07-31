const { MessageEmbed } = require("discord.js")
const colors = require("colors");
const client = require(".")
const ee = require("./json/embed.json");


async function logger(cid, embed) {
  try{
     const log = client.channels.cache.get(client.config.SETTINGS.CommandLogs)
    await log.send({embeds:[embed]})
  } catch (error) {
    console.log(colors.red(error))
  }
}

function successEmbed(title, description) {
  try {
    let embed = new MessageEmbed()
    .setAuthor({name: `${title}`, iconURL: "ee.authoricon"})
  .setTitle(`${title}`)
  .setDescription(`${description}`)
  .setColor(ee.sucesscolor)
  .setFooter({text: "Powered By Reflex Development", iconURL: ee.footericon});
    return embed;
  } catch (error) {
    console.log(colors.red(error))
  }
}
function failEmbed(title, description) {
  try {
    let embed = new MessageEmbed()
  .setAuthor({name: `${title}`, iconURL: 'ee.authoricon'})

  .setDescription(`${description}`)
  .setColor(ee.wrongcolor)
  .setFooter({text: "Powered By Reflex Development", iconURL: ee.footericon});
    return embed;
  } catch (error) {
    console.log(colors.red(error))
  }
}

function opEmbed(title, description, footer) {
  try {
    let embed = new MessageEmbed()
    .setAuthor({name: "Reflex Bot", iconURL: ee.authoricon})
    .setTitle(`${title}`)
    .setDescription(`${description}`)
    .setColor("#ffffff")
    .setFooter({text: `${footer}`, iconURL: ee.footericon});

    return embed;
  } catch (error) {
    console.log(colors.red(error))
  }
}
function randNum() { 
  let code = '';
  let dict = '0123456789';
  for(var i = 0; i < 6; i++){
      code = code + dict.charAt(Math.floor(Math.random() * dict.length));
  }
  return code;
}


function randToken() { 
  let code = '';
  let dict = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(var i = 0; i < 40; i++){
      code = code + dict.charAt(Math.floor(Math.random() * dict.length));
  }
  return code;
}


module.exports.randToken = randToken;
module.exports.randNum = randNum;
module.exports.logger = logger;
module.exports.successEmbed = successEmbed;
module.exports.failEmbed = failEmbed;
module.exports.opEmbed = opEmbed;