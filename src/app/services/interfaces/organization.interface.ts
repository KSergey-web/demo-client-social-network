import { roleUserOrganizationEnum } from "src/app/shared/interfaces";
import { User } from "./user.interface";

export interface Organization{
    _id: string;
    name: string;
    description: string;
    avatar: string;
    avatarBuffer?: string;
}

export interface OrganizationUserLink{
    position: string,
    roleUser: roleUserOrganizationEnum,
    organization: Organization,
    user: User
}


export interface HireUserByLoginDTO{
    position: string,
    login: string,
    organizationId: string
}