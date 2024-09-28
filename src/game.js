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
  ctx = canvas.getContext("2d");
}

/**
 * One frame in the game
 */
function frame(time) {
  requestAnimationFrame(frame);
}
