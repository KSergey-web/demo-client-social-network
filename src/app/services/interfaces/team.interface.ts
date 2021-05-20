import { directionEnum } from "src/app/shared/list-workers/enums";

export interface CreateTeamDTO{
    name: string;

    organization: string;

    avatar: string;

    users?: Array<string>;
}

export interface Team{
    _id: string;

    organization: string;

    avatar: string;

    name: string;
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