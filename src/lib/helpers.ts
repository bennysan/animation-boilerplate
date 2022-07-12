import Vector2 from "./vector2";

export class Area {
  width: number;
  height: number;
  x: number;
  y: number;
  color: string = "#fff";
  constructor(x: number, y: number, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  containsPoint(point: Vector2): boolean {
    return (
      point.x >= this.x &&
      point.y >= this.y &&
      point.x <= this.x + this.width &&
      point.y <= this.y + this.width
    );
  }
  intersectsArea(area: Area) {
    return (
      area.x <= this.x + this.width &&
      area.x + area.width >= this.x &&
      area.y <= this.y + this.height &&
      area.y + area.height >= this.y
    );
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.closePath();
  }
}
