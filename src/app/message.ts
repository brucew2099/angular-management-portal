import { User } from './user';

export class Message {
  message: string;
  messageLower?: string;
  createdAt: any;
  sender: User;
  chatroomId?: string;

  constructor({message, messageLower, createdAt, sender, chatroomId}: any) {
    this.message = message;
    this.messageLower = messageLower;
    this.createdAt = createdAt;
    this.sender = new User(sender);
    this.chatroomId = chatroomId;
  }
}
