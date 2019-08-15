class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

console.log(`point: ${new Point(1, 5)}`);
console.log(`typeof point: ${typeof Point}`);
console.log(Point === Point.prototype.constructor);