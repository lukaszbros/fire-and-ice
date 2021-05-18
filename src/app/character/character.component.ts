import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

export interface Character {
  name: string;
}

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  charactersDatasource: Observable<Character[]>
  displayedColumns: string[] = ['name'];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.charactersDatasource = this.httpClient.get<Character[]>('https://anapioficeandfire.com/api/characters');
  }
}