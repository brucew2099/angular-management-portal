import { Component, OnInit } from '@angular/core';
import { ChatroomService } from 'src/app/chatroom.service';

@Component({
  selector: 'app-chat-chatroom-list',
  templateUrl: './chat-chatroom-list.component.html',
  styleUrls: ['./chat-chatroom-list.component.scss']
})
export class ChatChatroomListComponent implements OnInit {

  constructor(public crs: ChatroomService) { }

  ngOnInit(): void {
  }

}
