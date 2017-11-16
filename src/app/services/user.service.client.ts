import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {SharedService} from './shared.service';

// injecting service into module
@Injectable()

export class UserService {

  constructor(private _http: Http,
              private sharedService: SharedService,
              private router: Router) { }

  baseUrl = environment.baseUrl;
  options = new RequestOptions();

  api = {
    'createUser' : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByUsername' : this.findUserByUsername,
    'findUserByCredentials' : this.findUserByCredentials,
    'updateUser' : this.updateUser,
    'deleteUser' : this.deleteUser,
    'loggedIn' : this.loggedIn,
    'login' : this.login,
    'logout' : this.logout,
    'register' : this.register,
  };

  loggedIn() {
    this.options.withCredentials = true;
    return this._http.post(this.baseUrl + '/api/loggedIn', '', this.options)
      .map(
        (res: Response) => {
          const user = res.json();
          if (user !== 0) {
            this.sharedService.user = user; // setting user so as to share with all components
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      );
  }

  login(username: string, password: string) {
    this.options.withCredentials = true;

    const body = {
      username : username,
      password : password
    };

    return this._http.post(this.baseUrl + '/api/login', body, this.options)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  logout() {
    this.options.withCredentials = true;

    return this._http.post(this.baseUrl + '/api/logout', '', this.options)
      .map(
        (res: Response) => {
          const data = res;
        }
      );
  }

  register(username: String, password: String) {
    this.options.withCredentials = true;

    const user = {
      username : username,
      password : password
    };

    return this._http.post(this.baseUrl + '/api/register', user, this.options)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  createUser(user: any) {
    return this._http.post(this.baseUrl + '/api/user', user)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findUserByUsername(username: string) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('username', username);

    const requestOpts: RequestOptions = new RequestOptions ({
      search: params
    });

    return this._http.get(this.baseUrl + '/api/user', requestOpts)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findUserByCredentials(username: string, password: string) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);

    const requestOpts: RequestOptions = new RequestOptions();
    requestOpts.params = params;

    return this._http.get(this.baseUrl + '/api/user/', requestOpts)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findUserById(userId: string) {
    return this._http.get(this.baseUrl + '/api/user/' + userId)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  updateUser(userId: string , user: any) {
    return this._http.put(this.baseUrl + '/api/user/' + userId, user)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  deleteUser(userId: string) {
    return this._http.delete(this.baseUrl + '/api/user/' + userId)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }
}
