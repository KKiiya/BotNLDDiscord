const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDescription("Kick a specific member.")
    .addMentionableOption(option => option 
      .setName("member")
      .setDescription("Member you want to kick")
      .setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
      const member = interaction.options.getMember("member");

      interaction.reply({content: `**${member.displayName}** has been kicked successfully!`, ephemeral: true});
    }
}