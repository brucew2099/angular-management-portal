import { User } from './user';

export class Message {
  Message: string;
  CreatedAt: Date;
  Sender: User;

  constructor({Message, CreatedAt, Sender}: any) {
    this.Message = Message;
    this.CreatedAt = CreatedAt;
    this.Sender = new User(Sender);
  }
}
