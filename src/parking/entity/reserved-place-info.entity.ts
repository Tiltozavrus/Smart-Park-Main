import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { ReservedPlace } from "./reserved-place.entity";

@Entity()
export class ReservedPlaceInfo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'timestamp', nullable: true})
    arriveTime: Timestamp

    @Column({type: 'timestamp', nullable: true})
    departureTime: Timestamp

    @OneToOne(() => ReservedPlace, (place) => place.reservedPlaceInfo)
    reservedPlace: ReservedPlace
}