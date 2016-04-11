import { EventEmitter } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { FirebaseListObservable } from 'angularfire2';
import { ITask } from 'src/core/task';
export declare class TaskList {
    taskItems$: FirebaseListObservable<ITask[]>;
    remove: EventEmitter<ITask>;
    update: EventEmitter<any>;
    activeFilter: string;
    constructor(params: RouteParams);
}
