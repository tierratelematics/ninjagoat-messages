import { SnackBarOrigin } from "@material-ui/core/Snackbar";

import { MessageType } from "../MessageType";
import * as React from "react";

export interface IMessageData {
    message: string;
    type: MessageType;
    timeout?: number;
    position?: SnackBarOrigin;
    view?: (props, onClose) => React.ReactElement<any>;
}
