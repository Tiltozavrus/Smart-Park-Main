import { BBox, Point as PointType, Position } from "geojson";

/**
 * point class
 *
 * @export
 * @class Point
 * @implements {PointType}
 */
export class Point implements PointType {
    /**
     * type 
     *
     * @type {"Point"}
     * @memberof Point
     */
    type: "Point";

    /**
     * coordinartes
     *
     * @type {Position}
     * @memberof Point
     */
    coordinates: Position;
}