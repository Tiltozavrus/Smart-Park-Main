import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValuesInEnumPipe<QueryType> implements PipeTransform {
    constructor(
        private readonly getValues: (value: QueryType) => string[],
        private readonly checkInEnumFunc: (value: string) => boolean,
        private readonly setValues: (value: QueryType, newValues: string[]) => void,
    ) {

    }

    transform(value: QueryType, metadata: ArgumentMetadata) {
        this.setValues(value, this.getValues(value).filter(value => this.checkInEnumFunc(value)))
        return value
    }
}
