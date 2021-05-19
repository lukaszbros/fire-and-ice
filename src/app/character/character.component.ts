import { Component, OnInit } from "@angular/core";
import { Character } from "../entity/Character";
import { FireAndIceApi } from "../entity/FireAndIceApi";
import { PageLink } from "../entity/Page";

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent {
  characters: Character[] = [];
  displayedColumns: string[] = ['name', 'gender', 'culture', 'books', 'seasons'];
  links: PageLink[] = [];
  private INITIAL_PAGE_SIZE = 5;
  private INITIAL_PAGE = 1;

  constructor(
    private api: FireAndIceApi
  ) {}

  ngOnInit() {
    this.updateData(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE);
  }

  updateData(pageSize: number, page: number) {
    this.api.getCharacters(pageSize, page).subscribe(page => {
        this.characters = page.data ? page.data : [];
        this.links = page.pageLinks;
    });
  }

  getNames(character: Character): string[]  {
    const names = character.aliases.filter(alias => alias);
    
    if (character.name) {
      names.unshift(character.name);
    }

    return names;
  }

  getSeriesCount(character: Character): number {
    const series = character.tvSeries.filter(series => series);
    return series.length;
  }

  getBooks(character: Character): string[] {
    const booksIds = character.books.filter(book => book).map(book => book.replace(`${this.api.BASE_URL}/books/`, ''));
    return booksIds;
  }
}