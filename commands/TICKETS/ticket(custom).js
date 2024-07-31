const {
  Client,
  Message,
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require("discord.js");
module.exports = {
  name: "setup-ticketpanel",
  description: "To Create A Full Customized  Tickets Panel. \n With Upto 2 Buttons & 2 Categories support",
  aliases: [""],
  category: "tickets",
	cooldown: 10,
   userPerms: "MANAGE_MESSAGES",
  run: async (client, message, args) => {
    message.delete()
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(
        message.guild.name,
        message.guild.iconURL({
          dynamic: true
        })
      )
      .setDescription(
        "__**How to make a ticket**__\n" +
          "> Click on the reaction that relates to your need\n" +
          "> Once the ticket is made you will be able to type in there"
      )
      .setTitle("✉️Ticket")
      .setThumbnail(
        "https://media.discordapp.net/attachments/733317247522832445/767777222080725022/download-ticket-ticket-free-entertainment-icon-orange-ticket-design-0.png"
      );
    .setFooter("Powered By Reflex Development");
    const bt = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("tic")
        .setEmoji("📩")
        .setLabel("Create Ticket!")
        .setStyle("PRIMARY")
    );
    message.channel.send({
      embeds: [embed],
      components: [bt]
    });
  }
};
