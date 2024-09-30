/**
 * The Base class for any game-related object.
 */
class Base {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/** 
 * A stationary circle object.
 */
class Circle extends Base {
  constructor(x, y, radius, color) {
    super(x, y);
    this.radius = radius;
    this.color = color;
  }

  /**
   * Draws the circle
   */
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  /**
   * Translates the circle so it remains stationary relative to the camera position.
   * Draws the circle in place. 
   */
  update() {
    ctx.save();
    ctx.translate(-camera.x + canvas.width / 2, -camera.y + canvas.height / 2);
    ctx.translate(this.x + this.radius, this.y + this.radius);
    ctx.translate(-(this.x + this.radius), -(this.y + this.radius));
    this.draw();
    ctx.restore();
  }
}

/**
 * A Player object.
 */
class Player extends Circle {
  update() {
    super.update();
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

/**
 * A Camera object.
 */
class Camera extends Circle {
  constructor(x = 0, y = 0, radius = 0, color = rgba(0, 0, 0, 0)) {
    super(x, y, radius, color);
  }

  update() {
    super.update();
    camera.x = bezier(t, camera.x, camera.x + (player.x - camera.x) * 0.5, camera.x + (player.x - camera.x) * 0.5, player.x);
    camera.y = bezier(t, camera.y, camera.y + (player.y - camera.y) * 0.5, camera.y + (player.y - camera.y) * 0.5, player.y);
  }
}

/**
 * A stationary box object.
 */
class Box extends Base {
  constructor(x, y, width, height, color) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    ctx.save();
    ctx.translate(-camera.x + canvas.width / 2, -camera.y + canvas.height / 2);
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
    this.draw();
    ctx.restore();
  }
}

class BreakableBox extends Box {
  constructor(x, y, width, height, color, maxHp) {
    super(x, y, width, height, color);
    this.maxHp = maxHp;
    this.hp = maxHp;
  }
}