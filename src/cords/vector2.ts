export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get magnitude() {
    return Math.sqrt(this.sqrMagnitude);
  }

  get sqrMagnitude() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  subtract(other: Vector2) {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  nearestPoint(list: [Vector2, ...Vector2[]]) {
    var distance = Infinity;
    var point: Vector2 | undefined;

    list.forEach((v) => {
      const d = this.subtract(v).sqrMagnitude;
      if (d < distance) {
        distance = d;
        point = v;
      }
    });

    return point!;
  }
}
