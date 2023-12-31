const client = require("../../index");
const { EmbedBuilder, ButtonInteraction } = require("discord.js");

module.exports = {
    data : {
        name: "forward"
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
            if (queue.playing == true) {
                if (queue.currentTime + 10 > queue.songs[0].duration) {
                    embed.setColor(0xff0008)
                    embed.setTitle("Error!")
                    embed.setDescription(`Cannot seek past the song's duration`)
                    interaction.reply({embeds: [embed], ephemeral: true})
                    return;
                }
                queue.seek(queue.currentTime + 10)
                interaction.reply({content: "Seeked 10 seconds forward!", ephemeral: true})
            } else {
                embed.setColor(0xff0008)
                embed.setTitle("Error!")
                embed.setDescription(`No song is playing!`)
                interaction.reply({embeds: [embed], ephemeral: true })
            }
            
        } else {
            interaction.reply({content: "You are not in a voice chat!", ephemeral: true});
        }
    }
}
