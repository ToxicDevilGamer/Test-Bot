const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');

module.exports = {
	name: 'invite',
	description: "Get the bot's invite link",
  usage: "",
  category: "",
	userPerms: ['ViewChannel'],
	botPerms: ['Administrator'],
	cooldown: 30,
  guildOnly: false,
  ownerOnly: false,
  toggleOff: false,
  nsfwOnly: false,
  maintenance: false,
	type: ApplicationCommandType.ChatInput,
	run: async (client, interaction) => {
    try{ 
		const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID || client.config.CLIENT.ID}&permissions=8&scope=bot%20applications.commands`;
		const embed = new EmbedBuilder()
		.setTitle('Invite me')
		.setDescription(`Invite the bot to your server. [Click here](${inviteUrl})`)
		.setColor('#03fcdb')
		.setTimestamp()
		.setThumbnail(client.user.displayAvatarURL())
		.setFooter({ text: client.user.tag })

		const actionRow = new ActionRowBuilder()
		.addComponents([
			new ButtonBuilder()
			.setLabel('Invite')
			.setURL(inviteUrl)
			.setStyle(ButtonStyle.Link)
		])
   interaction.reply({ embeds: [embed], components: [actionRow] })
    } catch (error){
      client.slash_err(client, interaction, error);
    }
	}
};
/* @CODE
╔══════════════════════╗
╠ » 🚀 REFLEX BOT 🚀
╟ ALL IN ONE MULTI PURPOSE BOT
╠ »⚡Bot By » ToxicCoder
  [亗 『± ToxicDevil ±』#1726]
━━━━━━━━━━━━━━━━━━
╠ » 🔥 Reflex Development 🤖
╠ » 🙏 Share Us And Our Bots To Support 👍😍
╚══════════════════════╝
* Please mention when using this Code!
     */