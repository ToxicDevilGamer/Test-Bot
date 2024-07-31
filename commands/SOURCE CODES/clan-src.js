const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clansrc",
  description: "A command that sends you bot source codes (server owner ship required)",
  usage: "<prefix>clansrc",
  run: async (client, message, args) => {
    // Check if the user is the guild owner
    if (message.author.id !== message.guild.ownerId) {
      // User is not the owner, send an error message
      const embed = new MessageEmbed()
        .setTitle("Server Ownership Required")
        .setDescription("Only the server owner of this server can use this command.How you can use this command? \n> Add Me to your own server then you can use this command")
        .setColor("#ff0000"); // Red color for error messages

      return message.reply({ embeds: [embed] });
    }

    // If the user is the guild owner, add the command logic here
    // Your code for the guild owner-only command execution goes here

    const successEmbed = new MessageEmbed()
      .setTitle("Clan Bot by Tomato6966")
      .setURL("https://replit.com/@Just98/Milrato-Clan-Bot")
      .setDescription(`__**<a:blue:1173593209499308174> Press The Title To Get Code**__
      > <a:arrow_arrow:1176819112446529536> At first you have to fill \`config.json\` But Dont put token in config
      > <a:arrow_arrow:1176819112446529536> Then you have to put \`TOKEN\` in ENV/SECRET Then run & enjoy
      > <a:arrow_arrow:1176819112446529536> Here is emoji Server > https://discord.gg/wrmmqFTBQC`)
      .setColor("#00ff00"); // Green color for success messages

    message.reply({ embeds: [successEmbed] });
  },
};
