const { Message, Client, MessageEmbed,MessageActionRow,MessageButton } = require("discord.js");
module.exports = {
  name: "eval",
  aliases: ['ev', 'jaduexe'],
  category: 'dev',
  ownerOnly: true
  run: async (client, message, args) => {
       
      const content = message.content
        .split(" ")
        .slice(1)
        .join(" ");
      const result = new Promise(resolve => resolve(eval(content)));

      return result
        .then(output => {
          if (typeof output !== "string") {
            output = require("util").inspect(output, { depth: 0 });
          }
          if (output.includes(client.token)) {
            output = output.replace(
              client.token,
              "LOL BRO"
            );
          }
          const user = new MessageEmbed()
          .setColor(client.color)
          .setDescription(`\`\`\`js\n${output}\`\`\``)
          message.channel.send({embeds: [user]});
        })
        .catch(err => {
          err = err.toString();
          if (err.includes(client.token)) {
            err = err.replace(client.token, "");
          }
          message.channel.send(err, {
            code: "js"
          });
        });
    
}};