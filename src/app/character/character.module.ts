import { NgModule } from "@angular/core";
import { CharacterComponent } from "./character.component";
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
      CharacterComponent
  ], imports: [
    MatTableModule
  ]
})
export class CharacterModule {
  
}