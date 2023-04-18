import * as fs from 'fs';

function initEvents() {
    let gameEvents = [];
    mp.console.logInfo('Loading game events...');
    mp.console.logInfo(fs.readdirSync('./').join(', '));
    const gameEventFiles = fs
        .readdirSync('./client_packages/dm_domain/events', { withFileTypes: true })
        .filter((file) => file.name.endsWith('.js'));
    for (const file of gameEventFiles) {
        const gameEventModule = require(`./events/${file.name}`);
        for (const exportedClass in gameEventModule) {
            const gameEvent = gameEventModule[exportedClass];
            gameEvents.push(gameEvent);
        }
    }

    for (const gameEvent of gameEvents) {
        mp.events.add(gameEvent.name, gameEvent.execute);
        mp.console.logInfo(`Loaded game event ${gameEvent.name}`);
    }
}

initEvents();
