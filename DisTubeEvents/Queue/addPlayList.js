const { EmbedBuilder } = require("discord.js");
const { Queue, Playlist } = require("distube")

module.exports = {
    name: 'addList',
    onde: true,
    /**
     * 
     * @param {Queue} queue 
     * @param {Playlist} playlist 
     */
    execute(queue, playlist) {
        const embed = new EmbedBuilder();

        embed.setTitle(playlist.name)
        embed.setURL(playlist.url)
        embed.setDescription(`Added ${playlist.name} to the queue\n**Site:** ${playlist.source}\n**Duration:** ${playlist.formattedDuration}\n**Requested by:** <@${playlist.member.id}>`)
        embed.setThumbnail(playlist.thumbnail)
        embed.setColor(0xf777e8)
        embed.setTimestamp(Date.now())

        if (queue.songs.length > 1) {
            queue.textChannel.send({embeds: [embed]})
        }
    }
}