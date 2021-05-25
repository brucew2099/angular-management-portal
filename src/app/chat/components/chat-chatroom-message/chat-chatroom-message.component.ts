import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../message';
import { User } from '../../../user';

@Component({
  selector: 'app-chat-chatroom-message',
  templateUrl: './chat-chatroom-message.component.html',
  styleUrls: ['./chat-chatroom-message.component.scss']
})
export class ChatChatroomMessageComponent implements OnInit {
  @Input() user: User = new User({firstName:'', lastName:''});
  @Input() message: Message = new Message({message:'', createdAt: new Date(), sender:{User}});

  constructor() { }

  ngOnInit(): void {
  }

}
