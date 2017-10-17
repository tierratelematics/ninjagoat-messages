import { Origin } from "material-ui/Snackbar";

import { MessageType } from "../MessageType";

export interface IMessageData {
    message: string;
    type: MessageType;
    timeout?: number;
    position?: Origin;
}
