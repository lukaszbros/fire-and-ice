import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Character } from '../entity/Character';
import { FireAndIceApi } from '../entity/FireAndIceApi';
import { PageLink } from '../entity/Page';

interface CharacterFilter{
  name: string;
  gender: string;
}

@Component({
  selector: 'fire-and-ice-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit, OnDestroy {
  characters: BehaviorSubject<Character[]> = new BehaviorSubject([]);
  filteredCharacters: BehaviorSubject<Character[]> = new BehaviorSubject([]);
  displayedColumns = ['name', 'gender', 'culture', 'books', 'seasons'];
  genders = ['Male', 'Female', 'Unknown'];
  page = 1;
  pageSize = 5;
  links: PageLink[] = [];
  filterForm: FormGroup;
  private unsubscribeAll: Subject<any>;

  constructor(
    private api: FireAndIceApi,
    private formBuilder: FormBuilder,
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      name: [''],
      gender: ['']
    });

    this.filterForm.valueChanges
      .pipe(
          takeUntil(this.unsubscribeAll),
          debounceTime(300),
          distinctUntilChanged()
      )
      .subscribe(() => {
        this.characters.next(this.characters.value);
      });

    this.characters.pipe(
      takeUntil(this.unsubscribeAll),
      map(value => this.filterData(value))
    ).subscribe(this.filteredCharacters);

    this.updateData(this.pageSize, this.page);
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  updateData(pageSize: number, page: number) {
    this.page = page;
    this.pageSize = pageSize;
    this.api.getCharacters(pageSize, page).subscribe(response => {
        if (response.data) {
          this.characters.next(response.data);
        }
        this.links = response.pageLinks;
    });
  }

  filterData(characters: Character[]): Character[] {
    let filteredCharacters = characters;
    const filters: CharacterFilter = this.filterForm.value;
    if (filters.name) {
      const name = filters.name.toLowerCase();
      filteredCharacters = filteredCharacters
        .filter(character => this.getNames(character).map(characterName => characterName.toLowerCase()).join('|').includes(name));
    }

    if (filters.gender) {
      const gender = filters.gender === 'Undefined' ? '' : filters.gender;
      filteredCharacters = filteredCharacters.filter(character => character.gender === gender);
    }

    return filteredCharacters;
  }

  clearFilter() {
    this.filterForm.reset();
  }

  getNames(character: Character): string[]  {
    const names = character.aliases.filter(alias => alias);
    if (character.name) {
      names.unshift(character.name);
    }

    return names;
  }

  getSeriesCount(character: Character): number {
    const realSeries = character.tvSeries.filter(series => series);
    return realSeries.length;
  }

  getBooks(character: Character): string[] {
    const booksIds = character.books.filter(book => book).map(book => book.replace(`${this.api.BASE_URL}/books/`, ''));
    return booksIds;
  }
}
