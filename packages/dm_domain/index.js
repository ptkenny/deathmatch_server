"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
require("reflect-metadata");
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
