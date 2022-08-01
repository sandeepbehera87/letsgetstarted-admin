import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LgsError } from '../../lgs-interface';

@Injectable({
  providedIn: 'root'
})
export class LgsErrorService {

  constructor() { }

  parseErrorResponse(error: HttpErrorResponse): LgsError {
    switch (error.status) {
      case 400:
        return {
          status: 400,
          message: "Bad request!",
          recoverable: true
        }
      case 401:
        return {
          status: 401,
          message: "User session timed out. Please login again.",
          recoverable: false
        }
      case 403:
        return {
          status: 403,
          message: "Request token not found. Please login again.",
          recoverable: false
        }
      case 404:
        return {
          status: 404,
          message: error.message,
          recoverable: true
        }
      default:
        return {
          status: 500,
          message: "Something went worng.",
          recoverable: true
        }
    }
  }
}
