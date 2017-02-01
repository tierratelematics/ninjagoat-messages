interface IMessagesService {
    success(message:string, title?:string, timeout?:number);
    failure(message:string, title?:string, timeout?:number);
}

export default IMessagesService