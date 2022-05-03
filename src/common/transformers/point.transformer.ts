import { Point } from "geojson";
import { ValueTransformer } from "typeorm";

export class PointTransformer implements ValueTransformer {
    to(value: Point) {
      const [x, y] = value.coordinates
      return `${x}, ${y}`
    }
  
    from(value): Point {
      const { x, y } = value
      return {
          type: "Point",
          coordinates: [x, y]
      }
    }
  }