import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../dialog-data';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<HelpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData) { }

  ngOnInit(): void {
  }

  closeDialog():void {
    this.dialogRef.close();
  }
}
