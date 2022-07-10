export interface Column {
  key: string;
  title?: string;
  width?: number;
  displayFunc?: (arr: Array) => string;
}
