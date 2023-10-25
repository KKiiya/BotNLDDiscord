const { ChatInputCommandInteraction, SlashCommandBuilder, userMention, TextInputStyle, PermissionFlagsBits, Client, ReactionEmoji, GuildMessageReactions } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()

    .setName("poll")
    .setDescription("Start a poll!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    .addStringOption(option => option
      .setName("title")
      .setDescription("Title for your embed")
      .setRequired(true))
    .addStringOption(option => option
      .setName("description")
      .setDescription("Description for your embed")
      .setRequired(true))   
    .addStringOption(option => option
      .setName("subtitle")
      .setDescription("Set a subtitle")
      .setRequired(false))
    .addStringOption(option => option
      .setName("thumbnail")
      .setDescription("Set a image by using a url")
      .setRequired(false))
    .addStringOption(option => option
      .setName("color")
      .setDescription("Set a color for your embed")
      .setRequired(false))
    .addStringOption(option => option
      .setName("subimage")
      .setDescription("Set a image to the subtitle")
      .setRequired(false))
    .addStringOption(option => option
      .setName("upvote-emoji")
      .setDescription("The emoji to upvote the poll")
      .setRequired(false))
    .addStringOption(option => option
      .setName("downvote-emoji")
      .setDescription("The emoji to downvote the poll")
      .setRequired(false)),  

    async execute(interaction) {
      const title = interaction.options.getString('title');
      const description = interaction.options.getString('description');
      var emoji1 = interaction.options.getString('upvote-emoji') || "👍"
      var emoji2 = interaction.options.getString('downvote-emoji') || "👎"
      var color = interaction.options.getString('color') || 0xee0000
      var thumbnail = interaction.options.getString('thumbnail'); 
      const embed = new EmbedBuilder()
      
            .setTitle(title)
            .setDescription(description)
            .addFields(
              {
                name: 'Upvote',
                value: emoji1 + ' - Upvote for the poll',
                inline: false
              },
              {
                name: 'Downvote',
                value: emoji2 + ' - Downvote for the poll',
                inline: false
              }
            )
            .setThumbnail(thumbnail)
            .setColor(color)
            .setTimestamp(Date.now())
      const message = await interaction.reply({
        embeds: [embed],
        fetchReply: true,
        ephemeral: false
      });
      message.react(emoji1)
      message.react(emoji2)
    },
}