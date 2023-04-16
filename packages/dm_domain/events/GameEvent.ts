export interface GameEvent {
    name: string;
    execute(...args: any[]): void;
}
