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

  register() {
    if (this.loginForm.value.password !== this.loginForm.value.verifyPassword) {
      this.errorMsg = 'Passwords do not match';
      this.errorFlag = true;
      return;
    }

    if (this.userService.findUserByUsername(this.loginForm.value.username)) {
      this.errorMsg = 'User already exists';
      this.errorFlag = true;
      return;
    }

    this.user = {};
    this.user.username = this.loginForm.value.username;
    this.user.password = this.loginForm.value.password;
    this.userService.createUser(this.user);

    this.router.navigate(['/user/', this.user._id]);
  }
}
