const client = require("../../index");
const { EmbedBuilder, ButtonInteraction } = require("discord.js");

module.exports = {
    data: {
        name: "stop"
    },
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        const queue = client.distube.getQueue(interaction.guild);
        const executor = interaction.member;

        if (!queue) {
            interaction.reply({ content: "There is no queue right now!", ephemeral: true })
            return;
        }

        if (interaction.message.embeds[0].url != queue.songs[0].url) {
            interaction.reply({ content: "Outdated button.", ephemeral: true })
            return;
        }

        const embed = new EmbedBuilder()
                .setTitle("Stopped playing music!")
                .setColor(0xff0008)
                .setDescription(`<@${executor.id}> has stopped the queue!`)
                .setTimestamp(Date.now())
                .setThumbnail(interaction.client.user.avatarURL());

        if (executor.voice.channel != null) {
            if (!queue) {
                interaction.reply({ content: "There is no queue right now!", ephemeral: true });
                return;
            }
            if (executor.voice.channelId != queue.voice.channelId) {
                interaction.reply({ content: "You are not in my vc!", ephemeral: true })
                return;
            }
            interaction.reply({ embeds: [embed], ephemeral: false })
        } else {
            interaction.reply({ content: "You are not in a voice chat!", ephemeral: true });
        }
    }
}