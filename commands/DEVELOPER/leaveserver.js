const { MessageEmbed } = require('discord.js');
module.exports = {
  name: `leaveserver`,
  category: `dev`,
  aliases: [`leaveg`, `gleave`],
  description: `Leaves A Guild`,
  ownerOnly: true
  run: async (client, message, args) => {
    let id = args[0];
    if(!id){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | You didn't provided the server Id.`)]})
    }
    
    let guild = await client.guilds.fetch(id);
    let name = guild?.name || 'No Name Found';
    if(!guild){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | You didn't provided a valid server Id.`)]})
    }
    await guild.leave();
    return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.tick} | Successfully left **${name} (${id})**.`)]})
  }
};