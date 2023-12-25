const { Client, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ChannelType } = require("discord.js");
const fs = require("fs");

module.exports = {
    name: 'interactionCreate',
    onde: true,
    async execute(interaction) {
        if (!interaction.isStringSelectMenu()) return;
        const { guild } = interaction;

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
        const embed = new EmbedBuilder()

        const value = interaction.values[0]
        const id = interaction.customId

        if (id === "help") {
            switch (value) {
                case "general":
                    embed
                        .setTitle("General Commands")
                        .setDescription("These are the general commands! Take a look!")
                        .addFields(
                            {
                                name: "/help",
                                value: "Display the previous message!",
                                inline: true
                            },
                            {
                                name: "/serverinfo",
                                value: "Get the server information!",
                                inline: true
                            },
                            {
                                name: "/pong",
                                value: "Reply with pong!",
                                inline: false
                            })
                        .setThumbnail(interaction.client.user.avatarURL())
                        .setColor(0xFF0000)

                    interaction.reply({
                        embeds: [embed],
                        compontents: [helpType],
                        ephemeral: true
                    })
                    break;
                case "music":
                    embed
                        .setTitle("Music Commands")
                        .setDescription("These are the music commands! Take a look!")
                        .addFields(
                            {
                                name: "/play",
                                value: "Play music in Voice Chats from various media providers!",
                                inline: true
                            },
                            {
                                name: "/skip",
                                value: "Skip to the next song!",
                                inline: true
                            },
                            {
                                name: "/pause",
                                value: "Pause the current queue!",
                                inline: true
                            },
                            {
                                name: "/unpause",
                                value: "Resume the song if paused!",
                                inline: true
                            },
                            {
                                name: "/stop",
                                value: "Stop playing music and leave the Voice Chat!",
                                inline: true
                            },
                            {
                                name: "/queue",
                                value: "Get the queue of a vc if playing!",
                                inline: true
                            },
                            {
                                name: "/shuffle",
                                value: "Shuffle the queue to get random songs!",
                                inline: true
                            },
                            {
                                name: "/loop",
                                value: "Enable looping for a song or for a queue!",
                                inline: true
                            },
                            {
                                name: "/search",
                                value: "Search for playlists or videos",
                                inline: true
                            }
                        )
                        .setThumbnail(interaction.client.user.avatarURL())
                        .setColor(0xFF0000);

                    interaction.reply({
                        embeds: [embed],
                        compontents: [helpType],
                        ephemeral: true
                    })
                    break;
                case "moderation":
                    embed
                        .setTitle("Moderation Commands")
                        .setDescription("These are the moderation commands! Take a look!")
                        .addFields(
                            {
                                name: "/kick",
                                value: "Kick someone!",
                                inline: true
                            },
                            {
                                name: "/ban",
                                value: "Ban someone!",
                                inline: true
                            },
                            {
                                name: "/unban",
                                value: "Unban someone!",
                                inline: false
                            })
                        .setThumbnail(interaction.client.user.avatarURL())
                        .setColor(0xFF0000);

                    interaction.update({
                        embeds: [embed],
                        ephemeral: false
                    })
                    break;
            }
        } else if (id === "ticket-help-selection") {
            const rawData = fs.readFileSync('data.json', (error, data) => {
                if (error) throw error;
                return data;
            });

            const data = JSON.parse(rawData);
            const guildId = `${guild.id}`;
            
            try {
                if (data[guildId].ticketCount === undefined) data[guildId].ticketCount = 0;
            } catch (error) {
                console.log(data)
                console.log(data[guildId])
                data[guildId] = {
                    ticketsCategory: data[guildId].ticketsCategory,
                    ticketsCreationChannel: data[guildId].ticketsCreationChannel,
                    ticketCount: 0
                }
                fs.writeFileSync('data.json', JSON.stringify(data));
            }

            data[guildId].ticketCount++;
            
            fs.writeFileSync('data.json', JSON.stringify(data));
            
            switch (value) {
                case "resources-help":
                    let createdChannel2;
                    guild.channels.create(`ticket-${data[guildId].ticketCount}`, {
                        type: ChannelType.GuildText,
                        parent: data[guildId].ticketsCategory,
                        permissionOverwrites: [
                            {
                                id: interaction.user.id,
                                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY']
                            },
                            {
                                id: guild.roles.everyone,
                                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY']
                            }
                        ]
                    }).then(channel => {
                        createdChannel2 = channel.id;
                        const embed = new EmbedBuilder()
                            .setTitle("Ticket - Resources Help")
                            .setDescription("Please wait for a staff member to help you!")
                            .setThumbnail(interaction.client.user.avatarURL())
                            .setColor(0xFF0000)
                            .setFooter({
                                text: "Ticket System",
                                iconURL: interaction.client.user.avatarURL()
                            })
                            .setTimestamp(Date.now());
                        channel.send({
                            embeds: [embed]
                        })
                    })

                    interaction.reply({
                        content: `Ticket created! <#${createdChannel2}>`,
                        ephemeral: true
                    })
                    break;
                case "other-help":
                    let createdChannel;
                    guild.channels.create(`ticket-${data[guildId].ticketCount}`, {
                        type: ChannelType.GuildText,
                        parent: data[guildId].ticketsCategory,
                        permissionOverwrites: [
                            {
                                id: interaction.user.id,
                                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY']
                            },
                            {
                                id: guild.roles.everyone,
                                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY']
                            }
                        ]
                    }).then(channel => {
                        createdChannel = channel.id;
                        const embed = new EmbedBuilder()
                            .setTitle("Ticket - Other")
                            .setDescription("Please wait for a staff member to help you!")
                            .setThumbnail(interaction.client.user.avatarURL())
                            .setColor(0xFF0000)
                            .setFooter({
                                text: "Ticket System",
                                iconURL: interaction.client.user.avatarURL()
                            })
                            .setTimestamp(Date.now());
                        channel.send({
                            embeds: [embed]
                        })
                    })

                    interaction.reply({
                        content: `Ticket created! <#${createdChannel}>`,
                        ephemeral: true
                    })
                    break;
            }
        }
    }
}