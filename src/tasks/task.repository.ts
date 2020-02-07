import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateDto } from './dto/create.dto';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async createTask(createDto: CreateDto): Promise<Task> {
    const { title, description } = createDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }
  }