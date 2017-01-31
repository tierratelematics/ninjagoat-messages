import {IModule} from "ninjagoat";
import {interfaces} from "inversify";
import IMessagesService from "./interfaces/IMessagesService";
import NinjagoatMessagesService from "./NinjagoatMessagesService";
import {IViewModelRegistry} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";

class MessagesModule implements IModule {

    modules = (container: interfaces.Container) => {
        container.bind<IMessagesService>("IMessagesService").to(NinjagoatMessagesService).inSingletonScope();
    };

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void {

    }
}

export default MessagesModule;