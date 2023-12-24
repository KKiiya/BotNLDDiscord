const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const client = require("../../../index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unpause")
    .setDescription("Unpause the queue/song if paused."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
      const queue = client.distube.getQueue(interaction.guild);
      const executor = interaction.member;
      const embed = new EmbedBuilder()
          .setThumbnail(interaction.client.user.avatarURL())
          .setTimestamp(Date.now())
          .setColor(0x00FF00);
        
      if (executor.voice.channel != null) {
        if (!queue) {
          interaction.reply({content: "There is no queue/song playing right now!", ephemeral: true});
          return;
        }
        if (executor.voice.channelId != queue.voice.channelId) {
          interaction.reply({content: "You are not in my vc!", ephemeral: true })
          return;
        }
        if (queue.paused) {
          queue.resume()
          embed.setTitle("Queue Resumed")
          embed.setDescription(`<@${executor.id}> has resumed the queue`)
          interaction.reply({embeds: [embed], ephemeral: false })
        } else {
          embed.setTitle("Error")
          embed.setDescription(`The queue is already playing <@${executor.id}>!`)
          interaction.reply({embeds: [embed], ephemeral: false })
        }
      } else {
        interaction.reply({content: "You are not in a voice chat!", ephemeral: true});
      }
  }
}