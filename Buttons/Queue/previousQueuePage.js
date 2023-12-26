const { ButtonInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const client = require("../../index")


module.exports = {
    data: {
        name: "previousQueuePage"
    },
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        const queue = client.distube.getQueue(interaction.guild);
        const executor = interaction.member;

        if (!queue) { 
            interaction.reply({content: "There is no queue right now!", ephemeral: true})
            return;
        }

        const embed = new EmbedBuilder()
        embed.setTitle(queue.songs[0].name)
        embed.setURL(queue.songs[0].url)
        embed.setDescription(`**Currently playing:** ${queue.songs[0].name}\n**Current Time**: ${queue.formattedCurrentTime}\n**Duration**: ${queue.songs[0].formattedDuration}\n**Requested by**: <@${queue.songs[0].member.id}>`)
        embed.setAuthor({
            name: `Requested by ${executor.displayName}`,
            url: interaction.user.avatarURL(),
            iconURL: interaction.user.avatarURL()
        })
        embed.setThumbnail(queue.songs[0].thumbnail)
        embed.setColor("Random")

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
              .setCustomId(`stop`)
              .setLabel("⏹")
              .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
              .setCustomId(`forward`)
              .setLabel("⏩")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId(`skip`)
              .setLabel("⏭")
              .setStyle(ButtonStyle.Primary));
        
        const nextPageButton = new ButtonBuilder()
            .setCustomId("nextQueuePage")
            .setLabel("Next Page ➡")
            .setStyle(ButtonStyle.Secondary);
        const previousPageButton = new ButtonBuilder()
            .setCustomId("previousQueuePage")
            .setLabel("⬅ Previous Page")
            .setStyle(ButtonStyle.Secondary);

        const pageButtons = new ActionRowBuilder();
        
        let condition = false;
        var currentPage = parseInt(interaction.message.embeds[0].footer.text.replace("Page:", "").split("/")[0])
        var pages = parseInt(interaction.message.embeds[0].footer.text.replace("Page:", "").split("/")[1])

        currentPage--;

        for (i = (10*currentPage)-10; i < currentPage*10; i++) {
            if (i%(10*currentPage) == 0) {
                condition = true;
            }
            embed.addFields({
                name: `Song - ${i + 1}`,
                value: `${queue.songs[i].name} **[${queue.songs[i].formattedDuration}]** [${queue.songs[i].source}] (<@${queue.songs[i].member.id}>)`,
                inline: false
            })
            if (i == currentPage*10 && condition) break;
        }
        embed.setFooter({text: `Page: ${currentPage}/${pages}`})

        if (currentPage >= pages) {
            pageButtons.addComponent(previousPageButton)
            interaction.update({
                embeds: [embed],
                components: [manageButtons, pageButtons],
                ephemeral: false
            })
        } else if (currentPage == 1) {
            pageButtons.addComponent(nextPageButton)
            interaction.update({
                embeds: [embed],
                components: [manageButtons, pageButtons],
                ephemeral: false
            })
        } else {
            pageButtons.addComponents(previousPageButton, nextPageButton)
            interaction.update({
                embeds: [embed],
                components: [manageButtons, pageButtons],
                ephemeral: false
            })
        }  
    }
}