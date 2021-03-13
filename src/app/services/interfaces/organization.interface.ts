import { User } from "./user.interface";

export interface Organization{
    _id: string;
    name: string;
    description: string;
    avatar: string;
}

export interface OrganizationUserLink{
    position: string,
    roleUser: string,
    organization: Organization,
    user: User
}