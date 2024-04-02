export enum MessageSender {
    User,
    AI
}

export interface Message
{
    sender: MessageSender,
    content: string | undefined
}