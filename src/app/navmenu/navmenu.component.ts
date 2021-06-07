import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LoadingService } from '../loading.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { LocalStorageService } from '../local-storage.service';
import { SearchService } from '../search.service';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { Message } from '../message';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent implements OnInit, OnDestroy {
  title = 'angular-management-portal';
  appId = 'theme1';
  loading: boolean = false;
  currentUser: any = '';

  private _subscriptions: Subscription[] = [];

  navForm: FormGroup;
  filteredMessages: Message[] = [];
  chatroomId: string = '';
  searchValue: string = '';

  content: string = '';

  constructor(private fb:FormBuilder, private ls: LoadingService, public auth: AuthService,
        private localStorage: LocalStorageService, private ss: SearchService, private dialog: MatDialog,
        private loc: Location) {
    this.navForm = this.fb.group({
      search: ['',[]]
    });

    // this.filteredMessages = this.f.search.valueChanges.pipe(
    //   startWith(''),
    //   map((author: string) => this._filter(author))
    // );
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this.ls.isLoading.subscribe(isLoading => {
        this.loading = isLoading;
      })
    )

    this.currentUser = this.localStorage.getItem('user');
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe);
  }

  get search() {
    return this.navForm.value.search;
  }

  private _searchMessages(){
    this.ss.searchMessages(this.chatroomId, this.searchValue).subscribe(msgs => {
      for(let msg of msgs) {
        let temp = new Date(msg.createdAt * 1000);
        let date = temp.toDateString();
        let time = temp.getTime();
        this.content += 'From: ' + msg.sender.firstName + ' ' + msg.sender.lastName;
        this.content += '\nDatetime: ' + date + ' ' + time;
        this.content += '\nChatroom ID: ' + msg.chatroomId;
        this.content += '\nMessage: ' + msg.message + '\n\n';
      }
    });
  }

  openDialog():void {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '550px',
      data: {title: 'Search Results', header: 'Messages', content: this.content}
    });
  }

  get f() {
    return this.navForm.controls;
  }

  displayFn(object: any): string {
    console.log(object);
    return object ? object : undefined;
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.authors.filter(author => author.toLowerCase().includes(filterValue));
  // }

  isChat(): boolean {
    return window.location.href.indexOf('/chat') >= 0;
  }

  searchMe() {
    let path = this.loc.path();
    let chatroomId = path.substring(path.lastIndexOf('/') + 1);
    this.chatroomId = chatroomId;
    this.searchValue = this.f.search.value.toLowerCase();
    this._searchMessages();
    setTimeout(() => {
      this.openDialog();
    }, 1000);
  }

  switchTheme(appId: string) {
    this.appId = appId;
  }

  logout(): void {
    this.auth.logout();
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }

}
