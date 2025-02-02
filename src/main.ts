import { Grid } from "./models/grid.models";
import { renderCanvas } from "./rendering/canvas";
import "./styles.scss";

window.addEventListener('load', () => {
  const ggg = new Grid(30, 35);

  const domGrid = renderCanvas(ggg);
  document.body.append(domGrid);
});
