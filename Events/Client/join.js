const { Client } = require("discord.js");
const { loadEvents } = require("../../Handlers/eventHandler");
module.exports = {
    name: 'join',
    onde: true,
    execute(guildMemberAdd) {
        Client.api.MessageEvent();

        loadEvents(guildMemberAdd);
    }
}