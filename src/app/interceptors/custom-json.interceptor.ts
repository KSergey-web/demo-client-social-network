import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// The JsonParser class acts as a base class for custom parsers and as the DI token.
@Injectable()
export abstract class JsonParser {
  abstract parse(text: string): any;
}

@Injectable()
export class CustomJsonInterceptor implements HttpInterceptor {
  constructor(private jsonParser: JsonParser) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler) {
    if (httpRequest.responseType === 'json') {
      // If the expected response type is JSON then handle it here.
      return this.handleJsonResponse(httpRequest, next);
    } else {
      return next.handle(httpRequest);
    }
  }

  private handleJsonResponse(httpRequest: HttpRequest<any>, next: HttpHandler) {
    // Override the responseType to disable the default JSON parsing.
    httpRequest = httpRequest.clone({responseType: 'text'});
    // Handle the response using the custom parser.
    return next.handle(httpRequest).pipe(map(event => this.parseJsonResponse(event)));
  }

  private parseJsonResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse && typeof event.body === 'string') {
      return event.clone({body: this.jsonParser.parse(event.body)});
    } else {
      return event;
    }
  }
}

@Injectable()
export class CustomJsonParser implements JsonParser {
  parse(text: string): any {
    return JSON.parse(text, dateReviver);
  }
}

function dateReviver(key: string, value: any) {
console.log(`${key} : ${value}`);
}