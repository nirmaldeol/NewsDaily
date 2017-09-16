import { Injectable } from '@angular/core';
import {BaseRequestOptions} from "@angular/http";
import { environment } from "../../environments/environment";

@Injectable()
export class RequestOptionsService extends BaseRequestOptions {

  constructor() {
    super()
    this.headers.set("x-api-key", environment.apiKey);
   }

}
