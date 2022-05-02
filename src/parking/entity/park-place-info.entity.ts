import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Park } from "./park.entity";

@Entity()
export class ParkPlacesInfo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    freeSpaces: number

    @Column()
    occupiedSpaces: number

    @Column({type: 'timestamp'})
    createdAt: Timestamp

    @ManyToOne(()=> Park, (park) => park.parkPlacesInfo)
    park: Park
}