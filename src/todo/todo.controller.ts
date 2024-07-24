import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoHandler } from './commands/create-todo';
import { CreateTodoInput, CreateTodoResult } from './dtos/create-todo';
import { InvariantViolated } from '../errors';

@Controller('todos')
export class TodoController {
  constructor(
    private readonly createTodoHandler: CreateTodoHandler,
    private readonly todoService: TodoService,
  ) {}

  @Get()
  async index(): Promise<any> {
    return await this.todoService.getTodos();
  }

  @Post()
  async create(@Body() input: CreateTodoInput): Promise<CreateTodoResult> {
    try {
      return {
        success: true,
        message: 'Todo created',
        todo: await this.createTodoHandler.execute(input),
      };
    } catch (e) {
      let message = 'An error occurred';
      if (e instanceof InvariantViolated) {
        message = e.message;
      } else {
        console.error(e);
      }

      return Promise.resolve({ success: false, message });
    }
  }
}
