const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const client = require("../../../index");
const { Queue } = require('distube');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Make the bot stop the queue and leave the vc."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
        const queue = client.distube.getQueue(interaction.guild);
        const executor = interaction.member;
        const embed = new EmbedBuilder()
                .setTitle("Stopped playing music!")
                .setColor(0xff0008)
                .setDescription(`<@${interaction.member.id}> has stopped the queue!`)
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
            queue.stop()
            interaction.reply({embeds: [embed], ephemeral: false })
        } else {
            interaction.reply({content: "You are not in a voice chat!", ephemeral: true});
        }
    }
}