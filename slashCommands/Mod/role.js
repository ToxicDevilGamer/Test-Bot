const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
module.exports = {
	name: 'role',
	description: "Manage roles of the server or members.",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
	default_member_permissions: 'ManageRoles', // permission required
	options: [
        {
            name: 'add',
            description: 'Add role to a user.',
            type: 1,
            options: [
                {
                    name: 'role',
                    description: 'The role you want to add to the user.',
                    type: 8,
                    required: true
                },
                {
                    name: 'user',
                    description: 'The user you want to add role to.',
                    type: 6,
                    required: true
                }
            ]
        }
    ],
	run: async (client, interaction) => {
	 if(interaction.options._subcommand === 'add') {
            try {
                const member = interaction.guild.members.cache.get(interaction.options.get('user').value);
                const role = interaction.options.get('role').role;
    
                await member.roles.add(role.id);
                const embed = new EmbedBuilder()
                .setTitle(`${client.emotes.MESSAGE.y} Role Added`)
                .setDescription(`Successfully added the role: ${role} to ${member}`)
                .setColor(client.embed.color)
                .setTimestamp()
                .setThumbnail(member.user.displayAvatarURL())
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
        
                return interaction.reply({ embeds: [embed] })
            } catch {
                return interaction.reply({ content: `${client.emotes.MESSAGE.x} Sorry, I failed adding that role to you!`, ephemeral: true });
            }

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