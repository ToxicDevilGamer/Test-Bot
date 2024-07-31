const client = require('..')
const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const ms = require('ms')
const prefix = client.prefix;
const cooldown = new Collection()
const { msg } = require(`${process.cwd()}/functions/onCoolDown.js`);
const config = require(`${process.cwd()}/json/config.json`);
const embed = require(`${process.cwd()}/json/embed.json`);
const emojis = require(`${process.cwd()}/json/emojis.json`);
// ================================================================================ \\
client.on('messageCreate', async message => {
  try {
// ==============================< On Idk >=============================\\

// ==============================< On Bot Ping /Tag >=============================\\
  client.util.setPrefix(message, client);
  client.util.noprefix();
  let prefix = message.guild.prefix || 'r!';
  if (message.author.bot || !message.guild) return;
  const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setLabel(`Invite Me`)
    .setStyle('LINK')
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
  ,
    new MessageButton()
  .setLabel(`Support`)
  .setStyle('LINK')
  .setURL(`client.config.SERVER.OFFICIAL.INVITE_LINK`)
  )
  if (message.content === `<@${client.user.id}>`) { 
    return message.channel.send({ embeds: [new MessageEmbed()
  .setColor(`00e3ff`)
  .setTitle(message.guild.name)
  .setDescription(`Hey ${message.author},\nMy Prefix here is: \`${prefix}\`\nServer Id: \`${message.guild.id}\`\n\nType \`${prefix}\`**help** To Get The Command List.`)
  .setFooter({text: `Developed with ❤️ By - ToxicDevilYt`, iconURL: message.guild.iconURL({dynamic: true})})], components: [row] });
  }
// ==============================< Command Handling >=============================\\
	if(message.author.bot) return;
	if(message.channel.type !== 0) return;
	if(!message.content.startsWith(prefix)) return; 
	const args = message.content.slice(prefix.length).trim().split(/ +/g); 
	const cmd = args.shift().toLowerCase();
	if(cmd.length == 0 ) return;
	let command = client.commands.get(cmd)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmd))
    || client.commands.find(cmd => cmd.cooldowns && cmd.cooldowns.includes(cmd))
    || client.commands.find(cmd => cmd.category && cmd.category.includes(cmd))
    || client.commands.find(cmd => cmd.descriptions && cmd.descriptions.includes(cmd))
    || client.commands.find(cmd => cmd.usage && cmd.usage.includes(cmd));
// ==============================< If command doesn't found >=============================\\
	 if(!command) command = client.commands.get(client.aliases.get(cmd));       
    if (!command) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.embed.wrongcolor)
                        .setDescription(`${emojis.MESSAGE.x} The command \`${cmd}\` does not exist.`)
                ]
            }).then(m => setTimeout(() => m.delete(), 6000));
        }
// ==============================< Other Command Handling list >=============================\\
	if(command) {
    try {
// ==============================< Toggle off >=============================\\

      if (command.toggleOff) {
                        return await message.reply({
                            embeds: [new EmbedBuilder()
                                .setDescription(`${emojis.MESSAGE.x} **That Command Has Been Disabled By The Developers! Please Try Later.**`)
                              .setColor(client.embed.wrongcolor)
                            ]
                        }).then(msg => {
                            setTimeout(() => {
                                msg.delete().catch((e) => {
                                    console.log(String(e).grey)
                                })
                            }, 6000)
                        }).catch((e) => {
                            console.log(String(e).grey)
                        });
                    }

// ==============================< Vouch Staff Only >=============================\\
if(command.vouchStaffOnly === true) {
            if(!message.guild) return;
            if(!message.member.roles.cache.find((r) => r.id === "1054369407327027261" || r.id === "1054369407327027261" ))//your vouch staff roleid 
            {         
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.embed_color)
                        .setDescription("**Only 
Reflex Vouch Staff Can Use This Command**")
                    ]
                })
            }
        }

        if(command.reportStaffOnly === true) {
            if(!message.guild) return;
            if(!message.member.roles.cache.find((r) => r.id === "1054365597124808774" || r.id === "1054365597124808774"))//your report staff role id 
            {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.embed_color)
                        .setDescription("**Only Reflex Report Staff Can Use This Command**")
                    ]
                })
            }
        }
// ==============================< On Mainenance Mode >============================= \\
      if (command.maintenance){
                    return await message.reply({
                      content: `${emojis.MESSAGE.x} **${command.name} command is on __Maintenance Mode__** try again later!`
                    })
                  }
// ==============================< Owner Only >============================= \\
      if (command.ownerOnly) {
        const owners = client.config.DEV.OWNER.concat(
                client.config.DEV.CO_OWNER
            );
        if (!owners.includes(message.author.id)) return await message.reply({
                            embeds: [new EmbedBuilder()
                                .setDescription(`${emojis.MESSAGE.x} **You cannot use \`${prefix}${command.name}\` command as this is a developer command.**`).setColor(client.embed.wrongcolor)
                            ]
                        }).then(msg => {
                            setTimeout(() => {
                                msg.delete().catch((e) => {
                                    console.log(String(e).grey)
                                })
                            }, 6000)
                        }).catch((e) => {
                            console.log(String(e).grey)
                        });
                    }
