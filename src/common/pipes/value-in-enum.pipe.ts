import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

/**
 * check that values in enum and transform in into enum if can
 *
 * @export
 * @class ValuesInEnumPipe
 * @implements {PipeTransform}
 * @template QueryType
 */
@Injectable()
export class ValuesInEnumPipe<QueryType> implements PipeTransform {
    /**
     * Creates an instance of ValuesInEnumPipe.
     * @param {(value: QueryType) => string[]} getValues
     * @param {(value: string) => boolean} checkInEnumFunc
     * @param {(value: QueryType, newValues: string[]) => void} setValues
     * @memberof ValuesInEnumPipe
     */
    constructor(
        private readonly getValues: (value: QueryType) => string[],
        private readonly checkInEnumFunc: (value: string) => boolean,
        private readonly setValues: (value: QueryType, newValues: string[]) => void,
    ) {

    }

    /**
     * transform method
     *
     * @param {QueryType} value
     * @param {ArgumentMetadata} metadata
     * @return {*} 
     * @memberof ValuesInEnumPipe
     */
    transform(value: QueryType, metadata: ArgumentMetadata) {
        this.setValues(value, this.getValues(value).filter(value => this.checkInEnumFunc(value)))
        return value
    }
}
