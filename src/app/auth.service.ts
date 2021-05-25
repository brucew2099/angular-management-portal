import { Injectable, NgZone, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  userState: any;

  constructor(private router: Router, private afAuth: AngularFireAuth,
        private db: AngularFirestore, private ngZone: NgZone, private ls: LocalStorageService) {
      this.afAuth.authState.subscribe(user => {
        if(user) {
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
          const juser = this.ls.getItem('user');
          if(juser !== null && juser !== undefined) {
            JSON.parse(juser);
          }
        }
        else {
          this.ls.setItem('user', '');
          // const juser = this.ls.getItem('user');
          // if(juser !== null && juser !== undefined) {
          //   JSON.parse();
          // }
        }
      })
  }

  ngOnInit(): void {
  }

  signup(Email:string, Password:string, FirstName:string, LastName:string): Observable<boolean | string> {
    return from(this.afAuth.createUserWithEmailAndPassword(Email, Password).then(cred => {
      if(cred.user !== null && cred.user !== undefined) {
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${cred.user.uid}`);
        const updatedUser: User = {
          id: cred.user.uid,
          email: cred.user.email,
          firstName: 'Alan',
          lastName: 'Kwok',
          photoUrl: 'https://firebasestorage.googleapis.com/v0/b/manage-portal-79295.appspot.com/o/iggy_cr.png?alt=media&token=7d8c1b57-bbf0-45e5-bd40-e4b7cfd1c112'
        };
        userRef.set(new User(updatedUser));
        this._setUserData(cred.user)
        return true;
      }
      else {
        return false;
      }
    })
    .catch(error => {
        return error.message;
        console.log(error.message);
    }));
  }

  async login(Email:string, Password:string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(Email, Password);
      this.ngZone.run(() => {
        this.router.navigate(['chat']);
      });
      this._setUserData(result.user);
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      this.ls.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  get isLoggedIn(): boolean {
    const juser = this.ls.getItem('user');
    let user: string = '';
    if(user !== null && user !== undefined && user !== '') {
      return true;
    }
    return  false;
  }

  private _setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
    const userState: User = {
      id: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.FirstName,
      photoUrl: user.photoURL,
    }
    return userRef.set(userState, {
      merge: true
    });
  }
}
