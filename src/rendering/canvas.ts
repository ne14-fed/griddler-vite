import { Grid } from "../models/grid.models";
import { defaultStyle, StyleConfig } from "../models/render.models";

export const renderCanvas = (grid: Grid, style: StyleConfig = defaultStyle): HTMLElement => {

  const px = { cell: style.cellSize, gw: grid.width * style.cellSize, gh: grid.height * style.cellSize };

  const $root = document.createElement('div');
  $root.style.position = 'relative';

  const $canvasBackdrop = document.createElement('canvas');
  const ctxBackdrop = $canvasBackdrop.getContext('2d')!;
  $canvasBackdrop.style.position = 'absolute';
  $canvasBackdrop.width = px.gw;
  $canvasBackdrop.height = px.gh;
  $canvasBackdrop.style.backgroundColor = style.background;
  $root.appendChild($canvasBackdrop);

  const $canvasGridEvents = document.createElement('canvas');
  const ctxGridEvents = $canvasGridEvents.getContext('2d')!;
  $canvasGridEvents.style.position = 'absolute';
  $canvasGridEvents.width = px.gw;
  $canvasGridEvents.height = px.gh;
  $root.appendChild($canvasGridEvents);

  $canvasGridEvents.addEventListener('mousemove', event => {
    const rect = $canvasGridEvents.getBoundingClientRect();
    ctxBackdrop.clearRect(0, 0, px.gw, px.gh);
    const x = Math.floor((event.clientX - rect.left) / px.cell);
    const y = Math.floor((event.clientY - rect.top) / px.cell);
    ctxBackdrop.fillStyle = style.highlight;
    ctxBackdrop.fillRect(0, y * px.cell, px.gw, px.cell);
    ctxBackdrop.fillRect(x * px.cell, 0, px.cell, px.gh);
  });

  return $root;
}
