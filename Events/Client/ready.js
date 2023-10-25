const { loadCommands } = require("../../Handlers/commandHandler");
module.exports = {
    name: 'ready',
    onde: true,
    execute(client) {
        console.log("The Client is now ready.");
        
        loadCommands(client);
    }
}