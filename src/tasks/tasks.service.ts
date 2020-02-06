import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateDto } from './dto/create.dto';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];


    getById(id: string) {
        return this.tasks.find(task => task.id === id);
    }

    getAll(): Task[] {

        return this.tasks;
    }

    getAllWithFillter(fillter: FilterDto): Task[] {

        const { status, search } = fillter;

        let tasks = this.getAll();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {

            tasks = tasks.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search)
            );
        }

        return tasks;
    }

    create(createDto: CreateDto): Task {

        const { title, description } = createDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }

    delete(id: string): Task[] {

        this.tasks = this.tasks.filter(task => task.id !== id);

        return this.tasks;
    }

    updateStatus(id: string, status: TaskStatus): Task {
        let task = this.getById(id);

        task.status = status;

        return task;
    }
}
