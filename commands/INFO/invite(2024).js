const { MessageActionRow, MessageButton , MessageSelectMenu, MessageEmbed} = require("discord.js") 

module.exports = {
  name: "invite",
  run: async(client,message,args) => {

const row = new MessageActionRow() 
    .addComponents(
      new MessageButton()
       .setLabel("Youtube")

       .setStyle("LINK") 
 .setEmoji("<:emoji_8:1183803536740454420>")
       .setURL("https://www.youtube.com/c/NitrixEXE"),
       new MessageButton()
       .setLabel("Support Server")

       .setStyle("LINK") 
 .setEmoji("<:emoji_3:1183803331911630858>")
       .setURL("https://www.youtube.com/c/NitrixEXE"),
       new MessageButton()
       .setLabel("Vote me")

       .setStyle("LINK") 
 .setEmoji("<:emoji_5:1183803399834185738>")
       .setURL("https://www.youtube.com/c/NitrixEXE")
    )

let embed = new MessageEmbed()
    .setTitle(`Invite & Dive With Weiden `)
  .setURL("https://discord.com/api/oauth2/authorize?client_id=1178295280798548069&permissions=8&scope=bot")
    .setDescription(`Invite ${client.user.username} to your server`)
    .setFooter(client.user.tag, client.user.displayAvatarURL({dynamic:true}))
      .setColor("#87CEEB")
    .setTimestamp()



    message.channel.send({embeds: [embed], components: [row]})
}
}