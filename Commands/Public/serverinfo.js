const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Send the server info."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
      var banner = interaction.guild.bannerURL() || "No Banner";
      const creation = interaction.guild.createdAt;

      const embed = new EmbedBuilder()
           .setTitle(`Server Info - **${interaction.guild.name}**`)
           .setDescription(`Total members in this server **${interaction.guild.memberCount}**`)
           .setThumbnail(`${interaction.guild.iconURL()}`)
           .addFields(
             {
              name: 'Creation date',
              value: `${creation.getDay()}/${creation.getMonth()}/${creation.getFullYear()}`,
              inline: true
             },
             {
              name: 'Owner',
              value: `<@${interaction.guild.ownerId}>`,
              inline: true
             },
             {
              name: 'Banner',
              value: `${banner}`,
              inline: false
             }
           )
           .setAuthor({
                name: `Requested by ${interaction.user.tag}`,
                url: interaction.user.avatarURL(),
                iconURL: interaction.user.avatarURL()
            })
           .setTimestamp(Date.now())
           .setColor(0xFF0000)

      interaction.reply({
        embeds: [embed], 
        ephemeral: false
      });
    }
}