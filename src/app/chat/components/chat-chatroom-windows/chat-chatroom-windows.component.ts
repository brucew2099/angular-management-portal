import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { ChatroomService } from 'src/app/chatroom.service';

@Component({
  selector: 'app-chat-chatroom-windows',
  templateUrl: './chat-chatroom-windows.component.html',
  styleUrls: ['./chat-chatroom-windows.component.scss']
})
export class ChatChatroomWindowsComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  chatroom: Observable<any> = new Observable<any>();
  fakeData: [] = [];

  constructor(private route: ActivatedRoute, private crs: ChatroomService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

}
