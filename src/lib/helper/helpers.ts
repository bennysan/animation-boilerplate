import Vector2 from "./Vector2";

export class Area {
  width: number;
  height: number;
  x: number;
  y: number;
  color: string = "#ffffff";
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
    ctx.lineWidth = 10;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.closePath();
  }
}

export function lerp(u: number, v: number, t: number) {
  return u * (1 - t) + v * t;
}

export function lerp2d(u: Vector2, v: Vector2, t: number) {
  return new Vector2(u.x * (1 - t) + v.x * t, u.y * (1 - t) + v.y * t);
}
