import { Grid } from "../models/grid.models";
import { defaultStyle, StyleConfig } from "../models/render.models";

export const renderCanvas = (grid: Grid, style: StyleConfig = defaultStyle): HTMLElement => {

  const $root = document.createElement('div');
  $root.style.position = 'relative';

  const $canvasBackdrop = document.createElement('canvas');
  const ctxBackdrop = $canvasBackdrop.getContext('2d')!;
  $canvasBackdrop.style.position = 'absolute';
  $canvasBackdrop.style.width = `${grid.width * style.cellSize}px`;
  $canvasBackdrop.style.height = `${grid.height * style.cellSize}px`;
  $canvasBackdrop.style.backgroundColor = style.background;
  $root.appendChild($canvasBackdrop);

  const $canvasGridEvents = document.createElement('canvas');
  const ctxGridEvents = $canvasGridEvents.getContext('2d')!;
  $canvasGridEvents.style.position = 'absolute';
  $canvasGridEvents.style.width = `${grid.width * style.cellSize}px`;
  $canvasGridEvents.style.height = `${grid.height * style.cellSize}px`;
  $root.appendChild($canvasGridEvents);

  let eventRect: DOMRect;
  $canvasGridEvents.addEventListener('mousemove', event => {
    eventRect ??= $canvasGridEvents.getBoundingClientRect();
    ctxBackdrop.clearRect(0, 0, $canvasBackdrop.width, $canvasBackdrop.height);
    const x = Math.floor((event.clientX - eventRect.left) / style.cellSize);
    const y = Math.floor((event.clientY - eventRect.top) / style.cellSize);

    ctxBackdrop.fillStyle = style.highlight;
    ctxBackdrop.fillRect(0, y * style.cellSize, $canvasBackdrop.width, style.cellSize);
    ctxBackdrop.fillRect(x * style.cellSize, 0, style.cellSize, $canvasBackdrop.height);
  });

  return $root;
}
