import Vector2 from "../helper/Vector2";

export default class Pointer {
  mousePosition: Vector2;
  isClicking: boolean;
  constructor() {
    this.mousePosition = new Vector2(0, 0);
    this.isClicking = false;
    window.addEventListener("mousedown", (e: MouseEvent) => {
      this.toggleClick();
    });

    window.addEventListener("mouseup", (e: MouseEvent) => {
      this.toggleClick();
    });

    window.addEventListener("pointermove", (e: PointerEvent) => {
      this.mousePosition.x = e.x;
      this.mousePosition.y = e.y;
    });
  }

  toggleClick() {
    this.isClicking = !this.isClicking;
  }
}
