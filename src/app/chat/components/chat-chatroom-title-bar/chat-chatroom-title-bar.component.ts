import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-chatroom-title-bar',
  templateUrl: './chat-chatroom-title-bar.component.html',
  styleUrls: ['./chat-chatroom-title-bar.component.scss']
})
export class ChatChatroomTitleBarComponent implements OnInit {
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
