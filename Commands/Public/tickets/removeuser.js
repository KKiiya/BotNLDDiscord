const client = require('../../../index.js');
const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName("removeuser")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Remove a user from a ticket.")
        .addUserOption(option => option
            .setName('user')
            .setDescription('The user you want to remove from the ticket.')
            .setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const ticket = interaction.channel;
        const user = interaction.options.getUser('user');

        if (!ticket.permissionOverwrites.cache.has(user.id)) return interaction.reply({ content: "This user is not in the ticket!", ephemeral: true });

        ticket.permissionOverwrites.delete(user.id);
        interaction.reply({ content: `Removed ${user} from the ticket!`, ephemeral: true });
    }
}