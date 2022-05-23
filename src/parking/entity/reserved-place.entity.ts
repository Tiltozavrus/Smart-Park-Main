import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { ParkPlace } from "./park-place.entity";
import { ReservedPlaceInfo } from "./reserved-place-info.entity";

/**
 * ReservedPlace entity representation
 *
 * @export
 * @class ReservedPlace
 */
@Entity()
export class ReservedPlace {
    /**
     * id of entity
     *
     * @type {number}
     * @memberof ReservedPlace
     */
    @PrimaryGeneratedColumn()
    id: number

    /**
     * id of user that reserv place
     *
     * @type {number}
     * @memberof ReservedPlace
     */
    @Column()
    user_id: number

    /**
     * park place edge
     *
     * @type {ParkPlace}
     * @memberof ReservedPlace
     */
    @ManyToOne(() => ParkPlace, (parkPlace) => parkPlace.reservedPlaces)
    parkPlace: ParkPlace

    /**
     * date of from place is reserved
     *
     * @type {Date}
     * @memberof ReservedPlace
     */
    @Column({type: 'timestamp'})
    from: Date

    /**
     * date of place is stop to be reserved
     *
     * @type {Date}
     * @memberof ReservedPlace
     */
    @Column({type: 'timestamp'})
    to: Date

    /**
     * done of reserve
     *
     * @type {boolean}
     * @memberof ReservedPlace
     */
    @Column({type: 'boolean', default: false})
    done: boolean

    /**
     * createdAt date of entity
     *
     * @type {Date}
     * @memberof ReservedPlace
     */
    @Column({type: 'timestamp', default: 'NOW()'})
    createdAt: Date

    /**
     * updatedAt date of entity
     *
     * @type {Date}
     * @memberof ReservedPlace
     */
    @Column({type: 'timestamp', nullable: true})
    updatedAt: Date

    /**
     * reserved place info edge
     *
     * @type {ReservedPlaceInfo}
     * @memberof ReservedPlace
     */
    @OneToOne(() => ReservedPlaceInfo, (info) => info.reservedPlace)
    reservedPlaceInfo: ReservedPlaceInfo
}