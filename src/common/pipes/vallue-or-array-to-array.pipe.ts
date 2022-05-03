import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValueOrArrayToArray<QueryType, ValueType> implements PipeTransform {
    constructor(
        private readonly getValueOrArray: (value: QueryType) => ValueType[] | ValueType,
        private readonly setValue: (value: QueryType, array: ValueType[]) => void,
    ) {}

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