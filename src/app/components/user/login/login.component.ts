import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

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
              private sharedService: SharedService,
              private router: Router) { }

  ngOnInit() { }

  login() {
    // fetching data from loginForm
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.userService.login(username, password)
      .subscribe(
        (data: any) => {
          if (!data) {
            this.errorMsg = 'Invalid username or password';
            this.errorFlag = true;
            return;
          }
          this.sharedService.user = data;
          this.user = this.sharedService.user;
          this.router.navigate(['/profile']);
        },
        (error: any) => {
          this.errorMsg = 'Login failed';
          this.errorFlag = true;
        }
      );
  }

}
