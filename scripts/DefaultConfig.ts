import { SnackBarOrigin } from "material-ui/Snackbar";

import { IMessagesConfig } from "./interfaces/IMessagesConfig";

class DefaultConfig implements IMessagesConfig {
    timeout = 5000;
    position: SnackBarOrigin = {
        vertical: "bottom",
        horizontal: "center"
    };
}

export default DefaultConfig;
