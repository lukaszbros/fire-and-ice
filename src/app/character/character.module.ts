import { NgModule } from "@angular/core";
import { CharacterComponent } from "./character.component";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
  declarations: [
      CharacterComponent
  ], imports: [
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class CharacterModule {
  
}