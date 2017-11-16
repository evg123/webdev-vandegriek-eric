import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  // properties
  errorFlag: boolean;
  errorMsg = '';
  user: any;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() { }

  userExists(username: string) {
    this.userService.findUserByUsername(username)
      .subscribe(
        (data: any) => {
          return !!data;
        },
        (error: any) => {
          return false;
        }
      );
  }

  register() {
    if (this.loginForm.value.password !== this.loginForm.value.verifyPassword) {
      this.errorMsg = 'Passwords do not match';
      this.errorFlag = true;
      return;
    }

    if (this.userExists(this.loginForm.value.username)) {
      this.errorMsg = 'User already exists';
      this.errorFlag = true;
      return;
    }

    this.user = {};
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.userService.register(username, password)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/profile']);
        },
        (error: any) => {
          this.errorMsg = 'Failed to create new user';
          this.errorFlag = true;
        }
      );
  }
}
