const { ButtonInteraction, PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: {
        name: "claim"
    },
    /**
     * 
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        const ticket = interaction.channel;
        const message = interaction.message;
        const member = interaction.member;
        const data = fs.readFileSync('data.json');
        const json = JSON.parse(data);
        const guildId = interaction.guild.id;
        const guildData = json[guildId];
        const ticketCategory = guildData.ticketsCategory;
        const ticketCreationChannel = guildData.ticketsCreationChannel;

        if (!interaction.member) return interaction.reply({ content: "This user is not in the ticket!", ephemeral: true });

        if (ticket.parentId !== ticketCategory) return interaction.reply({ content: "This is not a ticket!", ephemeral: true });
        if (ticket.id === ticketCreationChannel) return interaction.reply({ content: "You can't claim the ticket creation channel!", ephemeral: true });

        if (!member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: "You don't have permission to claim this ticket!", ephemeral: true });

        const title = message.embeds[0].title;
        const components = message.components[0].components;
        const button = new ButtonBuilder()
            .setCustomId("claim")
            .setLabel("Claim")
            .setEmoji("🙋‍♂️")
            .setStyle(ButtonStyle.Success)
            .setDisabled(true);
        const row = new ActionRowBuilder().addComponents(components[0], components[1], button);

        const finalData = {
            ...json,
            [guildId]: {
                ...guildData,
                tickets: {
                    ...guildData.tickets,
                    [ticket.id]: {
                        ...guildData.tickets[ticket.id],
                        claimedBy: member.id,
                        claimed: true
                    }
                }
            }
        };
        fs.writeFileSync('data.json', JSON.stringify(finalData));

        const embed = new EmbedBuilder()
            .setTitle(`${title} (Claimed)`)
            .setDescription(`This ticket has been claimed by ${member.displayName}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setColor("Green");
        
        message.edit({ embeds: [embed], components: [row] });
        interaction.reply({ content: "Ticket claimed!", ephemeral: true });
    }
}