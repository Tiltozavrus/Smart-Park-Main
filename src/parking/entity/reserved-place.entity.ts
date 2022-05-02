import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { ParkPlace } from "./park-place.entity";
import { ReservedPlaceInfo } from "./reserved-place-info.entity";

@Entity()
export class ReservedPlace {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @ManyToOne(() => ParkPlace, (parkPlace) => parkPlace.reservedPlaces)
    parkPlace: ParkPlace

    @Column({type: 'timestamp'})
    from: Timestamp

    @Column({type: 'timestamp'})
    to: Timestamp

    @Column({type: 'boolean'})
    done: boolean

    @Column({type: 'timestamp'})
    createdAt: Timestamp

    @Column({type: 'timestamp'})
    updatedAt: Timestamp

    @OneToOne(() => ReservedPlaceInfo, (info) => info.reservedPlace)
    reservedPlaceInfo: ReservedPlaceInfo
}