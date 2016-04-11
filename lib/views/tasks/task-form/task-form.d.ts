import { EventEmitter } from 'angular2/core';
export declare class TaskForm {
    createTask: EventEmitter<string>;
    title: string;
    clear(): void;
    submit(): void;
}
