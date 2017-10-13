interface IMessagesService {
    success(message: string, timeout?: number);
    failure(message: string, timeout?: number);
}

export default IMessagesService;
