const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get a list with commands."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const embed = new EmbedBuilder();
        embed.setTitle("Available Commands")
        embed.setDescription("Please, select an option to get available commands for that section")
        embed.setThumbnail(interaction.client.user.avatarURL())
        embed.setColor(0xFF0000)

        const select = new StringSelectMenuBuilder()
			.setCustomId('help')
			.setPlaceholder('Select the command section you want to get! *This is not available yet, sorry!*')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('General')
					.setDescription('Get main commands.')
					.setValue('general'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Music')
					.setDescription('Get music commands.')
					.setValue('music'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Moderation')
					.setDescription('Get moderation commands.')
					.setValue('moderation'),
			);

        const helpType = new ActionRowBuilder().addComponents(select);

        interaction.reply({
            embeds: [embed],
            ephemeral: false,
            components: [helpType]
        })
    }
}