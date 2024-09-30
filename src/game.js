/**
 * Start the game
 */
function start() {
  initialize();
  requestAnimationFrame(frame);
}

/**
 * Initial actions before
 */
function initialize() {
  canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  player = new Player(canvas.width / 2, canvas.height / 2, 30, rgba(255, 255, 255, 0.5));
  camera = new Camera(canvas.width / 2, canvas.height / 2, 30, rgba(255, 255, 255, 0.5));
}

/**
 * One frame in the game
 */
function frame(time) {
  /**
   * delta time - time in ms since last frame played
   * all timers should count in ms instead of frames for consistency
   */
  let dt = time - currentTime;
  currentTime = time;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  calculatePlayerMovement(dt);
  calculatePlayerWallCollisions(stageOneWalls);
  playerAttack();

  for (const wall of stageOneWalls) {
    wall.update();
  }

  camera.update();
  player.update();

  requestAnimationFrame(frame);
}
