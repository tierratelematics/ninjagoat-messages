import {IMessageData} from "../scripts/interfaces/IMessageData";
import IObservable = Rx.IObservable;
import {interfaces} from "inversify";
import {IModule} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";
import {IViewModelRegistry} from "ninjagoat";
import * as React from "react";
import MessageType from "../scripts/MessageType";

export interface IMessagesService {
    success(message: string, title?: string, timeout?: number);

    failure(message: string, title?: string, timeout?: number);
}

export class NinjagoatMessages extends React.Component<{messagesService: MessagesService}, IMessageData[]> {

    render();
}

export class MessagesService implements IMessagesService, IObservable<IMessageData> {

    success(message: string, title?: string, timeout?: number);

    failure(message: string, title?: string, timeout?: number);

    subscribe(observer: Rx.IObserver<IMessageData>): Rx.IDisposable;
    subscribe(onNext?: (value: IMessageData) => void, onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable;
    subscribe(observerOrOnNext?: (Rx.IObserver<IMessageData>) | ((value: IMessageData) => void), onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable;

    deleteMessage(message:IMessageData, messagesList: IMessageData[]): IMessageData[];
}

export class MessagesModule implements IModule {

    modules: (container: interfaces.Container) => void;

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void;
}

export interface IMessagesConfig {
    timeout: number;
    position: string;
}

export class MessagePosition {
    public static TopLeft: string;
    public static TopRight: string;
    public static BottomLeft: string;
    public static BottomRight: string;
}

export interface IMessageData {
    id: number;
    message: string;
    headline: string;
    type: MessageType;
    timeout?: number;
    position?: string;
}