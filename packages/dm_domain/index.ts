import * as fs from 'fs';
import 'reflect-metadata';

function initCommands() {
	let commands = [];
	const commandFiles = fs.readdirSync('packages/dm_domain/commands').filter((file) => file.endsWith('.ts') && !file.endsWith('Command.ts'));

	for (const file of commandFiles) {
		const commandModule = require(`./commands/${file}`);
		for (const exportedClass in commandModule) {
			const command = commandModule[exportedClass];
			if (Reflect.hasMetadata('Command', command)) {
				commands.push(new command());
			}
		}
	}

	for (const command of commands) {
		mp.events.addCommand(command.name, command.execute);
		console.log(`Loaded command ${command.name}`);
	}
}

function initEvents() {
	let gameEvents = [];
	const gameEventFiles = fs.readdirSync('packages/dm_domain/events').filter((file) => file.endsWith('.ts') && !file.endsWith('GameEvent.ts'));

	for (const file of gameEventFiles) {
		const gameEventModule = require(`./events/${file}`);
		for (const exportedClass in gameEventModule) {
			const gameEvent = gameEventModule[exportedClass];
			if (Reflect.hasMetadata('GameEvent', gameEvent)) {
				gameEvents.push(new gameEvent());
			}
		}
	}

	for (const gameEvent of gameEvents) {
		mp.events.add(gameEvent.name, gameEvent.execute);
		console.log(`Loaded game event ${gameEvent.name}`);
	}
}

initCommands();
initEvents();

require('./db/database');
