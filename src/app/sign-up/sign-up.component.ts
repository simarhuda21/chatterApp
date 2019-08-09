import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {LocationService} from'../location.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
 isgetlocation=false;
  count: number;
  username: String;
  email: String;
  password: String;
  usernameIsEmpty: boolean;
  emailIsEmpty: boolean;
  passwordIsEmpty: boolean;
  location: any;
  signupForm: FormGroup;

  constructor(private userService: UserService, private fmService: FlashMessagesService, private router: Router, private locationService: LocationService) {}


  ngOnInit() {
    this.usernameIsEmpty = false;
    this.emailIsEmpty = false;
    this.passwordIsEmpty = false;
    this.count = 0;
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required , Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required , Validators.email]),
password: new FormControl('', [Validators.required , Validators.minLength(6)])
});
    
  }
  getLocation(){
    this.isgetlocation=true;
  this.locationService.getPosition().then(pos=>
    {
      this.location = { lat: pos.lat, lng: pos.lng}
    });
  }

  submitForm() {
   
    if (this.count === 0) {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
        location: this.location
        
      };
      this.userService.saveUser(user).subscribe(response => {
        if (response['user_already_signed_up'] === true) {
          this.fmService.show('Username already taken.', {
            cssClass: 'alert-danger',
            timeout: 3000
          });
        } else {
          this.fmService.show('Successfully signed up. You can now login', {
            cssClass: 'alert-success',
            timeout: 3000
          });
          this.router.navigate(['/login']);
        }
      });
    }
  }
}

