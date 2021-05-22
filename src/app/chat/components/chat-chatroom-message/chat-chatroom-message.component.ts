import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../message';
import { User } from '../../../user';

@Component({
  selector: 'app-chat-chatroom-message',
  templateUrl: './chat-chatroom-message.component.html',
  styleUrls: ['./chat-chatroom-message.component.scss']
})
export class ChatChatroomMessageComponent implements OnInit {
  @Input() User: User = new User({FirstName:'', LastName:''});
  @Input() Message: Message = new Message({Message:'', CreatedAt: new Date(), Sender:{User}});

  constructor() { }

  ngOnInit(): void {
  }

}
