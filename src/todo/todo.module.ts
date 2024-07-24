import { Module } from '@nestjs/common';
import { TodoEntity } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { CreateTodoHandler } from './commands/create-todo';
import { TodoRepository } from './todo.repository';
import { TodoController } from './todo.controller';

@Module({
  providers: [
    TodoService,
    CreateTodoHandler,
    TodoRepository,
  ],
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
})
export class TodoModule {}
