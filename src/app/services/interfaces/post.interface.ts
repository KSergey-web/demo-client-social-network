import { Group } from "./group.interface";
import { User } from "./user.interface";

export interface Post {
    text: string;

    date: Date;
  
    image?: string;

    user: User | string;
  
    group: Group | string;
}

export interface PostDTO{
    text: string;

    image?: string;

    group: string;
}