import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { ReservedPlace } from "./reserved-place.entity";

@Entity()
export class ReservedPlaceInfo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'timestamp', nullable: true})
    arriveTime: Date

    @Column({type: 'timestamp', nullable: true})
    departureTime: Date

    @OneToOne(() => ReservedPlace, (place) => place.reservedPlaceInfo)
    reservedPlace: ReservedPlace
}