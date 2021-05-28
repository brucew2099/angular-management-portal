import { User } from './user';

export class Message {
  message: string;
  createdAt: any;
  sender: User;

  constructor({message, createdAt, sender}: any) {
    this.message = message;
    this.createdAt = createdAt;
    this.sender = new User(sender);
  }
}
