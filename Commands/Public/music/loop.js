const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const client = require("../../../index")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Will enable/disable looping the current song/queue.")
    .addIntegerOption(option => option
      .setName("mode")
      .setDescription("Select the loop mode (0: Disable loop | 1: Loop the current song | 2: Loop the current queue")
      .setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
      const executor = interaction.member;
      const mode = interaction.options.getInteger("mode");
      const queue = client.distube.getQueue(interaction.guild);
      const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setThumbnail(interaction.client.user.avatarURL())
            .setTitle("Looping Mode Changed")
            .setTimestamp(Date.now());

      if (executor.voice.channel != null) {
        if (!queue) {
          interaction.reply({content: "There is no queue/song playing right now!", ephemeral: true});
          return;
        }
        if (executor.voice.channelId == queue.voice.channelId) {
          queue.setRepeatMode(mode);
        
          switch (mode) {
            case 0:
              embed.setDescription(`Loop mode has been disabled!\nDisabled by: <@${executor.id}>`)
              interaction.reply({ embeds: [embed], ephemeral: false });
              break;
            case 1:
              embed.setDescription(`Loop mode has been set to 1 (Looping current song)!\nChanged by: <@${executor.id}>`)
              interaction.reply({ embeds: [embed], ephemeral: false });
              break;
            case 2:
              embed.setDescription(`Loop mode has been set to 2 (Looping current queue)!\nChanged by: <@${executor.id}>`)
              interaction.reply({ embeds: [embed], ephemeral: false });
              break;
          }
        } else {
          interaction.reply({content: "You are not in my Voice Chat!", ephemeral: true })
          return;
        }
      } else {
        interaction.reply({content: "You are not in a Voice Chat!", ephemeral: true });
      }
    }
}