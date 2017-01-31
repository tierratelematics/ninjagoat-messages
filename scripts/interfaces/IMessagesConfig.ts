export interface IMessagesConfig {
    timeout: number;
    position: string;
}

export class MessagePosition {
    public static topLeft: string = "top-left";
    public static topRight: string = "top-right";
    public static bottomLeft: string = "bottom-left";
    public static bottomRight: string = "bottom-right";
}