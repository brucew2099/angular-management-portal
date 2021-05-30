import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NgxLoadingXConfig, POSITION, SPINNER, NgxLoadingXModule } from 'ngx-loading-x';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SignupComponent } from './signup/signup.component';
import { ValidationService } from './validation.service';
import { LoadingService } from './loading.service';
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
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { LocalStorageService } from './local-storage.service';
import { ChatroomService } from './chatroom.service';
import { SearchService } from './search.service';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';


const ngxLoadingXConfig: NgxLoadingXConfig = {
  show: false,
  bgBlur: 2,
  bgOpacity: 5,
  bgLogoUrl: '',
  bgLogoUrlPosition: POSITION.topLeft,
  bgLogoUrlSize: 100,
  spinnerType: SPINNER.xBallSpin,
  spinnerSize: 120,
  spinnerColor: '#2467d2',
  spinnerPosition: POSITION.centerCenter,
}

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
    NavmenuComponent,
    SearchDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [ValidationService, LoadingService, AuthService,
                AuthGuard, LocalStorageService, ChatroomService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
