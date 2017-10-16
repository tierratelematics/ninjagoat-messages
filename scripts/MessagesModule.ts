import { interfaces } from "inversify";
import { IModule } from "ninjagoat";
import { IViewModelRegistry } from "ninjagoat";
import { IServiceLocator } from "ninjagoat";

import IMessagesService from "./interfaces/IMessagesService";
import MessagesService from "./MessagesService";

class MessagesModule implements IModule {

    modules = (container: interfaces.Container) => {
        container.bind<IMessagesService>("IMessagesService").to(MessagesService).inSingletonScope();
    }

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void {

    }
}

export default MessagesModule;
