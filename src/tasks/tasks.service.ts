import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAll(): Task[] {

        return this.tasks;
    }

    create(taskData: { title: string, description: string }): Task {

        const task: Task = {
            id: uuid(),
            title: taskData.title,
            description: taskData.description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }
}
