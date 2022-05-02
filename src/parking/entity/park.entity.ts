import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { ParkPlacesInfo } from "./park-place-info.entity";
import { ParkPlace } from "./park-place.entity";

@Entity()
export class Park {
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

    @Column({type: 'timestamp'})
    createdAt: Timestamp

    @Column({type: 'timestamp'})
    updatedAt: Timestamp

    @OneToMany(() => ParkPlacesInfo, (parkPlacesInfo) => parkPlacesInfo.park)
    parkPlacesInfo: ParkPlacesInfo[]

    @OneToMany(() => ParkPlace, (parkPlace) => parkPlace.park)
    parkPlaces: ParkPlace[]
}