import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageLink } from '../entity/Page';

@Component({
  selector: 'fire-and-ice-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() page: number;
  @Input() pageSize: number;
  @Input() pageNumber: number;
  @Input() links: PageLink[];
  @Output() pageUpdate: EventEmitter<any> = new EventEmitter();
  pageSizes = [5, 10, 15, 20, 25];
}
