import { Todo } from './todo';

export type CreateTodoInput = {
  title: string;
};

export type CreateTodoResult = {
  success: boolean;
  message: string;
  todo?: Todo;
};
