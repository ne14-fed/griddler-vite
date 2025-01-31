export interface StyleConfig {
  background: string;
  borderColor: string;
  highlight: string;
  cellSize: number;
}

export const defaultStyle: StyleConfig = {
  background: '#fff',
  borderColor: '#000',
  highlight: 'yellow',
  cellSize: 20,
};