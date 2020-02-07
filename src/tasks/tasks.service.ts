import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { TaskStatus } from './task-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {
  }

  async getById(id: number):Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException('Custom message Not Found!');
    }

    return task;
  }

  // getAll(): Task[] {

  //     return this.tasks;
  // }

  // getAllWithFillter(fillter: FilterDto): Task[] {

  //     const { status, search } = fillter;

  //     let tasks = this.getAll();

  //     if (status) {
  //         tasks = tasks.filter(task => task.status === status);
  //     }

  //     if (search) {

  //         tasks = tasks.filter(task =>
  //             task.title.includes(search) ||
  //             task.description.includes(search)
  //         );
  //     }

  //     return tasks;
  // }

   async create(createDto: CreateDto): Promise<Task> {

    return  this.taskRepository.createTask(createDto);

  }

  // delete(id: string): Task[] {

  //     const found = this.getById(id);

  //     return this.tasks.filter(task => task.id !== found.id);
  // }

  // updateStatus(id: string, status: TaskStatus): Task {
  //     let task = this.getById(id);

  //     task.status = status;

  //     return task;
  // }
}
