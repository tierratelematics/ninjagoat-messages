import DefaultConfig from "./DefaultConfig";
import * as classNames from "classnames";
import { lazyInject } from "ninjagoat";
const tryRequire = require("try-require");
const translations = tryRequire("ninjagoat-translations");
const FormattedMessage = translations ? translations.FormattedMessage: null;
import * as React from "react";
import * as Rx from "rx";

import { IMessageData } from "./interfaces/IMessageData";
import MessagesService from "./MessagesService";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";

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
                    {FormattedMessage ? <FormattedMessage id="glossary.close" defaultMessage="glossary.close" /> : <span>Close</span>}
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
