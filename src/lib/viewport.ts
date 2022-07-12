export default class Viewport {
  root: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number = 400;
  height: number = 400;
  constructor(root: undefined | HTMLElement) {
    this.SetRootElement(root);

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ClearCanvas();
    this.root.appendChild(this.canvas);
  }

  SetViewportSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  SetRootElement(root: HTMLElement) {
    if (root !== undefined) {
      this.root = root;
      return;
    }
    this.root = document.body;
  }

  ClearCanvas() {
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fill();
  }
}
