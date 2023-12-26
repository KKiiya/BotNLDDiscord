const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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
        const subCommand = interaction.options.getSubcommand()
        const prompt = interaction.options.getString("prompt");

        interaction.reply({content: "Request recieved!", ephemeral: true})

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
                        embed.addFields({
                        name: `Result #${i}`,
                        value: `Title: ${results.items[i].name}, Channel: ${results.items[i].author.name}, Duration: ${results.items[i].formattedDuration}, Source: ${results.items[i].source}, Views: ${results.items[i].views}`,
                        inline: false
                        })
                    }

                    interaction.channel.send({embeds: [embed]})
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
                        embed.addFields({
                        name: `Result #${i}`,
                        value: `Title: ${results.items[i].name}, Channel: ${results.items[i].author.name}, Duration: ${results.items[i].formattedDuration}, Source: ${results.items[i].source}, Views: ${results.items[i].views}`,
                        inline: false
                        })
                    }

                    interaction.channel.send({embeds: [embed]})
                }).catch((err) => {
                    console.log(err);
                });
                break;    
        }
        
    }
}