import { Geometry, Point } from "geojson";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlaceType } from "../models/place-type";
import { Park } from "./park.entity";
import { ReservedPlace } from "./reserved-place.entity";
import { ParkPlace as ParkPlaceType } from "../models/park-place.model";
import { PointTransformer } from "../../common/transformers/point.transformer";


/**
 * ParkPlace entity represantation
 *
 * @export
 * @class ParkPlace
 * @implements {ParkPlaceType}
 */
@Entity()
export class ParkPlace implements ParkPlaceType {
    /**
     * id of entity
     *
     * @type {number}
     * @memberof ParkPlace
     */
    @PrimaryGeneratedColumn()
    id: number

    /**
     * in what floor is place 
     *
     * @type {number}
     * @memberof ParkPlace
     */
    @Column()
    floor: number

    /**
     * place UUID
     *
     * @type {string}
     * @memberof ParkPlace
     */
    @Column({type: 'uuid'})
    placeUUID: string

    /**
     * place type
     *
     * @type {PlaceType}
     * @memberof ParkPlace
     */
    @Column(
        {
            type: 'enum',
            enum: PlaceType
        }
    )
    placeType: PlaceType

    /**
     * coords of place
     *
     * @type {Point}
     * @memberof ParkPlace
     */
    @Column(
        {
            type: 'point',
            transformer: new PointTransformer(),
        }
        )
    coords: Point

    /**
     * park edge
     *
     * @type {Park}
     * @memberof ParkPlace
     */
    @ManyToOne(() => Park, (park) => park.parkPlaces)
    park: Park

    /**
     * reservedPlaces edge
     *
     * @type {ReservedPlace[]}
     * @memberof ParkPlace
     */
    @OneToMany(() => ReservedPlace, (reservedPlace) => reservedPlace.parkPlace)
    reservedPlaces: ReservedPlace[]
}