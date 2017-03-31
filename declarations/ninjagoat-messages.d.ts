import {interfaces} from "inversify";
import {IObservable, IObserver, IDisposable} from "rx";
import {IModule} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";
import {IViewModelRegistry} from "ninjagoat";
import * as React from "react";

export interface IMessagesService {
    success(message: string, title?: string, timeout?: number);

    failure(message: string, title?: string, timeout?: number);
}

export class NinjagoatMessages extends React.Component<{}, IMessageData[]> {

    render();
}

export class MessagesService implements IMessagesService, IObservable<IMessageData> {

    success(message: string, title?: string, timeout?: number);

    failure(message: string, title?: string, timeout?: number);

    subscribe(observer: IObserver<IMessageData>): IDisposable;
    subscribe(onNext?: (value: IMessageData) => void, onError?: (exception: any) => void, onCompleted?: () => void): IDisposable;
    subscribe(observerOrOnNext?: (IObserver<IMessageData>) | ((value: IMessageData) => void), onError?: (exception: any) => void, onCompleted?: () => void): IDisposable;

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

export default class MessageType {
    public static Success: string;
    public static Failure: string;
}

export interface IMessageData {
    id: number;
    message: string;
    headline: string;
    type: MessageType;
    timeout?: number;
    position?: string;
}