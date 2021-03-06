import { SnackbarOrigin } from "@material-ui/core/Snackbar";

import { IMessagesConfig } from "./interfaces/IMessagesConfig";

class DefaultConfig implements IMessagesConfig {
    timeout = 5000;
    position: SnackbarOrigin = {
        vertical: "bottom",
        horizontal: "center"
    };
}

export default DefaultConfig;
