import {MessagePosition, IMessagesConfig} from "./interfaces/IMessagesConfig";

class DefaultConfig implements IMessagesConfig {
    timeout = 5000;
    position = MessagePosition.topRight;
}

export default DefaultConfig

