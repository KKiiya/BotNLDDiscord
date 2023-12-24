const { EmbedBuilder, Message } = require("discord.js");

module.exports = {
    name: 'searchNoResult',
    onde: true,
    /**
     * 
     * @param {Message} message 
     * @param {Message} answer 
     * @param {String} query 
     */
    execute(message, answer, query) {
        const embed = new EmbedBuilder()
        
        embed.setTitle("No Result")
        embed.setDescription(`Nothing has been found for **${query}**`)
        embed.setThumbnail(message.client.user.avatarURL())
        embed.setTimestamp(Date.now())
        embed.setColor("Red")

        message.channel.send({
            content: `<@${message.author.id}>!`,
            embeds: [embed]
        })
    }
}