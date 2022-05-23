import { Point } from "geojson";
import { ValueTransformer } from "typeorm";

/**
 * class to transform point to correcto format in postgres
 *
 * @export
 * @class PointTransformer
 * @implements {ValueTransformer}
 */
export class PointTransformer implements ValueTransformer {
    /**
     * transform to programm format from postress format
     *
     * @param {Point} value
     * @return {*} 
     * @memberof PointTransformer
     */
    to(value: Point) {
      const [x, y] = value.coordinates
      return `${x}, ${y}`
    }
  
    /**
     * transform from programm format to postgress format
     *
     * @param {*} value
     * @return {*}  {Point}
     * @memberof PointTransformer
     */
    from(value): Point {
      const { x, y } = value
      return {
          type: "Point",
          coordinates: [x, y]
      }
    }
  }