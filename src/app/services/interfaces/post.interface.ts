import { FileResAndBuffer, FileResource } from "./file-resource.interface";
import { Group } from "./group.interface";
import { User } from "./user.interface";

export interface Post {
    text: string;

    date: Date;
  
    files: Array<FileResAndBuffer>;

    user: User | string;
  
    group: Group | string;
}

export interface PostDTO{
    text: string;

    files?: Array<File>;

    group: string;
}