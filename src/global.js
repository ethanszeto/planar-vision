/* Game Inputs */
const keys = {};
const mouse = { x: 0, y: 0, pressed: false };

/* Window */
var canvas;
var ctx;

/* Timers + Cycles + Counters */
var currentTime = 0;

/* Global Game Objects */
var player;
var camera;

/* Game Presets */
const playerSpeed = 4;

/* Calculation Presets */
const t = 0.25;
