const fs = require('fs');
const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setchannel")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Set the channel you want to create tickets."),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
        const { channel } = interaction;
        const guildId = interaction.guild.id;
        const channelId = interaction.channel.id;
        const categoryId = interaction.channel.parentId;

        const embed = new EmbedBuilder();
        embed.setTitle("Ticket Creation");
        embed.setDescription("Create a ticket to get help from our staff team!");
        embed.setThumbnail(interaction.client.user.avatarURL());
        embed.setColor(0xFF0000);
        embed.addFields(
            {
                name: "How to create a ticket?",
                value: "Click on the selection menu below to select a ticket category!",
                inline: false
            }
        )
        embed.setFooter({
            text: "Ticket System",
            iconURL: interaction.client.user.avatarURL()
        });


        const info = {
            ticketsCategory: channelId,
            ticketsCreationChannel: categoryId
        };
        
        const data = {
            ticketsInfo : {
                [guildId]: info
            }
        };
        
        fs.writeFileSync('data.json', JSON.stringify(data));

        // Create a message with string select menu
        const select = new StringSelectMenuBuilder()
			.setCustomId('ticket-help-selection')
			.setPlaceholder('Select the command section you want to get! *This is not available yet, sorry!*')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Resources Help')
					.setDescription('Open a ticket to get help with resources.')
					.setValue('resources-help'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Other')
					.setDescription('Open a ticket for other reasons.')
					.setValue('other-help'),
			);

        interaction.reply({
            content: "Ticket creation channel set!",
            ephemeral: true
        });

        channel.send({
            embeds: [embed],
            components: [new ActionRowBuilder().addComponents(select)]
        });
    }
}