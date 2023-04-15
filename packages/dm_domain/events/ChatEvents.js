"use strict";
class PlayerChatGameEvent extends GameEvent {
    constructor() {
        super(...arguments);
        this.name = "playerChat";
    }
    execute(player, message) {
        mp.players.broadcast(`${player.name}: ${message}`);
    }
}
