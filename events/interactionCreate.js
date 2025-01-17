const client = require('..')
const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const cooldown = new Collection()
const ms = require('ms')
const { slash } = require(`${process.cwd()}/functions/onCoolDown.js`);
const config = require(`${process.cwd()}/json/config.json`);
const embed = require(`${process.cwd()}/json/embed.json`);
const emojis = require(`${process.cwd()}/json/emojis.json`);
// ================================================================================
client.on('interactionCreate', async interaction => {
// ==============================< Command Handling >=============================\\
	const slashCommand = client.slashCommands.get(interaction.commandName);
		if (interaction.type == 4) {
			if(slashCommand.autocomplete) {
				const choices = [];
				await slashCommand.autocomplete(interaction, choices)
			}
		}
      const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
		if (!interaction.type == 2) return;
// ==============================< If command doesn't found >=============================\\
		if (!slashCommand) return client.slashCommands.delete(interaction.commandName);
// ==============================< Other Command Handling list >=============================\\
		try {
// ==============================< Toggle off >=============================\\
					if (slashCommand.toggleOff) {
						return await interaction.reply({
              ephemeral: true,
							embeds: [new EmbedBuilder()
								.setTitle(`${emojis.MESSAGE.x} **That Command Has Been Disabled By The Developers! Please Try Later.**`).setColor(client.embed.wrongcolor)
							]
						}).catch((e) => {
							console.log(e)
						});
					}
// ==============================< On Mainenance Mode >============================= \\
      if (slashCommand.maintenance){
                    return await interaction.reply({
                      ephemeral: true,
                      content: `${emojis.MESSAGE.x} **${slashCommand.name} command is on __Maintenance Mode__** try again later!`
                    })
                  }
// ==============================< Owner Only >============================= \\            
      if (slashCommand.ownerOnly) {
        const owners = client.config.DEV.OWNER.concat(
                client.config.DEV.CO_OWNER
            );
        if (!owners.includes(interaction.user.id)) return await interaction.reply({
          ephemeral: true,         
          embeds: [new EmbedBuilder()
                                .setDescription(`${emojis.MESSAGE.x} **You cannot use \`${slashCommand.name}\` command as this is a developer command.**`).setColor(client.embed.wrongcolor)
                            ]
                        }).catch((e) => {
                            console.log(String(e).grey)
                        });
                    }
// ==============================< Only for offical guilds >============================= \\
      if (slashCommand.guildOnly) {
          const private = client.config.SERVER.OFFICIAL.Guild_ID_1
            .concat(client.config.SERVER.Guild_ID_2);
          if(!private.includes(interaction.guild.id)){
            return interaction.reply({
              ephemeral: true,   
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${emojis.MESSAGE.x} ${interaction.user.username} You have entered an invalid command!`)
                        .setDescription(`The command \`${slashCommand.name}\` can only be used in the official server.`).setColor(client.embed.wrongcolor)                        
                    ]
            })
          }   
        }
// ==============================< NSFW checking >============================= \\
      if (slashCommand.nsfwOnly && !interaction.channel.nsfw) {
                return interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                      .setDescription(`${emojis.MESSAGE.x} This command can only be used in NSFW channels!`)
                      .setColor(client.embed.wrongcolor)
                    ]
                })
            }
// ==============================< Permissions checking >============================= \\
      if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`${emojis.MESSAGE.x} ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
						.setColor(client.embed.wrongcolor)
						return interaction.reply({ephemeral: true, embeds: [userPerms] })
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`${emojis.MESSAGE.x} ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
						.setColor(client.embed.wrongcolor)
						return interaction.reply({ephemeral: true, embeds: [botPerms] })
					}

				}
// ==============================< CoolDown checking >============================= \\
            if (slashCommand.cooldown && slash(interaction, slashCommand)) {
                return interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${emojis.MESSAGE.x} You have been cooldown for \`${slashCommand.cooldown}\` seconds!`)
                            .setDescription(`Please wait \`${slash(interaction, slashCommand).toFixed(1)}\` Before using the \`${slashCommand.name}\` command again!`)
                          .setColor(client.embed.wrongcolor)
                          
                    ]
                })
            }
// ==============================< Start The Command >============================= \\	       
      await slashCommand.run(client, interaction);              
      const commandLogsChannel = client.channels.cache.get(client.config.SETTINGS.CommandLogs);
      if (!commandLogsChannel) return;
      await commandLogsChannel.send({
                        embeds: [new EmbedBuilder()
                                 .setColor(client.embed.color)
                                 .setAuthor({ name: "Slash Command", iconURL:`https://cdn.discordapp.com/emojis/942758826904551464.webp?size=28&quality=lossless`})
                                 .setThumbnail(interaction.guild.iconURL({dynamic: true}))
                                 .addFields([ 
                                   { name: "**Author**",value: `\`\`\`yml\n${interaction.user.tag} [${interaction.user.id}]\`\`\``},
                                   { name: "**Command Name**", value: `\`\`\`yml\n${slashCommand.name}\`\`\`` },
                                   { name: `**Guild**`, value: `\`\`\`yml\n${interaction.guild.name} [${interaction.guild.id}]\`\`\`` }
                                 ]) 
                        ]
                    });
// ==============================< On Pending Vouches Button >=============================\\
if (interaction.isButton()) {
        

        if(interaction.customId === "pending") {
        await interaction.deferReply({ephemeral: true})

        let data = await vouchModel.find({Status: "Pending"}, { __v: 0, _id: 0, vouchAuthor: 0, comment: 0, userID: 0, userTAG: 0 })

        let truee = data.slice(",").join("\n")

        let pend = `\`\`\`${truee}\`\`\``;

        const embed = new MessageEmbed()
        .setTitle("Pending Vouches")
        .setColor(client.embed.color)
        .setDescription(pend)
        .setTimestamp();
        
         return await interaction.followUp({embeds: [embed], ephemeral: true})

        }
    }
// ==============================< On Error >============================= \\
			}	 catch (error) {
			client.slash_err(client, interaction, error);
     }
});