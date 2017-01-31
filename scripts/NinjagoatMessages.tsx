import * as React from "react";
import {AlertList} from "react-bs-notifier";
import NinjagoatMessagesService from "./NinjagoatMessagesService";
import * as Rx from "rx";
import {IMessageData} from "./interfaces/IMessageData";

class NinjagoatMessages extends React.Component<{messagesService: NinjagoatMessagesService}, IMessageData[]> {
    private subscription: Rx.Disposable;
    private messages: IMessageData[] = [];

    render() {
        return <AlertList alerts={this.messages}
                          onDismiss={this.onAlertDismissed.bind(this)}/>;
    }

    onAlertDismissed(alert) {
        this.messages = this.props.messagesService.deleteMessage(alert, this.messages);
        this.setState(this.messages);
    }

    componentWillMount():void {
        this.subscription = this.props.messagesService.subscribe(messageData => {
            console.log(messageData);
            this.messages.push(messageData);
            this.setState(this.messages);
        });
    }

    componentWillUnmount():void {
        if (this.subscription) this.subscription.dispose();
        this.props.messagesService.dispose();
    }

}

export default NinjagoatMessages