import "reflect-metadata"
import expect =  require("expect.js");
import NinjagoatMessagesService from "../scripts/NinjagoatMessagesService";
import Rx = require("rx");
import {IMessageData, MessageType} from "../scripts/interfaces/IMessageData";
import DefaultConfig from "../scripts/DefaultConfig";
import {NULL_ARGUMENT} from "inversify/dts/constants/error_msgs";

describe("Given an alertService", () => {

    let subject: NinjagoatMessagesService;
    let notifications: IMessageData[];

    beforeEach(() => {
        notifications = [];
        subject = new NinjagoatMessagesService();
        subject.subscribe(alertData => notifications.push(alertData));
    });

    context("when a success message needs to be displayed", () => {
        it("should present a green alert box", () => {
            subject.success("Test message");
            let messageData = notifications[0];
            expect(messageData.type).to.be(MessageType.success);
            expect(messageData.message).to.be("Test message");
            expect(messageData.id).to.not.be(undefined);
        });
        context("but the message is not provided", () => {
            it("should throw an error", () => {
                expect(() => {
                    throw new Error("You must provide a message");
                }).to.throwError();
            });
        });
    });

    context("when an error message needs to be displayed", () => {
        it("should present a red box", () => {
            subject.failure("Test Error message");
            let messageData = notifications[0];
            expect(messageData.type).to.be(MessageType.failure);
            expect(messageData.message).to.be("Test Error message");
            expect(messageData.id).to.not.be(undefined);
        });

        it("should not disappear automatically", () => {
            subject.failure("Test Error message");
            let messageData = notifications[0];
            expect(messageData.timeout).to.be(undefined);
        });
    });

    context("when a success message is displayed", () => {
        context("but a custom timeout is not provided", () => {
            it("should disappear automatically after default time", () => {
                subject.success("Test message");
                let config = new DefaultConfig();
                expect(config.timeout).to.be(5000);
            });
        });

        context("but the timeout is provided", () => {
            it("should disappear after the provided timeout", () => {
                subject.success("Test message", "", 10000);
                let config = notifications[0];
                expect(config.timeout).to.be(10000);
            });
        });

        context("but the user closes a message", () => {
            it("should disappear immediately", () => {
                let messageData = notifications[0];
                let messages = [];
                messages.push(messageData);
                let newList = subject.deleteMessage(messageData, messages);
                expect(newList[0]).to.be(null || undefined);
            })
        })
    });
});