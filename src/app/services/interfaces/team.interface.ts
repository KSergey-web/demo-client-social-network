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
