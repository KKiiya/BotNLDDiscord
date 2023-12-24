const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const client = require("../../../index");
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
                distube.search(prompt, {
                    type: SearchResultType.VIDEO,
                    safeSearch: false
                });
                break;
            case "playlist":
                distube.search(prompt, {
                    type: SearchResultType.PLAYLIST,
                    safeSearch: false
                });
                break;    
        }
        
    }
}