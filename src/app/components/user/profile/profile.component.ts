import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  // properties
  errorFlag: boolean;
  errorMsg: string;
  userId: string;
  user: any;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  updated: boolean;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );

    this.user = this.userService.findUserById(this.userId);
    this.username = this.user.username;
    this.email = this.user.email ? this.user.email : '';
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.updated = false;
  }

  update() {
    const updatedUser: any = this.userService.findUserById(this.userId);
    updatedUser.firstName = this.loginForm.value.firstName;
    updatedUser.lastName = this.loginForm.value.lastName;
    updatedUser.email = this.loginForm.value.email;
    this.userService.updateUser(this.userId, updatedUser);

    this.router.navigate(['/user/', this.userId]);
    this.updated = true;
    setTimeout(function(){ this.updated = false; }, 3000);
  }

  setUpdated(value: boolean) {
    this.updated = value;
  }
}
