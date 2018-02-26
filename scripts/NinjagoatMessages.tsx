import DefaultConfig from "./DefaultConfig";
import * as classNames from "classnames";
import { Button, Snackbar } from "material-ui";
import { lazyInject } from "ninjagoat";
import { FormattedMessage } from "ninjagoat-translations";
import * as React from "react";
import * as Rx from "rx";

import { IMessageData } from "./interfaces/IMessageData";
import MessagesService from "./MessagesService";

export interface INinjagoatMessagesState {
    open: boolean;
    message: IMessageData;
}

class NinjagoatMessages extends React.Component<{}, INinjagoatMessagesState> {

    @lazyInject("IMessagesService")
    private messagesService: MessagesService;
    private subscription: Rx.Disposable;

    componentWillMount(): void {
        this.setState({
            open: false,
            message: null
        });

        this.subscription = this.messagesService.subscribe(messageData => {
            this.setState({
                open: true,
                message: messageData
            });
        });
    }

    componentWillUnmount(): void {
        if (this.subscription) this.subscription.dispose();
    }

    render() {
        return <Snackbar className="snackbar"
            open={this.state.open}
            anchorOrigin={this.state.message ? this.state.message.position : new DefaultConfig().position}
            autoHideDuration={this.state.message ? this.state.message.timeout : undefined}
            onClose={() => this.onAlertDismissed()}
            message={<span>{this.state && this.state.message ? this.state.message.message : null}</span>}
            action={[
                <Button key="close"
                    size="small"
                    className={classNames("snackbar__btn-close", this.state.message && this.state.message.type ? `snackbar__btn-close--${this.state.message.type}` : null)}
                    onClick={() => this.onAlertDismissed()}>
                    <FormattedMessage id="glossary.close" defaultMessage="glossary.close" />
                </Button>
            ]} />;
    }

    private onAlertDismissed() {
        this.setState({
            open: false
        });
    }

}

export default NinjagoatMessages;
