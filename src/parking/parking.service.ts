import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, Timestamp } from 'typeorm';
import { CreateParkReq } from './dto/create-park.dto';
import { GetParkParams } from './dto/get-park.dto';
import { Park } from './entity/park.entity';
import { ParkEdgesUtils } from './models/park-edges.model';

@Injectable()
export class ParkingService {
    constructor(
        @InjectRepository(Park)
        private readonly parkReposiotry: Repository<Park>
    ) {
    }

    createPark(
        req: CreateParkReq
    ) {
        const merged =  this.parkReposiotry.merge(
            this.parkReposiotry.create(),
            req,
        )

        return this.parkReposiotry.save(
            merged
        )
    }

    getPark(
        id: number,
        params: GetParkParams
    ) {
        return this.parkReposiotry.findOne(
            id,
            {
                relations: params.edges 
            }
        )
    }
}
