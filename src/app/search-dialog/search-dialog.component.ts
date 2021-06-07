import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogData } from '../dialog-data';
import { Message } from '../message';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {
  public messages: Message[];
  subscription: Subscription;

  constructor(public dialogRef:MatDialogRef<SearchDialogComponent>, private ss: SearchService,
    @Inject(MAT_DIALOG_DATA) public data:DialogData) { }

  ngOnInit(): void {
    this.subscription = this.ss.getMessages().subscribe(res => {
      this.messages = res;
    });
  }

  closeDialog():void {
    this.subscription.unsubscribe();
    this.dialogRef.close();
  }
}
