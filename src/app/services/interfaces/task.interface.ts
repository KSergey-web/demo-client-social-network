import { IColor } from "src/app/shared/interfaces";
import { colorEnum } from "src/app/shared/list-workers/enums";
import { FileResource } from "./file-resource.interface";
import { Status, Team } from "./team.interface";
import { User } from "./user.interface";

export interface TasKDTO{
    name: string,
    description: string,
  color: colorEnum,
  status: string,
  team: string,
  deadline?: Date;
}

export interface Task{
  _id:string;

    name: string;

    description: string;

  color: colorEnum;

  deadline: Date;

  status: Status | string;

  team: Team | string;

  files:Array<FileResource>;

  users: Array<User> | Array<string>;

  answer: string;

  completionDate: Date | null;
}

export interface UpdateTaskDto{

    name?: string;

    description?: string;

  color?: string;

  deadline?: Date;

  status?: string;

  answer?: string;
}