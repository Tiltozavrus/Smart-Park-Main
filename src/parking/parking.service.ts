import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, Timestamp } from 'typeorm';
import { CreateParkReq } from './dto/create-park.dto';
import { GetParkParams } from './dto/get-park.dto';
import { Park } from './entity/park.entity';

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
        const relationsOpts: FindOneOptions<Park> = {
            relations: []
        }

        if(Array.isArray(params.edges)) {
            for(const edge of params.edges) {
                relationsOpts.relations.push(edge)
            }
        } else if (params.edges) {
            relationsOpts.relations.push(params.edges)
        }

        return this.parkReposiotry.findOne(
            id,
            {
                ...relationsOpts
            }
        )
    }
}
