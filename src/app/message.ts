import { User } from './user';

export class Message {
  message: string;
  createdAt: any;
  sender: User;
  chatroom?: string;

  constructor({message, createdAt, sender, chatroom}: any) {
    this.message = message;
    this.createdAt = createdAt;
    this.sender = new User(sender);
    this.chatroom = chatroom;
  }
}
