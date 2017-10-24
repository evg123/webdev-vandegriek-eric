import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class WidgetService {

  constructor(private _http: Http) { }

  baseUrl = environment.baseUrl;

  api = {
    'createWidget' : this.createWidget,
    'findWidgetsByPageId' : this.findWidgetsByPageId,
    'findWidgetById' : this.findWidgetById,
    'updateWidget' : this.updateWidget,
    'deleteWidget' : this.deleteWidget,
  };

  createWidget(pageId: string, widget: any) {
    return this._http.post(this.baseUrl + '/api/page/' + pageId + '/widget', widget)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findWidgetsByPageId(pageId: string) {
    return this._http.get(this.baseUrl + '/api/page/' + pageId + '/widget')
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findWidgetById(widgetId: string) {
    return this._http.get(this.baseUrl + '/api/widget/' + widgetId)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  updateWidget(widgetId: string , widget: any) {
    return this._http.put(this.baseUrl + '/api/widget/' + widgetId, widget)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  deleteWidget(widgetId: string) {
    return this._http.delete(this.baseUrl + '/api/widget/' + widgetId)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  updateWidgetIndex(pageId: string, startIdx: string, endIdx: string) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('initial', startIdx);
    params.set('final', endIdx);

    const requestOpts: RequestOptions = new RequestOptions();
    requestOpts.params = params;

    return this._http.put(this.baseUrl + '/api/page/' + pageId + '/widget', {}, requestOpts)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }
}
