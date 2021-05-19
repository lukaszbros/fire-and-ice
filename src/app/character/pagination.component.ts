import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PageLink } from "../entity/Page";

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() links: PageLink[];
  @Output() onPageUpdate: EventEmitter<any> = new EventEmitter();
  pageSizes = [5, 10, 15, 20, 25];
  pageSize = this.pageSizes[0];
  page = 1;
}