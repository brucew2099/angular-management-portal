import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  chatInputForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.chatInputForm = this.fb.group({
      newMessageText: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get newMessageText() {
    return this.chatInputForm.value.newMessageText;
  }

  get f() {
    return this.chatInputForm.controls;
  }

  public submit(message: string): void {
    // TODO save text to firebase
    console.log('New Message: ', message);
    this.f.newMessageText.setValue('');
  }

}
