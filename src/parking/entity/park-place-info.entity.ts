import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Park } from "./park.entity";
import { ParkPlacesInfo as ParkPlaceInfoType } from "../models/park-places-info.model";

@Entity()
export class ParkPlacesInfo implements ParkPlaceInfoType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    freeSpaces: number

    @Column()
    occupiedSpaces: number

    @Column({type: 'timestamp'})
    createdAt: Date

    @ManyToOne(()=> Park, (park) => park.parkPlacesInfo)
    park: Park
}