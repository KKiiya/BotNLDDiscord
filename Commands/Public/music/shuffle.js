const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const client = require("../../../index")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffle the current queue."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
        const queue = client.distube.getQueue(interaction.guild);
        const executor = interaction.member;
        const embed = new EmbedBuilder()
                .setTitle("Queue Shuffle!")
                .setColor(0xf777e8)
                .setDescription(`Queue has been shuffeled by <@${interaction.member.id}>!`)
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
            client.distube.shuffle(interaction.guild)
            interaction.reply({embeds: [embed], ephemeral: false })
        } else {
            interaction.reply({content: "You are not in a voice chat!", ephemeral: true});
        }
    }
}