import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BookComponent } from "./book.component";
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
      BookComponent,
  ], imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatListModule
  ]
})
export class BookModule {
  
}