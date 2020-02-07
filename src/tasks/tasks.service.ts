import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { TaskStatus } from './task-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {
  }

  async getById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException('Custom message Not Found!');
    }

    return task;
  }

  async getAll(filter: FilterDto): Promise<Task[]> {
    return await this.taskRepository.getAll(filter);
  }

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

    return this.taskRepository.createTask(createDto);

  }

  async delete(id: number): Promise<void> {

    const result = await this.taskRepository.delete({ id });

    if (!result.affected) {
      throw new NotFoundException('Task Not Found!');
    }
  }

  async updateStatus(id: number, status: TaskStatus) {
    const task = await this.getById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
