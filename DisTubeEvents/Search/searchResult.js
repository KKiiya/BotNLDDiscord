const { EmbedBuilder, Message } = require("discord.js");
const { SearchResult } = require("distube")

module.exports = {
    name: 'searchDone',
    onde: true,
    /**
     * 
     * @param {Message} message 
     * @param {SearchResult[]} results 
     * @param {String} query 
     */
    execute(message, results, query) {
        const embed = new EmbedBuilder();

        console.log(message)

        embed.setTitle("Search Result")
        embed.setDescription(`Search result for **${query}**`)
        embed.setThumbnail(message.client.user.avatarURL())
        embed.setAuthor({
            name: `Search Done by ${message.author.displayName}`,
            url: interaction.user.avatarURL(),
            iconURL: message.author.avatarURL()
        })
        embed.setTimestamp(Date.now())
        embed.setColor(0xf777e8)

        for (i = 0; i < 10; i++) {
            embed.addFields({
                name: `Result #${i}`,
                value: `Title: ${results[i].name}, Channel: ${results[i].uploader}, Duration: ${results[i].formattedDuration}, Source: ${results[i].source}`,
                inline: false
            })
        }

        message.channel.send({
            embeds: [embed],
            content: `<@${message.author.id}> search done!`
        })        
    }
}