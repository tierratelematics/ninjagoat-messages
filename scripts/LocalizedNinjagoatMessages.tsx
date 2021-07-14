import DefaultConfig from "./DefaultConfig";
import classNames from "classnames";
import { lazyInject } from "ninjagoat";
const FormattedMessage = require("ninjagoat-translations").FormattedMessage;
import * as React from "react";
import {Unsubscribable} from "rxjs";

import { IMessageData } from "./interfaces/IMessageData";
import MessagesService from "./MessagesService";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";


export interface INinjagoatMessagesState {
    open: boolean;
    message: IMessageData;
}

class LocalizedNinjagoatMessages extends React.Component<{}, INinjagoatMessagesState> {

    @lazyInject("IMessagesService")
    private messagesService: MessagesService;

    private subscription: Unsubscribable;

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
        if (this.subscription) this.subscription.unsubscribe();
    }

    render() {
        return this.state.message && this.state.message.view
            ? this.state.message.view(this.state, this.onAlertDismissed.bind(this))
            : (<Snackbar className="snackbar"
                         open={this.state.open}
                         anchorOrigin={this.state.message ? this.state.message.position : new DefaultConfig().position}
                         autoHideDuration={this.state.message ? this.state.message.timeout : undefined}
                         onClose={(evt, reason) => this.onAlertDismissed(evt, reason)}
                         message={<span>{this.state && this.state.message ? this.state.message.message : null}</span>}
                         action={[
                             <Button key="close"
                                     size="small"
                                     className={classNames("snackbar__btn-close", this.state.message && this.state.message.type ? `snackbar__btn-close--${this.state.message.type}` : null)}
                                     onClick={() => this.onAlertDismissed(null, null)}>
                                     <FormattedMessage id="glossary.close" defaultMessage="glossary.close"/>
                             </Button>
                         ]}/>
            );
    }

    private onAlertDismissed(evt, reason) {
        if (reason === "clickaway") return;
        this.setState({
            open: false
        });
    }
}

export default LocalizedNinjagoatMessages;
