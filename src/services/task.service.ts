import { Request } from 'express';

import { Task, User } from '../entities';
import { IResponse } from '../interfaces';
import { taskRepository, userRepository } from '../repositories';
import { serializedTaskSchema } from '../schemas';

class TaskService {
  createTask = async ({ validated, decoded }: Request): Promise<IResponse> => {
    const { userUuid } = decoded;
    const user: User = await userRepository.retrieve({ userUuid });

    const task: Task = await taskRepository.save({ ...(validated as Task) });
    task.userUuid = user.userUuid;
    await taskRepository.save(task);

    user.tasks = [...user.tasks, task];

    await userRepository.save(user);

    const serialized: Task = await serializedTaskSchema.validate(task, {
      stripUnknown: true,
    });

    return { status: 201, message: serialized };
  };

  listTasks = async () => {
    const tasks: Task[] = await taskRepository.all();

    return { status: 200, message: tasks };
  };

  retrieve = async ({ taskUuid }: Task) => {
    const task: Task = await taskRepository.retrieve({ taskUuid });

    return { status: 200, message: task };
  };

  listOwn = async ({ decoded }: Request) => {
    const { tasks } = decoded;
    const serialized = await Promise.all(
      tasks.map(
        async (task: Task) =>
          await serializedTaskSchema.validate(task, { stripUnknown: true })
      )
    );
    return { status: 200, message: serialized };
  };

  findByDescription = async ({ decoded, query }: Request) => {
    const { description } = query as Pick<Task, 'description'>;
    const { tasks } = decoded;

    const tasksByDescription: Task[] = tasks.filter(
      (task) => task.description.toLowerCase() === description.toLowerCase()
    );

    return { status: 200, message: tasksByDescription };
  };

  update = async ({ task, validated }: Request) => {
    const { taskUuid } = task;
    await taskRepository.update(taskUuid, { ...(validated as Task) });
    const updatedTask: Task = await taskRepository.retrieve({ taskUuid });

    return { status: 200, message: updatedTask };
  };

  delete = async ({ taskUuid }: Task) => {
    await taskRepository.delete(taskUuid);

    return { status: 204 };
  };
}

export default new TaskService();
