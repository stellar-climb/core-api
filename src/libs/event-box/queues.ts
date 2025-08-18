export enum QueueName {
  ROLE = 'role',
}

export default Object.values(QueueName).map((name) => ({ name }));
