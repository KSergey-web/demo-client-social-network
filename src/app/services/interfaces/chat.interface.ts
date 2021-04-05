export interface Chat{
    _id: string;
    name: string;
    avatar: string;
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