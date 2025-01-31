import { Grid } from "../models/grid.models";
import { defaultStyle, StyleConfig } from "../models/render.models";

export const renderCanvas = (grid: Grid, style: StyleConfig = defaultStyle): HTMLElement => {
  const px = { cell: style.cellSize, gw: grid.width * style.cellSize, gh: grid.height * style.cellSize };

  const $root = document.createElement('div');
  $root.style.position = 'relative';
  $root.style.width = `${px.gw}px`;
  $root.style.height = `${px.gh}px`;

  // 🎨 Borders Canvas (only rendered ONCE)
  const $canvasBorders = document.createElement('canvas');
  const ctxBorders = $canvasBorders.getContext('2d')!;
  $canvasBorders.width = px.gw;
  $canvasBorders.height = px.gh;
  $canvasBorders.style.position = 'absolute';
  $root.appendChild($canvasBorders);

  // ✨ Row Highlighter (DIV)
  const $rowHighlighter = document.createElement('div');
  $rowHighlighter.style.position = 'absolute';
  $rowHighlighter.style.width = `${px.gw}px`;
  $rowHighlighter.style.height = `${px.cell}px`;
  $rowHighlighter.style.backgroundColor = style.highlight;
  $rowHighlighter.style.pointerEvents = 'none';
  $root.appendChild($rowHighlighter);

  // ✨ Column Highlighter (DIV)
  const $colHighlighter = document.createElement('div');
  $colHighlighter.style.position = 'absolute';
  $colHighlighter.style.width = `${px.cell}px`;
  $colHighlighter.style.height = `${px.gh}px`;
  $colHighlighter.style.backgroundColor = style.highlight;
  $colHighlighter.style.pointerEvents = 'none';
  $root.appendChild($colHighlighter);

  // 🎨 Render Static Borders ONCE
  ctxBorders.strokeStyle = style.borderColor || 'black';
  ctxBorders.lineWidth = 1;
  for (let x = 0; x <= px.gw; x += px.cell) {
    ctxBorders.beginPath();
    ctxBorders.moveTo(x, 0);
    ctxBorders.lineTo(x, px.gh);
    ctxBorders.stroke();
  }
  for (let y = 0; y <= px.gh; y += px.cell) {
    ctxBorders.beginPath();
    ctxBorders.moveTo(0, y);
    ctxBorders.lineTo(px.gw, y);
    ctxBorders.stroke();
  }

  // 🚀 Smooth Highlighting on Mouse Move
  $root.addEventListener('mousemove', event => {
    const rect = $root.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / px.cell);
    const y = Math.floor((event.clientY - rect.top) / px.cell);

    $rowHighlighter.style.top = `${y * px.cell}px`;
    $colHighlighter.style.left = `${x * px.cell}px`;
  });

  return $root;
};