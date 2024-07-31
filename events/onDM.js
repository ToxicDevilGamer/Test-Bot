const client = require("..");
//const simplydjs = require("simply-djs")

client.on(`messageCreate`, async (message) => {
  if (message.author.bot) return;
  client.logger(`〢 Module: Loaded On Bot Dm`.bold);
  //if(message.channel.type === "DM"){simplydjs.chatbot(client, message, {channelId: message.channel.id}).catch((err)=>{console.log(err)})}
    if(message.channel.type === "DM")
  {
    message.channel.send("**Sorry I dont answer to DMs**")
    message.channel.send("*But here's some help if you need :*")
    let  emb = new MessageEmbed()
    .setColor("#343A40")
    .setTitle("Reflex Bot SUPPORT")
    .addField("Please Join Support Server For Any Queries/Feedback",` [**Support Server**](client.config.CLIENT.) ← **Click To Join**`)
    .addField(" Not Satisfied? Contact DEV ?",
              `**Developer** → \`<@client.config.DEV.OWNER>\`\nㅤ╰-𒆕 You may copy the username then tag and DM Me ❤️ `)
    .setFooter("Thanks for using Reflex Bot")
    .setTimestamp()

  message.channel.send({embeds : [emb]})
  }
})