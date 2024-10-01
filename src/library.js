/**
 * Returns an rgba string
 *
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @param {Number} a
 * @returns
 */
const rgba = (r, g, b, a) => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/**
 * Calculates the linear interpolation between two numbers
 *
 * @param {Number} start
 * @param {Number} end
 * @param {Number} t
 * @returns
 */
function lerp(start, end, t) {
  return start + (end - start) * t;
}

/**
 * Calculates a point on a cubic bezier curve
 *
 * @param {Number} t
 * @param {Number} p0
 * @param {Number} p1
 * @param {Number} p2
 * @param {Number} p3
 * @returns
 */
function bezier(t, p0, p1, p2, p3) {
  return p0 * (1 - t) ** 3 + p1 * 3 * (1 - t) ** 2 * t + p2 * 3 * (1 - t) * t ** 2 + p3 * t ** 3;
}

/**
 * Calculates the single-frame speed of an object given
 * the framerate-independent speed in pixels per second
 * and the amount of time after the last frame in milliseconds
 *
 * @param {Number} pxps pixels per second
 * @param {Number} dt delta time (ms)
 * @returns
 */
function speed(pxps, dt) {
  return (pxps / 1000) * dt;
}

/**
 * Calculates the single-frame speed of a the Player given
 * the amount of time after the last frame in milliseconds
 *
 * @param {Number} dt
 */
function calculatePlayerMovement(dt) {
  player.speedX = 0;
  player.speedY = 0;
  if (keys["a"]) {
    player.speedX = -speed(playerSpeed, dt);
  }
  if (keys["d"]) {
    player.speedX = speed(playerSpeed, dt);
  }
  if (keys["w"]) {
    player.speedY = -speed(playerSpeed, dt);
  }
  if (keys["s"]) {
    player.speedY = speed(playerSpeed, dt);
  }
}

/**
 * Moves the player back the exact amount and direction of
 * overlap from a given list of walls.
 *
 * @param {Array} walls
 */
function calculatePlayerWallCollisions(walls) {
  for (const wall of walls) {
    const closestX = Math.max(wall.x, Math.min(player.x, wall.x + wall.width));
    const closestY = Math.max(wall.y, Math.min(player.y, wall.y + wall.height));
    const distanceX = player.x - closestX;
    const distanceY = player.y - closestY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < player.radius) {
      const overlap = player.radius - distance;

      const normX = distanceX / distance;
      const normY = distanceY / distance;

      // bump player back by the exact overlap
      player.x += normX * overlap;
      player.y += normY * overlap;
    }
  }
}

function playerAttack() {
  if (mouse.pressed) {
    const playerCameraOffsetX = camera.x - player.x;
    const playerCameraOffsetY = camera.y - player.y;

    const playerViewportPosX = canvas.width / 2 - playerCameraOffsetX;
    const playerViewportPosY = canvas.height / 2 - playerCameraOffsetY;

    const playerMouseDistanceX = mouse.x - playerViewportPosX;
    const playerMouseDistanceY = mouse.y - playerViewportPosY;

    const playerMouseDistance = Math.hypot(playerMouseDistanceX, playerMouseDistanceY);

    const normX = playerMouseDistanceX / playerMouseDistance;
    const normY = playerMouseDistanceY / playerMouseDistance;

    const meleeAttackX = player.x + normX * meleeAttackReach;
    const meleeAttackY = player.y + normY * meleeAttackReach;

    const meleeAttack = new Circle(meleeAttackX, meleeAttackY, meleeAttackReach, rgba(100, 0, 0, 1));

    meleeAttack.update();
  }
}
