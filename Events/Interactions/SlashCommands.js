const { ChatInputCommandInteraction, userMention } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /** 
     * 
     * @param {ChatInputCommandInteraction} interaction
    */
    execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) 
            return interaction.reply({
                content: "This command is outdated.",
                ephemeral: true
            });

            command.execute(interaction, client);

        } else if (interaction.isButton()) {
            const buttons = client.buttons;
            const button = buttons.get(interaction.customId)

            if(!button) 

            return interaction.reply({
                content: "This button is outdated.",
                ephemeral: true
            });
            button.execute(interaction, client)
        } else {
            return;
        }
    }
}   