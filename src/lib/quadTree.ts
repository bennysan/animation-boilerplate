import { Area } from "./helpers";
import Particle from "./particle";

export default class QuadTree {
  boundary: Area;
  capacity: number = 4;
  quadrants: QuadTree[];
  particles: Particle[];
  constructor(boundary: Area) {
    this.boundary = boundary;
    this.particles = [];
    this.quadrants = [];
  }

  insert(point: Particle) {
    if (!this.boundary.containsPoint(point.position)) {
      return;
    }

    if (this.particles.length >= this.capacity) {
      this.subdivide(point);
      return;
    }

    if (this.particles.length < this.capacity) {
      this.particles.push(point);
      return;
    }
  }

  subdivide(point: Particle) {
    const { x, y, width, height } = this.boundary;

    this.quadrants[0] = new QuadTree(new Area(x, y, width / 2, height / 2));
    this.quadrants[1] = new QuadTree(
      new Area(x + width / 2, y, width / 2, height / 2)
    );
    this.quadrants[2] = new QuadTree(
      new Area(x, y + height / 2, width / 2, height / 2)
    );
    this.quadrants[3] = new QuadTree(
      new Area(x + width / 2, y + height / 2, width / 2, height / 2)
    );

    this.quadrants[0].insert(point);
    this.quadrants[1].insert(point);
    this.quadrants[2].insert(point);
    this.quadrants[3].insert(point);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = "#aaa";
    ctx.rect(
      this.boundary.x,
      this.boundary.y,
      this.boundary.width,
      this.boundary.height
    );
    ctx.stroke();
    ctx.closePath();

    if (this.quadrants.length > 0) {
      this.quadrants.forEach((quad) => quad.draw(ctx));
    }
  }
}
