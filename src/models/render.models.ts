export interface StyleConfig {
  background: string;
  borderColor: string;
  borderColorMinor: string;
  highlight: string;
  cellSize: number;
}

export const defaultStyle: StyleConfig = {
  background: '#fff',
  borderColor: '#000',
  borderColorMinor: '#ccc',
  highlight: 'yellow',
  cellSize: 20,
};