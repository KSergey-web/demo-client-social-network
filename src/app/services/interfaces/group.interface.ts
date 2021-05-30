import { Organization } from "./organization.interface";
import { User } from "./user.interface";

export interface Group{
    _id:string;

    name: string;

    description: string;
  
    avatar: string;
  
    isOpen: Boolean;

    avatarBuffer?: string;

    organization: Organization | string;
}

export interface GroupDTO{
    name: string;

    description: string;
  
    avatar?: File | null;
  
    isOpen: Boolean;

    organization: string;
}

export interface GroupUserLink{
    roleUser: string;

    group: Group | string;
  
    user: User| string;
}