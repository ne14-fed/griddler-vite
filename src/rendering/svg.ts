import { Grid } from "../models/grid.models";

const svgNS = 'http://www.w3.org/2000/svg';
const strokewidth = 0.01;
const createSvgElement = (name: string) => document.createElementNS(svgNS, name);

export const renderSvg = (grid: Grid): SVGElement => {

  const $svg = createSvgElement('svg');
  $svg.setAttribute('xmlns', svgNS);
  $svg.setAttribute('viewBox', `${-2*strokewidth} ${-2*strokewidth} ${grid.width + 4*strokewidth} ${grid.height + 4*strokewidth}`);
  $svg.classList.add('griddler');
  const $style = document.createElement('style');
  $style.textContent = css;
  $svg.appendChild($style);

  // render movable row highlighter
  const $rowHilite = createSvgElement('rect');
  $rowHilite.classList.add('hilite', 'silent');
  $rowHilite.setAttribute('width', `${grid.width}`);
  $rowHilite.setAttribute('height', '1');
  $rowHilite.setAttribute('y', '-1');
  $svg.appendChild($rowHilite);

  // render movable column highlighter
  const $colHilite = createSvgElement('rect');
  $colHilite.classList.add('hilite', 'silent');
  $colHilite.setAttribute('width', '1');
  $colHilite.setAttribute('height', `${grid.height}`);
  $colHilite.setAttribute('x', '-1');
  $svg.appendChild($colHilite);

  // render cells
  const $cellsGroup = createSvgElement('g');
  $cellsGroup.classList.add('cells');
  $svg.appendChild($cellsGroup);
  grid.rows.forEach((_, y)  => {
    grid.columns.forEach((_, x) => {
      const $col = createSvgElement('rect');
      $col.setAttribute('x', `${x}`);
      $col.setAttribute('y', `${y}`);
      $col.setAttribute('width', '1');
      $col.setAttribute('height', '1');
      $col.setAttribute('stroke-width', `${strokewidth}`);
      $cellsGroup.appendChild($col);
    });
  });

  // render vertical sector markers
  const $vLinesGroup = createSvgElement('g');
  $vLinesGroup.classList.add('sectors', 'v', 'silent');
  $svg.appendChild($vLinesGroup);
  grid.columns.filter((_, i) => i % 5 == 0 || i + 1 == grid.width).forEach((_, x)  => {
    const $line = createSvgElement('rect');
    $line.setAttribute('x', `${x * 5}`);
    $line.setAttribute('width', `${strokewidth*2}`);
    $line.setAttribute('height', `${grid.height}`);
    $vLinesGroup.appendChild($line);
  });

  // render horizontal sector markers
  const $hLinesGroup = createSvgElement('g');
  $hLinesGroup.classList.add('sectors', 'h', 'silent');
  $svg.appendChild($hLinesGroup);
  grid.rows.filter((_, i) => i % 5 == 0 || i + 1 == grid.height).forEach((_, y)  => {
    const $line = createSvgElement('rect');
    $line.setAttribute('y', `${y * 5}`);
    $line.setAttribute('width', `${grid.width}`);
    $line.setAttribute('height', `${strokewidth*2}`);
    $hLinesGroup.appendChild($line);
  });

  // Events
  $svg.addEventListener('mouseover', (evt) => {
    const elem = evt.target as HTMLElement;
    $rowHilite.setAttribute('y', elem?.getAttribute('y') ?? '-1');
    $colHilite.setAttribute('x', elem?.getAttribute('x') ?? '-1');
  });

  return $svg;
}

const css = `
  svg.griddler { background: #fff; }

  .cells > rect {
    fill: transparent;
    stroke: #000;
  }

  .hilite {
    fill: yellow;
  }

  .sectors > rect {
    fill: #000;
  }

  .silent, .silent * {
    pointer-events: none;
  }
`;