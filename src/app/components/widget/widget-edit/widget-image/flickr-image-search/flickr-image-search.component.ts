import { Component, OnInit } from '@angular/core';
import {FlickrService} from '../../../../../services/flickr.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../../services/widget.service.client';

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  errorFlag: boolean;
  errorMsg: string;
  websiteId: string;
  pageId: string;
  searchText: string;
  userId: string;
  siteId: string;
  widgetId: string;
  photos = {};
  flickrKey: string;

  constructor(private flickrService: FlickrService,
              private widgetService: WidgetService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.siteId = params['wid'];
          this.pageId = params['pid'];
          this.widgetId = params['wgid'];
        }
      );
    this.flickrService.getFlickrInfo()
      .subscribe(
        (data: any) => {
          this.flickrKey = data.key;
        },
        (error: any) => {
          this.errorMsg = 'Failed to get flickr key';
          this.errorFlag = true;
        }
      );
  }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText, this.flickrKey)
      .subscribe(
        (data: any) => {
          // console.log(data);
          let val = data._body;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          // console.log(val);
          this.photos = val.photos;
        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';
    const widget = {
      url: url
    };

    this.widgetService.updateWidget(this.widgetId, widget)
      .subscribe(
        (data: any) => {
          this.router.navigate(['user', this.userId, 'website', this.siteId, 'page', this.pageId, 'widget', this.widgetId]);
        },
        (error: any) => {
          this.errorMsg = 'Failed to update widget url';
          this.errorFlag = true;
        }
      );
  }
}
