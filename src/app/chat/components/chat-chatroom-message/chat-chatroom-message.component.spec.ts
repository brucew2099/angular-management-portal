import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChatroomMessageComponent } from './chat-chatroom-message.component';

describe('ChatChatroomMessageComponent', () => {
  let component: ChatChatroomMessageComponent;
  let fixture: ComponentFixture<ChatChatroomMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatChatroomMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChatroomMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
