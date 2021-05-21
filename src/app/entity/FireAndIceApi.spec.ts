import { TestBed } from '@angular/core/testing';
import { FireAndIceApi } from './FireAndIceApi';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const book = {
  'url': 'https://www.anapioficeandfire.com/api/books/1',
  'name': 'A Game of Thrones',
  'isbn': '978-0553103540',
  'authors': [
    'George R. R. Martin'
  ],
  'numberOfPages': 694,
  'publisher': 'Bantam Books',
  'country': 'United States',
  'mediaType': 'Hardcover',
  'released': '1996-08-01T00:00:00'
};

const characters = [{'name': 'Jon Snow',
    'gender': 'Male',
    'culture': 'Northmen',
    'born': 'In 283 AC',
    'died': '',
    'titles': [
      'Lord Commander of the Night\'s Watch'
    ],
    'aliases': [
      'Lord Snow',
      'Ned Stark\'s Bastard',
      'The Snow of Winterfell',
      'The Crow-Come-Over',
      'The 998th Lord Commander of the Night\'s Watch',
      'The Bastard of Winterfell',
      'The Black Bastard of the Wall',
      'Lord Crow'
    ],
    'father': '',
    'mother': '',
    'spouse': '',
    'allegiances': [
      'https://anapioficeandfire.com/api/houses/362'
    ],
    'books': [
      'https://anapioficeandfire.com/api/books/5'
    ],
    'povBooks': [
      'https://anapioficeandfire.com/api/books/1',
      'https://anapioficeandfire.com/api/books/2',
      'https://anapioficeandfire.com/api/books/3',
      'https://anapioficeandfire.com/api/books/8'
    ],
    'tvSeries': [
      'Season 1',
      'Season 2',
      'Season 3',
      'Season 4',
      'Season 5',
      'Season 6'
    ],
    'playedBy': [
      'Kit Harington'
    ]
  }, {
    'url': 'https://anapioficeandfire.com/api/characters/582',
    'name': 'Jon Redfort',
    'gender': 'Male',
    'culture': 'Valemen',
    'born': '',
    'died': '',
    'titles': [
      'Ser'
    ],
    'aliases': [
      ''
    ],
    'father': '',
    'mother': '',
    'spouse': '',
    'allegiances': [
      'https://anapioficeandfire.com/api/houses/316'
    ],
    'books': [
      'https://anapioficeandfire.com/api/books/5',
      'https://anapioficeandfire.com/api/books/8'
    ],
    'povBooks': [],
    'tvSeries': [
      ''
    ],
    'playedBy': [
      ''
    ]
  }];

const links = 'Link: <https://www.anapioficeandfire.com/api/characters?page=2&pageSize=10>; rel="next", <https://www.anapioficeandfire.com/api/characters?page=1&pageSize=10>; rel="first", <https://www.anapioficeandfire.com/api/characters?page=214&pageSize=10>; rel="last"'

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

    service.getBook(bookId).subscribe(book => {
      expect(book.name).toBe('A Game of Thrones');
      expect(book.isbn).toEqual('978-0553103540');
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/books/${bookId}`);
    expect(req.request.method).toBe('GET');
    req.flush(book);
  });

  it('should return page infromation and characters', () => {

    const page = 1;
    const pageSize = 2;
    service.getCharacters(pageSize, page).subscribe(response => {
      expect(response.page).toBe(page);
      expect(response.pageSize).toBe(pageSize);
      expect(response.pageLinks.length).toEqual(3);
      expect(response.pageLinks[0].label).toEqual("next");
      expect(response.pageLinks[0].page).toEqual(2);
      expect(response.data).toEqual(characters);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/characters?page=${page}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(characters, {
      headers: {
        links
      }
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});