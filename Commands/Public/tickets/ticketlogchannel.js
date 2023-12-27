const client = require('../../../index.js');
const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setticketlogchannel')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription('Set the ticket log channel')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to set the ticket log channel to').setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const data = fs.readFileSync('data.json');
        const json = JSON.parse(data);
        const guildId = interaction.guild.id;
        const guildData = json[guildId];
        const channel = interaction.options.getChannel('channel');

        const finalData = {
            ...json,
            [guildId]: {
                ticketLogChannel: channel.id,
                ...guildData
            }
        };
        fs.writeFileSync('data.json', JSON.stringify(finalData));
        interaction.reply({ content: `Set the ticket log channel to ${channel}!`, ephemeral: true });
    }
}