import { WebsocketService } from './websocket.service';
import { AuthGuard } from './Auth.guard';
import { UserService } from './user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages/module';
 import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
 import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { LocationService } from './location.service';


 const routes = [
 {path: '', component: HomeComponent},
 {path: 'login', component: LoginComponent},
 {path: 'sign-up', component: SignUpComponent},
 {path: 'profile', component: ProfileComponent,  canActivate: [AuthGuard]},
 {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
 {path: 'chatroom', component: ChatroomComponent, canActivate: [AuthGuard]}
 
 ];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ProfileComponent,
    ChatComponent,
    ChatroomComponent,
    FileSelectDirective
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CollapseModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FlashMessagesModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    FlashMessagesService,
    UserService,
    AuthGuard,
    WebsocketService,
    LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }