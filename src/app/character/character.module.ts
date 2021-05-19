import { NgModule } from "@angular/core";
import { CharacterComponent } from "./character.component";
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PaginationComponent } from "./pagination.component";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
      CharacterComponent,
      PaginationComponent
  ], imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    RouterModule
  ]
})
export class CharacterModule {
  
}