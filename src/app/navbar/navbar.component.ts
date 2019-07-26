import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService,
    private fmService: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
  }
  onLogoutClick() {
    localStorage.removeItem('user');
    this.fmService.show('Successfully logged-out', {
      cssClass: 'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/']);
  }

}
