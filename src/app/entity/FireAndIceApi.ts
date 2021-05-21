import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Character } from './Character';
import { catchError, map} from 'rxjs/operators';
import { Page } from './Page';
import { Book } from './Book';

@Injectable()
export class FireAndIceApi {
  BASE_URL = 'https://anapioficeandfire.com/api';

  constructor(private httpClient: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    const errorMessage = `Communication error. Error code: ${error.status} message: ${error.message}`;
    // TODO: handle error in visible for user way
    return throwError(errorMessage);
  }

  getCharacters(pageSize: number, page: number): Observable<Page<Character[]>> {
    return this.httpClient.get<Character[]>(`${this.BASE_URL}/characters?page=${page}&pageSize=${pageSize}`, {observe : 'response'}).pipe(
      map(response => {
        const linkHeader = response.headers.get('link');
        if (linkHeader) {
          const pageLinks = linkHeader.split(',')
          .map(link => link.trim())
          .map(link => {
            if (link) {
              const linkParts = link.split(';');
              return {
                page: Number(linkParts[0].replace(`<${this.BASE_URL}/characters?page=`, '').replace(`&pageSize=${pageSize}>`, '')),
                label: linkParts[1].trim().replace('rel=', '').replace(/\"/g, '')
              };
            }
          });
          return {
            page,
            pageSize,
            pageLinks,
            data: response.body
          };
        } else {
          return {
            page,
            pageSize,
            pageLinks: [],
            data: response.body
          }
        }
      }),
      catchError(this.handleError));
  }

  getBook(bookId: string): Observable<Book> {
    return this.httpClient.get<Book>(`${this.BASE_URL}/books/${bookId}`).pipe(
      catchError(this.handleError)
    );
  }
}
