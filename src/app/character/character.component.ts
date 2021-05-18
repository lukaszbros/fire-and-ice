import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { Observable, Subscription } from "rxjs";
import { Character } from "../entity/Character";
import { FireAndIceApi } from "../entity/FireAndIceApi";
import { Page } from "../entity/Page";

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit, AfterViewInit, OnDestroy {
  charactersDatasource: Character[] = [];
  displayedColumns: string[] = ['name', 'gender', 'culture', 'seasons'];
  rowSizes: number[] = [5, 10, 15, 20, 25];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  paginatorSubscription: Subscription

  constructor(private api: FireAndIceApi) {}

  ngOnInit() {
    this.api.getCharacters(this.rowSizes[0], 1).subscribe(page => {
      this.charactersDatasource = page.data;
    });
  }

  ngAfterViewInit() {
     this.paginatorSubscription = this.paginator.page.subscribe(page => {
      this.api.getCharacters(page.pageSize, 1).subscribe(page => {
        this.charactersDatasource = page.data;
      });
    });
  }
  
  ngOnDestroy() {
    this.paginatorSubscription.unsubscribe();
  }

  getNames(character: Character) {
    const names = character.aliases.filter(alias => alias);
    
    if (character.name) {
      names.unshift(character.name);
    }

    return names.join(', ');
  }

  getSeriesCount(character: Character) {
    const series = character.tvSeries.filter(series => series);
    return series.length;
  }
}