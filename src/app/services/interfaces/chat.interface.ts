import { MessageEntity } from "./message.interface";

export interface Chat{
    _id: string;
    name: string;
    avatar: string;
    message: MessageEntity
}

export interface ChatDTO{
    name: string;
    avatar: string;
    users?: Array<string>; 
}

export interface AddUsersToChatDTO{
   chat:string;
    users: Array<string>; 
}