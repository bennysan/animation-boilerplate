export default class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  Set(newX: number, newY: number) {
    this.x = newX;
    this.y = newY;
  }

  setX(newX: number) {
    this.x = newX;
  }

  setY(newY: number) {
    this.y = newY;
  }

  Add(u: number | Vector2) {
    if (u instanceof Vector2) {
      this.x += u.x;
      this.y += u.y;
      return this;
    }
    this.x += u;
    this.y += u;
    return this;
  }

  Substract(u: number | Vector2) {
    if (u instanceof Vector2) {
      this.x -= u.x;
      this.y -= u.y;
      return this;
    }
    this.x -= u;
    this.y -= u;
    return this;
  }

  Multiply(u: number | Vector2) {
    if (u instanceof Vector2) {
      this.x = this.x * u.x;
      this.y = this.y * u.y;
      return this;
    }
    this.x = this.x * u;
    this.y = this.y * u;
    return this;
  }

  Devide(u: number | Vector2) {
    if (u instanceof Vector2) {
      this.x = this.x / u.x;
      this.y = this.y / u.y;
      return this;
    }
    this.x = this.x / u;
    this.y = this.y / u;
    return this;
  }

  Magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  Normalized() {
    return new Vector2(this.x / this.Magnitude(), this.y / this.Magnitude());
  }
}
