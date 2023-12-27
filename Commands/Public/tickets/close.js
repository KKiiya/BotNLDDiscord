const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
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

        guildData.ticketLogChannel = guildData.ticketLogChannel || null;
        const channel = interaction.guild.channels.cache.get(guildData.ticketLogChannel);
        if (channel) {
            const embed = new EmbedBuilder();
            embed.setTitle("Ticket Closed");
            embed.setTimestamp(Date.now());
            embed.setColor(0xFF0000);
            embed.addFields({
                    name: "Ticket ID",
                    value: `${guildData.tickets[ticket.id].count}`,
                    inline: true
                },
                {
                    name: "Closed by",
                    value: `<@${interaction.user.id}>`,
                    inline: true
                },
                {
                    name: "Reason",
                    value: reason,
                    inline: true
                });
            channel.send({ embeds: [embed] });
        }
        interaction.reply({ content: "Closed the ticket!", ephemeral: true });
    }
}