export interface ITask {
    $key?: string;
    completed: boolean;
    createdAt: number;
    title: string;
}
export declare class Task implements ITask {
    completed: boolean;
    createdAt: number;
    title: string;
    constructor(title: string);
}
