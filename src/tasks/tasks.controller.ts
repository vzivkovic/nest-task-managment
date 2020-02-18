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
  ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Request } from 'express';
import { CreateDto } from './dto/create.dto';
import { FilterDto } from './dto/filter.dto';
import { StatusValidationPipe } from './pipes/status.validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthDecorator } from '../auth/get-auth.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

  constructor(private tasksService: TasksService) {
  }

  @Get()
  index(
    @Query(ValidationPipe) filter: FilterDto,
    @GetAuthDecorator() auth: User,
  ) {

    return this.tasksService.getAll(filter, auth);
  }

  @Get('/:id')
  show(
    @Param('id', ParseIntPipe) id: number,
    @GetAuthDecorator() auth: User,
  ): Promise<Task> {
    return this.tasksService.getById(id, auth);
  }

  @Post()
  @UsePipes(ValidationPipe)
  store(
    @Body() createDto: CreateDto,
    @GetAuthDecorator() auth: User,
  ) {

    return this.tasksService.create(createDto, auth);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetAuthDecorator() auth: User,
    ): Promise<void> {
    await this.tasksService.delete(id, auth);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', StatusValidationPipe) status: TaskStatus,
    @GetAuthDecorator() auth: User,
    ) {
    return this.tasksService.updateStatus(id, auth, status);
  }
}