// ==============================< Permissions checking >============================= \\
    if(command.userPerms || command.botPerms) {       				
      if(!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`${emojis.MESSAGE.x} ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
						.setColor(client.embed.wrongcolor)
						return message.reply({ embeds: [userPerms] })
					}
					if(!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`${emojis.MESSAGE.x} ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
						.setColor(client.embed.wrongcolor)
						return message.reply({ embeds: [botPerms] })
					}
    }
// ==============================< NSFW checking >============================= \\
      if (command.nsfwOnly && !message.channel.nsfw) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${emojis.MESSAGE.x} ${message.author.username} This command only works in NSFW channels!`)
                        .setDescription(`Please go to the NSFW channel to use this command!`)
                       .setColor(client.embed.wrongcolor)
                    ]
                
            }).then(m => setTimeout(() => m.delete(), 6000));    
      } 
// ==============================< Only for offical guilds >============================= \\
        if (command.guildOnly) {
          const private = client.config.SERVER.OFFICIAL.Guild_ID_1
            .concat(client.config.SERVER.Guild_ID_2);
          if(!private.includes(message.guild.id)){
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${emojis.MESSAGE.x} ${message.author.username} You have entered an invalid command!`)
                        .setDescription(`The command \`${command.name}\` can only be used in the official server.`)   
                        .setColor(client.embed.wrongcolor)
                    ]
            }).then(m => setTimeout(() => m.delete(), 6000));
          }   
        }
// ==============================< CoolDown checking >============================= \\
        if (msg(message, command)) {
            return await message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${emojis.MESSAGE.x} ${message.author.username}, You have been cooldown for \`${command.cooldown}\` seconds!`)
                        .setDescription(`Please wait \`${msg(message, command).toFixed(1)}\` Before using the \`${command.name}\` command again!`)
                      .setColor(client.embed.wrongcolor)
                    ]
                }).then(m => setTimeout(() => m.delete(), msg(message, command) * 1000));
            }
// ==============================< Start The Command >============================= \\
      await command.run(client, message, args)
      const commandLogsChannel = client.channels.cache.get(client.config.SETTINGS.CommandLogs);
      if (!commandLogsChannel) return;
      commandLogsChannel.send({
                        embeds: [new EmbedBuilder()
                            .setColor(client.embed.color)
                            .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({
                                dynamic: true
                            })})
                            .setTitle(`Prefix Command`)
                             .addFields([
                                 { name: "**Author**",value: `\`\`\`yml\n${message.author.tag} [${message.author.id}]\`\`\``},
                                 { name: "**Command Name**", value: `\`\`\`yml\n${command.name}\`\`\`` },
                                 { name: `**Guild**`, value: `\`\`\`yml\n${message.guild.name} [${message.guild.id}]\`\`\`` }
                             ])                       
                        ]
                    });

// ==============================< NQN / Free Nitro Emojis >=============================\\
  if (message.author.bot) return;
  let msg = message.content;

  let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g)
  if (!emojis) return;
  emojis.forEach(m => {
    let emoji = client.emojis.cache.find(x => x.name === m)
    if (!emoji) return;
    let temp = emoji.toString()
    if (new RegExp(temp, "g").test(msg)) msg = msg.replace(new RegExp(temp, "g"), emoji.toString())
    else msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
  })

  if (msg === message.content) return;

  let webhook = await message.channel.fetchWebhooks();
  let number = randomNumber(1, 2);
  webhook = webhook.find(x => x.name === "NQN" + number);

  if (!webhook) {
    webhook = await message.channel.createWebhook(`NQN` + number, {
      avatar: client.user.displayAvatarURL({ dynamic: true })
    });
  }

  await webhook.edit({
    name: message.member.nickname ? message.member.nickname : message.author.username,
    avatar: message.author.displayAvatarURL({ dynamic: true })
  })

  message.delete().catch(err => { })
  webhook.send(msg).catch(err => { })

  await webhook.edit({
    name: `NQN` + number,
    avatar: client.user.displayAvatarURL({ dynamic: true })
  })

})
// ==============================< On Error >============================= \\
    } catch (error) {
                    console.log(error)
                    return message.reply({
                        embeds: [new EmbedBuilder()
                            .setTitle(`${emojis.MESSAGE.x} Something went wrong while, running the: ${prefix}${command.name} command`).setColor(client.embed.wrongcolor)
                        ]
                    }).then(msg => {
                        setTimeout(() => {
                            msg.delete().catch((e) => {
                                console.log(String(e).grey)
                            })
                        }, 4000)
                    }).catch((e) => {
                        console.log(String(e).grey)
                    });
    }
  }  
  } catch (error) {
    client.msg_err(client, message, error);      
  } 	
});

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 

   
