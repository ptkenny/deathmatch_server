import * as fs from "fs";
import path from "path";
import "reflect-metadata";

function initCommands() {
    let commands = [];
    const commandFiles = fs
        .readdirSync("packages/dm_domain/commands")
        .filter((file) => file.endsWith(".ts") && !file.endsWith("Command.ts"));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`).default;
        if (Reflect.hasMetadata("Command", command)) {
            commands.push(new command());
        }
    }
    for (const command of commands) {
        mp.events.addCommand(command.name, command.execute);
    }
}

function initEvents() {
    let gameEvents = [];
    const gameEventFiles = fs
        .readdirSync("packages/dm_domain/events")
        .filter((file) => file.endsWith(".ts") && !file.endsWith("GameEvent.ts"));
    for (const file of gameEventFiles) {
        const gameEvent = require(`./events/${file}`).default;
        if (Reflect.hasMetadata("GameEvent", gameEvent)) {
            gameEvents.push(new gameEvent());
        }
    }
    for (const gameEvent of gameEvents) {
        mp.events.add(gameEvent.name, gameEvent.execute);
    }
}

initCommands();
initEvents();
