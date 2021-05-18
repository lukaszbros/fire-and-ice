import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CharacterModule } from './character/character.module';
import { FireAndIceApi } from './entity/FireAndIceApi';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    CharacterModule
  ],
  providers: [FireAndIceApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
