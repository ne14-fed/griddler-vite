export enum CellState {
  BLANK,  // ◻
  MARKED, // ▣
  FILLED, // ◼
}

export class Line {

  public readonly name: string;
  public readonly labels: number[] = [];

  constructor(
    public readonly index: number,
    public readonly length: number,
    public readonly type: 'column' | 'row') {

    this.name = `${this.type} ${this.index + 1}`;
  }
}

export class Grid {

  private _columns: Line[];
  get columns(): Line[] { return this._columns; }

  private readonly _rows: Line[];
  get rows(): Line[] { return this._rows; }

  constructor(
    public readonly width: number,
    public readonly height: number) {

    this._columns = Array.from({ length: width }, (_, i) => new Line(i, height, 'column'));
    this._rows = Array.from({ length: height }, (_, i) => new Line(i, width, 'row'));
  }
}
