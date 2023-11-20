export interface ITableHeading {
  key: string;
  label: string;
}

export interface UIDataTable<T> {
  heading: ITableHeading[];
  data: T[];
}
