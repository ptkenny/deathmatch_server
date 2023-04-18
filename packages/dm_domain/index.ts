import * as fs from "fs";

function initCommands() {
    let commands = [];
    const commandFiles = fs
        .readdirSync("./packages/dm_domain/commands", { withFileTypes: true })
        .filter((file) => file.name.endsWith(".js"));

    for (const file of commandFiles) {
        const commandModule = require(`./commands/${file.name}`);
        for (const exportedClass in commandModule) {
            const command = commandModule[exportedClass];
            commands.push(command);
        }
    }

    for (const command of commands) {
        mp.events.addCommand(command.name, command.execute);
        console.log(`Loaded command ${command.name}`);
    }
}

function initEvents() {
    let gameEvents = [];
    const gameEventFiles = fs
        .readdirSync("./packages/dm_domain/events", { withFileTypes: true })
        .filter((file) => file.name.endsWith(".js"));
    for (const file of gameEventFiles) {
        const gameEventModule = require(`./events/${file.name}`);
        for (const exportedClass in gameEventModule) {
            const gameEvent = gameEventModule[exportedClass];
            gameEvents.push(gameEvent);
        }
    }

    for (const gameEvent of gameEvents) {
        mp.events.add(gameEvent.name, gameEvent.execute);
        console.log(`Loaded game event ${gameEvent.name}`);
    }
}

initCommands();
initEvents();

require("./db/database");
