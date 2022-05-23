import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Relation, Timestamp } from "typeorm";
import { ParkPlacesInfo } from "./park-place-info.entity";
import { ParkPlace } from "./park-place.entity";
import { Park as ParkType } from "../models/park.model";

/**
 * Park entity repesantation
 *
 * @export
 * @class Park
 * @implements {ParkType}
 */
@Entity()
export class Park implements ParkType {
    /**
     * id of entity
     *
     * @type {number}
     * @memberof Park
     */
    @PrimaryGeneratedColumn()
    id: number

    /**
     *park uuid
     *
     * @type {string}
     * @memberof Park
     */
    @Column({type: 'uuid'})
    parkUUID: string

    /**
     * longitutde of park 
     *
     * @type {number}
     * @memberof Park
     */
    @Column({type: 'double precision'})
    longitude: number

    /**
     * latitude of park
     *
     * @type {number}
     * @memberof Park
     */
    @Column({type: 'double precision'})
    latitude: number

    /**
     * addres of park
     *
     * @type {string}
     * @memberof Park
     */
    @Column()
    address: string

    /**
     * totak place in park
     *
     * @type {number}
     * @memberof Park
     */
    @Column()
    totalPlaces: number

    /**
     * createdAt of entity
     *
     * @type {Date}
     * @memberof Park
     */
    @Column({type: 'timestamp', default: 'NOW()'})
    createdAt: Date

    /**
     * updatedAt of entity
     *
     * @type {Date}
     * @memberof Park
     */
    @Column({type: 'timestamp', onUpdate: 'NOW()', nullable: true})
    updatedAt: Date

    /**
     * parkPlacesInfo edge
     *
     * @type {ParkPlacesInfo[]}
     * @memberof Park
     */
    @OneToMany(() => ParkPlacesInfo, (parkPlacesInfo) => parkPlacesInfo.park)
    @JoinColumn()
    parkPlacesInfo: ParkPlacesInfo[]

    /**
     * parkPlaces edge
     *
     * @type {ParkPlace[]}
     * @memberof Park
     */
    @OneToMany(() => ParkPlace, (parkPlace) => parkPlace.park)
    @JoinColumn()
    parkPlaces: ParkPlace[]
}