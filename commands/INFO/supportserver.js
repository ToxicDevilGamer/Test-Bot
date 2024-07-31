const { MessageEmbed } = require(`discord.js`);

module.exports = {
  name: "supportserver",
  aliases: ["dev"],
  description: `sends support server's invite link`,
  userPermissions: [],
  botPermissions: [],
  category: "Information",
  cooldown: 5,



  run: async (client, message, args, prefix) => {
    // Code


    message.delete()

    let emb = new MessageEmbed()
      .setColor("#343A40")
      .setTitle("Need help ? Join Support Server :")

      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

      .addFields(
        {
          name: "Click Blue Text Below :",
          value: `╰-𒆕 [Contact DEV for support](client.config.SERVER.OFFICIAL.INVITE_LINK)`
        }
      )

      .setFooter(Powered By Reflex Development | client.getFooter(message.author));


    message.channel.send({ embeds: [emb] })

  },
};

