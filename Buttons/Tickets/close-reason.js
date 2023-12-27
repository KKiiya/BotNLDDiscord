const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonInteraction } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: {
        name: "close-reason"
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

        if (ticket.parentId !== ticketCategory) return interaction.reply({ content: "This is not a ticket!", ephemeral: true });
        if (ticket.id === ticketCreationChannel) return interaction.reply({ content: "You can't close the ticket creation channel!", ephemeral: true });

        const modal = new ModalBuilder()
            .setTitle("Close Reason")
            .setDescription("Why are you closing this ticket?")
            .setCustomId("closeModal");
        const text = new TextInputBuilder()
            .setCustomId("closeReason")
            .setLabel("Why are you closing this ticket?")
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder("Provide a reason for closing this ticket (Leave blank if you want)")
            .setRequired(true);

        const actionRow = new ActionRowBuilder().addComponents(text);
        modal.addComponents(actionRow);

        await interaction.showModal(modal);

        const filter = (interaction) => interaction.customId === "closeModal";

        interaction
            .awaitModalSubmit({ filter, time: 30_000 })
            .then((modalInteraction) => {
                const reason = modalInteraction.fields.getTextInputValue("closeReason");

                ticket.delete(reason);

                modalInteraction.reply({ content: "Ticket closed!", ephemeral: true });
            })
            .catch(() => {
                interaction.reply({ content: "You didn't stick the landing", ephemeral: true });
            })
    }
}