import { Grid } from "../models/grid.models";

const svgNS = 'http://www.w3.org/2000/svg';
const createSvgElement = (name: string) => document.createElementNS(svgNS, name);

export const renderSvg = (grid: Grid): SVGElement => {

  // Main svg
  const $svg = createSvgElement('svg');
  $svg.setAttribute('xmlns', svgNS);
  $svg.setAttribute('viewBox', `0 0 ${grid.width} ${grid.height}`);

  // Common styles
  const $style = document.createElement('style');
  $style.textContent = css;
  $svg.appendChild($style);

  // Define reusable elements
  const $defs = createSvgElement('defs');
  const $rowDef = createSvgElement('g');
  $rowDef.setAttribute('id', 'row');
  grid.columns.forEach((_, x) => {
    const $cell = createSvgElement('rect');
    $cell.setAttribute('class', 'cell');
    $cell.setAttribute('x', `${x}`);
    $cell.setAttribute('width', '1');
    $cell.setAttribute('height', '1');
    $rowDef.appendChild($cell);
  });
  $defs.appendChild($rowDef);
  $svg.appendChild($defs);

  // Render elements
  grid.rows.forEach((_, y) => {
    const $row = createSvgElement('use');
    $row.setAttribute('data-y', `${y}`);
    $row.setAttribute('href', '#row');
    $row.setAttribute('transform', `translate(0, ${y})`);
    $svg.appendChild($row);
  });

  // Sliding highlighter
  const $rowHilite = createSvgElement('rect');
  $rowHilite.setAttribute('width', `${grid.width}`);
  $rowHilite.setAttribute('height', '1');
  $rowHilite.setAttribute('class', 'hilite');
  $rowHilite.setAttribute('y', '-1');
  $svg.appendChild($rowHilite);

  // Events
  $svg.addEventListener('mouseover', (evt) => {
    const elem = evt.target as HTMLElement;
    $rowHilite.setAttribute('y', elem?.getAttribute('data-y') ?? '-1');
  });

  return $svg;
}

const css = `
  rect.cell {
    fill: #fff;
    stroke: #000;
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }

  rect.hilite {
    fill: yellow;
    pointer-events: none;
  }
`;