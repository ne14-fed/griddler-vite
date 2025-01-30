import { Grid } from "./models/grid.models";
import { renderSvg } from "./rendering/svg";
import "./styles.scss";

window.addEventListener('load', () => {
  const ggg = new Grid(15, 10);

  const domGrid = renderSvg(ggg);
  document.body.append(domGrid);
});
