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
    // Find the closest point on the box to the circle's center
    const closestX = Math.max(wall.x, Math.min(player.x, wall.x + wall.width));
    const closestY = Math.max(wall.y, Math.min(player.y, wall.y + wall.height));

    // Calculate the distance from the circle's center to this closest point
    const distanceX = player.x - closestX;
    const distanceY = player.y - closestY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // If the distance is less than the player's radius, they are colliding
    if (distance < player.radius) {
      // Calculate the overlap and push the player out of the collision
      const overlap = player.radius - distance;

      // Normalize the distance vector and move the player away from the wall
      const normX = distanceX / distance;
      const normY = distanceY / distance;

      // Push the player out of the collision
      player.x += normX * overlap;
      player.y += normY * overlap;

      // Stop movement in the direction of the collision
      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        player.speedX = 0; // Horizontal collision, stop horizontal movement
      } else {
        player.speedY = 0; // Vertical collision, stop vertical movement
      }
    }
  }
}
