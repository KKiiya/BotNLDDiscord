async function loadButtons(client) {
    const { loadFiles } = require("../Functions/fileLoader");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Buttons", "Status");

    await client.buttons.clear();

    const Files = await loadFiles("Buttons");

    Files.forEach((file) => {
        const button = require(file);
        client.buttons.set(button.data.name, button);

        table.addRow(button.data.name, "ON");
    });

    return console.log(table.toString(), "\nButtons Loaded.")
}

module.exports = { loadButtons };