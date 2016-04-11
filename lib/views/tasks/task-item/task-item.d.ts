import { EventEmitter } from 'angular2/core';
import { ITask } from 'src/core/task';
export declare class TaskItem {
    task: ITask;
    remove: EventEmitter<any>;
    update: EventEmitter<any>;
    editing: boolean;
    title: string;
    editTitle(): void;
    saveTitle(): void;
    stopEditing(): void;
    toggleStatus(): void;
}
