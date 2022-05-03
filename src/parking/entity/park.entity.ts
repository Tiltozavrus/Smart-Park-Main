import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Relation, Timestamp } from "typeorm";
import { ParkPlacesInfo } from "./park-place-info.entity";
import { ParkPlace } from "./park-place.entity";
import { Park as ParkType } from "../models/park.model";

@Entity()
export class Park implements ParkType {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'uuid'})
    parkUUID: string

    @Column({type: 'double precision'})
    longitude: number

    @Column({type: 'double precision'})
    latitude: number

    @Column()
    address: string

    @Column()
    totalPlaces: number

    @Column({type: 'timestamp', default: 'NOW()'})
    createdAt: Date

    @Column({type: 'timestamp', onUpdate: 'NOW()', nullable: true})
    updatedAt: Date

    @OneToMany(() => ParkPlacesInfo, (parkPlacesInfo) => parkPlacesInfo.park)
    @JoinColumn()
    parkPlacesInfo: ParkPlacesInfo[]

    @OneToMany(() => ParkPlace, (parkPlace) => parkPlace.park)
    @JoinColumn()
    parkPlaces: ParkPlace[]
}