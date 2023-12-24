const { Message, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'searchInvalidAnswer',
    onde: true,
    /**
     * 
     * @param {Message} message 
     * @param {Message} answer 
     * @param {String} query 
     */
    execute(message, answer, query) {
        const embed = new EmbedBuilder()

        embed.setTitle("Error")
        embed.setDescription(`Invalid answer! This might be because the search result isn\`\t in the search result`)
        embed.setThumbnail(message.client.user.avatarURL())
        embed.setTimestamp(Date.now())
        embed.setColor("Red")
        
        message.channel.send({
            embeds: [embed]
        })
    }
}