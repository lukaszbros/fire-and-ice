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
  displayedColumns: string[] = ['name', 'gender', 'culture', 'seasons'];
  links: PageLink[] = [];

  constructor(private api: FireAndIceApi) {}

  ngOnInit() {
    this.updateData(5, 1);
  }

  updateData(pageSize: number, page: number) {
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