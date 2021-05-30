import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../dialog-data';
import { Message } from '../message';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  messages: Message[];

  constructor(public dialogRef:MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData) { }

  ngOnInit(): void {
  }

  closeDialog():void {
    this.dialogRef.close();
  }
}
