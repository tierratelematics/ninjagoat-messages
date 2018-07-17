import * as React from "react";
import { SnackbarOrigin } from "@material-ui/core/Snackbar";

export interface IMessagesConfig {
    timeout: number;
    position: SnackbarOrigin;
    view?: (props, onClose) => React.ReactElement<any>;
}
