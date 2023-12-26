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
      const previous = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`previous`)
            .setLabel("⏮")
            .setStyle(ButtonStyle.Primary));
      const secsBack = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`seek`)
            .setLabel("⏪")
            .setStyle(ButtonStyle.Primary));
      const stop = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
              .setCustomId(`stop`)
              .setLabel("⏹")
              .setStyle(ButtonStyle.Danger));
      const pause = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`pause`)
            .setLabel("⏸")
            .setStyle(ButtonStyle.Secondary));
      const resume = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`resume`)
            .setLabel("▶")
            .setStyle(ButtonStyle.Secondary));
      const secsForward = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`forward`)
            .setLabel("⏩")
            .setStyle(ButtonStyle.Secondary));
      const skip = new ActionRowBuilder().addComponents(
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
        components: [previous, secsBack, stop, secsForward, skip]
      })
    }
}