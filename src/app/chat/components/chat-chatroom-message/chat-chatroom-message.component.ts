import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../message';

@Component({
  selector: 'app-chat-chatroom-message',
  templateUrl: './chat-chatroom-message.component.html',
  styleUrls: ['./chat-chatroom-message.component.scss']
})
export class ChatChatroomMessageComponent implements OnInit {
  @Input() message: Message;

  created: any;

  constructor() { }

  ngOnInit(): void {
  }

  convertDate() {
    return this.message.createdAt.seconds * 1000;
  }

}
