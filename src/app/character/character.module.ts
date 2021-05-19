import { NgModule } from "@angular/core";
import { CharacterComponent } from "./character.component";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PaginationComponent } from "./pagination.component";

@NgModule({
  declarations: [
      CharacterComponent,
      PaginationComponent
  ], imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    FormsModule
  ]
})
export class CharacterModule {
  
}