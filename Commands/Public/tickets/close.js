const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("close")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Close a ticket.")
        .addStringOption(option => option
            .setName("reason")
            .setDescription("The reason for closing the ticket.")
            .setRequired(false)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const data = fs.readFileSync('data.json');
        const json = JSON.parse(data);
        const guildId = interaction.guild.id;
        const guildData = json[guildId];
        const ticketCategory = guildData.ticketsCategory;
        const ticketCreationChannel = guildData.ticketsCreationChannel;
        const ticket = interaction.channel;
        const reason = interaction.options.getString("reason") || "No reason provided.";

        if (ticket.parentId !== ticketCategory) return interaction.reply({ content: "This is not a ticket!", ephemeral: true });
        if (ticket.id === ticketCreationChannel) return interaction.reply({ content: "You can't close the ticket creation channel!", ephemeral: true });

        ticket.delete(reason);
        interaction.reply({ content: "Closed the ticket!", ephemeral: true });
    }
}