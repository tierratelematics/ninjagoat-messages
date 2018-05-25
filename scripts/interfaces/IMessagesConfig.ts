import * as React from "react";
import { SnackBarOrigin } from "@material-ui/core/Snackbar";

export interface IMessagesConfig {
    timeout: number;
    position: SnackBarOrigin;
    view?: (props, onClose) => React.ReactElement<any>;
}
