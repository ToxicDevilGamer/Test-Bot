const { MessageActionRow, MessageButton , MessageSelectMenu, MessageEmbed} = require("discord.js") 

module.exports = {
  name: "src-list",
  run: async(client,message,args) => {

const row = new MessageActionRow() 
    .addComponents(
      new MessageButton()
      .setLabel("Invite me")
      .setStyle("LINK") 
.setEmoji("1175647567409852496")
      .setURL("https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot"),

      new MessageButton()
      .setLabel("Support Server")
      .setStyle("LINK") 
.setEmoji("1175647559943979068")
      .setURL("client.config.SERVER.OFFICIAL.INVITE_LINK"),

     /* new MessageButton()
      .setLabel("Vote me")
      .setStyle("LINK") 
.setEmoji("1175647562951303199")
      .setURL("https://top.gg/bot/903922960354672671/vote")
    ) */

let embed = new MessageEmbed()
    .setDescription(`**<a:blue:1173593209499308174> : List of Discord Bot Source [Normal]**
> \n <a:arrow_arrow:1176819112446529536>  Milrato Clan Bot - \`a!clan-src\`
>
**<a:blue:1173593209499308174> : List of Discord Bot Source [Special]**
> <a:arrow_arrow:1176819112446529536> Milrato Bot Manager
> <a:arrow_arrow:1176819112446529536> Azury Bot Manager with DB
> <a:arrow_arrow:1176819112446529536> Cloudux Source
> <a:arrow_arrow:1176819112446529536> Advanced Discord bot with DB

**<a:blue:1173593209499308174>  Steps to get Normal Src for Free**
> <a:arrow_arrow:1176819112446529536> \`step-1\`  The source commands requires Administration 
> Thats why have to add the bot to your server
> <a:arrow_arrow:1176819112446529536> \`step-2\` After adding u can access the given commands`)
    .setFooter(Powered By Reflex Development |client.user.tag, client.user.displayAvatarURL({dynamic:true}))
      .setColor("#87CEEB")
    .setTimestamp()



    message.channel.send({embeds: [embed], components: [row]})
}
}