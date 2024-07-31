const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "music-v13",
  description: "A command that only the guild owner can use",
  usage: "guildownercommand",

  run: async (client, message, args) => {
    // Check if the user is the guild owner
    if (message.author.id !== message.guild.ownerId) {
      // User is not the owner, send an error message
      const embed = new MessageEmbed()
        .setTitle("Server Ownership Required")
        .setDescription("Only the server owner of this server can use this command.How you can use this command? > Add Me to your own server then you can use this command")
        .setColor("#ff0000"); // Red color for error messages

      return message.reply({ embeds: [embed] });
    }

    // If the user is the guild owner, add the command logic here
    // Your code for the guild owner-only command execution goes here

    const successEmbed = new MessageEmbed()
      .setTitle("Music Bot by Tomato6966")
      .setURL("https://replit.com/@Just98/Music-Bot")
      .setDescription(`__**<a:blue:1173593209499308174> Press The Title To Get Code**__
      > <a:arrow_arrow:1176819112446529536> At first you have to fill \`./botconfig/all-files\` 
      > <a:arrow_arrow:1176819112446529536> But Dont put token in config
      > <a:arrow_arrow:1176819112446529536> Then you have to put \`token\` in ENV/SECRET Then run & enjoy
      > <a:arrow_arrow:1176819112446529536> You must put secret if you want dashboard in \`./dashboard/settings.json\``)
      .setColor("#00ff00"); // Green color for success messages

    message.reply({ embeds: [successEmbed] });
  },
};
