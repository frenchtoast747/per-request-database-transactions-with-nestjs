import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { Todo } from './todo.domain';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async getTodoByTitle(title: string): Promise<Todo | null> {
    return this.todoRepository.findTodoByTitle(title);
  }

  create(title: string) {
    return this.todoRepository.createTodo({ title });
  }

  getTodos(): Promise<Todo[]> {
    return this.todoRepository.findTodos();
  }
}
