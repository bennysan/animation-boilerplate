import Viewport from "./lib/viewport";
import Vector2 from "../src/lib/vector2";
import "./style/style.css";
import Particle from "./lib/particle";
import { Area } from "./lib/helpers";
import QuadTree from "./lib/quadTree";

const root = document.getElementById("app");
const viewport = new Viewport(root);

let realDeltaTime: number = 0,
  lastUpdate: number = Date.now(),
  timeFactor: number = 1,
  targetFrameTime: number = 33.3,
  accumulator: number = 0;

const { ctx } = viewport;
const particles: Particle[] = [];
const area = new Area(100, 100, 200, 200);
const mouse = new Vector2(0, 0);
const area2 = new Area(mouse.x, mouse.y, 50, 50);
let qt: QuadTree;
// for (let i = 0; i < 10; i++) {
//   particles[i] = new Particle();
// }

function point(x: number, y: number) {
  ctx.beginPath();
  ctx.fillStyle = "#ff0000";
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function drawTrag(particle: Particle) {
  ctx.beginPath();
  ctx.moveTo(particle.position.x, particle.position.y);
  ctx.lineTo(
    particle.position.x * particle.velocity.x * -100,
    particle.position.y * particle.velocity.y * -100
  );
  ctx.stroke();
  ctx.closePath();
}

function checkBoundries(particle: Particle, area: Area) {
  if (particle.position.x >= area.width - particle.size) {
    drawTrag(particle);
    particle.velocity.x = -particle.velocity.x;
  }
  if (particle.position.y >= area.height - particle.size) {
    drawTrag(particle);

    particle.velocity.y = -particle.velocity.y;
  }
  if (particle.position.x <= 0 + particle.size) {
    drawTrag(particle);

    particle.velocity.x = Math.abs(particle.velocity.x);
  }
  if (particle.position.y <= 0 + particle.size) {
    drawTrag(particle);

    particle.velocity.y = Math.abs(particle.velocity.y);
  }
}

function update(deltatime: number) {
  qt = new QuadTree(
    new Area(20, 20, viewport.width - 40, viewport.height - 40)
  );

  for (let particleID = 0; particleID < particles.length; particleID++) {
    // checkBoundries(
    //   particles[particleID],
    //   new Area(0, 0, viewport.width, viewport.height)
    // );

    // particles[particleID].update(deltatime);
    // if (particles[particleID] != undefined) {
    qt.insert(particles[particleID]);
    // }
  }
}

function draw() {
  viewport.ClearCanvas();

  for (let particleID = 0; particleID < particles.length; particleID++) {
    particles[particleID].draw(ctx);
  }
  if (qt.particles.length > 0) {
    qt.draw(ctx);
  }

  point(mouse.x, mouse.y);
}

function loop() {
  requestAnimationFrame(loop);

  realDeltaTime = Date.now() - lastUpdate;
  lastUpdate += realDeltaTime;
  accumulator += realDeltaTime;
  let gameDeltaTime = realDeltaTime * timeFactor;

  if (accumulator >= targetFrameTime) {
    update(gameDeltaTime / 1000 / 60);
    // console.log(targetFrameTime / 1000 / 60);
    accumulator -= targetFrameTime;
  }
  draw();
}
// function loop() {
//   update(1 / 60);
//   draw();
// }

const nextFrame = document.createElement("button");
nextFrame.innerText = ">>";
nextFrame.onclick = (e) => {
  loop();
};

viewport.canvas.addEventListener("mousemove", (e: any) => {
  mouse.setX(e.clientX - e.target.offsetLeft);
  mouse.setY(e.clientY - e.target.offsetTop);
});

viewport.canvas.addEventListener("click", (e: any) => {
  const particle = new Particle(
    new Vector2(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop)
  );
  particles.push(particle);
  console.log(qt);
});

document.body.appendChild(nextFrame);
