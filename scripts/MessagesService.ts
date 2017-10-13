import { inject, optional } from "inversify";
import { injectable } from "inversify";
import { ITranslationsManager } from "ninjagoat-translations";
import * as Rx from "rx";

import DefaultConfig from "./DefaultConfig";
import { IMessageData } from "./interfaces/IMessageData";
import { IMessagesConfig } from "./interfaces/IMessagesConfig";
import IMessagesService from "./interfaces/IMessagesService";
import MessageType from "./MessageType";

@injectable()
class MessagesService implements IMessagesService, Rx.IObservable<IMessageData> {
    private subject = new Rx.Subject<IMessageData>();

    constructor( @inject("ITranslationsManager") @optional() private translationsManager: ITranslationsManager,
        @inject("IAlertConfig") @optional() private config: IMessagesConfig = new DefaultConfig()) {

    }

    success(message: string, title?: string, timeout?: number) {
        this.createMessage(message, MessageType.Success, title, timeout);
    }

    failure(message: string, title?: string, timeout?: number) {
        this.createMessage(message, MessageType.Failure, title, undefined);
    }

    subscribe(observer: Rx.IObserver<IMessageData>): Rx.IDisposable;
    subscribe(onNext?: (value: IMessageData) => void, onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable;
    subscribe(observerOrOnNext?: (Rx.IObserver<IMessageData>) | ((value: IMessageData) => void), onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable {
        if (isObserver(observerOrOnNext))
            return this.subject.subscribe(observerOrOnNext);
        else
            return this.subject.subscribe(observerOrOnNext, onError, onCompleted);
    }

    deleteMessage(message: IMessageData, messagesList: IMessageData[]): IMessageData[] {
        const idx = messagesList.indexOf(message);
        if (idx >= 0) {
            return [...messagesList.slice(0, idx), ...messagesList.slice(idx + 1)];
        }
        return messagesList;
    }

    private createMessage(message: string, type: MessageType, title?: string, timeout?: number) {
        let timeoutValue = timeout ? timeout : this.config.timeout;

        let configData = {
            id: (new Date()).getTime(),
            message: this.translationsManager ? this.translationsManager.translate(message) : message,
            headline: this.translationsManager ? this.translationsManager.translate(title) : title,
            type: type,
            timeout: type === MessageType.Success ? timeoutValue : undefined,
            position: this.config.position
        };
        this.subject.onNext(configData);
    }
}

function isObserver<T>(observerOrOnNext: (Rx.IObserver<T>) | ((value: T) => void)): observerOrOnNext is Rx.IObserver<T> {
    return (<Rx.IObserver<T>>observerOrOnNext).onNext !== undefined;
}

export default MessagesService;
