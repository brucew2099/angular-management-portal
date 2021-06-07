import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _messageRef: AngularFirestoreCollection<Message>;
  private _messages = new Subject<Message[]>();

  constructor(private db: AngularFirestore) { }

  getMessages(): Observable<Message[]> {
    return this._messages.asObservable();
  }

  updateMessages(messages: Message[]): void {
    this._messages.next(messages);
  }

  searchMessages(chatroomId: string, searchValue: string): Observable<Message[]> {
    return this.db.collection<Message>(`chatrooms/${chatroomId}/messages`, ref => {
        return ref.where('messageLower', '>=', searchValue);
    }).valueChanges();
  };
}
