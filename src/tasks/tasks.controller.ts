import { Controller, Get, Req, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Request } from 'express';
import { Task, TaskStatus } from './task.model';
import { CreateDto } from './dto/create.dto';
import { FilterDto } from './dto/filter.dto';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Get()
    index(@Query() filter: FilterDto): Task[] {

        if (Object.keys(filter).length) {
            return this.tasksService.getAllWithFillter(filter);
        }
        return this.tasksService.getAll();
    }

    @Get(':id')
    show(@Param('id') id: string): Task {
        return this.tasksService.getById(id);
    }

    @Post()
    store(@Body() createDto: CreateDto): Task {

        return this.tasksService.create(createDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Task[] {
        return this.tasksService.delete(id);
    }

    @Patch('/:id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
        return this.tasksService.updateStatus(id, status);
    }
}
