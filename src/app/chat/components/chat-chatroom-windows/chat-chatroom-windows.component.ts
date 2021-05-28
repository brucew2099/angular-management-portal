import { Component, OnDestroy, OnInit , AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { ChatroomService } from 'src/app/chatroom.service';
import { LoadingService } from 'src/app/loading.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-chat-chatroom-windows',
  templateUrl: './chat-chatroom-windows.component.html',
  styleUrls: ['./chat-chatroom-windows.component.scss']
})
export class ChatChatroomWindowsComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollContainer') private _scrollContainer: ElementRef;

  private _subscriptions: Subscription[] = [];
  chatroom: any;
  messages: any;

  constructor(private route: ActivatedRoute, private crs: ChatroomService, private ls: LoadingService) {
    this._subscriptions.push(
      this.crs.selectedChatroom.subscribe(chatroom => {
        this.chatroom = chatroom;
        this.ls.isLoading.next(false);
      })
    );

    this._subscriptions.push(
      this.crs.selectedChatroomMessages.subscribe(messages => {
        this.messages = messages;
        this.ls.isLoading.next(false);
      })
    )
  }

  ngAfterViewChecked(): void {
    this._scrollToBottom();
  }

  ngOnInit(): void {
    this._scrollToBottom();

    this._subscriptions.push(
      this.route.paramMap.subscribe(params =>{
        const chatroomId = params.get('chatroomId');
        this.crs.changeChatroom.next(chatroomId);
      })
    )
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  private _scrollToBottom(): void {
    try {
      this._scrollContainer.nativeElement.scrollTop = this._scrollContainer.nativeElement.scrollHeight;
    }
    catch(error) {
      console.log(error.message);
    }
  }

}
