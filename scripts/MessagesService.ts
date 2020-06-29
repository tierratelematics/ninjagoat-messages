import { inject, optional } from "inversify";
import { injectable } from "inversify";
import * as Rx from "rx";

import DefaultConfig from "./DefaultConfig";
import { IMessageData } from "./interfaces/IMessageData";
import { IMessagesConfig } from "./interfaces/IMessagesConfig";
import IMessagesService from "./interfaces/IMessagesService";
import { MessageType } from "./MessageType";

@injectable()
class MessagesService implements IMessagesService, Rx.IObservable<IMessageData> {
    private subject = new Rx.Subject<IMessageData>();

    constructor( @inject("IMessagesConfig") @optional() private config: IMessagesConfig = new DefaultConfig()) { }

    success(message: string, timeout?: number) {
        this.createMessage(message, "success", timeout || this.config.timeout);
    }

    info(message: string, timeout?: number) {
        this.createMessage(message, "info", timeout || this.config.timeout);
    }

    failure(message: string, timeout?: number) {
        this.createMessage(message, "error", undefined);
    }

    warning(message: string, timeout?: number) {
        this.createMessage(message, "warning", timeout || this.config.timeout);
    }

    subscribe(observer: Rx.IObserver<IMessageData>): Rx.IDisposable;
    subscribe(onNext?: (value: IMessageData) => void, onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable;
    subscribe(observerOrOnNext?: (Rx.IObserver<IMessageData>) | ((value: IMessageData) => void), onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable {
        if (isObserver(observerOrOnNext))
            return this.subject.subscribe(observerOrOnNext);
        else
            return this.subject.subscribe(observerOrOnNext, onError, onCompleted);
    }

    private createMessage(message: string, type: MessageType, timeout?: number) {
        let configData: IMessageData = {
            message: message,
            type: type,
            timeout: timeout,
            position: this.config.position,
            view: this.config.view
        };

        this.subject.onNext(configData);
    }
}

function isObserver<T>(observerOrOnNext: (Rx.IObserver<T>) | ((value: T) => void)): observerOrOnNext is Rx.IObserver<T> {
    return (<Rx.IObserver<T>>observerOrOnNext).onNext !== undefined;
}

export default MessagesService;
