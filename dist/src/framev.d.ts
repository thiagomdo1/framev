interface Settings {
    origin: string;
}
declare class Framev {
    private readonly prefix;
    private settings;
    private subscriptions;
    constructor(settings?: Settings);
    emit(event: string, payload?: any, onlyChildren?: boolean): void;
    on(event: string, callback?: Function): void;
    off(event: string, callback?: Function): void;
}
export { Framev, Settings };
