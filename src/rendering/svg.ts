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

  // Define reusable rows of cells
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

  // Render layer 1: highlighting
  const $layer1 = createSvgElement('g');
  $svg.appendChild($layer1);

  const $rowHilite = createSvgElement('rect') as SVGRectElement;
  $rowHilite.setAttribute('width', `${grid.width}`);
  $rowHilite.setAttribute('height', '1');
  $rowHilite.setAttribute('class', 'hilite');
  $rowHilite.setAttribute('y', '-1');
  $layer1.appendChild($rowHilite);

  const $colHilite = createSvgElement('rect') as SVGRectElement;
  $colHilite.setAttribute('width', '1');
  $colHilite.setAttribute('height', `${grid.height}`);
  $colHilite.setAttribute('class', 'hilite');
  $colHilite.setAttribute('x', '-1');
  $layer1.appendChild($colHilite);

  // Render layer 2: grid visuals
  const $layer2 = createSvgElement('g');
  $svg.appendChild($layer2);
  grid.rows.forEach((_, y) => {
    const $row = createSvgElement('use');
    $row.setAttribute('data-y', `${y}`);
    $row.setAttribute('href', '#row');
    $row.setAttribute('transform', `translate(0, ${y})`);
    $layer2.appendChild($row);
  });

  // Events
  $layer2.addEventListener('mousemove', (event) => {
    const eventBox = $layer2.getBoundingClientRect();
    const x = Math.floor((event.clientX - eventBox.left) / eventBox.width * grid.width);
    const y = Math.floor((event.clientY - eventBox.top) / eventBox.height * grid.height);
    $colHilite.x.baseVal.value = x;
    $rowHilite.y.baseVal.value = y;
  });

  return $svg;
}

const css = `
  rect.cell {
    fill: transparent;
    stroke: #000;
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }

  rect.hilite {
    fill: yellow;
    pointer-events: none;
  }
`;