import { directionEnum, roleUserTeamEnum } from "src/app/shared/list-workers/enums";
import { User } from "./user.interface";

export interface CreateTeamDTO{
    name: string;

    organization: string;

    avatar?: File | null;

    users?: Array<string>;
}

export interface Team{
    _id: string;

    organization: string;

    avatar: string;

    name: string;
    
    avatarBuffer?: string;
}

export interface Status{
    _id: string;

    position: number;

    name: string;
}

export interface AddStatusDTO {

    name: string;

    currentPosition: number;
  
    direction: directionEnum;
  
    team: string;
  }

  export interface TeamUserLink{
    _id?: string;

    roleUser: roleUserTeamEnum;
  
    team: Team | string;
  
    user: User;
  }