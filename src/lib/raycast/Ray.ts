import { DrawLine, Point } from "../canvas/Canvas";
import Pointer from "../inputs/Pointer";
import Vector2 from "../helper/Vector2";

interface Readings {
  x: number;
  y: number;
  offset: number;
}

export default class Ray {
  origin: Vector2;
  direction: Vector2;
  end: Vector2;
  length: number;
  readings: Readings[];
  pointToUpdate: Vector2;

  constructor(origin: Vector2, direction: Vector2, length: number) {
    this.origin = origin;
    this.direction = direction;
    this.length = length;
    this.cast();
  }

  cast() {
    this.end = new Vector2(
      this.origin.x + this.direction.x * this.length,
      this.origin.y + this.direction.y * this.length
    );
  }

  getReadings(segment: Vector2[]) {}

  getPointTarget(inputs: Pointer) {
    const originDist = Math.sqrt(
      (inputs.mousePosition.x - this.origin.x) ** 2 +
        (inputs.mousePosition.y - this.origin.y) ** 2
    );
    const endDist = Math.sqrt(
      (inputs.mousePosition.x - this.end.x) ** 2 +
        (inputs.mousePosition.y - this.end.y) ** 2
    );

    if (originDist < endDist && originDist < 10) {
      // this.origin.Set(inputs.mousePosition.x, inputs.mousePosition.y);
      return this.origin;
    }

    if (endDist < originDist && endDist < 10) {
      return this.direction;
      // this.direction.Set(
      //   Math.sin(
      //     Math.atan2(
      //       inputs.mousePosition.x - this.origin.x,
      //       inputs.mousePosition.y - this.origin.y
      //     )
      //   ),
      //   Math.cos(
      //     Math.atan2(
      //       inputs.mousePosition.x - this.origin.x,
      //       inputs.mousePosition.y - this.origin.y
      //     )
      //   )
      // );
    }
  }

  movePoint(inputs: Pointer) {
    if (this.pointToUpdate == null) {
      if (inputs.isClicking) {
        this.pointToUpdate = this.getPointTarget(inputs);
      }
    }
    if (inputs.isClicking) {
      if (this.pointToUpdate === this.direction) {
        // this.pointToUpdate.Set(inputs.mousePosition.x, inputs.mousePosition.y);
        this.direction.Set(
          Math.sin(
            Math.atan2(
              inputs.mousePosition.x - this.origin.x,
              inputs.mousePosition.y - this.origin.y
            )
          ),
          Math.cos(
            Math.atan2(
              inputs.mousePosition.x - this.origin.x,
              inputs.mousePosition.y - this.origin.y
            )
          )
        );
        return;
      }

      this.pointToUpdate.Set(inputs.mousePosition.x, inputs.mousePosition.y);
      return;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    DrawLine(context, this.origin, this.end);
    DrawLine(
      context,
      new Vector2(
        this.origin.x - this.direction.x * 10000,
        this.origin.y - this.direction.y * 10000
      ),
      new Vector2(
        this.end.x + this.direction.x * 10000,
        this.end.y + this.direction.y * 10000
      ),
      "#555555"
    );
    Point(context, this.origin);
    Point(context, this.end);
  }

  update(segments: any[], inputs: Pointer) {
    this.readings = [];

    this.movePoint(inputs);
    this.cast();
    if (segments.length > 0) {
      segments.forEach((segment) => this.getReadings(segment));
    }
  }
}
