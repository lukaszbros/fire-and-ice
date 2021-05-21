import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FireAndIceApi } from '../entity/FireAndIceApi';
import { CharacterComponent } from './character.component';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import characters from '../entity/characters.json';

const api = jasmine.createSpyObj('FireAndIceApi', ['getCharacters', 'BASE_URL']);

describe('CharacterComponent', () => {
  beforeEach(async(() => {
    api.getCharacters.and.returnValue(of({page: 1, pageSize: 2, pageLinks: [{page: 1, label: 'next'}], data: characters}));
    api.BASE_URL = 'https://anapioficeandfire.com/api';

    TestBed.configureTestingModule({
      declarations: [
        CharacterComponent
      ],
      imports: [CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule],
      providers: [{ provide: FireAndIceApi, useValue: api}, FormBuilder]
    }).compileComponents();
  }));

  it('should create the character component', () => {
    const fixture = TestBed.createComponent(CharacterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render charcters list', fakeAsync(() => {
    const fixture = TestBed.createComponent(CharacterComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const trs = element.querySelectorAll('tr');
    expect(trs).toBeTruthy();
    expect(trs.length).toBe(characters.length + 1); // + 1 for header row
    expect(api.getCharacters.calls.any()).toBe(true);
  }));

  it('should return all character names', () => {
    const fixture = TestBed.createComponent(CharacterComponent);
    const component = fixture.componentInstance;
    const names = component.getNames(characters[0]);
    expect(names).toEqual([characters[0].name, ...characters[0].aliases]);
  });

  it('should not return empty aliases', () => {
    const fixture = TestBed.createComponent(CharacterComponent);
    const component = fixture.componentInstance;
    const fakeCharacter = {name: 'test', aliases: [''], gender: '', culture: '', tvSeries: [''], books: ['']};
    const names = component.getNames(fakeCharacter);
    expect(names).toEqual([fakeCharacter.name]);
  });

  it('should return all character books', () => {
    const fixture = TestBed.createComponent(CharacterComponent);
    const component = fixture.componentInstance;
    const books = component.getBooks(characters[0]);
    expect(books).toEqual(['5']);
  });

  // TODO: Filter and pagination tests
});
