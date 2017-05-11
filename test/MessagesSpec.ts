import "reflect-metadata"
import expect =  require("expect.js");
import MessagesService from "../scripts/MessagesService";
import Rx = require("rx");
import {IMessageData} from "../scripts/interfaces/IMessageData";
import MessageType from "../scripts/MessageType";
import {MockTranslationsManager} from "./fixtures/MockTranslationsManager";
import * as TypeMoq from "typemoq";
import {ITranslationsManager} from "ninjagoat-translations";


describe("Given an alertService", () => {

    let subject: MessagesService;
    let notifications: IMessageData[];
    let mockTranslationsManager: TypeMoq.IMock<ITranslationsManager>;

    beforeEach(() => {
        notifications = [];
        mockTranslationsManager = TypeMoq.Mock.ofType(MockTranslationsManager);
        mockTranslationsManager.setup(manager => manager.translate("Test message")).returns(() => {
            return "A valid translation";
        });

        subject = new MessagesService();
        subject.translationsManager = mockTranslationsManager.object;
        subject.subscribe(alertData => notifications.push(alertData));
    });

    context("when a success message needs to be displayed", () => {
        it("should present a green alert box", () => {
            subject.success("Test message");
            let messageData = notifications[0];
            expect(messageData.type).to.be(MessageType.Success);
            expect(messageData.message).to.be("A valid translation");
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
            subject.failure("Test message");
            let messageData = notifications[0];
            expect(messageData.type).to.be(MessageType.Failure);
            expect(messageData.message).to.be("A valid translation");
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
                let config = notifications[0];
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
                let messageData = {
                    id: (new Date()).getTime(),
                    message: "",
                    headline: "",
                    type: MessageType.Success
                };
                let messages = [];
                messages.push(messageData);
                let newList = subject.deleteMessage(messageData, messages);
                expect(newList[0]).to.be(undefined);
            })
        })
    });
});