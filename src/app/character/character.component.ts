import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { Character } from "../entity/Character";
import { FireAndIceApi } from "../entity/FireAndIceApi";
import { PageLink } from "../entity/Page";

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit, OnDestroy {
  characters: BehaviorSubject<Character[]> = new BehaviorSubject([]);
  
  displayedColumns = ['name', 'gender', 'culture', 'books', 'seasons'];
  genders = ['Male', 'Female', 'Unknown'];
  links: PageLink[] = [];
  filterForm: FormGroup;
  private INITIAL_PAGE_SIZE = 5;
  private INITIAL_PAGE = 1;
  private unsubscribeAll: Subject<any>;

  constructor(
    private api: FireAndIceApi,
    private formBuilder: FormBuilder,
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.updateData(this.INITIAL_PAGE_SIZE, this.INITIAL_PAGE);
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
            .subscribe(filters => {
                console.log(filters);
            });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  updateData(pageSize: number, page: number) {
    this.api.getCharacters(pageSize, page).subscribe(page => {
        if (page.data) {
          this.characters.next(page.data);
        }
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