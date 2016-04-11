import { PipeTransform } from 'angular2/core';
import { ITask } from 'src/core/task';
export declare class TaskListFilterPipe implements PipeTransform {
    transform(list: ITask[], filterType?: string[]): ITask[];
}
