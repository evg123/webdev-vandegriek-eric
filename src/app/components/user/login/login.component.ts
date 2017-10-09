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
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';
  user: any;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() { }

  login() {
    // fetching data from loginForm
    this.user = this.userService.findUserByCredentials(this.loginForm.value.username, this.loginForm.value.password);
    if (this.user == null) {
      this.errorFlag = true;
    } else {
      this.router.navigate(['/user/', this.user._id]);
    }
  }

}
