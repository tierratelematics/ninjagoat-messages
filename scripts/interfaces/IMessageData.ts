export interface IMessageData {
    id: number;
    message: string;
    headline: string;
    type: MessageType;
    timeout?: number;
    position?: string;
}

export class MessageType {
    public static success: string = "success";
    public static failure: string = "danger";
}