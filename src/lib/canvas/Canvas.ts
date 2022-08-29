import Pointer from "../inputs/Pointer";
import Ray from "../raycast/Ray";
import Vector2 from "../helper/Vector2";

const ray = new Ray(
  new Vector2(window.innerWidth / 2, window.innerHeight / 2),
  new Vector2(Math.sin(Math.PI / 4), Math.cos(Math.PI / 4)),
  150
);

export default class Canvas {
  HTMLElement: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;

  inputs: Pointer;

  constructor() {
    this.Init();
  }

  private Init() {
    this.HTMLElement = document.createElement("canvas");
    this.context = this.HTMLElement.getContext("2d");
    this.SetSize();
    this.inputs = new Pointer();
    document.body.appendChild(this.HTMLElement);

    this.Animate();
  }

  private SetSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.HTMLElement.width = this.width;
    this.HTMLElement.height = this.height;
  }

  private ClearCanvas(color: string = "#222222") {
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.rect(0, 0, this.HTMLElement.width, this.HTMLElement.height);
    this.context.fill();
    this.context.closePath();
  }

  private Animate() {
    requestAnimationFrame(() => {
      this.Animate();
    });
    this.Update();
    this.Draw();
  }

  private Draw() {
    this.ClearCanvas();
  }

  private Update() {}
}

export function Point(
  context: CanvasRenderingContext2D,
  position: Vector2,
  color: string = "#ffffff"
) {
  context.beginPath();
  context.fillStyle = color;
  context.arc(position.x, position.y, 5, 0, Math.PI * 2);
  context.fill();
  context.closePath();
}

export function DrawLine(
  context: CanvasRenderingContext2D,
  start: Vector2,
  end: Vector2,
  color: string = "#ffffff"
) {
  context.beginPath();
  context.strokeStyle = color;
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();
  context.closePath();
}
