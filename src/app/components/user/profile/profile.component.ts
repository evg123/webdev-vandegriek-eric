import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  // properties
  errorFlag = false;
  errorMsg: string;
  userId: string;
  user: any;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  updated: boolean;

  constructor(private userService: UserService,
              private sharedService: SharedService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user._id;
    this.username = this.user.username;
    this.email = this.user.email ? this.user.email : '';
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.updated = false;
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }

  update() {
    const updatedUser: any = {};
    updatedUser.firstName = this.loginForm.value.firstName;
    updatedUser.lastName = this.loginForm.value.lastName;
    updatedUser.email = this.loginForm.value.email;

    this.userService.updateUser(this.userId, updatedUser)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/profile']);
          this.updated = true;
        },
        (error: any) => {
          this.errorMsg = 'Failed to update user';
          this.errorFlag = true;
        }
      );
  }

  setUpdated(value: boolean) {
    this.updated = value;
  }
}
