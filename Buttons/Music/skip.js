const { EmbedBuilder, ButtonInteraction } = require("discord.js");
const client = require("../../index");

module.exports = {
    data : {
        name: "skip"
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

        if (interaction.message.embeds[0].url != queue.songs[0].url) {
            interaction.reply({content: "Outdated button.", ephemeral: true})
            return;
        }

        const embed = new EmbedBuilder()
                .setTimestamp(Date.now())
                .setThumbnail(interaction.client.user.avatarURL());
        
        if (executor.voice.channel != null) {
            if (!queue) {
                interaction.reply({content: "There is no queue right now!", ephemeral: true});
                return;
            }
            if (executor.voice.channelId != queue.voice.channelId) {
                interaction.reply({content: "You are not in my vc!", ephemeral: true })
                return;
            }
            if (queue.songs.length > 1) {
                embed.setColor(0x00FF00)
                embed.setTitle("Song Skipped!")
                embed.setDescription(`Skipped to the next song\n**Requested by:** <@${interaction.member.id}>!`)
                queue.skip()
                interaction.reply({embeds: [embed], ephemeral: false })
            } else if (queue.songs.length == 1) {
                embed.setColor(0xff0008)
                embed.setTitle("Error!")
                embed.setDescription(`There is nothing else to play!`)
                interaction.reply({embeds: [embed], ephemeral: true })
            }
            
        } else {
            interaction.reply({content: "You are not in a voice chat!", ephemeral: true});
        }
    }
}