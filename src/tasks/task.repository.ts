import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateDto } from './dto/create.dto';
import { TaskStatus } from './task-status.enum';
import { FilterDto } from './dto/filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async createTask(createDto: CreateDto, auth: User): Promise<Task> {
    const { title, description } = createDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = auth;
    await task.save();

    delete task.user.password;
    delete task.user.salt;

    return task;
  }

  async getAll(filter: FilterDto, auth: User): Promise<Task[]> {

    const { status, search } = filter;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: auth.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    }

    return await query.getMany();
  }
}