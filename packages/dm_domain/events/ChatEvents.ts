export class PlayerChatGameEvent extends GameEvent {
    name = "playerChat";

    execute(player: any, message: string) {
        mp.players.broadcast(`${player.name}: ${message}`);
    }
}