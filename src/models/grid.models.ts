
export class Line {

  private readonly _labels = [];
  get labels(): number[] { return this._labels; };

  get name(): string { return `${this.type} ${this.index + 1}` };

  constructor(
    public readonly index: number,
    public readonly length: number,
    public readonly type: 'column' | 'row') {
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
