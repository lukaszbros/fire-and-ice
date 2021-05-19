import { Component, OnInit } from "@angular/core";
import { Character } from "../entity/Character";
import { FireAndIceApi } from "../entity/FireAndIceApi";
import { PageLink } from "../entity/Page";

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  characters: Character[] = [];
  displayedColumns: string[] = ['name', 'gender', 'culture', 'seasons'];
  pageSizes = [5, 10, 15, 20, 25];
  pageSize = this.pageSizes[0];
  links: PageLink[] = []
  page = 1;

  constructor(private api: FireAndIceApi) {}

  ngOnInit() {
    this.updateData(this.pageSize, this.page);
  }

  updateData(pageSize: number, page: number) {
    this.pageSize = pageSize;
    this.page = page;
    this.api.getCharacters(pageSize, page).subscribe(page => {
        this.characters = page.data ? page.data : [];
        this.links = page.pageLinks;
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