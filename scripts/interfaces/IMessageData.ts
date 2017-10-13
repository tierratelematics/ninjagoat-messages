import MessageType from "../MessageType";

export interface IMessageData {
    id: number;
    message: string;
    headline: string;
    type: MessageType;
    timeout?: number;
    position?: string;
}
