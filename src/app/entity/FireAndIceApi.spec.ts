import { TestBed } from '@angular/core/testing';
import { FireAndIceApi } from './FireAndIceApi';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import characters from './characters.json';
import book from './book.json';

const links = '<https://anapioficeandfire.com/api/characters?page=2&pageSize=2>; rel="next", <https://anapioficeandfire.com/api/characters?page=1&pageSize=2>; rel="first", <https://anapioficeandfire.com/api/characters?page=214&pageSize=2>; rel="last"';

describe('FireAndIceApi', () => {
  let service: FireAndIceApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FireAndIceApi]
    });
    service = TestBed.inject(FireAndIceApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should return a book', () => {

    const bookId = '1';

    service.getBook(bookId).subscribe(data => {
      expect(data.name).toBe('A Game of Thrones');
      expect(data.isbn).toEqual('978-0553103540');
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/books/${bookId}`);
    expect(req.request.method).toBe('GET');
    req.flush(book);
  });

  it('should return page infromation and characters', () => {

    const page = 1;
    const pageSize = 2;
    let response: any;
    service.getCharacters(pageSize, page).subscribe(data => {
      response = data;
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/characters?page=${page}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');

    
    req.flush(characters, {
      headers: {
        link: links
      }
    });

    expect(response.page).toBe(page);
    expect(response.pageSize).toBe(pageSize);
    expect(response.pageLinks.length).toEqual(3);
    expect(response.pageLinks[0].label).toEqual('next');
    expect(response.pageLinks[0].page).toEqual(2);
    expect(response.data).toEqual(characters);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
