const { ButtonInteraction, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: {
        name: "close"
    },
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        const data = fs.readFileSync('data.json');
        const json = JSON.parse(data);
        const guildId = interaction.guild.id;
        const guildData = json[guildId];
        const ticketCategory = guildData.ticketsCategory;
        const ticketCreationChannel = guildData.ticketsCreationChannel;
        const ticket = interaction.channel;
        const reason = "No reason provided.";
        const claimedBy = guildData.tickets[ticket.id].claimedBy;
        let finalField;
        if (claimedBy == null) {
            finalField = {
                name: "Claimed by",
                value: "Not claimed",
                inline: true
            }
        } else {
            finalField = {
                name: "Claimed by",
                value: `<@${claimedBy}>`,
                inline: true
            }
        }

        if (ticket.parentId !== ticketCategory) return interaction.reply({ content: "This is not a ticket!", ephemeral: true });
        if (ticket.id === ticketCreationChannel) return interaction.reply({ content: "You can't close the ticket creation channel!", ephemeral: true });

        guildData.ticketsLogChannel = guildData.ticketsLogChannel || null;
        const channel = interaction.guild.channels.cache.get(guildData.ticketsLogChannel);
        if (channel) {
            const embed = new EmbedBuilder();
            embed.setTitle("Ticket Closed");
            embed.setTimestamp(Date.now());
            embed.setColor(0xFF0000);
            embed.addFields(
                {
                    name: "Ticket ID",
                    value: `${guildData.tickets[ticket.id].count}`,
                    inline: true
                },
                {
                    name: "Created by",
                    value: `<@${guildData.tickets[ticket.id].user}>`,
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
                },
                {
                    name: "Creation Date",
                    value: `<t:${ticket.createdAt.getMilliseconds()}:F>`,
                    inline: true
                 },
                {
                    name: "Closed Date",
                    value: `<t:${Date.now()}:F>`,
                    inline: true
                }, finalField);
            embed.setThumbnail(interaction.guild.iconURL());
            channel.send({ embeds: [embed] });
        }
        ticket.delete(reason);
        interaction.reply({ content: "Closed the ticket!", ephemeral: true });
    }
}