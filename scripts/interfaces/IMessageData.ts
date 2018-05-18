import { SnackBarOrigin } from "@material-ui/core/Snackbar";

import { MessageType } from "../MessageType";

export interface IMessageData {
    message: string;
    type: MessageType;
    timeout?: number;
    position?: SnackBarOrigin;
}
