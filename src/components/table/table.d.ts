export interface Column {
  key: string;
  title?: string;
  width?: number;
  displayFunc?: (obj: Object) => string;
}
