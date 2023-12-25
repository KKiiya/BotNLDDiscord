const { loadButtons } = require("../../Handlers/buttonHandler");
const { loadCommands } = require("../../Handlers/commandHandler");
module.exports = {
    name: 'ready',
    onde: true,
    async execute(client) { 
        await loadCommands(client);
        await loadButtons(client);


        console.log("The Client is now ready.");
    }
}