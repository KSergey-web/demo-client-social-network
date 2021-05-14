import { Organization } from "./organization.interface";

export interface Group{
    _id:string;

    name: string;

    description: string;
  
    avatar: string;
  
    isOpen: Boolean;

    organization: Organization | string;
}

export interface GroupDTO{
    name: string;

    description: string;
  
    avatar: string;
  
    isOpen: Boolean;

    organization: string;
}