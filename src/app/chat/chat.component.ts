import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  currentUser: any = null;

  constructor(private ls: LocalStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.ls.getItem('user');
  }

}
