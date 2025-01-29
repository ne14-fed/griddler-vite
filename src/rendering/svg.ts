import { Grid } from "../models/grid.models";

const svgNS = 'http://www.w3.org/2000/svg';
const createSvgElement = (name: string) => document.createElementNS(svgNS, name);

export const renderSvg = (grid: Grid): SVGElement => {

  const $svg = createSvgElement('svg');
  $svg.setAttribute('xmlns', svgNS);
  $svg.setAttribute('viewBox', `0 0 ${grid.width} ${grid.height}`);

  const $style = document.createElement('style');
  $style.textContent = css;
  $svg.appendChild($style);

  // Events
  $svg.addEventListener('mouseover', (evt) => {
    const elem = evt.target as HTMLElement;
    console.log(
      elem?.getAttribute('x') ?? '-1',
      elem?.getAttribute('y') ?? '-1');
  });

  return $svg;
}

const css = `
  
`;