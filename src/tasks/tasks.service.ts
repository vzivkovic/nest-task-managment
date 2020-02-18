import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { TaskStatus } from './task-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { FilterDto } from './dto/filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {
  }

  async getById(id: number, auth: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ id, userId: auth.id });

    if (!task) {
      throw new NotFoundException('Custom message Not Found!');
    }

    return task;
  }

  async getAll(filter: FilterDto, auth: User): Promise<Task[]> {
    return await this.taskRepository.getAll(filter, auth);
  }

  async create(createDto: CreateDto, auth: User): Promise<Task> {

    return this.taskRepository.createTask(createDto, auth);

  }

  async delete(id: number, auth: User): Promise<void> {

    const result = await this.taskRepository.delete({ id, userId: auth.id });

    if (!result.affected) {
      throw new NotFoundException('Task Not Found!');
    }
  }

  async updateStatus(id: number, auth: User, status: TaskStatus) {
    const task = await this.getById(id, auth);
    task.status = status;
    await task.save();
    return task;
  }
}
