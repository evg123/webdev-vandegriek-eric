import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class FlickrService {

  baseUrl = environment.baseUrl;

  constructor(private _http: Http) { }
  urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT';

  api = {
    'createPage' : this.searchPhotos
  };

  searchPhotos(searchTerm: any, key: string) {
    const url = this.urlBase
      .replace('API_KEY', key)
      .replace('TEXT', searchTerm);
    return this._http.get(url);
  }

  getFlickrInfo() {
    return this._http.get(this.baseUrl + '/api/flickr')
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }
}
