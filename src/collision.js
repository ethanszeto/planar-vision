class Collision {
  /**
   * Calculates if two objects are overlapping
   * 
   * @param {Box | Circle} a 
   * @param {Box | Circle} b 
   * @returns 
   */
  static check(a, b) {
    if (a instanceof Box) {
      if (b instanceof Box) {
        return this.boxWithBox(a, b);
      }
      return this.boxWithCircle(a, b);
    }
    if (b instanceof Box) {
      return this.boxWithCircle(b, a);
    }
    return this.circleWithCircle(a, b);
  }

  /**
   * Calculates if two boxes are overlapping
   * 
   * @param {Box} a 
   * @param {Box} b 
   * @returns 
   */
  static boxWithBox(a, b) {
    return !(a.x > b.x + b.width || a.x + a.width < b.x || a.y > b.y + b.height || a.y + a.height < b.y);
  }

  /**
   * Calculates if a box and a circle are overlapping
   * 
   * @param {Box} b 
   * @param {Circle} c 
   * @returns boolean
   */
  static boxWithCircle(b, c) {
    return (
      Math.hypot(c.x - Math.max(b.x, Math.min(c.x, b.x + b.width)), c.y - Math.max(b.y, Math.min(c.y, b.y + b.height))) <=
      c.radius
    );
  }

  /**
   * Calculates if two circles are overlapping
   * 
   * @param {Circle} a 
   * @param {Circle} b 
   * @returns boolean
   */
  static circleWithCircle(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y) <= a.radius + b.radius;
  }
}
