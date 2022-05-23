import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Park } from "./park.entity";
import { ParkPlacesInfo as ParkPlaceInfoType } from "../models/park-places-info.model";

/**
 *ParkPlaceInfo entity represantation
 *
 * @export
 * @class ParkPlacesInfo
 * @implements {ParkPlaceInfoType}
 */
@Entity()
export class ParkPlacesInfo implements ParkPlaceInfoType {
    /**
     * id of entity
     *
     * @type {number}
     * @memberof ParkPlacesInfo
     */
    @PrimaryGeneratedColumn()
    id: number

    /**
     * freeSpaces in the moment
     *
     * @type {number}
     * @memberof ParkPlacesInfo
     */
    @Column()
    freeSpaces: number

    /**
     * occupiedSpaces in the moment
     *
     * @type {number}
     * @memberof ParkPlacesInfo
     */
    @Column()
    occupiedSpaces: number

    /**
     * createdAt date of entity
     *
     * @type {Date}
     * @memberof ParkPlacesInfo
     */
    @Column({type: 'timestamp', default: 'NOW()'})
    createdAt: Date

    /**
     * park edge
     *
     * @type {Park}
     * @memberof ParkPlacesInfo
     */
    @ManyToOne(()=> Park, (park) => park.parkPlacesInfo)
    park: Park
}