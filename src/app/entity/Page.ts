export interface PageLink {
  page: number;
  label: string;
}

export interface Page<T> {
  page: number;
  pageSize: number;
  pageLinks: PageLink[];
  data: T;
}