/**
 * edges for parks enum
 *
 * @export
 * @enum {number}
 */
export enum ParkEdges {
    parkPlacesInfo = "parkPlacesInfo",
    parkPlaces = "parkPlaces"
}

/**
 * Utils for ParkEdges enum
 *
 * @export
 * @class ParkEdgesUtils
 */
export class ParkEdgesUtils {
    /**
     * valuesIn
     *
     * @static
     * @param {...string[]} values
     * @return {*}  {boolean}
     * @memberof ParkEdgesUtils
     */
    static valuesIn(...values: string[]): boolean {
        for(const value of values) {
            return value in ParkEdges
        }
    }

    /**
     * valueIn
     *
     * @static
     * @param {string} value
     * @return {*}  {boolean}
     * @memberof ParkEdgesUtils
     */
    static valueIn(value: string): boolean {
        return this.valuesIn(value)
    }

    /**
     * filterValues
     *
     * @static
     * @param {string[]} values
     * @return {*}  {string[]}
     * @memberof ParkEdgesUtils
     */
    static filterValues(values: string[]): string[] {
        return values.filter(
            value => this.valueIn(value)
        )
    }
}