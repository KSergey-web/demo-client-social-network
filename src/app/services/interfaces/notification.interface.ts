import { phaseEnum } from "src/app/shared/list-workers/enums"
import { Organization } from "./organization.interface"
import { Task } from "./task.interface"
import { Team } from "./team.interface"

export interface Notification{
    isReaded: boolean;
    phase: phaseEnum;
    organization: Organization;
    team: Team;
    task: Task;
    date: Date;
    remains?:{
        days:number,
        hours:number,
        minutes:number
    }
}