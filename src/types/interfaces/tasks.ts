export interface Task {
    id: string;
    creatorId: string;
    title: string;
    description: string;
    endDate: Date;
    status: Status;
}

export enum Status {
    Pending,
    Completed,
    Overdue
}