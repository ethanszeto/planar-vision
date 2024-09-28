window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  delete keys[e.key];
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mousedown", () => {
  mouse.pressed = true;
});

window.addEventListener("mouseup", () => {
  mouse.pressed = false;
});
