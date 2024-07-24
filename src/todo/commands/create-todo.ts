import { Injectable } from '@nestjs/common';
import { CommandHandler } from '../../commands';
import { TodoService } from '../todo.service';
import { InvariantViolated } from '../../errors';
import { Transactional } from '@nestjs-cls/transactional';
import { Todo } from '../todo.domain';

export type CreateTodo = {
  title: string;
};

@Injectable()
export class CreateTodoHandler implements CommandHandler<CreateTodo, Todo> {
  constructor(private readonly todoService: TodoService) {}

  @Transactional()
  async execute(command: CreateTodo): Promise<Todo> {
    const existing = await this.todoService.getTodoByTitle(command.title);
    if (existing) {
      throw new InvariantViolated('Todo already exists');
    }

    return this.todoService.create(command.title);
  }
}
