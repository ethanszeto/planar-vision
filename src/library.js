const rgba = (r, g, b, a) => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function bezier(t, p0, p1, p2, p3) {
  return p0 * (1 - t) ** 3 + p1 * 3 * (1 - t) ** 2 * t + p2 * 3 * (1 - t) * t ** 2 + p3 * t ** 3;
}

function calculatePlayerMovement() {
  player.speedX = 0;
  player.speedY = 0;
  if (keys["a"]) {
    player.speedX = -playerSpeed;
  }
  if (keys["d"]) {
    player.speedX = playerSpeed;
  }
  if (keys["w"]) {
    player.speedY = -playerSpeed;
  }
  if (keys["s"]) {
    player.speedY = playerSpeed;
  }
}

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
