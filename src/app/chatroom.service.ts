import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  chatrooms: Observable<any>;
  changeChatroom: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  selectedChatroom: Observable<any>;
  selectedChatroomMessages: Observable<any>;

  constructor(private db: AngularFirestore, private loadingService: LoadingService, private auth: AuthService) {
    this.selectedChatroom = this.changeChatroom.pipe(switchMap(chatroomId => {
      if(chatroomId) {
        //this.loadingService.isLoading.next(true);
        return db.doc(`chatrooms/${chatroomId}`).valueChanges();
      }
      return of(null);
    }));

    this.selectedChatroomMessages = this.changeChatroom.pipe(switchMap(chatroomId => {
      if(chatroomId) {
        //this.loadingService.isLoading.next(true);
        return db.collection(`chatrooms/${chatroomId}/messages`, ref => {
          return ref.orderBy('createdAt', 'desc').limit(100);
        }).valueChanges().pipe(map(arr => arr.reverse()));
      }
      return of(null);
    }));

    this.chatrooms = db.collection('chatrooms').valueChanges();
  }

  createMessage(text: string) {
    const chatroomId = this.changeChatroom.value;
    const cmessage = {
      message: text,
      messageLower: text.toLowerCase().replace(/[^0-9a-z_']/gi, ' '),
      createdAt: new Date(),
      sender: this.auth.userStateSnapshot,
      chatroomId: chatroomId
    };

    this.db.collection(`chatrooms/${chatroomId}/messages`).add(cmessage);
  }
}
