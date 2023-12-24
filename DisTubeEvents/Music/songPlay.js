const { Client, EmbedBuilder } = require("discord.js");
const client = require("../../index");
const { Queue } = require("distube");

module.exports = {
    name: 'playSong',
    onde: true,
    /**
     * 
     * @param {Queue} queue 
     * @param {Song} song
     */
    execute(queue, song) {
      const embed = new EmbedBuilder();

      embed.setTitle(song.name)
      embed.setURL(song.url)
      embed.setDescription(`Playing ${song.name}\n**Site:** ${song.source}\n**Duration:** ${song.formattedDuration}\n**Requested by:** <@${song.member.id}>`)
      embed.setThumbnail(song.thumbnail)
      embed.setColor(0xf777e8)
      embed.setTimestamp(Date.now())
         
      queue.textChannel.send({
        embeds: [embed]
      })
    }
}