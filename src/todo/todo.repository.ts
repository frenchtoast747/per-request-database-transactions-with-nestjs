import { TodoEntity } from './todo.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './todo.dtos';
import { TransactionHost } from '@nestjs-cls/transactional';
import { Todo } from './todo.domain';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';

@Injectable()
export class TodoRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {}

  private get repository(): Repository<TodoEntity> {
    return this.txHost.tx.getRepository(TodoEntity);
  }

  async findTodoByTitle(title: string): Promise<Todo | null> {
    const result = await this.repository.findOne({ where: { title } });
    if (!result) {
      return null;
    }

    return { id: result.id, title: result.title };
  }

  async createTodo(todoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.repository.create({ ...todoDto });

    const result = await this.repository.save(todo);

    return { id: result.id, title: result.title };
  }

  async findTodos(): Promise<Todo[]> {
    return (await this.repository.find()).map((todo) => ({
      id: todo.id,
      title: todo.title,
    }));
  }
}
