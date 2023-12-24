const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(option => option
        .setName("userid")
        .setDescription("ID of the user you want to unban")
        .setRequired(true)),    
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
      const member = interaction.options.getString("userid");
      try {
        await interaction.guild.members.unban(member);

        interaction.reply({content: `<@${member}> thanked the bus driver`, ephemeral: true});
      } catch (err) {
        interaction.reply({content: `<@${member}> hasn't been banned before!`, ephemeral: true});
      }
      
    }
}