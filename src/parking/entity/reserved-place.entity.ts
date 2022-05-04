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
    from: Date

    @Column({type: 'timestamp'})
    to: Date

    @Column({type: 'boolean', default: false})
    done: boolean

    @Column({type: 'timestamp', default: 'NOW()'})
    createdAt: Date

    @Column({type: 'timestamp', nullable: true})
    updatedAt: Date

    @OneToOne(() => ReservedPlaceInfo, (info) => info.reservedPlace)
    reservedPlaceInfo: ReservedPlaceInfo
}