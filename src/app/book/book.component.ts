import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../entity/Book';
import { FireAndIceApi } from '../entity/FireAndIceApi';

@Component({
  selector: 'fire-and-ice-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private api: FireAndIceApi
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const bookId = params.id;
      this.api.getBook(bookId).subscribe(book => this.book = book);
    });
  }
}
