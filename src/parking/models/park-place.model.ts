import { Geometry } from "geojson"
import { PlaceType } from "./place-type"

export type ParkPlace = {
    id: number

    floor: number

    placeUUID: string

    placeType: PlaceType

    coords: Geometry
}