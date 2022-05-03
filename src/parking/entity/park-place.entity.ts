import { Geometry, Point } from "geojson";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlaceType } from "../models/place-type";
import { Park } from "./park.entity";
import { ReservedPlace } from "./reserved-place.entity";
import { ParkPlace as ParkPlaceType } from "../models/park-place.model";
import { PointTransformer } from "../../common/transformers/point.transformer";


@Entity()
export class ParkPlace implements ParkPlaceType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    floor: number

    @Column({type: 'uuid'})
    placeUUID: string

    @Column(
        {
            type: 'enum',
            enum: PlaceType
        }
    )
    placeType: PlaceType

    @Column(
        {
            type: 'point',
            transformer: new PointTransformer(),
        }
        )
    coords: Point

    @ManyToOne(() => Park, (park) => park.parkPlaces)
    park: Park

    @OneToMany(() => ReservedPlace, (reservedPlace) => reservedPlace.parkPlace)
    reservedPlaces: ReservedPlace[]
}