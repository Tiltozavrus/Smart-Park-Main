import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { ReservedPlace } from "./reserved-place.entity";

/**
 * ReservedPlaceInfo entity representation
 *
 * @export
 * @class ReservedPlaceInfo
 */
@Entity()
export class ReservedPlaceInfo {
    /**
     * id of entity
     *
     * @type {number}
     * @memberof ReservedPlaceInfo
     */
    @PrimaryGeneratedColumn()
    id: number

    /**
     * arrive time of user
     *
     * @type {Date}
     * @memberof ReservedPlaceInfo
     */
    @Column({type: 'timestamp', nullable: true})
    arriveTime: Date

    /**
     * departure time
     *
     * @type {Date}
     * @memberof ReservedPlaceInfo
     */
    @Column({type: 'timestamp', nullable: true})
    departureTime: Date

    /**
     * reservedPlace edge
     *
     * @type {ReservedPlace}
     * @memberof ReservedPlaceInfo
     */
    @OneToOne(() => ReservedPlace, (place) => place.reservedPlaceInfo)
    reservedPlace: ReservedPlace
}