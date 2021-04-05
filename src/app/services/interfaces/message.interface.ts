import { Chat } from "./chat.interface";
import { User } from "./user.interface";

export interface MessageDTO{
    text:string;

    chat:string;

}

export interface MessageEntity{
    _id?: string;

    text: string;
  
    date: Date;
  
    editing?: boolean;
  
    chat: string;
  
    user: User;
}