const { ButtonInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const client = require("../../index")

module.exports = {
    data: {
        name: "nextQueuePage"
    },
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        const queue = client.distube.getQueue(interaction.guild);
        const executor = interaction.member

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
        var pages = 1;
        
        for (i = 1; i < queue.songs.length; i++) {
            if (i%10 == 0) {
              pages++;
            }
          }

        currentPage++;

        for (i = (10*currentPage)-10; i < 10*currentPage; i++) {
            if (i%(10*currentPage+10) == 0) {
                condition = true;
            }

            try {
                embed.addFields({
                    name: `Song - ${i + 1}`,
                    value: `${queue.songs[i].name} **[${queue.songs[i].formattedDuration}]** [${queue.songs[i].source}] (<@${queue.songs[i].member.id}>)`,
                    inline: false
                })
            } catch (err) {
                
            }
            if (condition) break;
        }
        embed.setFooter({text: `Page: ${currentPage}/${pages}`})

        if (currentPage >= pages) {
            pageButtons.addComponents(previousPageButton)
            interaction.update({
                embeds: [embed],
                components: [manageButtons, previousPageButton],
                ephemeral: false
            })
        } else if (currentPage == 1) {
            pageButtons.addComponents(nextPageButton)
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