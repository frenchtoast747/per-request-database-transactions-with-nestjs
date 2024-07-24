export type CommandHandler<T, R> = {
  execute(command: T): Promise<R>;
};

export type CommandResult = {
  success: boolean;
  message: string;
};
