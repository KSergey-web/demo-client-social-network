import { colorEnum } from "src/app/shared/list-workers/enums";
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
    name: string;

    discription: string;

  color: string;

  deadline: Date;

  status: Status | string;

  team: Team | string;

  users: Array<User> | Array<string>;

  answer: string;
}