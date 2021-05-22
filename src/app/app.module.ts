import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SignupComponent } from './signup/signup.component';
import { ValidationService } from './validation.service';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { DbSummaryComponent } from './db-summary/db-summary.component';
import { DbProjectsComponent } from './db-projects/db-projects.component';
import { DbMembersComponent } from './db-members/db-members.component';
import { ChatComponent } from './chat/chat.component';
import { ChatInputComponent } from './chat/components/chat-input/chat-input.component';
import { ChatChatroomListComponent } from './chat/components/chat-chatroom-list/chat-chatroom-list.component';
import { ChatChatroomTitleBarComponent } from './chat/components/chat-chatroom-title-bar/chat-chatroom-title-bar.component';
import { ChatChatroomMessageComponent } from './chat/components/chat-chatroom-message/chat-chatroom-message.component';
import { ChatChatroomWindowsComponent } from './chat/components/chat-chatroom-windows/chat-chatroom-windows.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AboutComponent,
    LoginComponent,
    NotfoundComponent,
    SignupComponent,
    HelpDialogComponent,
    DbSummaryComponent,
    DbProjectsComponent,
    DbMembersComponent,
    ChatComponent,
    ChatInputComponent,
    ChatChatroomListComponent,
    ChatChatroomTitleBarComponent,
    ChatChatroomMessageComponent,
    ChatChatroomWindowsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
