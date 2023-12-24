const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = require("../../../index")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Will display the current queue."),
  /**
  * 
  * @param {ChatInputCommandInteraction} interaction 
  */
  execute(interaction) {
    const embed = new EmbedBuilder();
    const executor = interaction.member;
    const queue = client.distube.getQueue(interaction.guild);

    let condition = false;

    if (!queue) { 
      interaction.reply({content: "The queue is empty right now!", ephemeral: true})
      return;
    }

    var currentPage = 1;
    var lastQueuePos = 1;
    var pages = 1;

    embed.setTitle(queue.songs[0].name)
    embed.setURL(queue.songs[0].url)
    embed.setDescription(`**Currently playing:** ${queue.songs[0].name}\n**Site:** ${queue.songs[0].source}\n**Current Time**: ${queue.formattedCurrentTime}\n**Duration**: ${queue.songs[0].formattedDuration}\n**Requested by**: <@${queue.songs[0].member.id}>`)
    embed.setAuthor({
      name: `Requested by ${executor.displayName}`,
      url: interaction.user.avatarURL(),
      iconURL: interaction.user.avatarURL()
    })
    embed.setThumbnail(queue.songs[0].thumbnail)
    embed.setColor("Random")

    const nextPageButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
          .setCustomId("nextQueuePage")
          .setLabel("Next Page ➡")
          .setStyle(ButtonStyle.Secondary));

    for (i = 1; i < queue.songs.length; i++) {
      if (i%10 == 0) {
        pages++;
      }
    }

    for (i = 1; i < queue.songs.length; i++) {
      if (i%10 == 0) {
        lastQueuePos = i
        condition = true
      }
    
      embed.addFields({
        name: `Song - ${i}`,
        value: `${queue.songs[i].name} **[${queue.songs[i].formattedDuration}]** [${queue.songs[i].source}] (<@${queue.songs[i].member.id}>)`,
        inline: false
      })
      if (condition) {
        break;
      }
    }
    embed.setFooter({text: `Page: ${currentPage}/${pages}`})

    if (pages > 1) {
      interaction.reply({
        embeds: [embed],
        ephemeral: false,
        fetchReply: true,
        components: [nextPageButton]
      })
    } else {
      interaction.reply({
        embeds: [embed],
        ephemeral: false, 
        fetchReply: true,
      })
    }
  }
}