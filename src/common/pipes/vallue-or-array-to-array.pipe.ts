import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

/**
 * Transform value and array to array
 *
 * @export
 * @class ValueOrArrayToArray
 * @implements {PipeTransform}
 * @template QueryType
 * @template ValueType
 */
@Injectable()
export class ValueOrArrayToArray<QueryType, ValueType> implements PipeTransform {
    /**
     * Creates an instance of ValueOrArrayToArray.
     * @param {((value: QueryType) => ValueType[] | ValueType)} getValueOrArray
     * @param {(value: QueryType, array: ValueType[]) => void} setValue
     * @memberof ValueOrArrayToArray
     */
    constructor(
        private readonly getValueOrArray: (value: QueryType) => ValueType[] | ValueType,
        private readonly setValue: (value: QueryType, array: ValueType[]) => void,
    ) {}

    /**
     * transform fucntion
     *
     * @param {QueryType} value
     * @param {ArgumentMetadata} metadata
     * @return {*} 
     * @memberof ValueOrArrayToArray
     */
    transform(value: QueryType, metadata: ArgumentMetadata) {
        const valueOrArray = this.getValueOrArray(value)
        if(Array.isArray(valueOrArray)) {
            this.setValue(value, valueOrArray)
        } else if (valueOrArray){
            this.setValue(value, [valueOrArray])
        } else {
            this.setValue(value, [])
        }
        return value
    }

}