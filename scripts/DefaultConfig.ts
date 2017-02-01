import {IMessagesConfig} from "./interfaces/IMessagesConfig";
import MessagePosition from "./MessagePosition";

class DefaultConfig implements IMessagesConfig {
    timeout = 5000;
    position = MessagePosition.TopRight;
}

export default DefaultConfig

