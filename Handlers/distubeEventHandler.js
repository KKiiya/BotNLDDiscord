async function loadDistubeEvents(client) {
    const { loadFiles } = require("../Functions/fileLoader");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("DisTube Events", "Status");

    const Files = await loadFiles("DisTubeEvents");

    Files.forEach((file) => {
        const event = require(file);

        const execute = (...args) => event.execute(...args, client);

        if (event.rest) {
            if(event.once) client.distube.once(event.name, execute);
            else
            client.distube.on(event.name, execute);
        } else {
            if(event.once) client.distube.once(event.name, execute);
            else
            client.distube.on(event.name, execute);
        }

        table.addRow(event.name, "ON")
    })

    return console.log(table.toString(), "\nLoaded distube events")
}

module.exports = { loadDistubeEvents }