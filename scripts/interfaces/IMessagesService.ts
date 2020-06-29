interface IMessagesService {
    success(message: string, timeout?: number);
    failure(message: string, timeout?: number);
    info(message: string, timeout?: number);
    warning(message: string, timeout?: number);
}

export default IMessagesService;
