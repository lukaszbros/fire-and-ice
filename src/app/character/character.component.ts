import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { Observable, Subscription } from "rxjs";
import { Character } from "../entity/Character";
import { FireAndIceApi } from "../entity/FireAndIceApi";

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit, AfterViewInit, OnDestroy {
  charactersDatasource: Observable<Character[]>
  displayedColumns: string[] = ['name', 'gender', 'culture', 'seasons'];
  rowSizes: number[] = [5, 10, 15, 20, 25];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  paginatorSubscription: Subscription

  constructor(private api: FireAndIceApi) {}

  ngOnInit() {
    this.charactersDatasource = this.api.getCharacters(this.rowSizes[0]);
  }

  ngAfterViewInit() {
     this.paginatorSubscription = this.paginator.page.subscribe(page => {
      console.log(page);
      this.charactersDatasource = this.api.getCharacters(page.pageSize);
    });
  }
  
  ngOnDestroy() {
    this.paginatorSubscription.unsubscribe();
  }

  getAllNames(character: Character) {
    let names: string[] = []
    if (character.name) {
      names.push(character.name);
    }

    if (character.aliases && character.aliases.length > 0) {
      names = names.concat(character.aliases);
    }

    return names.join(', ');
  }

  getSeriesCount(character: Character) {
    if (character.tvSeries) {
      if (character.tvSeries.length > 1) {
        return character.tvSeries.length
      }
      if (character.tvSeries.length == 1) {
        if (character.tvSeries[0]) {
          return 1;
        }
      }
    }
    return 0
  }
}