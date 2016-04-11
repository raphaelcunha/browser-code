import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from 'src/core/auth';
import { ITask } from './task';
export declare class TaskService {
    private ref;
    taskItems$: FirebaseListObservable<ITask[]>;
    constructor(af: AngularFire, auth: AuthService, ref: Firebase);
    createTask(title: string): Promise<any>;
    removeTask(task: ITask): Promise<any>;
    updateTask(task: ITask, changes: any): Promise<any>;
}
