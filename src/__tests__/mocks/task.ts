interface Task {
  taskUuid?: string;
  description: string;
  createdAt?: Date;
  completed?: boolean;
}

export const taskDataOne: Task = {
  description: 'Task 1',
};

export const taskDataTwo: Task = {
  description: 'Task 2',
};

export const taskWithoutDescription: Task = {
  description: '',
};

class TaskRoutes {
  CREATE_TASK = '/api/tasks';
  GET_TASKS = '/api/tasks';
  GET_OWN = '/api/tasks/own';
  GET_BY_DESCRIPTION = '/api/tasks/description';
}

export default new TaskRoutes();
