import { Component, OnInit, ElementRef, Input, } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { WebsocketService } from '../websocket.service';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { map } from 'rxjs/operators';
const URL = 'http://192.168.2.93:3000/api/fileUpload';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  // public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  private username: String;
  private email: String;
  private chatroom;
  //  flag=false;
  private message: String;
  private imagePath:string;
  public messageArray:any = []; //Array<{user: String, message: String}> = [];
  private isTyping = false;
  public imageArray:any = [];
  

  constructor(
    private http: HttpClient, 
    private el: ElementRef,
    private route: ActivatedRoute,
    private userService:UserService,
    private webSocketService: WebsocketService,
    private router: Router
    ) {
      this.webSocketService.newMessageReceived().subscribe(data => {
        this.messageArray.messages.push(data);
        this.isTyping = false;
      });

      this.webSocketService.newImageReceived().subscribe(data => {
        this.imageArray.images.push(data);
        this.isTyping = false;
      });

      this.webSocketService.receivedTyping().subscribe(bool => {
        this.isTyping = bool.isTyping;
      });
     }

  ngOnInit() {
    this.username = this.route.snapshot.queryParamMap.get('name');
    this.email = this.route.snapshot.queryParamMap.get('email');
    const currentUser = this.userService.getLoggedInUser();
    if (currentUser.username < this.username) {
      this.chatroom = currentUser.username.concat(this.username);
    } else {
      this.chatroom = this.username.concat(currentUser.username);
    }
    this.webSocketService.joinRoom({user: this.userService.getLoggedInUser().username, room: this.chatroom});
    this.userService.getChatRoomsChat(this.chatroom).subscribe(messages => {

      this.messageArray = messages;
      console.log(this.messageArray);
    });
    // /////////////////////////////////////////////////////////////////////////
    this.userService.getChatRoomsChat(this.chatroom).subscribe(images => {
      this.imageArray = images;
    });
    
  }
  upload() {
    // this.flag=true;
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) {
      // this.flag=false;
      formData.append('photo', inputEl.files.item(0));
      this.http.post(URL, formData).pipe(map(res => res )).subscribe((success) => {
        alert("success");
},
(error) => alert(error))
  }
 this.sendImage();
}
  

  sendMessage() {
    this.webSocketService.sendMessage({room: this.chatroom, user: this.userService.getLoggedInUser().username, message: this.message});
    this.message='';
  }
  // ////////////////////////////////////////////////////////////////
  sendImage() {
    this.webSocketService.sendImage({room: this.chatroom, user: this.userService.getLoggedInUser().username, image: this.imagePath});
    this.imagePath='';
  }

  typing() {
  this.webSocketService.typing({room: this.chatroom, user: this.userService.getLoggedInUser().username});
}

}
