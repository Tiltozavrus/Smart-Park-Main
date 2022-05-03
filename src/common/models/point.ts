import { BBox, Point as PointType, Position } from "geojson";

export class Point implements PointType {
    type: "Point";
    coordinates: Position;
}