const { MessageEmbed } = require(`discord.js`);

module.exports = {
    name : "vip",
    aliases : ["vipp"],
    category : "owner",
    run : async(client,message,args) => {
        let prefix = await client.db.get(`prefix_${message.guild.id}`);
        if(!prefix) prefix = client.config.SETTINGS.PREFIX;
        let reqRole = await client.db.get(`reqrole_${message.guild.id}`);
        if(!reqRole || reqRole == null){
            return message.channel.send({embeds : [new MessageEmbed().setColor("DARK_BUT_NOT_BLACK").setDescription(`There is no **Required Role** for **Custom Roles**`)]})
        }

        if(!message.member.permissions.has("ADMINISTRATOR") && message.author.id != message.guild.ownerId  && !message.member.roles.cache.has(reqRole)){ return message.channel.send({embeds : [new MessageEmbed().setColor("DARK_BUT_NOT_BLACK").setDescription(`You are not allowed to run these command.`)]}) }

        if(!args[0]){
            return message.channel.send({embeds : [new MessageEmbed().setColor(`DARK_BUT_NOT_BLACK`).setDescription(`Usage : \`${prefix}\`vip <user>\``)]})
        }

        let abc = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!abc) return message.channel.send({content : `Please Provide me a valid user.`});

        let gRole = await client.db.get(`vip_${message.guild.id}`);
        if(!gRole || gRole == null){
            return message.channel.send({embeds : [new MessageEmbed().setColor(`DARK_BUT_NOT_BLACK`).setDescription(`There is no **vip Role** set for **Custom Roles**`)]})
        }

        if(!message.guild.roles.cache.has(gRole)){
            await client.db.set(`vip_${message.guild.id}`,null);
            return message.channel.send({embeds : [new MessageEmbed().setColor(`DARK_BUT_NOT_BLACK`).setDescription(`I couldn't find that role in this guild.Probably deleted!`)]})
        }

        message.guild.members.cache.get(abc.id).roles.add(gRole);
        return message.channel.send({embeds : [new MessageEmbed().setColor(`DARK_BUT_NOT_BLACK`).setDescription(`SuccessFully Added <@&${gRole}> to ${abc}`)]});
    }
}