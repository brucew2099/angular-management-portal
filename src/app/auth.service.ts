import { Injectable, OnInit } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LocalStorageService } from './local-storage.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  userState: Observable<any | null>;
  userStateSnapshot: User | null;

  constructor(private router: Router, private afAuth: AngularFireAuth,
        private db: AngularFirestore, private ls: LocalStorageService) {
      this.userState = this.afAuth.authState.pipe(switchMap((user: any) => {
        if(user) {
          localStorage.setItem('user', user);
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else {
          this.ls.setItem('user', '');
          return of(null);
        }
      }));

      this._setUserSnapshot();
  }

  ngOnInit(): void {
  }

  signup(Email:string, Password:string, FirstName:string, LastName:string): Observable<boolean | string> {
    return from(this.afAuth.createUserWithEmailAndPassword(Email, Password).then(cred => {
      if(cred.user !== null && cred.user !== undefined) {
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${cred.user.uid}`);
        const updatedUser = {
          id: cred.user.uid,
          email: cred.user.email,
          firstName: FirstName,
          lastName: LastName,
          displayName: FirstName,
          photoUrl: 'https://firebasestorage.googleapis.com/v0/b/manage-portal-79295.appspot.com/o/default.png?alt=media&token=0db5e84b-bacf-4781-b03f-bd26c1ed7e21'
        };
        userRef.set(updatedUser, {
          merge: true
        });
        // this._setUserData(updatedUser)
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
      //this._setUserData(result.user);
      if(!this.ls.isValid('user')) {
        this.ls.setItem('user', JSON.stringify(result.user));
      }
      return true;
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

  isLoggedIn(): boolean {
  const juser = this.ls.getItem('user');
    if(juser !== null && juser !== undefined && juser !== '' &&
        this.router.url !== '/' && window.location.href.indexOf('/login') < 0) {
      return true;
    }
    return false;
  }

  private _setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
    const userState: User = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
    }
    return userRef.set(userState, {
      merge: true
    });
  }

  private _setUserSnapshot(): void {
    if(this.userState !== null && this.userState !== undefined) {
      this.userState.subscribe(user => {
        this.userStateSnapshot = user;
      });
    }
  }
}
