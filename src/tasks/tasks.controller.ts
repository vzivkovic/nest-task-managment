import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Request } from 'express';
import { CreateDto } from './dto/create.dto';
import { FilterDto } from './dto/filter.dto';
import { StatusValidationPipe } from './pipes/status.validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) {
  }

  @Get()
  index(@Query(ValidationPipe) filter: FilterDto) {

    console.log(1);
    // if (Object.keys(filter).length) {
    //     return this.tasksService.getAllWithFillter(filter);
    // }
    // return this.tasksService.getAll();
  }

  @Get('/:id')
  show(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  store(@Body() createDto: CreateDto) {

    return this.tasksService.create(createDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    console.log(1);
      // return this.tasksService.delete(id);
  }

  @Patch('/:id/status')
  updateStatus(@Param('id') id: string, @Body('status', StatusValidationPipe) status: TaskStatus){
    console.log(1);
      // return this.tasksService.updateStatus(id, status);
  }
}
