import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { User } from './user';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _dbpath: string = '/messages'

  constructor(private db: AngularFirestore) { }

  // getAllMessages() {
  //   this.db.collection('messages', data => {

  //   })
  // }

  // searchUsers(searchValue){
  //   return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
  //     .where('nameToSearch', '<=', searchValue + '\uf8ff'))
  //     .snapshotChanges()
  // }
}
