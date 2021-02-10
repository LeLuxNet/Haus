export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  get magnitude() {
    return Math.sqrt(this.sqrMagnitude);
  }

  get sqrMagnitude() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
  }

  subtract(other: Vector3) {
    return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  nearestPoint(list: [Vector3, ...Vector3[]]) {
    var distance = Infinity;
    var point: Vector3 | undefined;

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
