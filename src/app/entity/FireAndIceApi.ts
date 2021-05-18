import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Character } from "./Character";
import { catchError} from 'rxjs/operators';

@Injectable()
export class FireAndIceApi {
  private BASE_URL = 'https://anapioficeandfire.com/api'

  constructor(private httpClient: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = `Communication error. Error code: ${error.status} message: ${error.message}`;
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  
  getCharacters(pageSize: number): Observable<Character[]> {
    return this.httpClient.get<Character[]>(`${this.BASE_URL}/characters?pageSize=${pageSize}`).pipe(
      catchError(this.handleError));
  }
}