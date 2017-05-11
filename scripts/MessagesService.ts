import IMessagesService from "./interfaces/IMessagesService";
import {optional, inject} from "inversify";
import {IMessagesConfig} from "./interfaces/IMessagesConfig";
import DefaultConfig from "./DefaultConfig";
import * as Rx from "rx";
import {IMessageData} from "./interfaces/IMessageData";
import {injectable} from "inversify";
import MessageType from "./MessageType";
import {lazyInject} from "ninjagoat";
import {TranslationsManager} from "ninjagoat-translations";

@injectable()
class MessagesService implements IMessagesService, Rx.IObservable<IMessageData> {

    @lazyInject("ITranslationsManager");
    private translationsManager: TranslationsManager;
    private subject = new Rx.Subject<IMessageData>();

    constructor(@inject("IAlertConfig") @optional() private config: IMessagesConfig = new DefaultConfig()) {

    }

    success(message: string, title?: string, timeout?: number) {
        this.createMessage(message, MessageType.Success, title, timeout);
    }

    failure(message: string, title?: string, timeout?: number) {
        this.createMessage(message, MessageType.Failure, title, undefined);
    }

    private createMessage(message: string, type: MessageType, title?: string, timeout?: number) {
        let timeoutValue = timeout ? timeout : this.config.timeout;

        let configData = {
            id: (new Date()).getTime(),
            message: (this.translationsManager) ? this.translationsManager.translate(message) : message,
            headline: title,
            type: type,
            timeout: type === MessageType.Success ? timeoutValue : undefined,
            position: this.config.position
        };
        this.subject.onNext(configData);
    }

    subscribe(observer: Rx.IObserver<IMessageData>): Rx.IDisposable;
    subscribe(onNext?:(value:IMessageData) => void, onError?:(exception:any) => void, onCompleted?:() => void):Rx.IDisposable;
    subscribe(observerOrOnNext?:(Rx.IObserver<IMessageData>) | ((value:IMessageData) => void), onError?:(exception:any) => void, onCompleted?:() => void):Rx.IDisposable {
        if (isObserver(observerOrOnNext))
            return this.subject.subscribe(observerOrOnNext);
        else
            return this.subject.subscribe(observerOrOnNext, onError, onCompleted);
    }

    deleteMessage(message:IMessageData, messagesList: IMessageData[]): IMessageData[] {
        const idx = messagesList.indexOf(message);
        if (idx >= 0) {
            return [...messagesList.slice(0, idx), ...messagesList.slice(idx + 1)];
        }
        return messagesList;
    }
}

function isObserver<T>(observerOrOnNext:(Rx.IObserver<T>) | ((value:T) => void)):observerOrOnNext is Rx.IObserver<T> {
    return (<Rx.IObserver<T>>observerOrOnNext).onNext !== undefined;
}

export default MessagesService;