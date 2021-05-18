import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Character } from "../entity/Character";
import { FireAndIceApi } from "../entity/FireAndIceApi";

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  charactersDatasource: Observable<Character[]>
  displayedColumns: string[] = ['name'];

  constructor(private api: FireAndIceApi) {}

  ngOnInit() {
    this.charactersDatasource = this.api.getCharacters()
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
}