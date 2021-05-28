import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatroomService } from 'src/app/chatroom.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  chatInputForm: FormGroup;

  constructor(private fb: FormBuilder, private crs: ChatroomService) {
    this.chatInputForm = this.fb.group({
      newMessageText: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get newMessageText() {
    return this.chatInputForm.value.newMessageText;
  }

  set newMessageText(value: string) {
    this.f.newMessageText.setValue(value);
  }

  get f() {
    return this.chatInputForm.controls;
  }

  public submit(message: string): void {
    this.crs.createMessage(message);
    this.f.newMessageText.setValue('');
  }

}
