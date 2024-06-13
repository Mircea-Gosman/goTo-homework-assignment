export interface Task {
    _id: string;
    creatorId: string;
    title: string;
    description: string;
    endDate: Date;
    status: Status;
}

export enum Status {
    Pending,
    Completed
}