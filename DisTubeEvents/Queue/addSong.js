const { EmbedBuilder } = require("discord.js");
const { Queue, Song } = require("distube")

module.exports = {
    name: 'addSong',
    onde: true,
    /**
     * 
     * @param {Queue} queue 
     * @param {Song} song 
     */
    execute(queue, song) {
        if (song.playlist) return;
        const embed = new EmbedBuilder();

        embed.setTitle(song.name)
        embed.setURL(song.url)
        embed.setDescription(`Added ${song.name} to the queue\n**Site:** ${song.source}\n**Duration:** ${song.formattedDuration}\n**Requested by:** <@${song.member.id}>`)
        embed.setThumbnail(song.thumbnail)
        embed.setColor(0x00FF00)
        embed.setTimestamp(Date.now())

        if (queue.songs.length > 1) {
            queue.textChannel.send({embeds: [embed]})
        }
    }
}