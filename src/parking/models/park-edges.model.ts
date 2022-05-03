export enum ParkEdges {
    parkPlacesInfo = "parkPlacesInfo",
    parkPlaces = "parkPlaces"
}

export class ParkEdgesUtils {
    static valuesIn(...values: string[]): boolean {
        for(const value of values) {
            return value in ParkEdges
        }
    }

    static valueIn(value: string): boolean {
        return this.valuesIn(value)
    }

    static filterValues(values: string[]): string[] {
        return values.filter(
            value => this.valueIn(value)
        )
    }
}