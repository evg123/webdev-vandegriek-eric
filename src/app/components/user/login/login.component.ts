import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  // properties
  errorFlag = false;
  errorMsg = '';
  user: any;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() { }

  login() {
    // fetching data from loginForm
    this.userService.findUserByCredentials(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (data: any) => {
          if (!data) {
            this.errorMsg = 'Invalid username or password';
            this.errorFlag = true;
            return;
          }
          this.user = data;
          this.router.navigate(['/user/', this.user._id]);
        },
        (error: any) => {
          this.errorMsg = 'Login failed';
          this.errorFlag = true;
        }
      );
  }

}
