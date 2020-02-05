import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Request } from 'express';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Get()
    index(): Task[] {
        return this.tasksService.getAll();
    }


    @Post()
    store(@Body('title') title: string, @Body('description') description: string): Task {

        console.log('title', title);
        console.log('description', description);
        return this.tasksService.create({ title, description });

    }
}
