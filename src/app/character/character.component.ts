import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { Observable, Subject, Subscription } from "rxjs";
import { distinctUntilChanged, takeUntil } from "rxjs/operators";
import { Character } from "../entity/Character";
import { FireAndIceApi } from "../entity/FireAndIceApi";
import { Page } from "../entity/Page";

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit, OnDestroy {
  charactersDatasource: Character[] = [];
  displayedColumns: string[] = ['name', 'gender', 'culture', 'seasons'];
  pageSizes = [5, 10, 15, 20, 25];
  pageSize = this.pageSizes[0];
  private unsubscribeAll: Subject<any>;

  constructor(private api: FireAndIceApi) {}

  ngOnInit() {
    this.load();
  }
  
  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  load() {
    this.api.getCharacters(this.pageSize, 1).subscribe(page => {
        this.charactersDatasource = page.data ? page.data : [];
    });
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