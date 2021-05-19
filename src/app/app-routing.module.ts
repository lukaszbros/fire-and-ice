import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { CharacterComponent } from './character/character.component';


const routes: Routes = [{
  path: '',
  component: CharacterComponent,
}, {
  path: 'book/:id',
  component: BookComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
