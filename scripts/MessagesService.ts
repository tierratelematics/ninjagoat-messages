import {inject, injectable, optional} from "inversify";
import {Observer, Subject, Subscribable, Unsubscribable} from "rxjs";

import DefaultConfig from "./DefaultConfig";
import {IMessageData} from "./interfaces/IMessageData";
import {IMessagesConfig} from "./interfaces/IMessagesConfig";
import IMessagesService from "./interfaces/IMessagesService";
import {MessageType} from "./MessageType";


@injectable()
class MessagesService implements IMessagesService, Subscribable<IMessageData> {
    private subject = new Subject<IMessageData>();

    constructor(@inject("IMessagesConfig") @optional() private config: IMessagesConfig = new DefaultConfig()) {
    }

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

    subscribe(observer: Observer<IMessageData>): Unsubscribable;
    subscribe(onNext?: (value: IMessageData) => void, onError?: (exception: any) => void, onCompleted?: () => void): Unsubscribable;
    subscribe(observerOrOnNext?: (Observer<IMessageData>) | ((value: IMessageData) => void), onError?: (exception: any) => void, onCompleted?: () => void): Unsubscribable {
        if (isObserver(observerOrOnNext))
            return this.subject.subscribe(observerOrOnNext as Observer<IMessageData>);
        else
            return this.subject.subscribe({
                next: observerOrOnNext,
                error: onError,
                complete: onCompleted
            });
    }

    private createMessage(message: string, type: MessageType, timeout?: number) {
        let configData: IMessageData = {
            message: message,
            type: type,
            timeout: timeout,
            position: this.config.position,
            view: this.config.view
        };

        this.subject.next(configData);
    }
}

function isObserver<T>(observerOrOnNext: (Observer<T>) | ((value: T) => void)): observerOrOnNext is Observer<T> {
    return (<Observer<T>>observerOrOnNext).next !== undefined;
}

export default MessagesService;
