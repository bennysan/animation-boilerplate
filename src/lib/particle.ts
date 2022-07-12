import Vector2 from "./vector2";

export default class Particle {
  position: Vector2;
  velocity: Vector2;
  size: number = 10;
  constructor(position: Vector2) {
    this.position = position;
    // this.position = new Vector2(Math.random() * 100, Math.random() * 100);
    this.velocity = new Vector2(0, 0);
  }

  update(deltatime: number) {
    // const speed = 50;
    // this.position.x += this.velocity.x * speed * deltatime;
    // this.position.y += this.velocity.y * speed * deltatime;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(
      this.position.x + this.velocity.Normalized().x * 20,
      this.position.y + this.velocity.y * 20
    );
    ctx.stroke();
    ctx.closePath();

    // ctx.fillStyle = "#fff";
    // let velX = `${this.velocity.x}`.slice(0, 4);
    // let velY = `${this.velocity.y}`.slice(0, 4);

    // ctx.fillText(`${velX} ${velY}`, this.position.x + 20, this.position.y - 10);
  }
}
