const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const client = require("../../../index");
const ytsr = require("@distube/ytsr");
const { SearchResultType } = require('distube');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("Search songs by the title of the songs.")
    .addSubcommand((options) => options
        .addStringOption(option => option
            .setName("prompt")
            .setDescription("Title of the video you want to search")
            .setRequired(true))
        .setName("video")
        .setDescription("Search videos"))
    .addSubcommand((options) => options
        .addStringOption(option => option
            .setName("prompt")
            .setDescription("Title of the playlist you want to search")
            .setRequired(true))
        .setName("playlist")
        .setDescription("Search playlists")),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
        const distube = client.distube;
        const queue = distube.getQueue(interaction.guild);
        const subCommand = interaction.options.getSubcommand()
        const prompt = interaction.options.getString("prompt");

        interaction.fetchReply();

        switch (subCommand) {
            case "video":
                ytsr(prompt, {
                    type: SearchResultType.VIDEO,
                    safeSearch: false
                }).then((results) => {
                    if (results.items.length <= 0) {
                        const embed = new EmbedBuilder();
                        embed.setTitle("Search Result")
                        embed.setDescription(`Search result for **${results.query}**`)
                        embed.setThumbnail(interaction.client.user.avatarURL())
                        embed.setAuthor({
                            name: `Search Done by ${interaction.author.displayName}`,
                            url: interaction.user.avatarURL(),
                            iconURL: interaction.user.avatarURL()
                        })
                        embed.setTimestamp(Date.now())
                        embed.setColor(0xFF0000)
                        embed.addFields({
                            name: `Result #0`,
                            value: `No results found!`,
                            inline: false
                        })
                        return;
                    }
                    const embed = new EmbedBuilder();
                    embed.setTitle("Search Result")
                    embed.setDescription(`Search result for **${results.query}**`)
                    embed.setThumbnail(interaction.client.user.avatarURL())
                    embed.setAuthor({
                        name: `Search Done by ${interaction.user.displayName}`,
                        url: interaction.user.avatarURL(),
                        iconURL: interaction.user.avatarURL()
                    })
                    embed.setTimestamp(Date.now())
                    embed.setColor(0x00FF00)

                    for (i = 0; i < 10; i++) {
                        if (results.items[i] === undefined) continue;
                        embed.addFields({
                            name: `Result #${i+1}`,
                            value: `:globe_with_meridians: **URL:** ${results.items[i].url}\n:white_circle: **Title:** ${results.items[i].name}\n:red_square: **Channel:** ${results.items[i].author.name}\n:clock11: **Duration:** ${results.items[i].duration}\n:eye: **Views:** ${results.items[i].views}\n:calendar_spiral: **Upload Date:** ${results.items[i].uploadedAt}`,
                            inline: false
                        })
                    }

                    const select = new StringSelectMenuBuilder()
                        .setCustomId('search')
                        .setPlaceholder('Select the song you want to play!');
                    
                    for (i = 0; i < 10; i++) {
                        if (results.items[i] === undefined) continue;

                        const option = new StringSelectMenuOptionBuilder();

                        option.setLabel(`${results.items[i].name}`)
                        option.setDescription(`Result #${i+1}`)
                        option.setValue(`${results.items[i].url}`)

                        select.addOptions(option)
                    }

                    interaction.reply({embeds: [embed], components: [select]})
                }).catch((err) => {
                    console.log(err);
                });
                break;
            case "playlist":
                ytsr(prompt, {
                    type: SearchResultType.PLAYLIST,
                    safeSearch: false
                }).then((results) => {
                    if (results.items.length <= 0) {
                        const embed = new EmbedBuilder();
                        embed.setTitle("Search Result")
                        embed.setDescription(`Search result for **${results.query}**`)
                        embed.setThumbnail(interaction.client.user.avatarURL())
                        embed.setAuthor({
                            name: `Search Done by ${interaction.user.displayName}`,
                            url: interaction.user.avatarURL(),
                            iconURL: interaction.user.avatarURL()
                        })
                        embed.setTimestamp(Date.now())
                        embed.setColor(0xFF0000)
                        embed.addFields({
                            name: `Result #0`,
                            value: `No results found!`,
                            inline: false
                        })
                        return;
                    }

                    const embed = new EmbedBuilder();
                    embed.setTitle("Search Result")
                    embed.setDescription(`Search result for **${results.query}**`)
                    embed.setThumbnail(interaction.client.user.avatarURL())
                    embed.setAuthor({
                        name: `Search Done by ${interaction.user.displayName}`,
                        url: interaction.user.avatarURL(),
                        iconURL: interaction.user.avatarURL()
                    })
                    embed.setTimestamp(Date.now())
                    embed.setColor(0x00FF00)

                    for (i = 0; i < 10; i++) {
                        if (results.items[i] === undefined) continue;
                        embed.addFields({
                            name: `Result #${i+1}`,
                            value: `:globe_with_meridians: **URL:** ${results.items[i].url}\n:white_circle: **Title:** ${results.items[i].name}\n:red_square: **Channel:** ${results.items[i].author.name}\n:clock11: **Duration:** ${results.items[i].duration}\n:eye: **Views:** ${results.items[i].views}\n:calendar_spiral: **Upload Date:** ${results.items[i].uploadedAt}`,
                            inline: false
                        })
                    }

                    const select = new StringSelectMenuBuilder()
                        .setCustomId('search')
                        .setPlaceholder('Select the song you want to play!');
                    
                    for (i = 0; i < 10; i++) {
                        if (results.items[i] === undefined) continue;

                        const option = new StringSelectMenuOptionBuilder();

                        option.setLabel(`${results.items[i].name}`)
                        option.setDescription(`Result #${i+1}`)
                        option.setValue(`${results.items[i].url}`)

                        select.addOptions(option)
                    }

                    interaction.reply({embeds: [embed], components: [select]})
                }).catch((err) => {
                    console.log(err);
                });
                break;    
        }
        
    }
}