import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  constructor(private userService: UserService,
    private fmService: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    const user = {
      username: this.username,
      password: this.password
    };
    this.userService.login(user).subscribe(response => {
      const res = response;
      console.log(response);
      
      if(res['isPresent'] === true) {
        if( res['correctPassword']=== true) {
          localStorage.setItem('user', JSON.stringify(res['user']));
          localStorage.setItem("token", res["token"]);
          this.fmService.show('Successfully Logged In', {
            cssClass: 'alert-success',
            timeout: 3000
          });
          this.router.navigate(['/']);
        } else {
          this.fmService.show('Incorrect Password', {
            cssClass: 'alert-danger',
            timeout: 3000
          });
      } 

      } else {
        this.fmService.show('User not found', {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
    });
  }

}
