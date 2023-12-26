const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const client = require("../../../index");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Will play music.")
    .addStringOption(option => option
      .setName("prompt")
      .setDescription("Link or search prompt for the song")
      .setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
      const executor = interaction.member;
      const vc = executor.voice;
      const url = interaction.options.getString("prompt");
    
      
      if (executor.voice.channel != null) {
        try {
          interaction.fetchReply();
          await client.distube.play(vc.channel, url, { textChannel: interaction.channel, member: executor});
        } catch (err) {
          interaction.reply({
            content: "Something went wrong! This might be because the site is not supported or the site has protection to not play its songs, apologies!",
            ephemeral: true
          });
        }
      } else {
        interaction.reply({content: "You are not in a voice chat!", ephemeral: true});
      }
    }
}