import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChatroomTitleBarComponent } from './chat-chatroom-title-bar.component';

describe('ChatChatroomTitleBarComponent', () => {
  let component: ChatChatroomTitleBarComponent;
  let fixture: ComponentFixture<ChatChatroomTitleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatChatroomTitleBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChatroomTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
