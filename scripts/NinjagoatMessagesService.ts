import IMessagesService from "./interfaces/IMessagesService";
import {optional, inject} from "inversify";
import {IMessagesConfig} from "./interfaces/IMessagesConfig";
import DefaultConfig from "./DefaultConfig";
import * as Rx from "rx";
import {assign} from "lodash";
import {IMessageData, MessageType} from "./interfaces/IMessageData";
import {injectable} from "inversify";

@injectable()
class NinjagoatMessagesService implements IMessagesService, Rx.IObservable<IMessageData>, Rx.Disposable {

    private subject = new Rx.Subject<IMessageData>();
    private subscription: Rx.CompositeDisposable = new Rx.CompositeDisposable();

    constructor(@inject("IAlertConfig") @optional() private config: IMessagesConfig = new DefaultConfig()) {

    }

    success(message: string, title?: string, timeout?: number) {
        this.addAlertMessage(message, MessageType.success, title, timeout);
    }

    failure(message: string, title?: string, timeout?: number) {
        this.addAlertMessage(message, MessageType.failure, title, undefined);
    }

    private addAlertMessage(message: string, type: MessageType, title?: string, timeout?: number) {
        let messageData = {
            id: (new Date()).getTime(),
            message: message,
            headline: title,
            type: type,
            timeout: timeout,
        }

        let configData = assign({}, this.config, messageData);
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

    dispose(): void {
        this.subscription.dispose();
        this.subscription = new Rx.CompositeDisposable();
    }

    deleteMessage(message:IMessageData, fromList: IMessageData[]): IMessageData[] {
        const displayedMessages = fromList;
        const idx = displayedMessages.indexOf(message);
        if (idx >= 0) {
            return [...displayedMessages.slice(0, idx), ...displayedMessages.slice(idx + 1)];
        }
        return displayedMessages;
    }
}

function isObserver<T>(observerOrOnNext:(Rx.IObserver<T>) | ((value:T) => void)):observerOrOnNext is Rx.IObserver<T> {
    return (<Rx.IObserver<T>>observerOrOnNext).onNext !== undefined;
}

export default NinjagoatMessagesService;