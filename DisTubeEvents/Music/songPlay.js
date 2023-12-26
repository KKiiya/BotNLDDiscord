const { Client, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
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
      const manageButtons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`previous`)
            .setLabel("⏮")
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId(`seek`)
          .setLabel("⏪")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId(`pause`)
          .setLabel("⏸")
          .setStyle(ButtonStyle.Primary),  
        new ButtonBuilder()
          .setCustomId(`stop`)
          .setLabel("⏹")
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId(`resume`)
          .setLabel("▶")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId(`forward`)
          .setLabel("⏩")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId(`skip`)
          .setLabel("⏭")
          .setStyle(ButtonStyle.Primary));
      
      
      const embed = new EmbedBuilder();

      embed.setTitle(song.name)
      embed.setURL(song.url)
      embed.setDescription(`Playing ${song.name}\n**Site:** ${song.source}\n**Duration:** ${song.formattedDuration}\n**Requested by:** <@${song.member.id}>`)
      embed.setThumbnail(song.thumbnail)
      embed.setColor(0x00FF00)
      embed.setTimestamp(Date.now())
         
      queue.textChannel.send({
        embeds: [embed],
        components: [manageButtons]
      })
    }
}