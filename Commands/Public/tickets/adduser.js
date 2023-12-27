const client = require('../../../index.js');
const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("adduser")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Add a user to a ticket.")
        .addUserOption(option => option
            .setName('user')
            .setDescription('The user you want to add to the ticket.').
            setRequired(true)),
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
        const user = interaction.options.getUser('user');

        if (ticket.parentId !== ticketCategory) return interaction.reply({ content: "This is not a ticket!", ephemeral: true });
        if (ticket.id === ticketCreationChannel) return interaction.reply({ content: "You can't add a user to the ticket creation channel!", ephemeral: true });
        if (ticket.permissionOverwrites.cache.has(user.id)) return interaction.reply({ content: "This user is already in the ticket!", ephemeral: true });

        ticket.permissionOverwrites.create(user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true });
        interaction.reply({ content: `Added ${user} to the ticket!`, ephemeral: true });
    }
}

