const {
    MessageEmbed,
    Message,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu,
    Client
} = require("discord.js");
const Settings = require('../../core/settings.js');
const client = require('../../index');
const db = require('../../core/db');

module.exports = {
  name: 'helpv',
  aliases: ['h'],
  category: 'info',
  run: async (client, message, args) => {
    let prefix = await db.get(`prefix_${message.guild.id}`);
    if (!prefix) prefix = Settings.bot.info.prefix;
    const r1 = new MessageActionRow().addComponents(
      new MessageButton().setStyle(`SECONDARY`).setCustomId(`p1`).setEmoji(`
<:antinuke:1067330111554195526>`),
      new MessageButton().setStyle(`SECONDARY`).setCustomId(`p2`).setEmoji(`<:automod:1067330633833140224>`),
      new MessageButton().setStyle(`SECONDARY`).setCustomId(`p3`).setEmoji(`<:Icons_utility:1067331794258628669>`),
      new MessageButton().setStyle(`SECONDARY`).setCustomId(`p4`).setEmoji(`<:giveawayIcon:1067676271359828038>`)
    );
    const r2 = new MessageActionRow().addComponents(
      new MessageButton().setStyle(`SECONDARY`).setCustomId(`p5`).setEmoji(`<:icons_games:1065641042549948500>`),
      new MessageButton().setStyle(`SECONDARY`).setCustomId(`p6`).setEmoji(`<:icons_imagen:1067676767634083861>`),
      new MessageButton().setStyle(`SECONDARY`).setCustomId(`p7`).setEmoji(`<:icons_roles:1067332219955331113>`),
      new MessageButton().setStyle(`SECONDARY`).setCustomId(`p8`).setEmoji(`<:icon_welcome:1067330837953118279>`)
    );
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('helpop')
          .setPlaceholder(`❯ Choose A Category.`)
          .addOptions([
            {
              label: ' AntiNuke',
              description: 'Get All AntiNuke Command List',
              value: 'first',
            
            },
            {
              label: ' Moderation',
              description: 'Get All Moderation Command List',
              value: 'second',
           
            },
            {
              label: 'Utility',
              description: 'Get All Utility Command List',
              value: 'third',
             
            },
            {
              label: 'Fun',
              description: 'Get All Fun Command List',
              value: 'fourth',
             
            },
            {
              label: 'Giveaway',
              description: 'Get All Giveaway Commmand List',
              value: 'fifth',
            
            },
            {
              label: 'Welcomer',
              description: 'Get All Welcomer Command List',
              value: 'sixth',
             
            },
            {
              label: 'Custom Role',
              description: 'Get All Custom Role Command List',
              value: 'seven',
             
            }
          ])
        )
    const embed = new MessageEmbed()
    .setColor("AQUA")
    .setAuthor({ name: `${client.user.tag} HelpDesk`, iconURL: client.user.displayAvatarURL({dynamic: true})})
    .setDescription(`<:icons_prefix:1067671120288944208> Prefix for this server \`${prefix}\`\n<:icon_commands:1065648468212862986>Click on the **Dropdown** to see each **command** within a **Specific Category**\n\`\`\`yaml\n<> - Required Arguement | () - Optional Arguement\`\`\``)
    .addFields([{name : `<:icon_generalinfo:1065638768138268833> __Main__` , value : `>>> <:antinuke:1067330111554195526> AntiNuke \n <:icon_mod:1065647166380593242> Moderation \n <:Icons_utility:1067331794258628669> Utility \n <:giveawayIcon:1067676271359828038> Giveaway` , inline : true},
          {name : `<:extra:1067676452293709895> __Extra__` , value : `>>> <:icons_games:1065641042549948500> Fun \n <:icons_imagen:1067676767634083861> Image \n <:icons_roles:1067332219955331113> Custom Roles \n <:icon_welcome:1067330837953118279> Welcomer` , inline : true},
          {name : `<:icon_links:1067677331159789678> __Links__` , value : `**[Invite Me](https://discord.com/oauth2/authorize?client_id=823512343387832320&permissions=8&scope=applications.commands%20bot) | [Support Server](https://discord.gg/YmyzbhUQW7) | [Vote Me](https://top.gg/bot)**` , inline : false}
  ]).setThumbnail(message.guild.iconURL({dynamic : true}))
    message.channel.send({embeds: [embed], components: [r1,r2,row]})
    .setFooter(`Made With ❤️ By - Autumn#1640`,
              `https://media.discordapp.net/attachments/1047885140975689758/1067669827222765588/fotor_2023-1-23_21_42_10.png`)
  }
}

function embeds(embed, prefix, ping) {
  if (embed === 'help') {
    return new MessageEmbed()
      .setColor('FF0000')
      .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://discord.gg/fr8sczMK8n")
      .setDescription(`**<a:skye_help:1024947429113602048> My Default Prefix Is  -**

**<a:c_dot4:1026889119667847249> A Best Antinuke Security Bot With Many More Advance Features
<a:c_dot4:1026889119667847249> ${client.user.username} Provides You Best Premium Security Features 
<a:c_dot4:1026889119667847249> [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [Support](https://discord.gg/TCf2JQafK8) | Total ${client.commands.size - 1} Commands **

**Choose One Of The Category Below : **

<:skye_module:1024957289616117800>  **__Main Module__**
>  **<:skye_antinuke:1024952333731364876> <:skye_arrow:1024953388909215764> Antinuke **
>  **<:skye_mod:1024952187136262154> <:skye_arrow:1024953388909215764> Moderation**
>  **<:skye_whitelist:1024952571535827014> <:skye_arrow:1024953388909215764> Whitelist** `);
    
  } else if (embed === 'x') {
    return new MessageEmbed()
      .setColor("FF0000")
      .setDescription("**MODERATION** `ban`,`kick`,`unban`,`mute`,`unmute`,`lock`,`unlock`,`unhide`,`hide`,`unbanall`,`nuke`")
  } else if (embed === 'toggle') {
    return new MessageEmbed()
    .setColor('FF0000')
    .setDescription(`**ANTINUKE COMMANDS**

>  To Enable Use :  \`-antinuke enable\`
>  To Disable Use :  \`-antinuke disable\`

Enabling Antinuke Will Feature Your Server : 

• \`Anti Ban\`,\`Anti Kick\`,\`Anti Unban\`,\` Anti Role Create\`,\`Anti Role Update \`,\`Anti Role Delete\`,\` Anti Channel Create\`,\`Anti Channel Delete\`,\`Anti Channel Update\`, \`Anti Emoji Create\` , \`Anti Emoji Delete\` , \`Anti Emoji Update\`,\`Anti Webhook Create \`,\`Anti Webhook Update\`,\`Anti Webhook Delete\`,\`Anti Sticker Create\`,\`Anti Sticker Update\`,\`Anti Sticker Delete\`,\`Anti Everyone/Here \`,\`Anti Server Update \`,\`Anti Prune \`,\`Anti Bot Add \`,\`Anti Vanity Steal \``);

  } 
}
