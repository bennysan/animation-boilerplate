export default class Viewport {
  root: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number = window.innerWidth;
  height: number = window.innerHeight;

  constructor(root: undefined | HTMLElement) {
    this.root = root;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.root.appendChild(this.canvas);
  }

  ClearCanvas() {
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fill();
  }

  Update() {}

  Draw(ctx: CanvasRenderingContext2D) {}
}
